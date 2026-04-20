import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// --- Global Styles ---
// This file contains the main theme and styles for the entire portal.
import './App.css'; 

// --- Third-Party Library Styles ---
// Required for the react-slick slider to function correctly.
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// --- Main Application Component ---
import App from './App';

// Get the root element from the HTML.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application.
root.render(
  <React.StrictMode>
    {/* BrowserRouter enables routing throughout the application. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);