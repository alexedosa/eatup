/**
 * Mock API — mirrors the real `api` object shape.
 * Active when NEXT_PUBLIC_MOCK_VIEW=true.
 */

import {
  saveTokens,
  clearTokens,
  getAccessToken,
  isAuthenticated as checkAuthenticated,
} from './authService';
import { mockDelay, clone } from '../mocks/utils';
import { mockStore } from '../mocks/store';
import { MOCK_VENDOR_USER, MOCK_RIDER_USER, MOCK_CUSTOMER_USER, MOCK_TOKENS } from '../mocks/auth';
import { MOCK_ANALYTICS } from '../mocks/analytics';
import { MOCK_PAYMENTS } from '../mocks/payments';
import { MOCK_VENDOR_CATEGORIES, MOCK_COUNTRY_CODES } from '../mocks/reference';

const genId = (prefix) => `${prefix}_${Date.now()}`;

function persistUser(user) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

function getStoredUser() {
  if (typeof window === 'undefined') return MOCK_VENDOR_USER;
  try {
    return JSON.parse(localStorage.getItem('user') || 'null') || MOCK_VENDOR_USER;
  } catch {
    return MOCK_VENDOR_USER;
  }
}

// ─── Auth ────────────────────────────────────────────────────

const mockRegister = async (data, role) => {
  await mockDelay();
  const user = {
    id: genId('usr'),
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    role,
    onboardingStatus: role === 'VENDOR' ? 'PENDING' : 'COMPLETE',
  };
  saveTokens(MOCK_TOKENS.accessToken, MOCK_TOKENS.refreshToken);
  persistUser(user);
  return {
    ...MOCK_TOKENS,
    user,
    accessToken: MOCK_TOKENS.accessToken,
    token: MOCK_TOKENS.accessToken,
  };
};

const mockLogin = async (email) => {
  await mockDelay();
  const lower = email.toLowerCase();
  const user = lower.includes('rider')
    ? { ...MOCK_RIDER_USER, email }
    : lower.includes('vendor')
      ? { ...MOCK_VENDOR_USER, email }
      : { ...MOCK_CUSTOMER_USER, email };
  saveTokens(MOCK_TOKENS.accessToken, MOCK_TOKENS.refreshToken);
  persistUser(user);
  return {
    data: {
      token: MOCK_TOKENS.accessToken,
      refreshToken: MOCK_TOKENS.refreshToken,
      user,
    },
  };
};

// ─── Named exports (used by register steps) ──────────────────

export const submitVendorProfile = async (data) => {
  await mockDelay();
  return { ...mockStore.vendorMe, ...data };
};

export const updateVendorProfile = submitVendorProfile;
export const getVendorProfile = async () => {
  await mockDelay();
  return mockStore.vendorMe;
};

export const uploadCACDocument = async () => {
  await mockDelay(500);
  return { url: 'https://res.cloudinary.com/mock/cac-document.pdf' };
};

export const verifyBusinessNumber = async () => {
  await mockDelay();
  return { verified: true };
};

export const verifySettlementAccount = async () => {
  await mockDelay();
  return { accountName: "Mama Titi's Kitchen", verified: true };
};

export const createPaystackSubaccount = async () => {
  await mockDelay();
  return { subaccountCode: 'ACCT_mock_paystack' };
};

export const getVendorMe = async () => {
  await mockDelay();
  return mockStore.vendorMe;
};

export const updateVendorMe = async (data) => {
  await mockDelay();
  mockStore.vendorMe = { ...mockStore.vendorMe, ...data };
  return mockStore.vendorMe;
};

export const startOnboarding = async () => {
  await mockDelay();
  return { onboardingId: mockStore.onboarding.onboardingId };
};

export const getOnboardingDraft = async () => {
  await mockDelay();
  return mockStore.onboarding;
};

export const saveStep1Categories = async (onboardingId, categories) => {
  await mockDelay();
  return { onboardingId, categories };
};

export const saveStep2BusinessDetails = async (onboardingId, data) => {
  await mockDelay();
  Object.assign(mockStore.vendorMe, data);
  return { onboardingId, ...data };
};

export const saveStep3Verification = async (onboardingId, data) => {
  await mockDelay();
  return { onboardingId, ...data };
};

export const sendOnboardingOTP = async (onboardingId) => {
  await mockDelay();
  return { otpSessionId: mockStore.onboarding.otpSessionId, onboardingId };
};

export const verifyOnboardingOTP = async (onboardingId, otpSessionId, code) => {
  await mockDelay();
  if (code !== '123456' && code.length !== 6) throw new Error('Invalid OTP');
  return { verified: true, onboardingId, otpSessionId };
};

export const submitOnboardingForReview = async (onboardingId) => {
  await mockDelay();
  return { onboardingId, status: 'PENDING_REVIEW' };
};

export const getOnboardingStatus = async () => {
  await mockDelay();
  return { status: 'PENDING_REVIEW' };
};

