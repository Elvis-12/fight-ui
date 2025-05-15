// src/App.tsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./services/auth/authContext";
import PrivateRoute from "./components/shared/PrivateRoute";

// Auth Pages
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";
import Unauthorized from "./pages/Unauthorized/Unauthorized";

// We'll implement these pages later
import Dashboard from "./pages/Dashboard/Dashboard";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes - any role */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add other user routes here */}
          </Route>

          {/* Protected routes - admin only */}
          <Route element={<PrivateRoute requiredRole="ROLE_ADMIN" />}>
            {/* Add admin routes here */}
          </Route>

          {/* Redirect root to dashboard if logged in, otherwise to login */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Catch all - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
