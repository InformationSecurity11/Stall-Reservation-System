// Stall service - handles stall-related API calls
import { api } from './api'

export interface Stall {
  id: string
  name: string
  description: string
  location: string
  size: number
  price: number
  images: string[]
  amenities: string[]
  status: 'available' | 'reserved' | 'maintenance'
  category: string
}

export interface StallFilters {
  location?: string
  minPrice?: number
  maxPrice?: number
  minSize?: number
  maxSize?: number
  category?: string
  status?: string
}

export const stallService = {
  // Get all stalls
  getAllStalls: async (filters?: StallFilters): Promise<Stall[]> => {
    const response = await api.get<Stall[]>('/stalls', { params: filters })
    return response.data
  },

  // Get stall by ID
  getStallById: async (id: string): Promise<Stall> => {
    const response = await api.get<Stall>(`/stalls/${id}`)
    return response.data
  },

  // Search stalls
  searchStalls: async (query: string): Promise<Stall[]> => {
    const response = await api.get<Stall[]>('/stalls/search', { params: { q: query } })
    return response.data
  },

  // Check stall availability
  checkAvailability: async (stallId: string, startDate: Date, endDate: Date): Promise<boolean> => {
    const response = await api.post<{ available: boolean }>('/stalls/check-availability', {
      stallId,
      startDate,
      endDate,
    })
    return response.data.available
  },
}
