/**
 * Custom React hooks for API calls
 * Manages loading, error, and success states for API operations
 */

import { useState, useCallback } from 'react';
import {
  authService,
  stallService,
  reservationService,
  notificationService,
  profileService,
  ApiError,
} from './apiClient';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

/**
 * Generic async hook for API calls
 */
const useAsync = <T,>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
): UseAsyncState<T> & { execute: () => Promise<void> } => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await asyncFunction();
      setState({ data: response, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as ApiError });
    }
  }, [asyncFunction]);

  useState(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
};

// ============================================================================
// AUTH HOOKS
// ============================================================================

export const useLogin = () => {
  const [state, setState] = useState({
    loading: false,
    error: null as ApiError | null,
  });

  const login = useCallback(async (email: string, password: string) => {
    setState({ loading: true, error: null });
    try {
      const response = await authService.login(email, password);
      setState({ loading: false, error: null });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setState({ loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  return { ...state, login };
};

export const useVerifyToken = () => {
  return useAsync(() => authService.verifyToken(), true);
};

export const useAllUsers = (immediate: boolean = true) => {
  return useAsync(() => authService.getAllUsers(), immediate);
};

export const useCreateUser = () => {
  const [state, setState] = useState({
    loading: false,
    error: null as ApiError | null,
  });

  const createUser = useCallback(
    async (userData: { email: string; password: string; name: string; role: string }) => {
      setState({ loading: true, error: null });
      try {
        const response = await authService.createUser(userData);
        setState({ loading: false, error: null });
        return response;
      } catch (error) {
        const apiError = error as ApiError;
        setState({ loading: false, error: apiError });
        throw apiError;
      }
    },
    []
  );

  return { ...state, createUser };
};

export const useDeleteUser = () => {
  const [state, setState] = useState({
    loading: false,
    error: null as ApiError | null,
  });

  const deleteUser = useCallback(async (userId: string) => {
    setState({ loading: true, error: null });
    try {
      const response = await authService.deleteUser(userId);
      setState({ loading: false, error: null });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setState({ loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  return { ...state, deleteUser };
};

// ============================================================================
// STALL HOOKS
// ============================================================================

export const useAllStalls = (immediate: boolean = true) => {
  return useAsync(() => stallService.getAllStalls(), immediate);
};

export const useStallStats = (immediate: boolean = true) => {
  return useAsync(() => stallService.getStallStats(), immediate);
};

export const useStallsByStatus = (status: string, immediate: boolean = true) => {
  return useAsync(() => stallService.getStallsByStatus(status), immediate);
};

export const useCreateStall = () => {
  const [state, setState] = useState({
    loading: false,
    error: null as ApiError | null,
  });

  const createStall = useCallback(
    async (stallData: { size: string; price: number; location?: string; description?: string }) => {
      setState({ loading: true, error: null });
      try {
        const response = await stallService.createStall(stallData);
        setState({ loading: false, error: null });
        return response;
      } catch (error) {
        const apiError = error as ApiError;
        setState({ loading: false, error: apiError });
        throw apiError;
      }
    },
    []
  );

  return { ...state, createStall };
};

export const useUpdateStall = () => {
  const [state, setState] = useState({
    loading: false,
    error: null as ApiError | null,
  });

  const updateStall = useCallback(async (stallId: string, stallData: any) => {
    setState({ loading: true, error: null });
    try {
      const response = await stallService.updateStall(stallId, stallData);
      setState({ loading: false, error: null });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setState({ loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  return { ...state, updateStall };
};

export const useDeleteStall = () => {
  const [state, setState] = useState({
    loading: false,
    error: null as ApiError | null,
  });

  const deleteStall = useCallback(async (stallId: string) => {
    setState({ loading: true, error: null });
    try {
      const response = await stallService.deleteStall(stallId);
      setState({ loading: false, error: null });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setState({ loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  return { ...state, deleteStall };
};

export const useUpdateStallStatus = () => {
  const [state, setState] = useState({
    loading: false,
    error: null as ApiError | null,
  });

  const updateStatus = useCallback(async (stallId: string, status: string) => {
    setState({ loading: true, error: null });
    try {
      const response = await stallService.updateStallStatus(stallId, status);
      setState({ loading: false, error: null });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setState({ loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  return { ...state, updateStatus };
};

// ============================================================================
// RESERVATION HOOKS
// ============================================================================

export const useAllReservations = (immediate: boolean = true) => {
  return useAsync(() => reservationService.getAllReservations(), immediate);
};

export const useReservationsByStatus = (status: string, immediate: boolean = true) => {
  return useAsync(() => reservationService.getReservationsByStatus(status), immediate);
};

export const useReservationStats = (immediate: boolean = true) => {
  return useAsync(() => reservationService.getReservationStats(), immediate);
};

export const useCreateReservation = () => {
  const [state, setState] = useState({
    loading: false,
    error: null as ApiError | null,
  });

  const createReservation = useCallback(
    async (reservationData: { stallIds: string[]; businessName: string; contactPerson: string }) => {
      setState({ loading: true, error: null });
      try {
        const response = await reservationService.createReservation(reservationData);
        setState({ loading: false, error: null });
        return response;
      } catch (error) {
        const apiError = error as ApiError;
        setState({ loading: false, error: apiError });
        throw apiError;
      }
    },
    []
  );

  return { ...state, createReservation };
};

export const useCancelReservation = () => {
  const [state, setState] = useState({
    loading: false,
    error: null as ApiError | null,
  });

  const cancelReservation = useCallback(async (reservationId: string) => {
    setState({ loading: true, error: null });
    try {
      const response = await reservationService.cancelReservation(reservationId);
      setState({ loading: false, error: null });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setState({ loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  return { ...state, cancelReservation };
};

export const useUpdateReservationStatus = () => {
  const [state, setState] = useState({
    loading: false,
    error: null as ApiError | null,
  });

  const updateStatus = useCallback(async (reservationId: string, status: string) => {
    setState({ loading: true, error: null });
    try {
      const response = await reservationService.updateReservationStatus(reservationId, status);
      setState({ loading: false, error: null });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setState({ loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  return { ...state, updateStatus };
};

// ============================================================================
// NOTIFICATION HOOKS
// ============================================================================

export const useNotifications = (immediate: boolean = true) => {
  return useAsync(() => notificationService.getNotifications(), immediate);
};

export const useUnreadNotificationCount = (immediate: boolean = true) => {
  return useAsync(() => notificationService.getUnreadCount(), immediate);
};

export const useSendNotification = () => {
  const [state, setState] = useState({
    loading: false,
    error: null as ApiError | null,
  });

  const sendNotification = useCallback(
    async (notificationData: { userId: string; title: string; message: string; type: string }) => {
      setState({ loading: true, error: null });
      try {
        const response = await notificationService.sendNotification(notificationData);
        setState({ loading: false, error: null });
        return response;
      } catch (error) {
        const apiError = error as ApiError;
        setState({ loading: false, error: apiError });
        throw apiError;
      }
    },
    []
  );

  return { ...state, sendNotification };
};

// ============================================================================
// PROFILE HOOKS
// ============================================================================

export const useProfile = (immediate: boolean = true) => {
  return useAsync(() => profileService.getProfile(), immediate);
};

export const useUpdateProfile = () => {
  const [state, setState] = useState({
    loading: false,
    error: null as ApiError | null,
  });

  const updateProfile = useCallback(async (profileData: any) => {
    setState({ loading: true, error: null });
    try {
      const response = await profileService.updateProfile(profileData);
      setState({ loading: false, error: null });
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setState({ loading: false, error: apiError });
      throw apiError;
    }
  }, []);

  return { ...state, updateProfile };
};
