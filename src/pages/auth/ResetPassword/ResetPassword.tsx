// src/pages/auth/ResetPassword/ResetPassword.tsx

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../services/auth/authContext";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Alert from "../../../components/ui/Alert";
import Card from "../../../components/ui/Card";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const { resetPassword, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  // Get the token and email from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>();

  const password = watch("password");

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (isSubmitting || !token || !email) return;

    setIsSubmitting(true);
    clearError();

    try {
      const response = await resetPassword({
        email,
        token,
        newPassword: data.password,
      });

      setSuccess(response.message);

      // Redirect to login after a delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If no token or email is provided, show an error
  if (!token || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="w-full max-w-md mx-4">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Invalid Reset Link
              </h2>
              <p className="text-gray-600 mt-2">
                The password reset link is invalid or has expired
              </p>
            </div>

            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center animate-fade-in">
              Invalid or expired password reset link. Please request a new password reset.
            </div>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Request new reset link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Set New Password
            </h2>
            <p className="text-gray-600 mt-2">
              Create a new password for your account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center animate-fade-in">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-center animate-fade-in">
              {success} Redirecting to login...
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                autoComplete="new-password"
                placeholder="Enter new password"
                disabled={!!success}
              />
              {errors.password && (
                <span className="text-sm text-red-500 animate-fade-in">{errors.password.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
                autoComplete="new-password"
                placeholder="Confirm new password"
                disabled={!!success}
              />
              {errors.confirmPassword && (
                <span className="text-sm text-red-500 animate-fade-in">{errors.confirmPassword.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || !!success}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting password...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
