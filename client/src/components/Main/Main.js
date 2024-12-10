import React, { useEffect } from 'react';
import './main.css';
import Sidebar from '../sidebar/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import userService from '../../services/userService';


const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let inactivityTimer;

    const startInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        userService.logout(navigate);
      }, 5 * 60 * 1000); 
    };


    document.addEventListener('mousemove', startInactivityTimer);
    document.addEventListener('keydown', startInactivityTimer);

    startInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      document.removeEventListener('mousemove', startInactivityTimer);
      document.removeEventListener('keydown', startInactivityTimer);
    };
  }, [navigate]);
  return (
    <div className='main-ct'>
      <div className="navigation">
        <Sidebar />
      </div>
      <div className="content">

        <Outlet />
      </div>
    </div>
  );
};

export default Main;
