import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/services/task.service'
import type { CreateTaskDto, UpdateTaskDto, TaskQueryDto, Task } from '@/types/task'

// Query keys
export const taskKeys = {
    all: ['tasks'] as const,
    lists: () => [...taskKeys.all, 'list'] as const,
    list: (filters?: TaskQueryDto) => [...taskKeys.lists(), filters] as const,
    details: () => [...taskKeys.all, 'detail'] as const,
    detail: (id: string) => [...taskKeys.details(), id] as const,
}

/**
 * Hook to create a new task
 */
export function useCreateTask() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateTaskDto) => taskService.create(data),
        onSuccess: (newTask) => {
            // Invalidate and refetch task lists
            queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
            console.log('Task created successfully:', newTask)
        },
        onError: (error: any) => {
            console.error('Failed to create task:', error.response?.data || error.message)
        },
    })
}

/**
 * Hook to get all tasks with optional filters
 */
export function useGetTasks(filters?: TaskQueryDto) {
    return useQuery({
        queryKey: taskKeys.list(filters),
        queryFn: () => taskService.getAll(filters),
        staleTime: 30 * 1000, // 30 seconds
    })
}

/**
 * Hook to get a single task by ID
 */
export function useGetTask(id: string) {
    return useQuery({
        queryKey: taskKeys.detail(id),
        queryFn: () => taskService.getById(id),
        enabled: !!id,
        staleTime: 30 * 1000,
    })
}

/**
 * Hook to update a task
 */
export function useUpdateTask() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateTaskDto }) =>
            taskService.update(id, data),
        onMutate: async ({ id, data }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: taskKeys.detail(id) })

            // Snapshot previous value
            const previousTask = queryClient.getQueryData<Task>(taskKeys.detail(id))

            // Optimistically update
            if (previousTask) {
                queryClient.setQueryData<Task>(taskKeys.detail(id), {
                    ...previousTask,
                    ...data,
                })
            }

            return { previousTask }
        },
        onError: (error: any, { id }, context) => {
            // Rollback on error
            if (context?.previousTask) {
                queryClient.setQueryData(taskKeys.detail(id), context.previousTask)
            }
            console.error('Failed to update task:', error.response?.data || error.message)
        },
        onSuccess: (updatedTask, { id }) => {
            // Update cache with server response
            queryClient.setQueryData(taskKeys.detail(id), updatedTask)
            // Invalidate lists to refetch
            queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
            console.log('Task updated successfully:', updatedTask)
        },
    })
}

/**
 * Hook to delete a task
 */
export function useDeleteTask() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => taskService.delete(id),
        onSuccess: (_, id) => {
            // Remove from cache
            queryClient.removeQueries({ queryKey: taskKeys.detail(id) })
            // Invalidate lists
            queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
            console.log('Task deleted successfully')
        },
        onError: (error: any) => {
            console.error('Failed to delete task:', error.response?.data || error.message)
        },
    })
}

/**
 * Main tasks hook that combines all task operations
 * Provides a unified interface for task management
 * 
 * @example
 * // Use individual hooks
 * const { mutate: createTask } = useCreateTask()
 * 
 * // Or use unified hook
 * const tasks = useTasks({ status: 'TODO' })
 * tasks.create.mutate({ title, description, ... })
 */
export function useTasks(filters?: TaskQueryDto) {
    const createTask = useCreateTask()
    const getTasks = useGetTasks(filters)
    const updateTask = useUpdateTask()
    const deleteTask = useDeleteTask()

    return {
        // Mutations
        create: createTask,
        update: updateTask,
        delete: deleteTask,

        // Query
        tasks: getTasks,

        // Convenience properties
        data: getTasks.data,
        isLoading: getTasks.isLoading,
        isError: getTasks.isError,
        error: getTasks.error,
    }
}
