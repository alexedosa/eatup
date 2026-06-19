import * as authActions from '../authService';
import * as productActions from '../productsService';
import * as uploadActions from '../uploadsService';
import * as referenceActions from '../referenceService';
import * as adminActions from '../adminService';
import * as vendorService from './vendorService';
import * as shopService from './shopService';
import { apiClient } from './client';

export { apiClient, invalidateApiCache } from './client';

export const {
  submitVendorProfile,
  updateVendorProfile,
  getVendorProfile,
  uploadCACDocument,
  verifyBusinessNumber,
  verifySettlementAccount,
  createPaystackSubaccount,
  getVendorMe,
  updateVendorMe,
  startOnboarding,
  getOnboardingDraft,
  saveStep1Categories,
  saveStep2BusinessDetails,
  saveStep3Verification,
  sendOnboardingOTP,
  verifyOnboardingOTP,
  submitOnboardingForReview,
  getOnboardingStatus,
  getVendorMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  listVendorOrders,
  getVendorOrder,
  updateOrderStatus,
  getVendorDashboardStats,
  getAnalyticsOverview,
  getVendorPayments,
  getVendorNotifications,
} = vendorService;

export const {
  createShop,
  updateShop,
  uploadShopPicture,
  submitShopForApproval,
  getShopById,
  listShops,
  listNearbyShops,
  saveShop,
  unsaveShop,
  getProductsUnderShop,
  getMyShops,
} = shopService;

function buildVendorOnboardingApi() {
  return {
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
  };
}

export const api = {
  auth: {
    register: authActions.registerVendor,
    registerRider: authActions.registerRider,
    login: authActions.login,
    sendOtp: authActions.sendOTP,
    verifyOtp: authActions.verifyOTP,
    verifyRegistrationOtp: authActions.verifyRegistrationOtp,
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
    },
  },

  vendorOnboarding: buildVendorOnboardingApi(),
};

export const realApi = api;
