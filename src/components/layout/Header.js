import React from 'react';
import { useLocation } from 'react-router-dom'; // Import this hook
import { useAuth } from '../../contexts/AuthContext';
import uniLogo from '../../assets/images/Logo.png'; 

const Header = ({ title }) => {
    const { user, logout } = useAuth();
    useLocation(); // This ensures the component updates when the route changes

    const getInitials = (name) => {
        if (!name) return '?';
        const nameParts = name.split(' ');
        if (nameParts.length > 1) {
            return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`;
        }
        return name[0];
    };

    return (
        <header className="dashboard-header">
            <div className="header-left">
                <img src={uniLogo} alt="Logo" className="dashboard-logo" />
                <h1>{title}</h1>
            </div>

            <div className="header-right">
                <div className="user-profile">
                    <div className="user-avatar">{getInitials(user?.name)}</div>
                    <span className="user-name">{user?.name}</span>
                </div>
                
                {/* THIS BUTTON CALLS THE LOGOUT FUNCTION FROM THE CONTEXT */}
                <button className="logout-icon-btn" onClick={logout} title="Logout">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 17v-3H9v-4h7V7l5 5-5 5zM14 2a2 2 0 0 1 2 2v2h-2V4H5v16h9v-2h2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9z"/>
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;