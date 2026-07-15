import { apiClient } from './api/client';

/** Returns the authenticated rider's profile. */
export const getRiderMe = async () => {
  const response = await apiClient.get('/rider/me');
  return response.data.data;
};

/**
 * Toggle the rider's online/offline availability.
 * @param {boolean} available
 */
export const updateRiderAvailability = async (available) => {
  const response = await apiClient.patch('/rider/me/availability', { available });
  return response.data.data;
};

/**
 * List orders available for pickup by the rider.
 * @param {{ page?, size? }} params
 */
export const getAvailableRiderOrders = async (params = {}) => {
  const response = await apiClient.get('/rider/orders/available', { params });
  return response.data.data;
};

/** @param {string} orderId */
export const acceptRiderOrder = async (orderId) => {
  const response = await apiClient.post(`/rider/orders/${orderId}/accept`);
  return response.data.data;
};

/**
 * @param {string} orderId
 * @param {string} status
 */
export const updateRiderOrderStatus = async (orderId, status) => {
  const response = await apiClient.patch(`/rider/orders/${orderId}/status`, { status });
  return response.data.data;
};

/** @param {{ from?, to? }} params */
export const getRiderEarnings = async (params = {}) => {
  const response = await apiClient.get('/rider/earnings', { params });
  return response.data.data;
};
