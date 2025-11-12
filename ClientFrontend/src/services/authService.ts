// Updated auth service with cookie-based auth and role management
import { api } from './api'
import axios, { AxiosInstance } from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:4000/api'

const authClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, // Important for cookie-based auth
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  role?: 'customer' | 'vendor'
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  role: 'customer' | 'vendor'
}

export interface AuthResponse {
  token?: string
  user: User
}

export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await authClient.post<AuthResponse>('/auth/login', credentials)
    
    // Store token if provided
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
    }
    
    // Store user data and role
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('role', response.data.user.role)
    }
    
    return response.data
  },

  // Signup
  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await authClient.post<AuthResponse>('/auth/register', data)
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
    }
    
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('role', response.data.user.role)
    }
    
    return response.data
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await authClient.post('/auth/logout')
    } finally {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      localStorage.removeItem('role')
    }
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    const response = await authClient.get<User>('/auth/profile')
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
      localStorage.setItem('role', response.data.role)
    }
    return response.data
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Get user role
  getRole: (): string | null => {
    return localStorage.getItem('role')
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken') || !!localStorage.getItem('user')
  },

  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem('authToken')
  },

  // Request password reset
  requestPasswordReset: async (email: string): Promise<void> => {
    await authClient.post('/auth/forgot-password', { email })
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await authClient.post('/auth/reset-password', { token, newPassword })
  },
}
