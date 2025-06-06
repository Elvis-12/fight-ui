// src/pages/Unauthorized/Unauthorized.tsx

import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>

        <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
          Unauthorized Access
        </h1>

        <p className="mt-2 text-base text-gray-600">
          You don't have permission to access this page. Please contact an
          administrator if you believe this is an error.
        </p>

        <div className="mt-6 space-y-4">
          <Link to="/dashboard">
            <Button variant="primary" className="w-full">
              Go to Dashboard
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="outline" className="w-full">
              Log in with different account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
