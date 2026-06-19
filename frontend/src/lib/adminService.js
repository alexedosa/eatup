import { apiClient } from './api/client';

/**
 * Helper to verify if the current user has ADMIN privileges.
 * @throws {Error} if not an admin
 */
const ensureAdmin = () => {
  if (typeof window !== 'undefined') {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'ADMIN') {
      throw new Error('Unauthorized: Admin role required for this action.');
    }
  }
};

// Vendor Administration
export const listPendingVendors = async () => {
  ensureAdmin();
  const response = await apiClient.get('/vendor/admin/vendors');
  return response.data.data;
};

export const getVendorSettlementDetails = async (vendorProfileId) => {
  ensureAdmin();
  const response = await apiClient.get(`/vendor/admin/vendors/${vendorProfileId}`);
  return response.data.data;
};

export const verifyVendorBusinessNumber = async (vendorProfileId) => {
  ensureAdmin();
  const response = await apiClient.post(`/vendor/admin/vendors/${vendorProfileId}/verify-business-number`);
  return response.data.data;
};

export const approveVendor = async (vendorProfileId) => {
  ensureAdmin();
  const response = await apiClient.post(`/vendor/admin/vendors/${vendorProfileId}/approve`);
  return response.data.data;
};

export const rejectVendor = async (vendorProfileId, reason) => {
  ensureAdmin();
  const response = await apiClient.post(`/vendor/admin/vendors/${vendorProfileId}/reject`, { reason });
  return response.data.data;
};

// Shop Administration
export const listPendingShops = async (status = 'PENDING') => {
  ensureAdmin();
  const query = new URLSearchParams({ status }).toString();
  const response = await apiClient.get(`/shops/admin?${query}`);
  return response.data.data;
};

export const approveShop = async (shopId) => {
  ensureAdmin();
  const response = await apiClient.post(`/shops/admin/${shopId}/approve`);
  return response.data.data;
};

export const rejectShop = async (shopId, reason) => {
  ensureAdmin();
  const response = await apiClient.post(`/shops/admin/${shopId}/reject`, { reason });
  return response.data.data;
};

export const suspendShop = async (shopId, reason) => {
  ensureAdmin();
  const response = await apiClient.post(`/shops/admin/${shopId}/suspend`, { reason });
  return response.data.data;
};
