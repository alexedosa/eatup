import { apiClient } from './api/client';

/** Returns saved payment methods for the current user. */
export const getPaymentMethods = async () => {
  const response = await apiClient.get('/payments/methods');
  return response.data.data;
};

/**
 * Initiate a payment (step 1 of Paystack flow).
 * @param {{ orderId, paymentMethod, cardId?, walletId?, paymentSource? }} data
 */
export const initiatePayment = async (data) => {
  const response = await apiClient.post('/payments/initiate', data);
  return response.data.data;
};

/**
 * Initialize a payment (alternative initiation endpoint).
 * @param {{ orderId, paymentMethod, cardId?, walletId?, paymentSource? }} data
 */
export const initializePayment = async (data) => {
  const response = await apiClient.post('/payments/initialize', data);
  return response.data.data;
};

/**
 * @param {string} paymentId
 * @param {string} transactionReference
 */
export const confirmPayment = async (paymentId, transactionReference) => {
  const response = await apiClient.post('/payments/confirm', { paymentId, transactionReference });
  return response.data.data;
};

/**
 * @param {string} paymentId
 * @param {string} transactionReference
 */
export const verifyPayment = async (paymentId, transactionReference) => {
  const response = await apiClient.post('/payments/verify', { paymentId, transactionReference });
  return response.data.data;
};

/**
 * Customer payment history.
 * @param {{ page?, size? }} params
 */
export const getPaymentHistory = async (params = {}) => {
  const response = await apiClient.get('/payments', { params });
  return response.data.data;
};
