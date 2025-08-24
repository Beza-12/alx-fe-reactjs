import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = false; // Change to true to simulate login
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
