import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (token) {
        return <Navigate to="/user" replace />;
    }
    return children;
};

export default RedirectIfAuthenticated;