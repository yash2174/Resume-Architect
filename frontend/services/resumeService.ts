import type { ResumeData, StyleConfig } from '../types';

interface ResumeState {
    data: ResumeData;
    style: StyleConfig;
}

// Use environment variable for production; fallback to localhost for dev
const API_BASE_URL = 'https://resume-architect-3.onrender.com/api';
const RESUME_API_URL = `${API_BASE_URL}/resume`;


export const resumeService = {
    getResume: async (token: string): Promise<ResumeState | null> => {
        const response = await fetch(RESUME_API_URL, {
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
        const response = await fetch(RESUME_API_URL, {
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
