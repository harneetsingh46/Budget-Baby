import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PublicRoutes = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <>
                <h1>Loading.........</h1>
            </>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoutes;