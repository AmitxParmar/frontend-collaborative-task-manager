import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useGetTasks } from "@/hooks/useTasks"
import { TaskList } from "./task-list"
import { Loader2, ArrowUpDown, X } from "lucide-react"
import { useState } from "react"
import { Status, Priority } from "@/types/task"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface AllTasksDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function AllTasksDialog({ open, onOpenChange }: AllTasksDialogProps) {
    const [status, setStatus] = useState<Status | undefined>()
    const [priority, setPriority] = useState<Priority | undefined>()
    const [sortByDueDate, setSortByDueDate] = useState<'asc' | 'desc' | undefined>()

    // Enable query only when dialog is open
    const { data: tasks, isLoading, isError } = useGetTasks(
        { status, priority, sortByDueDate },
        { enabled: open }
    )

    const handleClearFilters = () => {
        setStatus(undefined)
        setPriority(undefined)
        setSortByDueDate(undefined)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent className="max-w-[98vw] min-w-[78vw] md:h-[88vh] flex flex-col justify-start overflow-y-auto">

                <DialogHeader className="p-4 md:p-6 pb-2 md:pb-4 border-b">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <DialogTitle className="text-xl md:text-2xl font-bold">All Tasks</DialogTitle>

                        <div className="grid grid-cols-[1fr,1fr] gap-2 md:flex md:items-center md:gap-3">
                            <Select
                                value={status || "ALL"}
                                onValueChange={(val) => setStatus(val === "ALL" ? undefined : val as Status)}
                            >
                                <SelectTrigger className="w-full md:w-[130px] h-9 text-xs md:text-sm">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Statuses</SelectItem>
                                    {Object.values(Status).map((s) => (
                                        <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={priority || "ALL"}
                                onValueChange={(val) => setPriority(val === "ALL" ? undefined : val as Priority)}
                            >
                                <SelectTrigger className="w-full md:w-[130px] h-9 text-xs md:text-sm">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Priorities</SelectItem>
                                    {Object.values(Priority).map((p) => (
                                        <SelectItem key={p} value={p}>{p}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSortByDueDate(curr => curr === 'asc' ? 'desc' : 'asc')}
                                title="Sort by Due Date"
                                className="h-9 w-full md:w-9 px-0 md:px-0 col-span-1"
                            >
                                <ArrowUpDown className={`h-4 w-4 ${sortByDueDate ? 'text-primary' : 'text-muted-foreground'}`} />
                                <span className="md:hidden ml-2 text-xs">Sort</span>
                            </Button>

                            <Button
                                variant={status || priority || sortByDueDate ? "secondary" : "ghost"}
                                size="sm"
                                onClick={handleClearFilters}
                                className={`h-9 w-full md:w-auto text-xs col-span-1 ${!status && !priority && !sortByDueDate ? 'hidden md:flex opacity-50' : ''}`}
                                disabled={!status && !priority && !sortByDueDate}
                            >
                                <X className="h-3.5 w-3.5 md:mr-1" />
                                <span className="md:inline">Clear</span>
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    {isLoading && (
                        <div className="flex h-full items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}

                    {isError && (
                        <div className="flex h-full items-center justify-center text-red-500">
                            Failed to load tasks. Please try again.
                        </div>
                    )}

                    {tasks && (
                        <div className="pb-4">
                            <TaskList tasks={tasks} view="grid" />
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
