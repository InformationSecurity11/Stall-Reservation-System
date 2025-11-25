/**
 * API Client - Centralized HTTP client for all backend API calls
 * Handles authentication, requests, and error handling
 */

const API_BASE_URL = 'http://localhost:8000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

/**
 * Get authorization token from localStorage
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

/**
 * Set authorization token in localStorage
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

/**
 * Clear authorization token from localStorage
 */
export const clearAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

/**
 * Generic HTTP request handler
 */
const request = async <T>(
  endpoint: string,
  options: RequestInit & { customHeaders?: Record<string, string> } = {}
): Promise<T> => {
  const { customHeaders, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      credentials: 'include',
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const error: ApiError = {
        message: data?.message || `HTTP ${response.status}`,
        status: response.status,
        data,
      };
      throw error;
    }

    return data as T;
  } catch (error) {
    if (error instanceof TypeError) {
      throw {
        message: 'Network error. Please check your connection.',
        data: error,
      } as ApiError;
    }
    throw error;
  }
};

/**
 * GET request
 */
export const apiGet = <T = any>(endpoint: string, options?: RequestInit) =>
  request<T>(endpoint, { ...options, method: 'GET' });

/**
 * POST request
 */
export const apiPost = <T = any>(endpoint: string, body?: any, options?: RequestInit) =>
  request<T>(endpoint, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });

/**
 * PUT request
 */
export const apiPut = <T = any>(endpoint: string, body?: any, options?: RequestInit) =>
  request<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });

/**
 * PATCH request
 */
export const apiPatch = <T = any>(endpoint: string, body?: any, options?: RequestInit) =>
  request<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
  });

/**
 * DELETE request
 */
export const apiDelete = <T = any>(endpoint: string, options?: RequestInit) =>
  request<T>(endpoint, { ...options, method: 'DELETE' });

// ============================================================================
// AUTH SERVICE
// ============================================================================

export const authService = {
  /**
   * Login with email and password
   * POST /auth/login
   */
  login: (email: string, password: string) =>
    apiPost<{
      token: string;
      message: string;
      error: string | null;
    }>('/auth/login', { email, password }),

  /**
   * Logout
   * POST /auth/logout
   */
  logout: () => apiPost('/auth/logout'),

  /**
   * Verify token
   * GET /auth/verify
   */
  verifyToken: () =>
    apiGet<{
      id: string;
      email: string;
      name: string;
      role: string;
    }>('/auth/verify'),

  /**
   * Get all users
   * GET /auth/users
   */
  getAllUsers: () =>
    apiGet<Array<{
      id: string;
      email: string;
      name: string;
      businessName?: string;
      phone?: string;
      role: string;
    }>>('/auth/users'),

  /**
   * Get user by ID
   * GET /auth/users/{id}
   */
  getUserById: (userId: string) =>
    apiGet(`/auth/users/${userId}`),

  /**
   * Create new user
   * POST /auth/users
   */
  createUser: (userData: {
    email: string;
    password: string;
    name: string;
    role: string;
  }) => apiPost('/auth/users', userData),

  /**
   * Update user
   * PUT /auth/users/{id}
   */
  updateUser: (userId: string, userData: any) =>
    apiPut(`/auth/users/${userId}`, userData),

  /**
   * Delete user
   * DELETE /auth/users/{id}
   */
  deleteUser: (userId: string) =>
    apiDelete(`/auth/users/${userId}`),
};

// ============================================================================
// STALL SERVICE
// ============================================================================

export const stallService = {
  /**
   * Get all stalls
   * GET /stalls
   */
  getAllStalls: () =>
    apiGet<Array<{
      id: string;
      size: string;
      price: number;
      status: string;
      location?: string;
      description?: string;
    }>>('/stalls'),

  /**
   * Get stall by ID
   * GET /stalls/{id}
   */
  getStallById: (stallId: string) =>
    apiGet(`/stalls/${stallId}`),

  /**
   * Get stalls by status
   * GET /stalls/status/{status}
   */
  getStallsByStatus: (status: string) =>
    apiGet(`/stalls/status/${status}`),

  /**
   * Get stall statistics
   * GET /stalls/admin/stats
   */
  getStallStats: () =>
    apiGet<{
      totalStalls: number;
      availableStalls: number;
      reservedStalls: number;
      unavailableStalls: number;
    }>('/stalls/admin/stats'),

  /**
   * Create new stall
   * POST /stalls
   */
  createStall: (stallData: {
    size: string;
    price: number;
    location?: string;
    description?: string;
  }) => apiPost('/stalls', stallData),

  /**
   * Update stall
   * PUT /stalls/{id}
   */
  updateStall: (stallId: string, stallData: any) =>
    apiPut(`/stalls/${stallId}`, stallData),

  /**
   * Update stall status
   * PATCH /stalls/{id}/status
   */
  updateStallStatus: (stallId: string, status: string) =>
    apiPatch(`/stalls/${stallId}/status`, { status }),

  /**
   * Delete stall
   * DELETE /stalls/{id}
   */
  deleteStall: (stallId: string) =>
    apiDelete(`/stalls/${stallId}`),

  /**
   * Search stalls
   * GET /stalls/search
   */
  searchStalls: (query: string) =>
    apiGet(`/stalls/search?q=${encodeURIComponent(query)}`),
};

// ============================================================================
// RESERVATION SERVICE
// ============================================================================

