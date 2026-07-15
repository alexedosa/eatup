import { apiClient } from './api/client';
import { normalizeProductsList } from './productUtils';

export const createProduct = async (data) => {
  const response = await apiClient.post('/products', data);
  return response.data.data;
};

export const updateProduct = async (productId, data) => {
  const response = await apiClient.put(`/products/${productId}`, data);
  return response.data.data;
};

export const deleteProduct = async (productId) => {
  const response = await apiClient.delete(`/products/${productId}`);
  return response.data.data;
};

export const getProductById = async (productId) => {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data.data;
};

export const listProductsByShop = async (shopId, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = `/products/shop/${shopId}${query ? `?${query}` : ''}`;
  const response = await apiClient.get(endpoint);
  return normalizeProductsList(response.data.data);
};

export const filterProductsByCategory = async (shopId, category) => {
  const response = await apiClient.get(`/products/shop/${shopId}/category/${category}`);
  return response.data.data;
};

export const searchProductsByName = async (name, shopId) => {
  const query = new URLSearchParams({ name, ...(shopId && { shopId }) }).toString();
  const response = await apiClient.get(`/products/search?${query}`);
  return response.data.data;
};

export const getProductCategories = async () => {
  const response = await apiClient.get('/reference/vendor-categories');
  return response.data.data;
};
