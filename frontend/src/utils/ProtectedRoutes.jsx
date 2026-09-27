import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {  useAuth } from '../Context/AuthContext'
const ProtectedRoutes = () => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return (
            <>
                <h1>Loading.........</h1>
            </>
        )
    }
    if(!isAuthenticated){
        return <Navigate to="/signin" replace={true}/>    
    }
    return <Outlet />;
}

export default ProtectedRoutes