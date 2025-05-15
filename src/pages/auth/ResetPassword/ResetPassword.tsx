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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Flight Booking System
            </h1>
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Reset Password Error
            </h2>
          </div>

          <Alert
            type="error"
            message="Invalid or expired password reset link. Please request a new password reset."
          />

          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Request new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Flight Booking System
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Set new password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create a new password for your account.
          </p>
        </div>

        {error && <Alert type="error" message={error} onClose={clearError} />}

        {success && (
          <Alert
            type="success"
            message={`${success} Redirecting to login...`}
          />
        )}

        <Card>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="password"
              label="New Password"
              type="password"
              autoComplete="new-password"
              error={errors.password?.message}
              disabled={!!success}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            <Input
              id="confirmPassword"
              label="Confirm New Password"
              type="password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              disabled={!!success}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
            />

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isSubmitting}
                disabled={!!success}
              >
                Reset password
              </Button>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Back to login
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
