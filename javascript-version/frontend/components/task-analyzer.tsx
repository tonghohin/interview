"use client";

import { TaskAnalysis, TaskAnalysisSchema } from "@smart-task/shared";
import { AlertCircle, Loader2Icon, SendIcon } from "lucide-react";
import { useState } from "react";
import { TaskAnalysisResult } from "./task-analysis-result";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from "./ui/input-group";

export function TaskAnalyzer() {
    const [task, setTask] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<TaskAnalysis | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleAnalyze(event: React.SubmitEvent) {
        event.preventDefault();
        if (!task.trim()) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("http://localhost:8000/api/analyze-task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ task })
            });
            if (!response.ok) throw new Error("Failed to analyze task");
            const data = await response.json();
            const taskAnalysis = TaskAnalysisSchema.parse(data);
            setResult(taskAnalysis);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleAnalyze} className="w-full max-w-2xl mx-auto flex flex-col gap-4">
            <InputGroup>
                <InputGroupAddon align="block-start" className="border-b">
                    <InputGroupText>Enter your task in natural language and let AI do the heavy lifting.</InputGroupText>
                </InputGroupAddon>
                <InputGroupTextarea placeholder="e.g., Fix authentication bug by Friday - urgent" className="min-h-20" value={task} onChange={(e) => setTask(e.target.value)} disabled={isLoading} />
                <InputGroupAddon align="block-end">
                    {error && (
                        <InputGroupText className="text-destructive">
                            <AlertCircle className="size-4" />
                            {error}
                        </InputGroupText>
                    )}
                    <InputGroupButton type="submit" size="sm" variant="default" className="ml-auto" disabled={isLoading || !task.trim()}>
                        {isLoading ? <Loader2Icon className="animate-spin" /> : <SendIcon />}
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            {result && <TaskAnalysisResult result={result} />}
        </form>
    );
}
