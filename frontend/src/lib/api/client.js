import axios from 'axios';
import { API_BASE_URL } from '../config';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const pendingRequests = new Map();
const cache = new Map();
const CACHE_TTL = 3 * 60 * 1000;

const generateRequestKey = (method, url, config = {}) => {
  return `${method}:${url}:${JSON.stringify(config.params || {})}:${JSON.stringify(config.data || {})}`;
};

const CACHEABLE_GET =
  /\/dashboard\/stats|\/shops|\/products|\/vendor\/menu|\/vendor\/orders|\/vendor\/analytics/;

/** Public auth routes must not include a session Bearer token (backend returns 403). */
const PUBLIC_AUTH_PATHS = /^\/auth\/(register|login|send-otp|verify-otp)$/;

const isPublicAuthRequest = (url = '') => PUBLIC_AUTH_PATHS.test(url);

['get', 'post', 'put', 'delete', 'patch'].forEach((method) => {
  const original = apiClient[method].bind(apiClient);
  apiClient[method] = async (url, ...args) => {
    const config = args[method === 'get' || method === 'delete' ? 0 : 1] || {};
    const data = method === 'get' || method === 'delete' ? undefined : args[0];
    const key = generateRequestKey(method, url, { ...config, data });

    if (pendingRequests.has(key)) {
      return pendingRequests.get(key);
    }

    const promise = original(url, ...args).finally(() => {
      pendingRequests.delete(key);
    });

    pendingRequests.set(key, promise);
    return promise;
  };
});

apiClient.interceptors.request.use(
  (config) => {
    if (
      config.method?.toLowerCase() === 'get' &&
      CACHEABLE_GET.test(config.url || '')
    ) {
      const key = generateRequestKey(config.method, config.url, config);
      const cached = cache.get(key);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        config.adapter = () =>
          Promise.resolve({
            data: cached.data,
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
            request: {},
          });
        return config;
      }
    }

    if (typeof window !== 'undefined') {
      const url = config.url || '';
      const hasExplicitAuth = Boolean(config.headers?.Authorization);

      // Never attach (or keep) a session token on public signup/login routes.
      if (isPublicAuthRequest(url)) {
        if (config.headers?.Authorization) {
          delete config.headers.Authorization;
        }
      } else if (!hasExplicitAuth) {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    const { config } = response;
    if (
      config.method?.toLowerCase() === 'get' &&
      CACHEABLE_GET.test(config.url || '')
    ) {
      const key = generateRequestKey(config.method, config.url, config);
      cache.set(key, { data: response.data, timestamp: Date.now() });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken =
        typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;

      if (refreshToken && !window.location.pathname.includes('/auth/login')) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return apiClient(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
          const { accessToken: newToken, refreshToken: newRefreshToken } = res.data.data;

          localStorage.setItem('accessToken', newToken);
          if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

          apiClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          processQueue(null, newToken);
          return apiClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
        } finally {
          isRefreshing = false;
        }
      }

      if (typeof window !== 'undefined') {
        const activeElement = document.activeElement;
        const isEditing =
          activeElement &&
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName);

        if (!window.location.pathname.includes('/auth/login')) {
          sessionStorage.setItem(
            'redirectAfterLogin',
            window.location.pathname + window.location.search
          );
        }

        window.dispatchEvent(new CustomEvent('sessionExpired', { detail: { isEditing } }));

        let shouldRedirect = true;
        if (isEditing) {
          shouldRedirect = window.confirm(
            'Your session has expired. You are currently editing a form. Click OK to go to login, or Cancel to copy your work first.'
          );
        }

        if (shouldRedirect) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          if (!window.location.pathname.includes('/auth/login')) {
            window.location.href = '/auth/login?role=vendor';
          }
        }
      }
    }

    const message =
      error.response?.data?.message ||
      (error.response?.status === 403
        ? 'Access denied. Clear your session and try again.'
        : null) ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

/** Clear in-memory GET cache (call after mutations). */
export const invalidateApiCache = () => cache.clear();

export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024,
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  } = options;
  if (!file) throw new Error('No file provided');
  if (file.size > maxSize) {
    throw new Error(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
  }
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
  }
  return true;
};
