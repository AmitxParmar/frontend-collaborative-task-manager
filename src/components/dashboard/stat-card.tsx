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
        <Card className={`overflow-hidden border-3 border-border transition-all rounded-none duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}>
            <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-xs md:text-sm font-medium text-muted-foreground">{title}</p>
                    <div className="p-1.5 md:p-2 bg-primary/10 rounded-full">
                        <Icon className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-xl md:text-2xl font-bold">{value}</div>
                    {(description || trendValue) && (
                        <div className="flex items-center text-[10px] md:text-xs text-muted-foreground">
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
