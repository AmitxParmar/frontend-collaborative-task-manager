import { useState, type FormEvent } from "react"
import { useUpdateTask } from "@/hooks/useTasks"
import { type Task } from "@/types/task"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface EditTaskDialogProps {
    task: Task
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditTaskDialog({ task, open, onOpenChange }: EditTaskDialogProps) {
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    // Format date to YYYY-MM-DD for input type="date"
    const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString)
        return date.toISOString().split('T')[0]
    }
    const [dueDate, setDueDate] = useState(formatDateForInput(task.dueDate))

    const { mutate: updateTask, isPending } = useUpdateTask()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        updateTask({
            id: task.id,
            data: {
                title,
                description,
                dueDate: new Date(dueDate).toISOString()
            }
        }, {
            onSuccess: () => {
                onOpenChange(false)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Task title"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Task description"
                            rows={3}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            id="dueDate"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
