import { createFileRoute } from '@tanstack/react-router'
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { StatCard } from "@/components/dashboard/stat-card"
import { TaskList } from "@/components/dashboard/task-list"
import { CheckCircle2, Clock, ListTodo, TrendingUp } from "lucide-react"

export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  const stats = [
    {
      title: "Total Tasks",
      value: "128",
      icon: ListTodo,
      description: "Total tasks in all projects",
      trend: "up" as const,
      trendValue: "+12%"
    },
    {
      title: "In Progress",
      value: "42",
      icon: Clock,
      description: "Currently active tasks",
      trend: "neutral" as const,
      trendValue: "+2"
    },
    {
      title: "Completed",
      value: "64",
      icon: CheckCircle2,
      description: "Tasks completed this month",
      trend: "up" as const,
      trendValue: "+24%"
    },
    {
      title: "Productivity",
      value: "92%",
      icon: TrendingUp,
      description: "Weekly completion rate",
      trend: "up" as const,
      trendValue: "+5%"
    }
  ]

  // Dummy tasks data
  const tasks = [
    {
      id: "1",
      title: "Implement Authentication Flow",
      description: "Create login and register pages with JWT integration and user validation.",
      status: "In Progress" as const,
      priority: "High" as const,
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
      assignees: [{ name: "Alex" }, { name: "Sam" }]
    },
    {
      id: "2",
      title: "Design Dashboard Mockups",
      description: "Create high-fidelity mockups for the main dashboard view including stats and charts.",
      status: "To Do" as const,
      priority: "Medium" as const,
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
      assignees: [{ name: "Jordan" }]
    },
    {
      id: "3",
      title: "Fix Navigation Bug",
      description: "Sidebar navigation fails to highlight active route on mobile devices.",
      status: "Done" as const,
      priority: "High" as const,
      dueDate: new Date(Date.now() - 86400000).toISOString(),
      assignees: [{ name: "Casey" }]
    },
    {
      id: "4",
      title: "API Documentation",
      description: "Document all API endpoints using Swagger/OpenAPI specification.",
      status: "In Review" as const,
      priority: "Low" as const,
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
      assignees: [{ name: "Alex" }]
    },
    {
      id: "5",
      title: "Optimize Database Queries",
      description: "Review and optimize slow queries in the reporting module.",
      status: "To Do" as const,
      priority: "Medium" as const,
      dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
      assignees: [{ name: "Sam" }, { name: "Jordan" }]
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar className="hidden md:block w-64 shrink-0" />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
                <p className="text-muted-foreground mt-1">
                  Here's what's happening with your projects today.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-md">
                <span>Last updated: just now</span>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  {...stat}
                  className={`delay-[${index * 100}ms] animate-in fade-in zoom-in-95 duration-500 fill-mode-backwards`}
                />
              ))}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold tracking-tight">Recent Tasks</h3>
                {/* <Button variant="link">View All</Button> */}
              </div>
              <TaskList tasks={tasks} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
