import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Vérifie si l'utilisateur est authentifié

  if (!token) {
    // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
