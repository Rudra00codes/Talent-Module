import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: 'admin' | 'client';
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  // Placeholder auth check - replace with real auth logic later
  const userRole = localStorage.getItem('userRole');
  
  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 