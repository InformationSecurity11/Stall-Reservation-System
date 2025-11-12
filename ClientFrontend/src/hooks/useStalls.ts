import { useState, useEffect } from 'react'
import { stallService, Stall, StallFilters } from '../services/stallService'

export const useStalls = (filters?: StallFilters) => {
  const [stalls, setStalls] = useState<Stall[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStalls = async () => {
      try {
        setLoading(true)
        const data = await stallService.getAllStalls(filters)
        setStalls(data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch stalls')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStalls()
  }, [JSON.stringify(filters)])

  return { stalls, loading, error }
}

export const useStall = (id: string) => {
  const [stall, setStall] = useState<Stall | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStall = async () => {
      try {
        setLoading(true)
        const data = await stallService.getStallById(id)
        setStall(data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch stall')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchStall()
    }
  }, [id])

  return { stall, loading, error }
}
