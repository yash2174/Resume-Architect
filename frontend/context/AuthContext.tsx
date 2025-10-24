import React, { createContext, useState, useEffect, useContext } from 'react';
import type { User, AuthContextType } from '../types';
import { authService } from '../services/authService';

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false,
    isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyUserToken = async () => {
            if (token) {
                try {
                    // In a real app, you'd verify the token with your backend
                    const verifiedUser = await authService.verifyToken(token);
                    setUser(verifiedUser);
                } catch (error) {
                    console.error("Token verification failed", error);
                    localStorage.removeItem('authToken');
                    setToken(null);
                    setUser(null);
                }
            }
            setIsLoading(false);
        };
        verifyUserToken();
    }, [token]);

    const login = (newToken: string, userData: User) => {
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            token, 
            login, 
            logout, 
            isAuthenticated: !!token,
            isLoading 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};