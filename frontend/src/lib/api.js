import axios from 'axios';

const BASE_URL = 'https://eatup-backend-byng.onrender.com/api/v1';
import * as productActions from './productsService';
import * as uploadActions from './uploadsService';
import * as referenceActions from './referenceService';
import * as adminActions from './adminService';
import * as authActions from './authService';


// Create Axios instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Optimization: Request Deduplication & Caching ---
const pendingRequests = new Map();
const cache = new Map();
const CACHE_TTL = 3 * 60 * 1000; // 3 minutes

const generateRequestKey = (method, url, config = {}) => {
  return `${method}:${url}:${JSON.stringify(config.params || {})}:${JSON.stringify(config.data || {})}`;
};

// Wrap core methods for deduplication
['get', 'post', 'put', 'delete', 'patch'].forEach((method) => {
  const original = apiClient[method].bind(apiClient);
  apiClient[method] = async (url, ...args) => {
    const config = args[method === 'get' || method === 'delete' ? 0 : 1] || {};
    const data = method === 'get' || method === 'delete' ? undefined : args[0];
    const key = generateRequestKey(method, url, { ...config, data });

    // Deduplication: Return pending promise if it exists
    if (pendingRequests.has(key)) {
      return pendingRequests.get(key);
    }

    const promise = original(url, ...args).finally(() => {
      pendingRequests.delete(key);
    });

    pendingRequests.set(key, promise);
    return promise;
  };
});

// Request Interceptor for Token & Cache
apiClient.interceptors.request.use(

  (config) => {
    // 1. Caching logic (only for GET endpoints that are safely cacheable, e.g. dashboard stats or menus)
    if (config.method?.toLowerCase() === 'get' && (config.url?.includes('/dashboard/stats') || config.url?.includes('/shops') || config.url?.includes('/products'))) {
      const key = generateRequestKey(config.method, config.url, config);
      const cached = cache.get(key);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        config.adapter = () => Promise.resolve({
          data: cached.data,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          request: {}
        });
        return config;
      }
    }

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor for Error Handling and Cache Storage
apiClient.interceptors.response.use(
  (response) => {
    const { config } = response;
    // Cache successful GET requests for specific endpoints
    if (config.method?.toLowerCase() === 'get' && (config.url?.includes('/dashboard/stats') || config.url?.includes('/shops') || config.url?.includes('/products'))) {
      const key = generateRequestKey(config.method, config.url, config);
      cache.set(key, { data: response.data, timestamp: Date.now() });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;

      if (refreshToken && !window.location.pathname.includes('/auth/login')) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return apiClient(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Use raw axios to avoid interceptor recursion
          const res = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
          const { accessToken: newToken, refreshToken: newRefreshToken } = res.data.data;

          localStorage.setItem('accessToken', newToken);
          if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

          apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          processQueue(null, newToken);
          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          // If refresh fails, proceed to clear session
        } finally {
          isRefreshing = false;
        }
      }

      // Final fallback if no refresh token or refresh failed
      if (typeof window !== 'undefined') {
        const activeElement = document.activeElement;
        const isEditing = activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName);
        
        // Save current location to resume after re-authenticating
        if (!window.location.pathname.includes('/auth/login')) {
          sessionStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search);
        }

        // Emit custom event for modern React apps to handle gracefully via toast/modals
        window.dispatchEvent(new CustomEvent('sessionExpired', { detail: { isEditing } }));

        let shouldRedirect = true;
        if (isEditing) {
          // Fallback graceful handling if UI doesn't intercept the event
          shouldRedirect = window.confirm('Your session has expired. You are currently editing a form. Click OK to go to login, or Cancel to copy your work first.');
        }

        if (shouldRedirect) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          if (!window.location.pathname.includes('/auth/login')) {
            window.location.href = '/auth/login?role=vendor';
          }
        }
      }
    }

    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);


