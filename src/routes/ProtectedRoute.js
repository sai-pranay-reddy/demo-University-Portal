import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    // While user is loading, you could show a spinner here
    // For now, returning null is safe and prevents rendering.
    if (user === undefined) {
        return null; 
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Check if the user's role is in the list of allowed roles
    if (allowedRoles && allowedRoles.includes(user.role)) {
        // If they are authorized, render the child route content
        return <Outlet />;
    } else {
        // If not authorized, send them to the unauthorized page
        return <Navigate to="/unauthorized" replace />;
    }
};

export default ProtectedRoute;