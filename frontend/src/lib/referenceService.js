import { apiClient } from './api/client';

/**
 * Fetches the list of vendor categories from the reference data.
 * No authentication required.
 * 
 * @returns {Promise<string[]>} Array of category strings
 */
export const getVendorCategories = async () => {
  const response = await apiClient.get('/reference/vendor-categories');
  return response.data.data;
};

/**
 * Fetches the list of country codes and flags.
 * No authentication required.
 * 
 * @returns {Promise<Object[]>} Array of country objects { code, country, flag }
 */
export const getCountryCodes = async () => {
  const response = await apiClient.get('/reference/country-codes');
  return response.data.data;
};
