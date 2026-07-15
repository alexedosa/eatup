import { loadEnvConfig } from '@next/env'

let envLoaded = false

function ensureEnvLoaded() {
  if (envLoaded || typeof window !== 'undefined') return
  loadEnvConfig(process.cwd())
  envLoaded = true
}

export function getCloudinaryConfig() {
  ensureEnvLoaded()

  const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    ''
  const apiKey = process.env.CLOUDINARY_API_KEY || ''
  const apiSecret = process.env.CLOUDINARY_API_SECRET || ''

  return {
    cloudName,
    apiKey,
    apiSecret,
    isConfigured: Boolean(cloudName && apiKey && apiSecret),
  }
}
