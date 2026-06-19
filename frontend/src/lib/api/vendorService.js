import { apiClient, validateFile } from './client';

// ─── Pre-approval vendor profile ─────────────────────────────

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
  validateFile(file, {
    maxSize: 10 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
  });
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post('/vendor/profile/cac-document', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        onProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
      }
    },
  });
  return response.data.data;
};

export const verifyBusinessNumber = async () => {
  const response = await apiClient.post('/vendor/profile/verify-business-number');
  return response.data.data;
};

export const verifySettlementAccount = async (bankCode, accountNumber) => {
  const response = await apiClient.post('/vendor/profile/verify-settlement-account', {
    bankCode,
    accountNumber,
  });
  return response.data.data;
};

export const createPaystackSubaccount = async () => {
  const response = await apiClient.post('/vendor/profile/paystack-subaccount');
  return response.data.data;
};

// ─── Post-approval vendor profile (/vendor/me) ───────────────

export const getVendorMe = async () => {
  const response = await apiClient.get('/vendor/me');
  return response.data.data;
};

export const updateVendorMe = async (data) => {
  const response = await apiClient.patch('/vendor/me', data);
  return response.data.data;
};

// ─── Onboarding ──────────────────────────────────────────────

export const startOnboarding = async () => {
  const response = await apiClient.post('/vendor/onboarding/start');
  return response.data.data;
};

export const getOnboardingDraft = async () => {
  const response = await apiClient.get('/vendor/onboarding/me');
  return response.data.data;
};

export const saveStep1Categories = async (onboardingId, categories) => {
  const response = await apiClient.patch('/vendor/onboarding/step-1', {
    onboardingId,
    categories,
  });
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
  const response = await apiClient.post('/vendor/onboarding/otp/send', {
    onboardingId,
    channel,
    target,
  });
  return response.data.data;
};

export const verifyOnboardingOTP = async (onboardingId, otpSessionId, code) => {
  const response = await apiClient.post('/vendor/onboarding/otp/verify', {
    onboardingId,
    otpSessionId,
    code,
  });
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

// ─── Menu (/vendor/menu) ─────────────────────────────────────

export const getVendorMenu = async () => {
  const response = await apiClient.get('/vendor/menu');
  return response.data.data;
};

export const addMenuItem = async (data) => {
  const response = await apiClient.post('/vendor/menu/items', data);
  return response.data.data;
};

export const updateMenuItem = async (menuItemId, data) => {
  const response = await apiClient.patch(`/vendor/menu/items/${menuItemId}`, data);
  return response.data.data;
};

export const deleteMenuItem = async (menuItemId) => {
  const response = await apiClient.delete(`/vendor/menu/items/${menuItemId}`);
  return response.data.data;
};

// ─── Orders (/vendor/orders) ─────────────────────────────────

export const listVendorOrders = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query ? `/vendor/orders?${query}` : '/vendor/orders';
  const response = await apiClient.get(url);
  return response.data.data;
};

export const getVendorOrder = async (orderId) => {
  const response = await apiClient.get(`/vendor/orders/${orderId}`);
  return response.data.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await apiClient.patch(`/vendor/orders/${orderId}/status`, { status });
  return response.data.data;
};

// ─── Dashboard / analytics / payments / notifications ────────

export const getVendorDashboardStats = async () => {
  const response = await apiClient.get('/vendor/dashboard/stats');
  return response.data.data;
};

export const getAnalyticsOverview = async (range = '7d') => {
  const response = await apiClient.get('/vendor/analytics/overview', { params: { range } });
  return response.data.data;
};

export const getVendorPayments = async (params = {}) => {
  const response = await apiClient.get('/vendor/payments', { params });
  return response.data.data;
};

export const getVendorNotifications = async () => {
  const response = await apiClient.get('/vendor/notifications');
  return response.data.data;
};
