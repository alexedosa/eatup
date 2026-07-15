import { apiClient } from './api/client';

/**
 * Place a new order.
 * @param {{ cartId, cartItems, shopId, deliveryAddress, paymentMethod, couponCode?, orderNotes?, deliveryInstructions?, tipAmount?, customerContact? }} data
 */
export const createOrder = async (data) => {
  const response = await apiClient.post('/orders', data);
  return response.data.data;
};

/**
 * List the authenticated customer's own orders.
 * @param {{ status?, page?, size? }} params
 */
export const getMyOrders = async (params = {}) => {
  const response = await apiClient.get('/orders/me', { params });
  return response.data.data;
};

/** @param {string} orderId */
export const getOrderById = async (orderId) => {
  const response = await apiClient.get(`/orders/${orderId}`);
  return response.data.data;
};

/**
 * Admin — list all orders.
 * @param {{ status?, page?, size? }} params
 */
export const listAllOrders = async (params = {}) => {
  const response = await apiClient.get('/orders', { params });
  return response.data.data;
};

/**
 * @param {string} orderId
 * @param {string} reason
 */
export const cancelOrder = async (orderId, reason) => {
  const response = await apiClient.post(`/orders/${orderId}/cancel`, { reason });
  return response.data.data;
};

/** @param {string} orderId */
export const getOrderStatus = async (orderId) => {
  const response = await apiClient.get(`/orders/${orderId}/status`);
  return response.data.data;
};

/** @param {string} orderId */
export const trackOrder = async (orderId) => {
  const response = await apiClient.get(`/orders/${orderId}/track`);
  return response.data.data;
};
