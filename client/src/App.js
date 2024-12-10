import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRoute from './Routing/PublicRoute';
import ProtectedRoute from './Routing/ProtectedRoute ';
import PrivilegedRoute from './Routing/PrivilegedRoute';
import 'toastr/build/toastr.min.css';
import Login from './components/Login/Login';
import Main from './components/Main/Main'; // Importation du Layout principal
import Dashboard from './components/Dashboard/Dashboard';
import Cashier from './components/Cashier/Cashier';
import Inventory from './components/Inventory/Inventory';
import UserManagement from './components/UserManagement/UserManagement';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route principale (protégée) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        >
          {/* Routes imbriquées dans le layout Main */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard par défaut */}
          <Route
            path="/cashier"
            element={
              <PrivilegedRoute allowedRoles={['Admin', 'Cashier']}>
                <Cashier />
              </PrivilegedRoute>
            }
          />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/user" element={<UserManagement />} />
        </Route>

        {/* Route de login (publique) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
