import React, { useEffect, useState } from 'react';
import { CiLogout, CiSettings } from "react-icons/ci";
import { FaCashRegister, FaUserAlt } from "react-icons/fa";
import { MdInventory2, MdSpaceDashboard } from "react-icons/md";
import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService';

const Sidebar = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('/');
    const role = localStorage.getItem('role');

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        if (userRole === 'Admin') {
            setSelected('/dashboard');
            navigate('/dashboard');
        } else if (userRole === 'PM') {
            setSelected('/inventory');
            navigate('/inventory');
        } else {
            setSelected('/cashier');
            navigate('/cashier');
        }
    }, []);

    const logout = () => {
        userService.logout(navigate);
    }

    const handleNavigation = (path) => {
        setSelected(path);
        navigate(path);
    }

    const navItems = [
        {
            path: '/dashboard',
            title: 'Dashboard',
            icon: <MdSpaceDashboard className="nav-icon" />,
            allowedRoles: ['Admin']
        },
        {
            path: '/cashier',
            title: 'Cash Register',
            icon: <FaCashRegister className="nav-icon" />,
            allowedRoles: ['Admin', 'Cashier']
        },
        {
            path: '/inventory',
            title: 'Inventory',
            icon: <MdInventory2 className="nav-icon" />,
            allowedRoles: ['Admin', 'PM']
        },
        {
            path: '/user',
            title: 'User Management',
            icon: <FaUserAlt className="nav-icon" />,
            allowedRoles: ['Admin']
        }
    ];

    return (
        <div className='sidebar-ct'>
            <div className="sidebar-header">
                <h1 className="title">D-DEAL</h1>
            </div>
            <div className="sidebar-middle">
                {navItems.map(({ path, title, icon, allowedRoles }) => (
                    <div
                        key={path}
                        className={`nav ${selected === path ? 'active' : ''} ${!allowedRoles.includes(role) ? 'disabled' : ''}`}
                        onClick={() => allowedRoles.includes(role) && handleNavigation(path)}
                    >
                        {icon}
                        <p className="nav-title">{title}</p>
                    </div>
                ))}
            </div>

            <div className="sidebar-footer">
                <CiSettings style={{ color: 'white', fontSize: '30px', cursor: 'pointer' }} />
                <CiLogout style={{ color: 'white', fontSize: '30px', cursor: 'pointer' }} onClick={logout} />
            </div>
        </div>
    );
}

export default Sidebar;
