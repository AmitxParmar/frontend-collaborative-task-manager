import axios from 'axios'

// Dynamically construct API URL based on environment
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
const ENV = import.meta.env.MODE === 'production' ? 'production' : 'development'
const API_URL = `${BASE_URL}/v1/${ENV}`

export const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Important for cookies (JWT tokens)
    headers: {
        'Content-Type': 'application/json',
    },
})

// Response interceptor for handling errors
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401) {
            // Could trigger logout or token refresh here
            console.error('Unauthorized access')
        }
        return Promise.reject(error)
    }
)
