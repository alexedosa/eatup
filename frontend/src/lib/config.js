/**
 * App configuration — driven by environment variables.
 *
 * NEXT_PUBLIC_MOCK_VIEW=true  → use in-memory mock API (no backend required)
 * NEXT_PUBLIC_MOCK_VIEW=false → call the real EatUp backend
 */

export const MOCK_VIEW = process.env.NEXT_PUBLIC_MOCK_VIEW === 'true';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://eatup-backend-byng.onrender.com/api/v1';

/** Rider mobile app deep-link / store URL shown after web signup */
export const RIDER_APP_URL =
  process.env.NEXT_PUBLIC_RIDER_APP_URL || 'https://eatup.app/download';

export const isMockMode = () => MOCK_VIEW;
