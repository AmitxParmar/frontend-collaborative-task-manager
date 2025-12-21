import { useMutation, useQuery } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import type { RegisterDto, LoginDto } from '@/types/auth'

/**
 * Hook for user registration
 */
export function useRegister() {
    return useMutation({
        mutationFn: (data: RegisterDto) => authService.register(data),
        onSuccess: (data) => {
            console.log('Registration successful:', data)
            // You can add navigation or other side effects here
        },
        onError: (error: any) => {
            console.error('Registration failed:', error.response?.data || error.message)
        },
    })
}

/**
 * Hook for user login
 */
export function useLogin() {
    return useMutation({
        mutationFn: (data: LoginDto) => authService.login(data),
        onSuccess: (data) => {
            console.log('Login successful:', data)
            // You can add navigation or other side effects here
        },
        onError: (error: any) => {
            console.error('Login failed:', error.response?.data || error.message)
        },
    })
}

/**
 * Hook for user logout
 */
export function useLogout() {
    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            console.log('Logout successful')
            // Clear any local state, redirect to login, etc.
        },
        onError: (error: any) => {
            console.error('Logout failed:', error.response?.data || error.message)
        },
    })
}

/**
 * Hook for logging out from all devices
 */
export function useLogoutAll() {
    return useMutation({
        mutationFn: () => authService.logoutAll(),
        onSuccess: () => {
            console.log('Logged out from all devices')
            // Clear any local state, redirect to login, etc.
        },
        onError: (error: any) => {
            console.error('Logout all failed:', error.response?.data || error.message)
        },
    })
}

/**
 * Hook for refreshing JWT tokens
 */
export function useRefreshToken() {
    return useMutation({
        mutationFn: () => authService.refresh(),
        onSuccess: () => {
            console.log('Token refreshed successfully')
        },
        onError: (error: any) => {
            console.error('Token refresh failed:', error.response?.data || error.message)
        },
    })
}

/**
 * Hook for fetching current authenticated user
 */
export function useCurrentUser() {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: () => authService.me(),
        retry: false, // Don't retry if unauthorized
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

