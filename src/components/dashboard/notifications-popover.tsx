import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Bell, Check, Clock, AlertTriangle } from "lucide-react"

export function NotificationsPopover() {
    // Dummy notification data
    const notifications = [
        {
            id: 1,
            title: "Task Assigned",
            description: "You have been assigned to 'Update Dashboard UI'",
            time: "2 mins ago",
            icon: Bell,
            color: "text-blue-500",
            unread: true
        },
        {
            id: 2,
            title: "Deadline Approaching",
            description: "'API Integration' is due in 1 hour'",
            time: "1 hour ago",
            icon: AlertTriangle,
            color: "text-orange-500",
            unread: true
        },
        {
            id: 3,
            title: "Task Completed",
            description: "John completed 'Refactor Login Flow'",
            time: "3 hours ago",
            icon: Check,
            color: "text-green-500",
            unread: false
        },
        {
            id: 4,
            title: "Meeting Reminder",
            description: "Daily standup in 15 minutes",
            time: "5 hours ago",
            icon: Clock,
            color: "text-purple-500",
            unread: false
        }
    ]

    const unreadCount = notifications.filter(n => n.unread).length

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                    {unreadCount > 0 && (
                        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">
                            {unreadCount} new
                        </span>
                    )}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                        <div className="divide-y divide-border/50">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors ${notification.unread ? 'bg-muted/30' : ''}`}
                                >
                                    <div className={`mt-0.5 ${notification.color}`}>
                                        <notification.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className={`text-sm leading-none ${notification.unread ? 'font-medium' : 'text-muted-foreground'}`}>
                                            {notification.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {notification.description}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground/70">
                                            {notification.time}
                                        </p>
                                    </div>
                                    {notification.unread && (
                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5" />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground text-sm">
                            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            No notifications
                        </div>
                    )}
                </div>
                <div className="p-2 border-t bg-muted/20">
                    <Button variant="ghost" size="sm" className="w-full text-xs h-8">
                        Mark all as read
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
