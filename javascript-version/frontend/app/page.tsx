import { TaskAnalyzer } from "@/components/task-analyzer";

export default function Page() {
    return (
        <main className="min-h-screen pt-20 px-4">
            <div className="max-w-4xl flex flex-col gap-12 mx-auto">
                <div className="text-center flex flex-col gap-4">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl ">Smart Task Manager</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Use AI to help categorize and organize tasks.</p>
                </div>
                <TaskAnalyzer />
            </div>
        </main>
    );
}
