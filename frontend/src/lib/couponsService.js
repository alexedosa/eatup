import { apiClient } from './api/client';

/**
 * Create a new coupon (admin/vendor).
 * @param {{ code, discountType, discountValue, usageLimit?, expiresAt?, description? }} data
 */
export const createCoupon = async (data) => {
  const response = await apiClient.post('/coupons', data);
  return response.data.data;
};

/** @param {{ page?, size? }} params */
export const listCoupons = async (params = {}) => {
  const response = await apiClient.get('/coupons', { params });
  return response.data.data;
};

/** @param {string} couponId */
export const getCouponById = async (couponId) => {
  const response = await apiClient.get(`/coupons/${couponId}`);
  return response.data.data;
};

/** @param {string} couponCode */
export const getCouponByCode = async (couponCode) => {
  const response = await apiClient.get(`/coupons/code/${couponCode}`);
  return response.data.data;
};

/**
 * @param {string} couponId
 * @param {Object} data
 */
export const updateCoupon = async (couponId, data) => {
  const response = await apiClient.put(`/coupons/${couponId}`, data);
  return response.data.data;
};

/** @param {string} couponId */
export const deleteCoupon = async (couponId) => {
  const response = await apiClient.delete(`/coupons/${couponId}`);
  return response.data.data;
};

/** @param {string} couponId */
export const getCouponUsage = async (couponId) => {
  const response = await apiClient.get(`/coupons/${couponId}/usage`);
  return response.data.data;
};
