import React from 'react';
import { Navigate } from 'react-router-dom';
const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Vérifie si l'utilisateur est déjà connecté
  
    if (token) {
      // Si l'utilisateur est connecté, redirige vers la page d'accueil
      return <Navigate to="/" />;
    }
  
    return children;
  };
  
  export default PublicRoute;
  