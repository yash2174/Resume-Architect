import type { User } from '../types';

interface AuthResponse {
    token: string;
    user: User;
}

const API_URL = 'http://localhost:5000/api/auth'; // URL for your running backend server

export const authService = {
    login: async (email: string, password?: string): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        return response.json();
    },

    signup: async (email: string, password?: string): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Signup failed');
        }

        return response.json();
    },

    verifyToken: async (token: string): Promise<User> => {
         const response = await fetch(`${API_URL}/verify`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
         });

         if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Token verification failed');
         }

         const data = await response.json();
         return data.user;
    }
};