import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: 'admin' | 'client' | 'talent';
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  // Check if user is authenticated and has the required role
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!authService.hasRole(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;