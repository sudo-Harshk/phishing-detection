// API Configuration
// Uses environment variable in Docker, falls back to localhost for development

export const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
