// src/pages/auth/Login/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../services/auth/authContext";

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    clearError();

    try {
      const response = await login(data);
      
      // If 2FA is not required, redirect to dashboard
      if (!response.mfaRequired) {
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Sign In</h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center animate-fade-in">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <span className="text-sm text-red-500">{errors.username.message}</span>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 flex justify-between items-center">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
