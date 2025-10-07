import { Navigate, Outlet } from "react-router";
import { useState, useEffect } from "react";
import { getAuthState } from "@/lib/utils";
import Preloader from "./preloader";
import AuthContext from "@/contexts/auth";

export default function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState<Boolean | null>(null);

    useEffect(() => {
        getAuthState()
        .then(data => {
            setIsAuthenticated(data)
        })
        .catch(error => console.error(error));
    }, [])

    if(isAuthenticated === false) return <Navigate to={'/admin-login'} />;

    if(isAuthenticated === null) return <Preloader />

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <Outlet />
        </AuthContext.Provider>
    )
}