export const reservationService = {
  /**
   * Get all reservations (admin)
   * GET /reservations/admin/all
   */
  getAllReservations: () =>
    apiGet<Array<{
      id: string;
      userId: string;
      stallIds: string[];
      businessName: string;
      contactPerson: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    }>>('/reservations/admin/all'),

  /**
   * Get reservations by status
   * GET /reservations/admin/status/{status}
   */
  getReservationsByStatus: (status: string) =>
    apiGet(`/reservations/admin/status/${status}`),

  /**
   * Get reservation by ID
   * GET /reservations/{id}
   */
  getReservationById: (reservationId: string) =>
    apiGet(`/reservations/${reservationId}`),

  /**
   * Get user's reservations
   * GET /reservations/user/{userId}
   */
  getUserReservations: (userId: string) =>
    apiGet(`/reservations/user/${userId}`),

  /**
   * Create new reservation
   * POST /reservations
   */
  createReservation: (reservationData: {
    stallIds: string[];
    businessName: string;
    contactPerson: string;
  }) => apiPost('/reservations', reservationData),

  /**
   * Update reservation status
   * PATCH /reservations/{id}/status
   */
  updateReservationStatus: (reservationId: string, status: string) =>
    apiPatch(`/reservations/${reservationId}/status`, { status }),

  /**
   * Cancel reservation
   * DELETE /reservations/{id}
   */
  cancelReservation: (reservationId: string) =>
    apiDelete(`/reservations/${reservationId}`),

  /**
   * Get reservation statistics
   * GET /reservations/admin/stats
   */
  getReservationStats: () =>
    apiGet<{
      totalReservations: number;
      confirmedReservations: number;
      pendingReservations: number;
      cancelledReservations: number;
    }>('/reservations/admin/stats'),

  /**
   * Search reservations
   * GET /reservations/search
   */
  searchReservations: (query: string) =>
    apiGet(`/reservations/search?q=${encodeURIComponent(query)}`),
};

// ============================================================================
// PROFILE SERVICE
// ============================================================================

export const profileService = {
  /**
   * Get user profile
   * GET /profile
   */
  getProfile: () =>
    apiGet('/profile'),

  /**
   * Update user profile
   * PUT /profile
   */
  updateProfile: (profileData: any) =>
    apiPut('/profile', profileData),

  /**
   * Get all profiles (admin)
   * GET /profile/admin/all
   */
  getAllProfiles: () =>
    apiGet('/profile/admin/all'),

  /**
   * Get profile by user ID
   * GET /profile/user/{userId}
   */
  getProfileByUserId: (userId: string) =>
    apiGet(`/profile/user/${userId}`),

  /**
   * Update profile by ID (admin)
   * PUT /profile/{userId}
   */
  updateProfileById: (userId: string, profileData: any) =>
    apiPut(`/profile/${userId}`, profileData),
};

// ============================================================================
// NOTIFICATION SERVICE
// ============================================================================

export const notificationService = {
  /**
   * Get all notifications for user
   * GET /notifications
   */
  getNotifications: () =>
    apiGet<Array<{
      id: string;
      userId: string;
      title: string;
      message: string;
      type: string;
      read: boolean;
      createdAt: string;
    }>>('/notifications'),

  /**
   * Get unread notifications count
   * GET /notifications/count/unread
   */
  getUnreadCount: () =>
    apiGet<{ count: number }>('/notifications/count/unread'),

  /**
   * Mark notification as read
   * PATCH /notifications/{id}/read
   */
  markAsRead: (notificationId: string) =>
    apiPatch(`/notifications/${notificationId}/read`),

  /**
   * Mark all notifications as read
   * PATCH /notifications/read-all
   */
  markAllAsRead: () =>
    apiPatch('/notifications/read-all'),

  /**
   * Delete notification
   * DELETE /notifications/{id}
   */
  deleteNotification: (notificationId: string) =>
    apiDelete(`/notifications/${notificationId}`),

  /**
   * Get notification statistics
   * GET /notifications/stats
   */
  getStats: () =>
    apiGet<{
      totalNotifications: number;
      unreadNotifications: number;
      readNotifications: number;
    }>('/notifications/stats'),

  /**
   * Send notification (admin)
   * POST /notifications/send
   */
  sendNotification: (notificationData: {
    userId: string;
    title: string;
    message: string;
    type: string;
  }) => apiPost('/notifications/send', notificationData),

  /**
   * Broadcast notification to all users (admin)
   * POST /notifications/broadcast
   */
  broadcastNotification: (notificationData: {
    title: string;
    message: string;
    type: string;
  }) => apiPost('/notifications/broadcast', notificationData),
};

// ============================================================================
// ADMIN SERVICE
// ============================================================================

export const adminService = {
  /**
   * Get dashboard statistics
   * GET /admin/stats
   */
  getDashboardStats: () =>
    apiGet<{
      totalStalls: number;
      availableStalls: number;
      reservedStalls: number;
      totalReservations: number;
      pendingReservations: number;
      totalUsers: number;
    }>('/admin/stats'),

  /**
   * Get system health
   * GET /admin/health
   */
  getSystemHealth: () =>
    apiGet('/admin/health'),

  /**
   * Get activity logs
   * GET /admin/logs
   */
  getActivityLogs: (limit?: number, offset?: number) =>
    apiGet(`/admin/logs?limit=${limit || 50}&offset=${offset || 0}`),
};
