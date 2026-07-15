/**
 * App configuration — driven by environment variables.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://eatup-backend-byng.onrender.com/api/v1';

/** Rider mobile app deep-link / store URL shown after web signup */
export const RIDER_APP_URL =
  process.env.NEXT_PUBLIC_RIDER_APP_URL || 'https://eatup.app/download';
