
import { apiClient } from '@/lib/api-client'
import type { User } from '@/types/task'

interface ApiResponse<T> {
    message: string
    data: T
}

export const userService = {
    /**
     * Get all users
     */
    getAll: async (): Promise<User[]> => {
        const response = await apiClient.get<ApiResponse<User[]>>('/users')
        return response.data.data
    },
}