// --- Utility: File Validation ---
const validateFile = (file, options = {}) => {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/webp'] } = options;
  if (!file) throw new Error('No file provided');
  if (file.size > maxSize) throw new Error(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
  if (!allowedTypes.includes(file.type)) throw new Error(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
  return true;
};

// Vendor Profile Functions
export const submitVendorProfile = async (data) => {
  const response = await apiClient.post('/vendor/profile', data);
  return response.data.data;
};

export const updateVendorProfile = async (data) => {
  const response = await apiClient.put('/vendor/profile', data);
  return response.data.data;
};

export const getVendorProfile = async () => {
  const response = await apiClient.get('/vendor/profile');
  return response.data.data;
};

export const uploadCACDocument = async (file, onProgress) => {
  validateFile(file, { maxSize: 10 * 1024 * 1024, allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'] });
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post('/vendor/profile/cac-document', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      }
    }
  });
  return response.data.data;
};

export const verifyBusinessNumber = async () => {
  const response = await apiClient.post('/vendor/profile/verify-business-number');
  return response.data.data;
};

export const verifySettlementAccount = async (bankCode, accountNumber) => {
  const response = await apiClient.post('/vendor/profile/verify-settlement-account', { bankCode, accountNumber });
  return response.data.data;
};

export const createPaystackSubaccount = async () => {
  const response = await apiClient.post('/vendor/profile/paystack-subaccount');
  return response.data.data;
};

// Onboarding Functions
export const startOnboarding = async () => {
  const response = await apiClient.post('/vendor/onboarding/start');
  return response.data.data;
};

export const getOnboardingDraft = async () => {
  const response = await apiClient.get('/vendor/onboarding/me');
  return response.data.data;
};

export const saveStep1Categories = async (onboardingId, categories) => {
  const response = await apiClient.patch('/vendor/onboarding/step-1', { onboardingId, categories });
  return response.data.data;
};

export const saveStep2BusinessDetails = async (onboardingId, data) => {
  const response = await apiClient.patch('/vendor/onboarding/step-2', { onboardingId, ...data });
  return response.data.data;
};

export const saveStep3Verification = async (onboardingId, data) => {
  const response = await apiClient.patch('/vendor/onboarding/step-3', { onboardingId, ...data });
  return response.data.data;
};

export const sendOnboardingOTP = async (onboardingId, channel, target) => {
  const response = await apiClient.post('/vendor/onboarding/otp/send', { onboardingId, channel, target });
  return response.data.data;
};

export const verifyOnboardingOTP = async (onboardingId, otpSessionId, code) => {
  const response = await apiClient.post('/vendor/onboarding/otp/verify', { onboardingId, otpSessionId, code });
  return response.data.data;
};

export const submitOnboardingForReview = async (onboardingId) => {
  const response = await apiClient.post('/vendor/onboarding/submit', { onboardingId });
  return response.data.data;
};

export const getOnboardingStatus = async () => {
  const response = await apiClient.get('/vendor/onboarding/status');
  return response.data.data;
};

// Shop Functions
export const createShop = async (data) => {
  const response = await apiClient.post('/shops', data);
  return response.data.data;
};

export const updateShop = async (shopId, data) => {
  const response = await apiClient.put(`/shops/${shopId}`, data);
  return response.data.data;
};

export const uploadShopPicture = async (shopId, file, onProgress) => {
  validateFile(file);
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post(`/shops/${shopId}/picture`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      }
    }
  });
  return response.data.data;
};

export const submitShopForApproval = async (shopId) => {
  const response = await apiClient.post(`/shops/${shopId}/submit`);
  return response.data.data;
};

export const getShopById = async (shopId) => {
  const response = await apiClient.get(`/shops/${shopId}`);
  return response.data.data;
};

export const listShops = async (params = {}) => {
  const query = new URLSearchParams({ page: 1, limit: 20, ...params }).toString();
  const response = await apiClient.get(`/shops?${query}`);
  return response.data.data;
};

export const listNearbyShops = async (lat, lng, radius = 5000) => {
  const query = new URLSearchParams({ lat, lng, radius }).toString();
  const response = await apiClient.get(`/shops/nearby?${query}`);
  return response.data.data;
};

export const saveShop = async (shopId) => {
  const response = await apiClient.post(`/shops/${shopId}/save`);
  return response.data.data;
};

export const unsaveShop = async (shopId) => {
  const response = await apiClient.delete(`/shops/${shopId}/save`);
  return response.data.data;
};

export const getProductsUnderShop = async (shopId, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = `/shops/${shopId}/products${query ? `?${query}` : ''}`;
  const response = await apiClient.get(endpoint);
  return response.data.data;
};

export const getMyShops = async () => {
  const response = await apiClient.get('/shops/my');
  return response.data.data;
};

// Order Functions
export const listVendorOrders = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await apiClient.get(`/orders/vendor?${query}`);
  return response.data.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await apiClient.patch(`/orders/${orderId}/status`, { status });
  return response.data.data;
};

