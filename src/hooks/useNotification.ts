
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationService } from '@/services/notification.service'

export const notificationKeys = {
    all: ['notifications'] as const,
    unreadCount: ['notifications', 'unread'] as const,
}

export function useNotifications() {
    return useQuery({
        queryKey: notificationKeys.all,
        queryFn: notificationService.getAll,
    })
}

export function useUnreadCount() {
    return useQuery({
        queryKey: notificationKeys.unreadCount,
        queryFn: notificationService.getUnreadCount,
        refetchInterval: 30000, // Poll every 30 seconds
    })
}

export function useMarkAsRead() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: notificationService.markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKeys.all })
            queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount })
        },
    })
}

export function useMarkAllAsRead() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: notificationService.markAllAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKeys.all })
            queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount })
        },
    })
}
