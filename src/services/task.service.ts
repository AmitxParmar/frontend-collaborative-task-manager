import { apiClient } from '@/lib/api-client'
import type {
    Task,
    CreateTaskDto,
    UpdateTaskDto,
    TaskQueryDto,
} from '@/types/task'

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
        const response = await apiClient.post<Task>('/tasks', data)
        return response.data
    },

    /**
     * GET /tasks
     * Get all tasks with optional filtering
     */
    getAll: async (filters?: TaskQueryDto): Promise<Task[]> => {
        const response = await apiClient.get<Task[]>('/tasks', {
            params: filters,
        })
        return response.data
    },

    /**
     * GET /tasks/:id
     * Get a task by ID
     */
    getById: async (id: string): Promise<Task> => {
        const response = await apiClient.get<Task>(`/tasks/${id}`)
        return response.data
    },

    /**
     * PUT /tasks/:id
     * Update a task
     */
    update: async (id: string, data: UpdateTaskDto): Promise<Task> => {
        const response = await apiClient.put<Task>(`/tasks/${id}`, data)
        return response.data
    },

    /**
     * DELETE /tasks/:id
     * Delete a task
     */
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/tasks/${id}`)
    },
}
