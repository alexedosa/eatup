import { apiClient } from './api/client';

/** @returns {Promise<Object>} The current cart */
export const getCart = async () => {
  const response = await apiClient.get('/cart');
  return response.data.data;
};

/**
 * @param {{ productId, shopId, quantity, variantId?, notes? }} data
 */
export const addCartItem = async (data) => {
  const response = await apiClient.post('/cart/items', data);
  return response.data.data;
};

/**
 * @param {string} cartItemId
 * @param {number} quantity
 */
export const updateCartItemQuantity = async (cartItemId, quantity) => {
  const response = await apiClient.patch(`/cart/items/${cartItemId}`, { quantity });
  return response.data.data;
};

/** @param {string} cartItemId */
export const removeCartItem = async (cartItemId) => {
  const response = await apiClient.delete(`/cart/items/${cartItemId}`);
  return response.data.data;
};

export const clearCart = async () => {
  const response = await apiClient.delete('/cart');
  return response.data.data;
};

/** @param {string} code - Coupon code */
export const applyCartCoupon = async (code) => {
  const response = await apiClient.post('/cart/coupon', { code });
  return response.data.data;
};

/**
 * @param {string} cartId
 * @param {Array<{ itemId, productId, shopId, quantity }>} cartItems
 */
export const validateCart = async (cartId, cartItems) => {
  const response = await apiClient.post('/cart/validate', { cartId, cartItems });
  return response.data.data;
};
