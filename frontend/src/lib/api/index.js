import { MOCK_VIEW } from '../config';
import * as real from './realApi';
import * as mock from '../mockApi';

const src = MOCK_VIEW ? mock : real;

export const api = src.api;
export const apiClient = src.apiClient;
export const invalidateApiCache = src.invalidateApiCache;

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
} = src;

export { MOCK_VIEW, API_BASE_URL, RIDER_APP_URL, isMockMode } from '../config';
