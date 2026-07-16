import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

const root = process.cwd()

function loadVendorAccessControl() {
  const filePath = path.join(root, 'src/lib/vendorAccessControl.js')
  const source = fs.readFileSync(filePath, 'utf8')
  const transformed = `${source.replaceAll('export const ', 'const ').replaceAll('export function ', 'function ')}
module.exports = {
  VENDOR_ACCESS_STATE,
  normalizeRole,
  isVendorRole,
  getVendorUserId,
  mergeVendorAccessFields,
  evaluateVendorDashboardAccess,
  buildVendorSupportMessage,
};`

  const sandbox = { module: { exports: {} }, exports: {} }
  vm.runInNewContext(transformed, sandbox, { filename: filePath })
  return sandbox.module.exports
}

const {
  VENDOR_ACCESS_STATE,
  evaluateVendorDashboardAccess,
  mergeVendorAccessFields,
  buildVendorSupportMessage,
} = loadVendorAccessControl()

const vendor = (overrides) => ({
  id: 'user_123',
  role: 'VENDOR',
  ...overrides,
})

assert.equal(
  evaluateVendorDashboardAccess(vendor({ isVendorVerified: false, haveShop: false })),
  VENDOR_ACCESS_STATE.APPROVAL_PENDING,
  'unverified vendor with no shop is denied dashboard access'
)

assert.equal(
  evaluateVendorDashboardAccess(vendor({ isVendorVerified: false, haveShop: true })),
  VENDOR_ACCESS_STATE.APPROVAL_PENDING,
  'unverified vendor with a shop is still denied dashboard access'
)

assert.equal(
  evaluateVendorDashboardAccess(vendor({ isVendorVerified: true, haveShop: false })),
  VENDOR_ACCESS_STATE.SHOP_REQUIRED,
  'verified vendor without a shop requires shop creation'
)

assert.equal(
  evaluateVendorDashboardAccess(vendor({ isVendorVerified: true, haveShop: true })),
  VENDOR_ACCESS_STATE.ALLOWED,
  'verified vendor with a shop enters dashboard'
)

assert.equal(
  evaluateVendorDashboardAccess({ id: 'user_456', role: 'USER' }),
  VENDOR_ACCESS_STATE.LOGIN_REQUIRED,
  'non-vendor vendor-route handling remains role protected'
)

assert.equal(
  evaluateVendorDashboardAccess(vendor({ haveShop: true })),
  VENDOR_ACCESS_STATE.APPROVAL_PENDING,
  'missing verification flag cannot grant access from stale persisted data'
)

assert.equal(
  evaluateVendorDashboardAccess(vendor({ isVendorVerified: true })),
  VENDOR_ACCESS_STATE.SHOP_REQUIRED,
  'missing shop flag cannot grant dashboard access'
)

const mergedAfterLogin = mergeVendorAccessFields(
  vendor({ isVendorVerified: false, haveShop: false }),
  { id: 'user_123', role: 'VENDOR', firstName: 'Ada' }
)
assert.equal(mergedAfterLogin.isVendorVerified, false, 'login verification flag is preserved when profile omits it')
assert.equal(mergedAfterLogin.haveShop, false, 'login shop flag is preserved when profile omits it')

const mergedAfterCreate = mergeVendorAccessFields(
  vendor({ isVendorVerified: true, haveShop: false }),
  { haveShop: true }
)
assert.equal(
  evaluateVendorDashboardAccess(mergedAfterCreate),
  VENDOR_ACCESS_STATE.ALLOWED,
  'successful shop creation updates vendor state and grants access'
)

const supportMessage = buildVendorSupportMessage({
  id: 'user_123',
  accessToken: 'secret-access-token',
  refreshToken: 'secret-refresh-token',
})
assert.match(supportMessage, /EatUp Support/)
assert.match(supportMessage, /user_123/)
assert.doesNotMatch(supportMessage, /secret-access-token|secret-refresh-token/)

const layoutSource = fs.readFileSync(path.join(root, 'src/app/vendor/layout.jsx'), 'utf8')
assert.match(layoutSource, /VendorDashboardGate/, 'vendor layout enforces guard on direct route navigation and refresh')

const gateSource = fs.readFileSync(path.join(root, 'src/components/vendor/shared/VendorDashboardGate.jsx'), 'utf8')
assert.match(gateSource, /logoutCurrentUser/, 'approval close uses existing logout mechanism')
assert.match(gateSource, /router\.replace\('\/auth\/login\?role=vendor'\)/, 'approval close redirects to login')
assert.match(gateSource, /mandatory/, 'shop creation flow is mandatory')
assert.match(gateSource, /initialScreen="form"/, 'verified vendor without shop sees the shop form immediately')
assert.match(gateSource, /api\.auth\.getProfile/, 'protected route restoration refetches authenticated profile')

const overlaySource = fs.readFileSync(path.join(root, 'src/components/onboarding/OnboardingOverlay.jsx'), 'utf8')
assert.match(overlaySource, /if \(mandatory\) return/, 'mandatory shop modal blocks Escape dismissal')
assert.match(overlaySource, /screen !== 'success' && !mandatory/, 'mandatory shop modal hides close button')

const shopFormSource = fs.readFileSync(path.join(root, 'src/components/onboarding/ShopCreationForm.jsx'), 'utf8')
assert.match(shopFormSource, /if \(isCreating\) return/, 'duplicate shop submissions are prevented while creating')
assert.match(shopFormSource, /createError/, 'failed shop creation remains visible with an error')

console.log('vendor access control tests passed')
