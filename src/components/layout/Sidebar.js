import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ links }) => {
    return (
        <nav className="sidebar">
            <ul>
                {links.map(link => (
                    <li key={link.to}>
                        <NavLink to={link.to}>{link.label}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;