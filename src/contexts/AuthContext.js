import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../data/mockData';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            // Retrieve users from the mock data stored in localStorage
            const users = db.get('users');
            const foundUser = users[username];

            // Verify username exists and matches the provided password
            if (foundUser && foundUser.password === password) {
                // Generate mock tokens for the session
                const access = `mock_token_${username}_${Date.now()}`;
                const refresh = `mock_refresh_${username}_${Date.now()}`;
                
                setAuthToken(access);

                const userData = {
                    username: username,
                    role: foundUser.role,
                    name: foundUser.name,
                };
                
                setUser(userData);
                
                // Store credentials in localStorage for persistence
                localStorage.setItem('authToken', access);
                localStorage.setItem('refreshToken', refresh);
                localStorage.setItem('user', JSON.stringify(userData));

                // Navigate based on user role
                if (userData.role) {
                    navigate(`/${userData.role}/dashboard`);
                } else {
                    console.error("Login successful but no role was found for this user.");
                    return { success: false, message: 'Account detected, but no access role assigned.' };
                }
                
                return { success: true };
            } else {
                return { success: false, message: 'Invalid username or password.' };
            }
        } catch (error) {
            console.error('Login process failed:', error);
            return { success: false, message: 'An error occurred during authentication.' };
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setAuthToken(null);
        setUser(null);
        navigate('/HomePage');
    };
    
    const value = { user, authToken, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};