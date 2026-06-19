import { apiClient } from './api/client';

/**
 * Gets a presigned upload URL from the backend.
 * 
 * @param {string} fileName - Name of the file
 * @param {string} contentType - MIME type of the file
 * @param {string} folder - Destination folder ("vendor-verification", "shop-pictures", "product-images")
 * @returns {Promise<Object>} Presigned upload details
 */
export const getPresignedUploadUrl = async (fileName, contentType, folder) => {
  const response = await apiClient.post('/uploads/presign', { fileName, contentType, folder });
  return response.data.data;
};

/**
 * Example usage pattern for uploading to Cloudinary:
 * 
 * const details = await getPresignedUploadUrl(file.name, file.type, "product-images");
 * 
 * const formData = new FormData();
 * formData.append("file", file);
 * formData.append("api_key", details.apiKey);
 * formData.append("timestamp", details.timestamp);
 * formData.append("signature", details.signature);
 * formData.append("folder", details.folder);
 * formData.append("public_id", details.publicId);
 * 
 * const res = await fetch(details.uploadUrl, { method: "POST", body: formData });
 * const cloudData = await res.json();
 * const publicUrl = cloudData.secure_url;
 */
