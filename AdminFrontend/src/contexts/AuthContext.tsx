import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, setAuthToken, clearAuthToken, getAuthToken } from '@/services/apiClient';

interface User {
  id?: string;
  email: string;
  name?: string;
  role?: string;
  sub?: string; // JWT subject claim
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading?: boolean;
}

// Decode JWT token to extract user info
const decodeToken = (token: string): User | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const decoded = JSON.parse(jsonPayload);
    return {
      email: decoded.sub || decoded.email,
      role: decoded.role,
      sub: decoded.sub,
    };
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const userData = await authService.verifyToken();
          setUser(userData);
        } catch (error) {
          // Token is invalid or expired
          clearAuthToken();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      
      if (response.error) {
        throw new Error(response.error);
      }

      // Store token
      setAuthToken(response.token);
      
      // Decode token to get user info
      const userData = decodeToken(response.token);
      setUser(userData);
      navigate('/dashboard');
    } catch (error) {
      clearAuthToken();
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Logout from backend failed, but we'll clear local state anyway
      console.error('Logout failed:', error);
    } finally {
      clearAuthToken();
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
