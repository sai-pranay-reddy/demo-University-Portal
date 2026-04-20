import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../App.css';
import uniLogo from '../../assets/images/Logo.png';

const LoginPage = () => {
    // --- All hooks MUST be inside the component function ---
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    // --- The handler function MUST ALSO be inside the component ---
    // It needs access to the state and functions defined above.
    // It's also now an 'async' function to handle the API call.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // We 'await' the result from the login API call
        const result = await login(username, password);

        // If the login function returns a failure, we set the error message
        if (!result.success) {
            setError(result.message || 'An unknown error occurred.');
        }
        // If successful, the AuthContext automatically navigates away.
    };

    return (
        <div className="login-container">
            <Link to="/" className="home-link-button" title="Back to Homepage">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
            </Link>

            <div className="login-form-container">
                <div className="login-header">
                    <img src={uniLogo} alt="Malla Reddy University Logo" className="login-logo" />
                    <h1 className="login-title">Malla Reddy University<br />Portal Login</h1>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                            placeholder="Enter your Hall Ticket No / Staff ID"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button">Login</button>
                </form>

                <div className="login-info-footer">
                    <p>
                        This portal is for authorized <strong>Students</strong>, <strong>Staff</strong>, and <strong>Administrators</strong> of Malla Reddy University.
                        <br />
                        Please use your designated credentials to log in.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;