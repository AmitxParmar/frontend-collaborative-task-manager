import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useGetTasks } from "@/hooks/useTasks"
import { TaskList } from "./task-list"
import { Loader2 } from "lucide-react"

interface AllTasksDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AllTasksDialog({ open, onOpenChange }: AllTasksDialogProps) {
    // Enable query only when dialog is open
    const { data: tasks, isLoading, isError } = useGetTasks(undefined, { enabled: open })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[98vw] min-w-[78vw] md:h-[88vh] flex flex-col justify-start overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">All Tasks</DialogTitle>
                </DialogHeader>

                <div className="mt-4 w-full">
                    {isLoading && (
                        <div className="flex h-40 items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}

                    {isError && (
                        <div className="flex h-40 items-center justify-center text-red-500">
                            Failed to load tasks. Please try again.
                        </div>
                    )}

                    {tasks && (
                        <TaskList tasks={tasks} view="grid" />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
