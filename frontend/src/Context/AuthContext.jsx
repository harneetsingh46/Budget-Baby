import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../ApiClient/interceptor.js";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const login = async (loginData) => {
        try {
            const response = await apiClient.post("auth/signin", loginData);
            setUser(response.data.data)
            return response.data.data
        } catch (error) {
            console.log(error.message)
        }
    }

    const getUser = async () => {
        try {
            const response = await apiClient.get("auth/get-user");
            setUser(response.data.data)
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    const isAuthenticated = !!user
    const value = {
        user,
        setUser,
        login,
        loading,
        isAuthenticated,
    }
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}
