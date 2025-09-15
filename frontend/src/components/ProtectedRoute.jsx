import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the user is logged in

  if (!token) {
    // If not logged in, redirect to login page
    return <Navigate to="/welcomepage" />;
  }

  return children; // If logged in, render the protected content
};

export default ProtectedRoute;
