// src/services/api/authService.ts
import axiosInstance from "src/services/api/axiosInstance";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface TwoFactorAuthRequest {
  code: string;
}

export interface PasswordResetRequest {
  email: string;
  token?: string;
  newPassword?: string;
}

export interface JwtResponse {
  token: string;
  refreshToken: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
  mfaEnabled: boolean;
  mfaRequired: boolean;
}

const authService = {
  // Login with username and password
  login: async (loginRequest: LoginRequest): Promise<JwtResponse> => {
    const response = await axiosInstance.post("/auth/signin", loginRequest);

    // If 2FA is not required, store token in local storage
    if (!response.data.mfaRequired) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  },

  // Verify 2FA code
  verifyTwoFactorCode: async (
    username: string,
    twoFactorRequest: TwoFactorAuthRequest
  ): Promise<JwtResponse> => {
    const response = await axiosInstance.post(
      `/auth/verify-2fa?username=${username}`,
      twoFactorRequest
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  },

  // Register new user
  register: async (
    signupRequest: SignupRequest
  ): Promise<{ message: string }> => {
    const response = await axiosInstance.post("/auth/signup", signupRequest);
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (email: string): Promise<{ message: string }> => {
    const response = await axiosInstance.post(
      `/auth/request-password-reset?email=${email}`
    );
    return response.data;
  },

  // Reset password with token
  resetPassword: async (
    resetRequest: PasswordResetRequest
  ): Promise<{ message: string }> => {
    const response = await axiosInstance.post(
      "/auth/reset-password",
      resetRequest
    );
    return response.data;
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    sessionStorage.clear();
  },

  // Get current user info
  getCurrentUser: (): JwtResponse | null => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return localStorage.getItem("token") !== null;
  },

  // Check if user has specific role
  hasRole: (role: string): boolean => {
    const user = authService.getCurrentUser();
    if (user && user.roles) {
      return user.roles.includes(role);
    }
    return false;
  },

  // Check if user is admin
  isAdmin: (): boolean => {
    return authService.hasRole("ROLE_ADMIN");
  },
};

export default authService;
