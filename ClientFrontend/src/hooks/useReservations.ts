import { useState, useEffect } from 'react'
import { reservationService, Reservation } from '../services/reservationService'

export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReservations = async () => {
    try {
      setLoading(true)
      const data = await reservationService.getUserReservations()
      setReservations(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch reservations')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReservations()
  }, [])

  const cancelReservation = async (id: string) => {
    try {
      await reservationService.cancelReservation(id)
      // Refresh reservations after cancellation
      await fetchReservations()
      return true
    } catch (err) {
      console.error('Failed to cancel reservation:', err)
      throw err
    }
  }

  return { reservations, loading, error, cancelReservation, refetch: fetchReservations }
}

export const useReservation = (id: string) => {
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setLoading(true)
        const data = await reservationService.getReservationById(id)
        setReservation(data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch reservation')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchReservation()
    }
  }, [id])

  return { reservation, loading, error }
}
