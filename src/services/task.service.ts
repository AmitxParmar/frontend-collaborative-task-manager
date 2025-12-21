import { apiClient } from '@/lib/api-client'
import type {
    Task,
    CreateTaskDto,
    UpdateTaskDto,
    TaskQueryDto,
} from '@/types/task'

interface ApiResponse<T> {
    message: string
    data: T
}

/**
 * Task Service - All task API calls
 * Routes match backend: /tasks/*
 * All routes require authentication
 */
export const taskService = {
    /**
     * POST /tasks
     * Create a new task
     */
    create: async (data: CreateTaskDto): Promise<Task> => {
        const response = await apiClient.post<ApiResponse<Task>>('/tasks', data)
        return response.data.data
    },

    /**
     * GET /tasks
     * Get all tasks with optional filtering
     */
    getAll: async (filters?: TaskQueryDto): Promise<Task[]> => {
        const response = await apiClient.get<ApiResponse<Task[]>>('/tasks', {
            params: filters,
        })
        return response.data.data
    },

    /**
     * GET /tasks/:id
     * Get a task by ID
     */
    getById: async (id: string): Promise<Task> => {
        const response = await apiClient.get<ApiResponse<Task>>(`/tasks/${id}`)
        return response.data.data
    },

    /**
     * PUT /tasks/:id
     * Update a task
     */
    update: async (id: string, data: UpdateTaskDto): Promise<Task> => {
        const response = await apiClient.put<ApiResponse<Task>>(`/tasks/${id}`, data)
        return response.data.data
    },

    /**
     * DELETE /tasks/:id
     * Delete a task
     */
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/tasks/${id}`)
    },
}
