export const VENDOR_ACCESS_STATE = {
  LOGIN_REQUIRED: 'login_required',
  APPROVAL_PENDING: 'approval_pending',
  SHOP_REQUIRED: 'shop_required',
  ALLOWED: 'allowed',
}

export function normalizeRole(role) {
  return typeof role === 'string' ? role.trim().toUpperCase() : ''
}

export function isVendorRole(user) {
  return normalizeRole(user?.role) === 'VENDOR'
}

export function getVendorUserId(user) {
  return user?.userId || user?.id || user?._id || ''
}

export function mergeVendorAccessFields(baseUser, latestUser) {
  const merged = {
    ...(baseUser || {}),
    ...(latestUser || {}),
  }

  if (typeof latestUser?.isVendorVerified !== 'boolean' && typeof baseUser?.isVendorVerified === 'boolean') {
    merged.isVendorVerified = baseUser.isVendorVerified
  }

  if (typeof latestUser?.haveShop !== 'boolean' && typeof baseUser?.haveShop === 'boolean') {
    merged.haveShop = baseUser.haveShop
  }

  return merged
}

export function evaluateVendorDashboardAccess(user) {
  if (!user || !isVendorRole(user)) {
    return VENDOR_ACCESS_STATE.LOGIN_REQUIRED
  }

  if (user.isVendorVerified !== true) {
    return VENDOR_ACCESS_STATE.APPROVAL_PENDING
  }

  if (user.haveShop !== true) {
    return VENDOR_ACCESS_STATE.SHOP_REQUIRED
  }

  return VENDOR_ACCESS_STATE.ALLOWED
}

export function buildVendorSupportMessage(user) {
  const userId = getVendorUserId(user) || 'unknown'
  return `Hello EatUp Support, my vendor account is still awaiting verification. Please help me check the approval status of my account. My user ID is ${userId}.`
}
