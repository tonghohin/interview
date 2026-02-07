import { Badge, badgeVariants } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TaskAnalysis } from "@smart-task/shared";
import { VariantProps } from "class-variance-authority";
import { AlertTriangleIcon, ArrowDownIcon, ArrowUpIcon, CalendarIcon, TagIcon } from "lucide-react";

const priorityConfig = {
    High: {
        variant: "destructive",
        icon: ArrowUpIcon
    },
    Medium: {
        variant: "warning",
        icon: AlertTriangleIcon
    },
    Low: {
        variant: "success",
        icon: ArrowDownIcon
    }
} satisfies Record<
    TaskAnalysis["priority"],
    {
        variant: VariantProps<typeof badgeVariants>["variant"];
        icon: React.ComponentType<{ className?: string }>;
    }
>;

export function TaskAnalysisResult({ result }: { result: TaskAnalysis }) {
    const PriorityIcon = priorityConfig[result.priority].icon;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Task Analysis</CardTitle>
                <CardAction>
                    <Badge variant={priorityConfig[result.priority].variant}>
                        <PriorityIcon />
                        {result.priority}
                    </Badge>
                </CardAction>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2.5">
                        <TagIcon className="size-4 text-muted-foreground" />
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-medium text-muted-foreground">Category</span>
                            <span className="text-sm font-semibold leading-none">{result.category}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2.5">
                        <CalendarIcon className="size-4 text-muted-foreground" />
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-medium text-muted-foreground">Due Date</span>
                            <span className="text-sm font-semibold leading-none">{result.due_date}</span>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold tracking-wider text-muted-foreground">AI Reasoning</p>
                    <p className="rounded-lg bg-muted/50 px-3.5 py-3 text-sm leading-relaxed">{result.reasoning}</p>
                </div>
            </CardContent>
        </Card>
    );
}
