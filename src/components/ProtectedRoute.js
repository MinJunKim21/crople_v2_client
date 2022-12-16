import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function ProtectedRoute({ children }) {
  const userObject = useContext(AuthContext);
  console.log(userObject);
  if (userObject._id) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
