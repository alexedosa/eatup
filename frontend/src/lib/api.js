/**
 * API barrel – all imports from @/lib/api resolve here.
 *
 * This file is a thin re-export of src/lib/api/index.js, which composes
 * domain service modules. Keeping this shim
 * ensures Node/webpack's file-before-folder resolution still lands on the
 * correct barrel rather than the api/ folder's index.
 *
 * Do not add business logic here – put it in the appropriate service module:
 *   src/lib/authService.js          – auth & token helpers
 *   src/lib/api/vendorService.js    – vendor profile, onboarding, dashboard
 *   src/lib/api/shopService.js      – shop CRUD, pictures, nearby
 *   src/lib/productsService.js      – product CRUD, search
 *   src/lib/adminService.js         – admin moderation
 *   src/lib/referenceService.js     – categories, country codes
 *   src/lib/uploadsService.js       – presigned Cloudinary uploads
 */
export * from './api/index';
