import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, MoreHorizontal, AlertCircle } from "lucide-react"

export interface Task {
    id: string
    title: string
    description: string
    status: "To Do" | "In Progress" | "In Review" | "Done"
    priority: "Low" | "Medium" | "High"
    dueDate: string
    assignees: { name: string; avatar?: string }[]
}

interface TaskCardProps {
    task: Task
}

export function TaskCard({ task }: TaskCardProps) {
    const statusColor = {
        "To Do": "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20",
        "In Progress": "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
        "In Review": "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20",
        "Done": "bg-green-500/10 text-green-600 hover:bg-green-500/20",
    }

    const priorityColor = {
        "Low": "text-slate-500",
        "Medium": "text-orange-500",
        "High": "text-red-500",
    }

    return (
        <Card className="group relative overflow-hidden transition-all hover:shadow-md border-border/50 hover:border-border/80 bg-card/60 rounded-xl">
            <CardHeader className="p-4 pb-2 space-y-0">
                <div className="flex items-start justify-between">
                    <Badge variant="secondary" className={`mb-2 font-medium border-0 ${statusColor[task.status]}`}>
                        {task.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
                <h3 className="font-semibold leading-tight tracking-tight line-clamp-2">
                    {task.title}
                </h3>
            </CardHeader>
            <CardContent className="p-4 pt-2 pb-3">
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                    {task.description}
                </p>
            </CardContent>
            <CardFooter className="p-4 pt-2 flex items-center justify-between border-t border-border/30 bg-muted/5 mt-auto">
                <div className="flex items-center gap-3">
                    <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                    {task.priority === 'High' && (
                        <div className="flex items-center text-xs font-medium text-red-500">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            High
                        </div>
                    )}
                </div>

                <div className="flex -space-x-2">
                    {task.assignees.map((assignee, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-background ring-2 ring-transparent transition-transform hover:z-10 hover:scale-110">
                            <AvatarImage src={assignee.avatar} />
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                {assignee.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    ))}
                </div>
            </CardFooter>
        </Card>
    )
}
