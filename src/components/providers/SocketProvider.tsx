import { useEffect, createContext, useContext, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { socketClient } from '@/lib/socket'
import { useCurrentUser } from '@/hooks/useAuth'
import { SocketEvents, type NotificationPayload, type TaskEventPayload } from '@/types/socket'
import { taskKeys } from '@/hooks/useTasks'
import { notificationKeys } from '@/hooks/useNotification'
import type { Notification, NotificationCount } from '@/types/notification'
import type { Task } from '@/types/task'

interface SocketContextValue {
    isConnected: boolean
}

const SocketContext = createContext<SocketContextValue>({ isConnected: false })

export const useSocketContext = () => useContext(SocketContext)

interface SocketProviderProps {
    children: ReactNode
}

/**
 * SocketProvider establishes WebSocket connection when user is authenticated
 * and handles real-time updates by directly updating TanStack Query cache
 */
export function SocketProvider({ children }: SocketProviderProps) {
    const queryClient = useQueryClient()
    const { data: user } = useCurrentUser()

    useEffect(() => {
        // Only connect if user is authenticated
        if (!user) return

        // Connect socket - we use cookie-based auth, so no token needed in handshake
        // The server will read the JWT from cookies
        const socket = socketClient.connect('')

        // === Task Event Handlers ===
        const handleTaskCreated = (payload: TaskEventPayload) => {
            console.log('Socket: Task created', payload)
            // Invalidate task lists to refetch (new task needs full data)
            queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
        }

        const handleTaskUpdated = (payload: TaskEventPayload) => {
            console.log('Socket: Task updated', payload)
            if (payload.task) {
                // Directly update specific task in cache
                queryClient.setQueryData<Task>(
                    taskKeys.detail(payload.taskId),
                    payload.task as Task
                )
                // Update task in list caches
                queryClient.setQueriesData<Task[]>(
                    { queryKey: taskKeys.lists() },
                    (oldTasks) => {
                        if (!oldTasks) return oldTasks
                        return oldTasks.map((task) =>
                            task.id === payload.taskId ? (payload.task as Task) : task
                        )
                    }
                )
            }
        }

        const handleTaskDeleted = (payload: { taskId: string }) => {
            console.log('Socket: Task deleted', payload)
            // Remove from detail cache
            queryClient.removeQueries({ queryKey: taskKeys.detail(payload.taskId) })
            // Remove from list caches
            queryClient.setQueriesData<Task[]>(
                { queryKey: taskKeys.lists() },
                (oldTasks) => {
                    if (!oldTasks) return oldTasks
                    return oldTasks.filter((task) => task.id !== payload.taskId)
                }
            )
        }

        // === Notification Event Handlers ===
        const handleNotification = (notification: NotificationPayload) => {
            console.log('Socket: Notification received', notification)

            // Add to notifications list cache
            queryClient.setQueryData<Notification[]>(
                notificationKeys.all,
                (oldNotifications) => {
                    if (!oldNotifications) return [notification as unknown as Notification]
                    // Prepend new notification to the list
                    return [notification as unknown as Notification, ...oldNotifications]
                }
            )

            // Increment unread count
            queryClient.setQueryData<NotificationCount>(
                notificationKeys.unreadCount,
                (oldCount) => ({
                    count: (oldCount?.count ?? 0) + 1
                })
            )
        }

        // === Subscribe to Events ===
        socket.on(SocketEvents.TASK_CREATED, handleTaskCreated)
        socket.on(SocketEvents.TASK_UPDATED, handleTaskUpdated)
        socket.on(SocketEvents.TASK_DELETED, handleTaskDeleted)
        socket.on(SocketEvents.NOTIFICATION, handleNotification)
        socket.on(SocketEvents.TASK_ASSIGNED, handleTaskCreated) // Also refetch on assignment

        // === Cleanup ===
        return () => {
            socket.off(SocketEvents.TASK_CREATED, handleTaskCreated)
            socket.off(SocketEvents.TASK_UPDATED, handleTaskUpdated)
            socket.off(SocketEvents.TASK_DELETED, handleTaskDeleted)
            socket.off(SocketEvents.NOTIFICATION, handleNotification)
            socket.off(SocketEvents.TASK_ASSIGNED, handleTaskCreated)
        }
    }, [user, queryClient])

    const isConnected = socketClient.isConnected()

    return (
        <SocketContext.Provider value={{ isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}
