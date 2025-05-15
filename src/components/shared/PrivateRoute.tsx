// src/components/shared/PrivateRoute.tsx

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../services/auth/authContext";

interface PrivateRouteProps {
  requiredRole?: string;
}

const PrivateRoute = ({ requiredRole }: PrivateRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is required and user doesn't have it, redirect to unauthorized
  if (requiredRole && user?.roles && !user.roles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the protected route
  return <Outlet />;
};

export default PrivateRoute;
