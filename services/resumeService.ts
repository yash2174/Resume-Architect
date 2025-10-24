import type { ResumeData, StyleConfig } from '../types';

interface ResumeState {
    data: ResumeData;
    style: StyleConfig;
}

const API_URL = 'http://localhost:5000/api/resume'; // URL for your running backend server

export const resumeService = {
    getResume: async (token: string): Promise<ResumeState | null> => {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 404) {
            return null; // No resume found for this user
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch resume');
        }

        return response.json();
    },

    saveResume: async (resumeState: ResumeState, token: string): Promise<ResumeState> => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(resumeState),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save resume');
        }

        return response.json();
    }
};