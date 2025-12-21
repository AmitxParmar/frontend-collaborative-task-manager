import { Link, useLocation } from "@tanstack/react-router"
import {
    LayoutDashboard,
    CheckSquare,
    Calendar,
    Settings,
    Users,
    FolderOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DashboardSidebar({ className }: SidebarProps) {
    const { pathname } = useLocation()

    const navItems = [
        { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
        // Placeholder links for now
        { icon: CheckSquare, label: "My Tasks", href: "/dashboard/tasks" },
        { icon: FolderOpen, label: "Projects", href: "/dashboard/projects" },
        { icon: Users, label: "Team", href: "/dashboard/team" },
        { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
        { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ]

    return (
        <div className={cn("pb-12 min-h-screen w-64 border-r border-border/40 bg-muted/10 hidden md:block", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                        Menu
                    </h2>
                    <div className="space-y-1">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                            return (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className={cn(
                                        "w-full flex items-center justify-start gap-3 mb-1 px-4 py-2 font-normal rounded-md transition-colors",
                                        isActive
                                            ? "bg-secondary/50 text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                        Workspaces
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start gap-3 font-normal text-muted-foreground hover:text-foreground">
                            <span className="flex h-2 w-2 rounded-full bg-blue-500" />
                            Marketing
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 font-normal text-muted-foreground hover:text-foreground">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-500" />
                            Engineering
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 font-normal text-muted-foreground hover:text-foreground">
                            <span className="flex h-2 w-2 rounded-full bg-green-500" />
                            Design
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
