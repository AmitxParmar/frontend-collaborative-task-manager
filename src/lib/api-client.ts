import axios from 'axios'
import { authService } from "@/services/auth.service"

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

let isRefreshing = false
let refreshSubscribers: Array<() => void> = []

const subscribeTokenRefresh = (cb: () => void) => {
    refreshSubscribers.push(cb)
}

const onRefreshed = () => {
    refreshSubscribers.forEach((cb) => cb())
    refreshSubscribers = []
}

// Response interceptor for handling errors and automatic token refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response, config } = error
        const requestUrl: string | undefined = config?.url
        const isAuthRefreshEndpoint = requestUrl?.includes(`/api/v1/${ENV}/auth/refresh`)
        const errorCode = response?.data?.code

        // Check if this is an authentication error that should trigger token refresh
        const shouldRefreshToken =
            response?.status === 401 &&
            (errorCode === "ACCESS_TOKEN_EXPIRED" || errorCode === "ACCESS_TOKEN_INVALID")

        if (shouldRefreshToken) {
            // If the refresh call itself failed with 401, redirect immediately
            if (isAuthRefreshEndpoint) {
                isRefreshing = false
                refreshSubscribers = []
                if (typeof window !== "undefined") {
                    window.location.href = "/"
                }
                return Promise.reject(error)
            }

            if (config._retry) {
                // Already retried once, do not loop
                if (typeof window !== "undefined") {
                    window.location.href = "/"
                }
                return Promise.reject(error)
            }

            if (isRefreshing) {
                // If already refreshing, subscribe to the refresh completion
                return new Promise((resolve, reject) => {
                    subscribeTokenRefresh(() => {
                        apiClient(config).then(resolve).catch(reject)
                    })
                })
            }

            config._retry = true
            isRefreshing = true

            try {
                // Try to refresh the token - server will set new cookies
                await authService.refresh()
                isRefreshing = false
                onRefreshed()
                // Retry the original request with new token
                return apiClient(config)
            } catch (refreshError) {
                isRefreshing = false
                refreshSubscribers = []
                // Refresh failed, redirect to login
                if (typeof window !== "undefined") {
                    window.location.href = "/"
                }
                return Promise.reject(refreshError)
            }
        }

        // For other authentication errors (missing tokens, user not found, etc.), redirect immediately
        if (
            response?.status === 401 &&
            (errorCode === "ACCESS_TOKEN_MISSING" ||
                errorCode === "REFRESH_TOKEN_MISSING" ||
                errorCode === "REFRESH_TOKEN_EXPIRED" ||
                errorCode === "REFRESH_TOKEN_INVALID" ||
                errorCode === "USER_NOT_FOUND")
        ) {
            if (typeof window !== "undefined") {
                window.location.href = "/"
            }
        }

        return Promise.reject(error)
    }
)
