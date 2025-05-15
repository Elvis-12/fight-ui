// src/pages/auth/Login/Login.tsx

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../services/auth/authContext";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Alert from "../../../components/ui/Alert";
import Card from "../../../components/ui/Card";

interface LoginFormValues {
  username: string;
  password: string;
}

interface TwoFactorFormValues {
  code: string;
}

const Login: React.FC = () => {
  const { login, verifyTwoFactorCode, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  // State to track if we are on the 2FA step
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormValues>();

  // 2FA form
  const {
    register: registerTwoFactor,
    handleSubmit: handleTwoFactorSubmit,
    formState: { errors: twoFactorErrors },
  } = useForm<TwoFactorFormValues>();

  // Handle login form submission
  const onLoginSubmit = async (data: LoginFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    clearError();

    try {
      const response = await login(data);

      if (response.mfaRequired) {
        // If 2FA is required, show the 2FA form
        setUsername(data.username);
        setShowTwoFactor(true);
      } else {
        // If 2FA is not required, redirect to the original destination or dashboard
        navigate(from);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle 2FA form submission
  const onTwoFactorSubmit = async (data: TwoFactorFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    clearError();

    try {
      await verifyTwoFactorCode(username, { code: data.code });
      navigate(from);
    } catch (error) {
      console.error("2FA verification error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Flight Booking System
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            {showTwoFactor
              ? "Two-Factor Authentication"
              : "Sign in to your account"}
          </h2>
        </div>

        {error && <Alert type="error" message={error} onClose={clearError} />}

        <Card>
          {!showTwoFactor ? (
            // Login Form
            <form
              className="space-y-6"
              onSubmit={handleLoginSubmit(onLoginSubmit)}
            >
              <Input
                id="username"
                label="Username"
                type="text"
                autoComplete="username"
                error={loginErrors.username?.message}
                {...registerLogin("username", {
                  required: "Username is required",
                })}
              />

              <Input
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                error={loginErrors.password?.message}
                {...registerLogin("password", {
                  required: "Password is required",
                })}
              />

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  Sign in
                </Button>
              </div>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Don't have an account?
                </span>{" "}
                <Link
                  to="/register"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Sign up
                </Link>
              </div>
            </form>
          ) : (
            // 2FA Form
            <form
              className="space-y-6"
              onSubmit={handleTwoFactorSubmit(onTwoFactorSubmit)}
            >
              <div className="text-sm text-gray-600 mb-4">
                Please enter the verification code from your authenticator app.
              </div>

              <Input
                id="code"
                label="Verification Code"
                type="text"
                autoComplete="one-time-code"
                error={twoFactorErrors.code?.message}
                {...registerTwoFactor("code", {
                  required: "Verification code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Code must be 6 digits",
                  },
                })}
              />

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  Verify
                </Button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  onClick={() => setShowTwoFactor(false)}
                >
                  Back to login
                </button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Login;
