import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute( {children} ) {
    const token  = JSON.parse(localStorage.getItem('user'))?.token
    return token ? children : <Navigate to={'/login'}/>
}

export default ProtectedRoute;