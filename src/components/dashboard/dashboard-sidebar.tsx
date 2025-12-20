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
    const navItems = [
        { icon: LayoutDashboard, label: "Overview", active: true },
        { icon: CheckSquare, label: "My Tasks", active: false },
        { icon: FolderOpen, label: "Projects", active: false },
        { icon: Users, label: "Team", active: false },
        { icon: Calendar, label: "Calendar", active: false },
        { icon: Settings, label: "Settings", active: false },
    ]

    return (
        <div className={cn("pb-12 min-h-screen w-64 border-r border-border/40 bg-muted/10 hidden md:block", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                        Menu
                    </h2>
                    <div className="space-y-1">
                        {navItems.map((item, index) => (
                            <Button
                                key={index}
                                variant={item.active ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start gap-3 mb-1 font-normal",
                                    item.active
                                        ? "bg-secondary/50 text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", item.active ? "text-primary" : "text-muted-foreground")} />
                                {item.label}
                            </Button>
                        ))}
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
