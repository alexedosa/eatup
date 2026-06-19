import { apiClient, validateFile } from './client';

export const createShop = async (data) => {
  const response = await apiClient.post('/shops', data);
  return response.data.data;
};

export const updateShop = async (shopId, data) => {
  const response = await apiClient.put(`/shops/${shopId}`, data);
  return response.data.data;
};

export const uploadShopPicture = async (shopId, file, onProgress) => {
  validateFile(file);
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post(`/shops/${shopId}/picture`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        onProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
      }
    },
  });
  return response.data.data;
};

export const submitShopForApproval = async (shopId) => {
  const response = await apiClient.post(`/shops/${shopId}/submit`);
  return response.data.data;
};

export const getShopById = async (shopId) => {
  const response = await apiClient.get(`/shops/${shopId}`);
  return response.data.data;
};

export const listShops = async (params = {}) => {
  const query = new URLSearchParams({ page: 1, limit: 20, ...params }).toString();
  const response = await apiClient.get(`/shops?${query}`);
  return response.data.data;
};

export const listNearbyShops = async (lat, lng, radius = 5000) => {
  const query = new URLSearchParams({ lat, lng, radius }).toString();
  const response = await apiClient.get(`/shops/nearby?${query}`);
  return response.data.data;
};

export const saveShop = async (shopId) => {
  const response = await apiClient.post(`/shops/${shopId}/save`);
  return response.data.data;
};

export const unsaveShop = async (shopId) => {
  const response = await apiClient.delete(`/shops/${shopId}/save`);
  return response.data.data;
};

export const getProductsUnderShop = async (shopId, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = `/shops/${shopId}/products${query ? `?${query}` : ''}`;
  const response = await apiClient.get(endpoint);
  return response.data.data;
};

export const getMyShops = async () => {
  const response = await apiClient.get('/shops/my');
  return response.data.data;
};
