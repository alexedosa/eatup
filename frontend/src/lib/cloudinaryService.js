import { api } from '@/lib/api'

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']

function validateImageFile(file) {
  if (!file) throw new Error('No image file selected.')
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Only JPEG, PNG, and WebP images are allowed.')
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Image must be 5MB or smaller.')
  }
}

async function uploadViaNextRoute(file, folder = 'product-images') {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const response = await fetch('/api/cloudinary/upload', {
    method: 'POST',
    body: formData,
  })

  const payload = await response.json()
  if (!response.ok || !payload?.success) {
    throw new Error(payload?.message || 'Failed to upload image.')
  }

  return payload.data.url
}

async function uploadViaPresignedUrl(file, folder = 'product-images') {
  const details = await api.uploads.getPresignedUrl(file.name, file.type, folder)

  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', details.apiKey)
  formData.append('timestamp', details.timestamp)
  formData.append('signature', details.signature)
  formData.append('folder', details.folder)
  formData.append('public_id', details.publicId)

  const response = await fetch(details.uploadUrl, {
    method: 'POST',
    body: formData,
  })

  const cloudData = await response.json()
  if (!response.ok) {
    throw new Error(cloudData?.error?.message || 'Cloudinary upload failed.')
  }

  return cloudData.secure_url
}

export async function uploadImageToCloudinary(file, folder = 'product-images') {
  validateImageFile(file)

  try {
    return await uploadViaPresignedUrl(file, folder)
  } catch (presignError) {
    try {
      return await uploadViaNextRoute(file, folder)
    } catch (nextRouteError) {
      throw new Error(nextRouteError.message || presignError.message || 'Failed to upload image.')
    }
  }
}
