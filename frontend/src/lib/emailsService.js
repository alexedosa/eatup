import { apiClient } from './api/client';

/**
 * Send a transactional email.
 * @param {{ from, to, subject, html }} data
 */
export const sendEmail = async ({ from, to, subject, html }) => {
  const response = await apiClient.post('/emails/send', { from, to, subject, html });
  return response.data.data;
};
