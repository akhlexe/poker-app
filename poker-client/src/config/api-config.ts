export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
    endpoints: {
        health: '/health',
    }
} as const;