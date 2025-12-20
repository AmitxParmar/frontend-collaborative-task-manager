import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    description?: string
    trend?: "up" | "down" | "neutral"
    trendValue?: string
    className?: string
}

export function StatCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    trendValue,
    className
}: StatCardProps) {
    return (
        <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm ${className}`}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <div className="p-2 bg-primary/10 rounded-full">
                        <Icon className="h-4 w-4 text-primary" />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-2xl font-bold">{value}</div>
                    {(description || trendValue) && (
                        <div className="flex items-center text-xs text-muted-foreground">
                            {trendValue && (
                                <span className={`mr-2 font-medium ${trend === 'up' ? 'text-green-500' :
                                        trend === 'down' ? 'text-red-500' : ''
                                    }`}>
                                    {trendValue}
                                </span>
                            )}
                            {description}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
