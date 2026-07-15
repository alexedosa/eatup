import crypto from 'crypto'
import { getCloudinaryConfig } from '@/lib/cloudinaryConfig'

function signCloudinaryParams(params, apiSecret) {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&')

  return crypto.createHash('sha1').update(`${toSign}${apiSecret}`).digest('hex')
}

export async function POST(request) {
  try {
    const { cloudName, apiKey, apiSecret, isConfigured } = getCloudinaryConfig()

    if (!isConfigured) {
      return Response.json(
        {
          success: false,
          message:
            'Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to frontend/.env.local, then restart the dev server.',
        },
        { status: 500 }
      )
    }

    const incoming = await request.formData()
    const file = incoming.get('file')
    const folder = incoming.get('folder')?.toString() || 'product-images'

    if (!file || typeof file === 'string') {
      return Response.json(
        { success: false, message: 'No image file provided.' },
        { status: 400 }
      )
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { success: false, message: 'Only JPEG, PNG, and WebP images are allowed.' },
        { status: 400 }
      )
    }

    if (file.size > 5 * 1024 * 1024) {
      return Response.json(
        { success: false, message: 'Image must be 5MB or smaller.' },
        { status: 400 }
      )
    }

    const timestamp = Math.round(Date.now() / 1000)
    const signature = signCloudinaryParams({ folder, timestamp }, apiSecret)

    const uploadForm = new FormData()
    uploadForm.append('file', file)
    uploadForm.append('api_key', apiKey)
    uploadForm.append('timestamp', String(timestamp))
    uploadForm.append('signature', signature)
    uploadForm.append('folder', folder)

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: uploadForm }
    )

    const cloudinaryData = await cloudinaryResponse.json()

    if (!cloudinaryResponse.ok) {
      return Response.json(
        {
          success: false,
          message: cloudinaryData?.error?.message || 'Cloudinary upload failed.',
        },
        { status: cloudinaryResponse.status }
      )
    }

    return Response.json({
      success: true,
      data: {
        url: cloudinaryData.secure_url,
        publicId: cloudinaryData.public_id,
      },
    })
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message || 'Unable to upload image.',
      },
      { status: 500 }
    )
  }
}
