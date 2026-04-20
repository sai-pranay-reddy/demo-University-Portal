import React from 'react';
import { Link } from 'react-router-dom';
import uniLogo from '../../assets/images/Logo.png';
// import './PublicHeader.css'; // <--- DELETE THIS LINE

const PublicHeader = () => {
    return (
        <header className="public-header">
            <img src={uniLogo} alt="Malla Reddy University" className="public-logo" />
            <nav>
                <a href="#home">Home</a>
                <a href="#placements">Placements</a>
                <a href="#facilities">Facilities</a>
                <a href="#alumni">Alumni Network</a>
                <a href="#achievements">Achievements</a>
                <a href="#about">About Us</a>
            </nav>
            <div className="header-actions">
                <Link to="/login">
                    <button className="login-button-public">Login</button>
                </Link>
            </div>
        </header>
    );
};

export default PublicHeader;