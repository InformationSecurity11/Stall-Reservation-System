// Reservation service - handles reservation-related API calls
import { api } from './api'

export interface Reservation {
  id: string
  stallId: string
  userId: string
  startDate: string
  endDate: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  totalPrice: number
  paymentStatus: 'pending' | 'paid' | 'refunded'
  createdAt: string
  updatedAt: string
}

export interface CreateReservationData {
  stallId: string
  startDate: string
  endDate: string
  notes?: string
}

export const reservationService = {
  // Create new reservation
  createReservation: async (data: CreateReservationData): Promise<Reservation> => {
    const response = await api.post<Reservation>('/reservations', data)
    return response.data
  },

  // Get user's reservations
  getUserReservations: async (): Promise<Reservation[]> => {
    const response = await api.get<Reservation[]>('/reservations/my-reservations')
    return response.data
  },

  // Get reservation by ID
  getReservationById: async (id: string): Promise<Reservation> => {
    const response = await api.get<Reservation>(`/reservations/${id}`)
    return response.data
  },

  // Cancel reservation
  cancelReservation: async (id: string): Promise<void> => {
    await api.patch(`/reservations/${id}/cancel`)
  },

  // Update reservation
  updateReservation: async (id: string, data: Partial<CreateReservationData>): Promise<Reservation> => {
    const response = await api.put<Reservation>(`/reservations/${id}`, data)
    return response.data
  },
}