export const getVendorMenu = async () => {
  await mockDelay();
  return clone(mockStore.menuItems);
};

export const addMenuItem = async (data) => {
  await mockDelay();
  const item = { id: genId('menu'), _id: genId('menu'), isAvailable: true, ...data };
  mockStore.menuItems.push(item);
  return item;
};

export const updateMenuItem = async (menuItemId, data) => {
  await mockDelay();
  const idx = mockStore.menuItems.findIndex((m) => m.id === menuItemId || m._id === menuItemId);
  if (idx === -1) throw new Error('Menu item not found');
  mockStore.menuItems[idx] = { ...mockStore.menuItems[idx], ...data };
  return mockStore.menuItems[idx];
};

export const deleteMenuItem = async (menuItemId) => {
  await mockDelay();
  mockStore.menuItems = mockStore.menuItems.filter(
    (m) => m.id !== menuItemId && m._id !== menuItemId
  );
  return { deleted: true };
};

export const listVendorOrders = async () => {
  await mockDelay();
  return clone(mockStore.orders);
};

export const getVendorOrder = async (orderId) => {
  await mockDelay();
  const order = mockStore.orders.find((o) => o.id === orderId || o._id === orderId);
  if (!order) throw new Error('Order not found');
  return clone(order);
};

export const updateOrderStatus = async (orderId, status) => {
  await mockDelay();
  const order = mockStore.orders.find((o) => o.id === orderId || o._id === orderId);
  if (!order) throw new Error('Order not found');
  order.status = status;
  return clone(order);
};

export const getVendorDashboardStats = async () => {
  await mockDelay();
  return clone(mockStore.dashboardStats);
};

export const getAnalyticsOverview = async () => {
  await mockDelay();
  return clone(MOCK_ANALYTICS);
};

export const getVendorPayments = async () => {
  await mockDelay();
  return clone(MOCK_PAYMENTS);
};

export const getVendorNotifications = async () => {
  await mockDelay();
  return clone(mockStore.notifications);
};

export const createShop = async (data) => {
  await mockDelay();
  mockStore.shop = { ...mockStore.shop, ...data };
  return mockStore.shop;
};

export const updateShop = async (shopId, data) => {
  await mockDelay();
  mockStore.shop = { ...mockStore.shop, id: shopId, ...data };
  return mockStore.shop;
};

export const uploadShopPicture = async () => {
  await mockDelay(500);
  return { pictureUrl: 'https://res.cloudinary.com/mock/shop.jpg' };
};

export const submitShopForApproval = async () => {
  await mockDelay();
  return { status: 'PENDING' };
};

export const getShopById = async (shopId) => {
  await mockDelay();
  return { ...mockStore.shop, id: shopId };
};

export const listShops = async () => {
  await mockDelay();
  return [clone(mockStore.shop)];
};

export const listNearbyShops = async () => listShops();
export const saveShop = async () => ({ saved: true });
export const unsaveShop = async () => ({ saved: false });

export const getProductsUnderShop = async () => {
  await mockDelay();
  return clone(mockStore.menuItems);
};

export const getMyShops = async () => {
  await mockDelay();
  return [clone(mockStore.shop)];
};

// Products (alias menu items in mock mode)
export const createProduct = addMenuItem;
export const updateProduct = updateMenuItem;
export const deleteProduct = deleteMenuItem;
export const getProductById = getVendorOrder;
export const listProductsByShop = async () => clone(mockStore.menuItems);
export const filterProductsByCategory = async (_shopId, category) =>
  mockStore.menuItems.filter((m) => m.category === category);
export const searchProductsByName = async (_name) => clone(mockStore.menuItems);
export const getProductCategories = async () => MOCK_VENDOR_CATEGORIES;

export const getPresignedUploadUrl = async (fileName, contentType, folder) => {
  await mockDelay();
  return {
    uploadUrl: 'https://api.cloudinary.com/v1_1/mock/upload',
    apiKey: 'mock_key',
    timestamp: String(Math.floor(Date.now() / 1000)),
    signature: 'mock_signature',
    folder,
    publicId: fileName,
  };
};

function buildVendorOnboardingApi() {
  return {
    start: async () => ({ success: true, data: await startOnboarding() }),
    step1: async (id, cats) => ({ success: true, data: await saveStep1Categories(id, cats) }),
    step2: async (id, body) => ({ success: true, data: await saveStep2BusinessDetails(id, body) }),
    step3: async (id, body) => ({ success: true, data: await saveStep3Verification(id, body) }),
    sendOtp: async (id, ch, target) => ({ success: true, data: await sendOnboardingOTP(id, ch, target) }),
    verifyOtp: async (id, sess, code) => ({ success: true, data: await verifyOnboardingOTP(id, sess, code) }),
    submit: async (id) => ({ success: true, data: await submitOnboardingForReview(id) }),
    uploadCacDocument: async (file) => ({ success: true, data: await uploadCACDocument(file) }),
  };
}

