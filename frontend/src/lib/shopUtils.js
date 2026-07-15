import { DAYS } from '@/lib/profileUtils'
import { parseOpeningHoursFromApi } from '@/lib/shopFormUtils'

export function extractPaginatedContent(data) {
  if (!data) return []

  if (Array.isArray(data)) {
    return data.filter(Boolean)
  }

  if (Array.isArray(data.content)) {
    return data.content.filter(Boolean)
  }

  if (Array.isArray(data.items)) {
    return data.items.filter(Boolean)
  }

  if (Array.isArray(data.shops)) {
    return data.shops.filter(Boolean)
  }

  if (Array.isArray(data.data)) {
    return data.data.filter(Boolean)
  }

  if (Array.isArray(data.data?.content)) {
    return data.data.content.filter(Boolean)
  }

  if (typeof data === 'object' && (data._id || data.id || data.name)) {
    return [data]
  }

  return []
}

export function normalizeShopsList(response) {
  return extractPaginatedContent(response)
}

export function hasValidShop(shops) {
  return shops.some((shop) => shop && (shop._id || shop.id || shop.name))
}

export function getShopId(shop) {
  return shop?._id || shop?.id || null
}

export function parseAddressFromString(address = '') {
  if (!address) {
    return { city: '', state: '', country: '' }
  }

  const parts = address.split(',').map((part) => part.trim()).filter(Boolean)
  if (parts.length < 2) {
    return { city: '', state: '', country: '' }
  }

  return {
    city: parts.length >= 3 ? parts[parts.length - 3] : parts[parts.length - 2] || '',
    state: parts[parts.length - 2] || '',
    country: parts[parts.length - 1] || '',
  }
}

export function mapShopToProfile(shop, prev = {}) {
  if (!shop) return prev

  const addressParts = parseAddressFromString(shop.address)

  return {
    ...prev,
    storeId: getShopId(shop) || prev.storeId || '',
    storeName: shop.name ?? prev.storeName ?? '',
    storeEmail: shop.contactEmail ?? prev.storeEmail ?? '',
    storePhone: shop.contactPhone ?? prev.storePhone ?? '',
    website: shop.website ?? prev.website ?? '',
    description: shop.description ?? prev.description ?? '',
    storeImage: shop.profilePicture || shop.pictureUrl || prev.storeImage || '',
    address: {
      ...prev.address,
      street: shop.address || prev.address?.street || '',
      city: addressParts.city || prev.address?.city || '',
      state: addressParts.state || prev.address?.state || '',
      country: addressParts.country || prev.address?.country || '',
      postalCode: prev.address?.postalCode || '',
      coordinates:
        shop.latitude != null && shop.longitude != null
          ? { lat: Number(shop.latitude), lng: Number(shop.longitude) }
          : prev.address?.coordinates || { lat: 0, lng: 0 },
    },
    hours: shop.openingHours
      ? parseOpeningHoursFromApi(shop.openingHours)
      : prev.hours,
    social: {
      ...prev.social,
      ...(shop.socialMediaHandles || {}),
    },
    settings: {
      ...prev.settings,
      isAcceptingOrders: shop.isOpen ?? prev.settings?.isAcceptingOrders ?? false,
    },
  }
}

export function mapProfileHoursToApi(hours) {
  return DAYS.reduce((acc, day) => {
    const schedule = hours?.[day.id]
    if (schedule?.isOpen) {
      acc[day.id] = `${schedule.open}-${schedule.close}`
    }
    return acc
  }, {})
}
