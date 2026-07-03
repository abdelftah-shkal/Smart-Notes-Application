/**
 * Workspace Flow — SecureGate
 * @author Abdelfatah
 * Redirects unauthenticated users to /login.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SecureGate = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.identity.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default SecureGate;