export const api = {
  auth: {
    register: async (data) => ({ success: true, data: await mockRegister(data, 'VENDOR') }),
    registerRider: async (data) => ({ success: true, data: await mockRegister(data, 'RIDER') }),
    login: async (email, _password) => ({ success: true, ...(await mockLogin(email)) }),
    sendOtp: async (email) => {
      await mockDelay();
      return { success: true, data: null, message: `OTP sent to ${email}` };
    },
    verifyOtp: async (email, otp) => {
      await mockDelay();
      if (otp.length !== 6) throw new Error('Invalid OTP');
      return { success: true, ...(await mockLogin(email)) };
    },
    verifyRegistrationOtp: async (email, otp) => {
      await mockDelay();
      if (otp.length !== 6) throw new Error('Invalid OTP');
      return {
        success: true,
        data: { token: 'mock-registration-token', tokenType: 'Bearer' },
        message: 'OTP verified. Use this token to complete your registration.',
      };
    },
    createAccount: async (_token, data) => ({
      success: true,
      data: await mockRegister(data, data.role || 'USER'),
    }),
    refresh: async () => MOCK_TOKENS,
    logout: async () => {
      clearTokens();
    },
    getProfile: async () => {
      await mockDelay();
      return getStoredUser();
    },
    updateProfile: async (data) => {
      await mockDelay();
      const user = { ...getStoredUser(), ...data };
      persistUser(user);
      return user;
    },
    getAddresses: async () => {
      await mockDelay();
      return [];
    },
    addAddress: async (data) => {
      await mockDelay();
      return { id: genId('addr'), ...data };
    },
    updateAddress: async (id, data) => {
      await mockDelay();
      return { id, ...data };
    },
    deleteAddress: async () => {
      await mockDelay();
      return { deleted: true };
    },
    changePassword: async () => {
      await mockDelay();
      return { success: true };
    },
    saveTokens,
    clearTokens,
    isAuthenticated: checkAuthenticated,
  },

  vendor: {
    submitProfile: submitVendorProfile,
    updateProfile: updateVendorProfile,
    getProfile: getVendorProfile,
    getMe: getVendorMe,
    updateMe: updateVendorMe,
    uploadCacDocument: uploadCACDocument,
    verifyBusinessNumber,
    verifySettlementAccount,
    createPaystackSubaccount,
    orders: {
      list: listVendorOrders,
      get: getVendorOrder,
      updateStatus: updateOrderStatus,
    },
    menu: {
      list: getVendorMenu,
      add: addMenuItem,
      update: updateMenuItem,
      delete: deleteMenuItem,
    },
    analytics: {
      overview: getAnalyticsOverview,
    },
    payments: {
      list: getVendorPayments,
    },
    notifications: {
      list: getVendorNotifications,
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
    },
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
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
    getById: async (id) => {
      await mockDelay();
      const item = mockStore.menuItems.find((m) => m.id === id || m._id === id);
      if (!item) throw new Error('Product not found');
      return clone(item);
    },
    listByShop: listProductsByShop,
    filterByCategory: filterProductsByCategory,
    search: searchProductsByName,
    getCategories: async () => {
      await mockDelay();
      return MOCK_VENDOR_CATEGORIES;
    },
  },

  uploads: {
    getPresignedUrl: getPresignedUploadUrl,
  },

  reference: {
    getVendorCategories: async () => {
      await mockDelay();
      return MOCK_VENDOR_CATEGORIES;
    },
    getCountryCodes: async () => {
      await mockDelay();
      return MOCK_COUNTRY_CODES;
    },
  },

  admin: {
    vendors: {
      listPending: async () => {
        await mockDelay();
        return [];
      },
      getDetails: async () => ({}),
      verifyBusinessNumber: async () => ({ verified: true }),
      approve: async () => ({ approved: true }),
      reject: async () => ({ rejected: true }),
    },
    shops: {
      listPending: async () => {
        await mockDelay();
        return [];
      },
      approve: async () => ({ approved: true }),
      reject: async () => ({ rejected: true }),
      suspend: async () => ({ suspended: true }),
    },
  },

  vendorOnboarding: buildVendorOnboardingApi(),
};

/** No-op client — use `api` in mock mode, not raw axios */
export const apiClient = {
  get: async () => {
    throw new Error('apiClient is disabled in MOCK_VIEW mode. Use `api` from @/lib/api instead.');
  },
  post: async () => {
    throw new Error('apiClient is disabled in MOCK_VIEW mode. Use `api` from @/lib/api instead.');
  },
  put: async () => {
    throw new Error('apiClient is disabled in MOCK_VIEW mode. Use `api` from @/lib/api instead.');
  },
  patch: async () => {
    throw new Error('apiClient is disabled in MOCK_VIEW mode. Use `api` from @/lib/api instead.');
  },
  delete: async () => {
    throw new Error('apiClient is disabled in MOCK_VIEW mode. Use `api` from @/lib/api instead.');
  },
};

export const invalidateApiCache = () => {};

export const mockApi = api;
