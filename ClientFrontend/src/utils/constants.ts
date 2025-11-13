// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  STALLS: {
    LIST: '/stalls',
    DETAIL: (id: string) => `/stalls/${id}`,
    SEARCH: '/stalls/search',
    AVAILABILITY: '/stalls/check-availability',
  },
  RESERVATIONS: {
    LIST: '/reservations',
    MY_RESERVATIONS: '/reservations/my-reservations',
    DETAIL: (id: string) => `/reservations/${id}`,
    CANCEL: (id: string) => `/reservations/${id}/cancel`,
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/profile/update',
    CHANGE_PASSWORD: '/user/change-password',
  },
}

// App configuration
export const APP_CONFIG = {
  APP_NAME: 'Stall Reservation System',
  API_TIMEOUT: 10000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ITEMS_PER_PAGE: 12,
}

// Reservation statuses
export const RESERVATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const

// Payment statuses
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  REFUNDED: 'refunded',
} as const

// Stall statuses
export const STALL_STATUS = {
  AVAILABLE: 'available',
  RESERVED: 'reserved',
  MAINTENANCE: 'maintenance',
} as const

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
}

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized. Please login.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
}
