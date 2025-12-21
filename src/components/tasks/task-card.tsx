import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Pencil } from "lucide-react"
import { type Task, Status } from "@/types/task"
import { ChangeTaskStatus } from "./change-task-status"
import { ChangeTaskPriority } from "./change-task-priority"
import { EditTaskDialog } from "./edit-task-dialog"

interface TaskCardProps {
    task: Task
}

function timeAgo(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    let interval = seconds / 31536000
    if (interval > 1) return Math.floor(interval) + " years ago"
    interval = seconds / 2592000
    if (interval > 1) return Math.floor(interval) + " months ago"
    interval = seconds / 86400
    if (interval > 1) return Math.floor(interval) + " days ago"
    interval = seconds / 3600
    if (interval > 1) return Math.floor(interval) + " hours ago"
    interval = seconds / 60
    if (interval > 1) return Math.floor(interval) + " minutes ago"
    return Math.floor(seconds) + " seconds ago"
}

export function TaskCard({ task }: TaskCardProps) {
    const [isEditOpen, setIsEditOpen] = useState(false)

    return (
        <>
            <EditTaskDialog
                task={task}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
            />
            {/* Outer container mimicking JobCard structure */}
            <div className="p-2 mx-auto capitalize border-l-8 border-l-gray-400 border bg-card/60 border-black/10 max-h-[360px] hover:border hover:border-r-8 hover:shadow-lg transition-all rounded-3xl w-full h-full min-h-[320px] justify-between group space-y-2 flex flex-col">

                {/* Inner card with status logic for bg color */}
                <div
                    className={`${task.status === Status.TODO || task.status === Status.IN_PROGRESS ? "bg-cyan-200/20" : "bg-slate-500/10"
                        } border-2 border-black/5 h-4/5 min-h-[80%] max-h-[80%] rounded-2xl p-4 w-full flex flex-col relative justify-between`}
                >
                    {/* Closed Stamp */}
                    <div
                        className={`${task.status !== Status.COMPLETED ? "hidden " : "block "
                            } absolute -rotate-45 inset-y-1/3 z-10 font-bold group-hover:hidden text-5xl bg-background/80 backdrop-blur-sm shadow-xl duration-700 transition-all rounded-xl px-4 py-2 text-red-600 border-4 border-red-600`}
                    >
                        Closed!!
                    </div>

                    {/* Header: Date and Edit Button */}
                    <div className="flex flex-row justify-between items-center z-20">
                        <span className="text-sm rounded-full bg-background/70 border border-border shadow-sm text-center align-center w-fit flex flex-row items-center py-2 px-3 font-bold text-foreground">
                            <span>
                                <Clock className="w-4 h-4 align-baseline mr-2" />
                            </span>
                            <span>{timeAgo(task.createdAt)}</span>
                        </span>

                        <div
                            title="Edit Task"
                            className="h-10 w-10 border-2 rounded-full border-background bg-background/50 hover:bg-background flex items-center justify-center cursor-pointer transition-colors"
                            onClick={() => setIsEditOpen(true)}
                        >
                            <Pencil className="h-4 w-4 text-foreground/80" />
                        </div>
                    </div>

                    {/* Content: Title, Creator, Tags */}
                    <div className="mt-2 flex flex-row items-center justify-between z-20">
                        <div className="flex-1 pr-2">
                            <p className="font-bold text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                {task.creator?.name || "Unknown"}
                            </p>
                            <h3 className="text-ellipsis line-clamp-2 overflow-hidden w-full text-2xl font-bold tracking-tight leading-none">
                                {task.title}
                            </h3>
                        </div>
                        <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                {task.creator?.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Tags / Priority Badges */}
                    <div className="flex justify-start overflow-hidden flex-row flex-wrap gap-1 py-4 font-bold">
                        <ChangeTaskPriority taskId={task.id} priority={task.priority} />
                        <ChangeTaskStatus taskId={task.id} status={task.status} />
                    </div>
                </div>

                {/* Footer: Due Date / Assignee */}
                <div className="px-2.5 items-center flex flex-row justify-between pb-2">
                    <div className="mr-2 p-0.5 wrap-break-word text-wrap overflow-hidden grid grid-flow-row leading-none truncate">
                        <div className="font-bold h-fit text-foreground/80 text-sm">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div className="text-muted-foreground h-fit font-bold text-xs mt-1">
                            {task.assignee ? `Assigned to: ${task.assignee.name}` : "Unassigned"}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
