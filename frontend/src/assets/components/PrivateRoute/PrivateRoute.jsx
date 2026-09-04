import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../../../context/StoreContext';

const PrivateRoute = ({ children }) => {
  const { token } = useStore();
  // Support both new token key and legacy loginData key written during login
  const isAuthenticated = Boolean(token) || Boolean(localStorage.getItem('loginData'));
  return isAuthenticated ? children : <Navigate to='/login' replace />;
};

export default PrivateRoute;
