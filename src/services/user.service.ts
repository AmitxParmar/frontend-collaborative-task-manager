
import { apiClient } from '@/lib/api-client'
import type { User } from '@/types/task'

interface ApiResponse<T> {
    message: string
    data: T
}

export const userService = {
    /**
     * Get all users, optionally filtered by search query
     */
    getAll: async (search?: string): Promise<User[]> => {
        const params = search ? { search } : undefined
        const response = await apiClient.get<ApiResponse<User[]>>('/users', { params })
        return response.data.data
    },
}
