import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivilegedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');  // Vérification si l'utilisateur existe
  const role = localStorage.getItem('role');  // Vérification du rôle de l'utilisateur

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur n'a pas le rôle nécessaire, rediriger vers le Dashboard
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  // Si l'utilisateur a les privilèges nécessaires, afficher les enfants
  return children;
};

export default PrivilegedRoute;
