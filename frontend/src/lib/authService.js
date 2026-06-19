import { apiClient } from './api/client';

// --- Token Management Helpers ---

/**
 * Saves the access and refresh tokens to local storage.
 * @param {string} accessToken 
 * @param {string} refreshToken 
 */
export const saveTokens = (accessToken, refreshToken) => {
  if (typeof window !== 'undefined') {
    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  }
};

/**
 * Retrieves the access token from local storage.
 * @returns {string|null}
 */
export const getAccessToken = () => {
  if (typeof window !== 'undefined') return localStorage.getItem('accessToken');
  return null;
};

/**
 * Retrieves the refresh token from local storage.
 * @returns {string|null}
 */
export const getRefreshToken = () => {
  if (typeof window !== 'undefined') return localStorage.getItem('refreshToken');
  return null;
};

/**
 * Clears all authentication-related data from local storage.
 */
export const clearTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};

/**
 * Checks if the user is currently authenticated.
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getAccessToken();
};

// --- Public Auth Endpoints ---

function buildUserFromRegister(data, result, role) {
  return (
    result.user || {
      id: result.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: result.role || role,
      onboardingStatus: result.onboardingStatus,
    }
  );
}

function normalizeAuthResponse(response, data, role) {
  const result = response.data.data;
  saveTokens(result.accessToken || result.token, result.refreshToken || null);

  const user = buildUserFromRegister(data, result, role);
  localStorage.setItem('user', JSON.stringify(user));

  return {
    success: response.data.success ?? true,
    data: { ...result, user },
    message: response.data.message,
  };
}

/**
 * Registers a new vendor account.
 * @param {Object} data - { firstName, lastName, email, phone, countryCode, password }
 */
export const registerVendor = async (data) => {
  const response = await apiClient.post('/auth/register', { ...data, role: 'VENDOR' });
  return normalizeAuthResponse(response, data, 'VENDOR');
};

/**
 * Registers a new rider account.
 * @param {Object} data - { firstName, lastName, email, phone, countryCode, password }
 */
export const registerRider = async (data) => {
  const response = await apiClient.post('/auth/register', { ...data, role: 'RIDER' });
  return normalizeAuthResponse(response, data, 'RIDER');
};

/**
 * Log in to an existing account.
 * @param {string} email 
 * @param {string} password 
 */
export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  const result = response.data.data;
  // Based on your spec: Returns { token, tokenType: "Bearer" }
  saveTokens(result.token, result.refreshToken || null);
  
  // If user data isn't in login response, fetch it
  if (!result.user) {
    try {
      const profile = await getProfile();
      result.user = profile;
    } catch (e) {
      console.warn("Could not fetch profile after login");
    }
  }

  if (result.user) localStorage.setItem('user', JSON.stringify(result.user));
  return { ...response.data, data: result }; // Return full structure for UI compatibility
};

/**
 * Sends an OTP to the specified email for verification.
 * @param {string} email 
 */
export const sendOTP = async (email) => {
  const response = await apiClient.post('/auth/send-otp', { email });
  return response.data.data;
};

/**
 * Verifies OTP and returns tokens.
 * @param {string} email
 * @param {string} otp
 */
export const verifyOTP = async (email, otp) => {
  const response = await apiClient.post('/auth/verify-otp', { email, otp });
  const result = response.data.data;
  
  if (result.token) {
    saveTokens(result.token, result.refreshToken || null);
    
    // Fetch profile to ensure AuthGuard has role info
    try {
      const profile = await getProfile();
      result.user = profile;
      localStorage.setItem('user', JSON.stringify(profile));
    } catch (e) {
      console.warn("Could not fetch profile after OTP verification");
    }
  }
  
  return { ...response.data, data: result };
};

/**
 * Verifies OTP during registration — returns a short-lived registration token
 * without persisting it as a session access token.
 */
export const verifyRegistrationOtp = async (email, otp) => {
  const response = await apiClient.post('/auth/verify-otp', { email, otp });
  return response.data;
};

/**
 * Creates a new account using a registration token from OTP verification.
 * @param {string} registrationToken 
 * @param {Object} data - { firstName, lastName, phone, password, dob, addresses, role, favoriteFood }
 */
export const createAccount = async (registrationToken, data) => {
  const response = await apiClient.post('/auth/create-account', data, {
    headers: { Authorization: `Bearer ${registrationToken}` }
  });
  const result = response.data.data;
  saveTokens(result.token || result.accessToken, result.refreshToken || null);

  if (!result.user) {
    try {
      const profile = await getProfile();
      result.user = profile;
    } catch (e) {
      console.warn("Could not fetch profile after account creation");
    }
  }

  if (result.user) localStorage.setItem('user', JSON.stringify(result.user));
  return result;
};

// --- Protected Auth Endpoints ---

/**
 * Refreshes the access token using a refresh token.
 * @param {string} refreshToken 
 */
export const refreshAccessToken = async (refreshToken) => {
  const response = await apiClient.post('/auth/refresh', { refreshToken });
  const result = response.data.data;
  saveTokens(result.accessToken, result.refreshToken);
  return result;
};

/**
 * Logs out the current user.
 * @param {string} refreshToken 
 */
export const logout = async (refreshToken) => {
  await apiClient.post('/auth/logout', { refreshToken });
  clearTokens();
};

/**
 * Retrieves the current user's profile.
 */
export const getProfile = async () => {
  const response = await apiClient.get('/auth/me');
  const user = response.data.data;
  if (user) localStorage.setItem('user', JSON.stringify(user));
  return user;
};

/**
 * Updates the current user's profile.
 * @param {Object} data - partial { firstName, lastName, phoneNumber, dob, favoriteFood, profilePicture }
 */
export const updateProfile = async (data) => {
  const response = await apiClient.put('/auth/me', data);
  const user = response.data.data;
  if (user) localStorage.setItem('user', JSON.stringify(user));
  return user;
};

/**
 * Retrieves the current user's addresses.
 */
export const getAddresses = async () => {
  const response = await apiClient.get('/auth/me/addresses');
  return response.data.data;
};

/**
 * Adds a new address to the user's profile.
 * @param {Object} data - { address, latitude, longitude }
 */
export const addAddress = async (data) => {
  const response = await apiClient.post('/auth/me/addresses', data);
  return response.data.data;
};

/**
 * Updates an existing address.
 * @param {string} addressId 
 * @param {Object} data - { address, latitude, longitude }
 */
export const updateAddress = async (addressId, data) => {
  const response = await apiClient.put(`/auth/me/addresses/${addressId}`, data);
  return response.data.data;
};

/**
 * Deletes an address.
 * @param {string} addressId 
 */
export const deleteAddress = async (addressId) => {
  const response = await apiClient.delete(`/auth/me/addresses/${addressId}`);
  return response.data.data;
};

/**
 * Changes the user's password.
 * @param {string} oldPassword 
 * @param {string} newPassword 
 */
export const changePassword = async (oldPassword, newPassword) => {
  const response = await apiClient.post('/auth/me/change-password', { oldPassword, newPassword });
  return response.data.data;
};