export const getVendorDashboardStats = async () => {
  const response = await apiClient.get('/vendor/dashboard/stats');
  return response.data.data;
};


export const api = {
  auth: {
    register: authActions.registerVendor,
    registerRider: authActions.registerRider,
    login: authActions.login,
    sendOtp: authActions.sendOTP,
    verifyOtp: authActions.verifyOTP,
    createAccount: authActions.createAccount,
    refresh: authActions.refreshAccessToken,
    logout: authActions.logout,
    getProfile: authActions.getProfile,
    updateProfile: authActions.updateProfile,
    getAddresses: authActions.getAddresses,
    addAddress: authActions.addAddress,
    updateAddress: authActions.updateAddress,
    deleteAddress: authActions.deleteAddress,
    changePassword: authActions.changePassword,
    saveTokens: authActions.saveTokens,
    clearTokens: authActions.clearTokens,
    isAuthenticated: authActions.isAuthenticated,
  },

  vendor: {
    submitProfile: submitVendorProfile,
    updateProfile: updateVendorProfile,
    getProfile: getVendorProfile,
    uploadCacDocument: uploadCACDocument,
    verifyBusinessNumber,
    verifySettlementAccount,
    createPaystackSubaccount,
    orders: {
      list: listVendorOrders,
      updateStatus: updateOrderStatus,
    },
    dashboardStats: getVendorDashboardStats,
    onboarding: {

      start: startOnboarding,
      getDraft: getOnboardingDraft,
      saveStep1: saveStep1Categories,
      saveStep2: saveStep2BusinessDetails,
      saveStep3: saveStep3Verification,
      sendOtp: sendOnboardingOTP,
      verifyOtp: verifyOnboardingOTP,
      submit: submitOnboardingForReview,
      getStatus: getOnboardingStatus,
    }
  },

  shops: {
    create: createShop,
    update: updateShop,
    uploadPicture: uploadShopPicture,
    submitForApproval: submitShopForApproval,
    getById: getShopById,
    list: listShops,
    listNearby: listNearbyShops,
    save: saveShop,
    unsave: unsaveShop,
    getProducts: getProductsUnderShop,
    getMy: getMyShops,
  },

  products: {
    create: productActions.createProduct,
    update: productActions.updateProduct,
    delete: productActions.deleteProduct,
    getById: productActions.getProductById,
    listByShop: productActions.listProductsByShop,
    filterByCategory: productActions.filterProductsByCategory,
    search: productActions.searchProductsByName,
    getCategories: productActions.getProductCategories,
  },

  uploads: {
    getPresignedUrl: uploadActions.getPresignedUploadUrl,
  },

  reference: {
    getVendorCategories: referenceActions.getVendorCategories,
    getCountryCodes: referenceActions.getCountryCodes,
  },

  admin: {
    vendors: {
      listPending: adminActions.listPendingVendors,
      getDetails: adminActions.getVendorSettlementDetails,
      verifyBusinessNumber: adminActions.verifyVendorBusinessNumber,
      approve: adminActions.approveVendor,
      reject: adminActions.rejectVendor,
    },
    shops: {
      listPending: adminActions.listPendingShops,
      approve: adminActions.approveShop,
      reject: adminActions.rejectShop,
      suspend: adminActions.suspendShop,
    }
  },

  // Keep old names for compatibility during transition
  vendorOnboarding: {
    start: async () => {
        const res = await startOnboarding();
        return { success: true, data: res };
    },
    step1: async (onboardingId, categories) => {
        const res = await saveStep1Categories(onboardingId, categories);
        return { success: true, data: res };
    },
    step2: async (onboardingId, body) => {
        const res = await saveStep2BusinessDetails(onboardingId, body);
        return { success: true, data: res };
    },
    step3: async (onboardingId, body) => {
        const res = await saveStep3Verification(onboardingId, body);
        return { success: true, data: res };
    },
    sendOtp: async (onboardingId, channel, target) => {
        const res = await sendOnboardingOTP(onboardingId, channel, target);
        return { success: true, data: res };
    },
    verifyOtp: async (onboardingId, otpSessionId, code) => {
        const res = await verifyOnboardingOTP(onboardingId, otpSessionId, code);
        return { success: true, data: res };
    },
    submit: async (onboardingId) => {
        const res = await submitOnboardingForReview(onboardingId);
        return { success: true, data: res };
    },
    uploadCacDocument: async (file) => {
        const res = await uploadCACDocument(file);
        return { success: true, data: res };
    },
  }
};
