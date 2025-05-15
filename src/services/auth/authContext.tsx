// src/services/auth/authContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import authService, {
  JwtResponse,
  LoginRequest,
  SignupRequest,
  TwoFactorAuthRequest,
  PasswordResetRequest,
} from "../auth/authService";

// Define the auth context type
interface AuthContextType {
  user: JwtResponse | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: LoginRequest) => Promise<JwtResponse>;
  verifyTwoFactorCode: (
    username: string,
    twoFactorRequest: TwoFactorAuthRequest
  ) => Promise<JwtResponse>;
  register: (signupData: SignupRequest) => Promise<{ message: string }>;
  requestPasswordReset: (email: string) => Promise<{ message: string }>;
  resetPassword: (
    resetData: PasswordResetRequest
  ) => Promise<{ message: string }>;
  logout: () => void;
  clearError: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {
    throw new Error("AuthContext not implemented");
  },
  verifyTwoFactorCode: async () => {
    throw new Error("AuthContext not implemented");
  },
  register: async () => {
    throw new Error("AuthContext not implemented");
  },
  requestPasswordReset: async () => {
    throw new Error("AuthContext not implemented");
  },
  resetPassword: async () => {
    throw new Error("AuthContext not implemented");
  },
  logout: () => {
    throw new Error("AuthContext not implemented");
  },
  clearError: () => {
    throw new Error("AuthContext not implemented");
  },
});

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<JwtResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize user from localStorage when component mounts
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Failed to initialize authentication:", error);
        // Clear potentially corrupted auth data
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginRequest): Promise<JwtResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);

      // If 2FA is not required, set user immediately
      if (!response.mfaRequired) {
        setUser(response);
      }

      return response;
    } catch (err: any) {
      const message = err?.response?.data?.message || "Login failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 2FA verification
  const verifyTwoFactorCode = async (
    username: string,
    twoFactorRequest: TwoFactorAuthRequest
  ): Promise<JwtResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.verifyTwoFactorCode(
        username,
        twoFactorRequest
      );
      setUser(response);
      return response;
    } catch (err: any) {
      const message = err?.response?.data?.message || "2FA verification failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (
    signupData: SignupRequest
  ): Promise<{ message: string }> => {
    setLoading(true);
    setError(null);
    try {
      return await authService.register(signupData);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Registration failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Request password reset
  const requestPasswordReset = async (
    email: string
  ): Promise<{ message: string }> => {
    setLoading(true);
    setError(null);
    try {
      return await authService.requestPasswordReset(email);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Password reset request failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (
    resetData: PasswordResetRequest
  ): Promise<{ message: string }> => {
    setLoading(true);
    setError(null);
    try {
      return await authService.resetPassword(resetData);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Password reset failed";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Determine if the user is authenticated
  const isAuthenticated = !!user && !!user.token;

  // Determine if the user is an admin
  const isAdmin = user?.roles?.includes("ROLE_ADMIN") || false;

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    verifyTwoFactorCode,
    register,
    requestPasswordReset,
    resetPassword,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
