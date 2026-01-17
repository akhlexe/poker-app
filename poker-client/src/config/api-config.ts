export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5073',
    endpoints: {
        health: '/health',
        tables: '/tables',
        table: (id: string) => `/tables/${id}`,
    }
} as const;