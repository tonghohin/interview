import { z } from "zod";
export declare const TaskAnalysisSchema: z.ZodObject<{
    category: z.ZodEnum<["Work", "Personal", "Health", "Finance", "Other"]>;
    priority: z.ZodEnum<["High", "Medium", "Low"]>;
    reasoning: z.ZodString;
    due_date: z.ZodString;
}, "strip", z.ZodTypeAny, {
    category: "Work" | "Personal" | "Health" | "Finance" | "Other";
    priority: "High" | "Medium" | "Low";
    reasoning: string;
    due_date: string;
}, {
    category: "Work" | "Personal" | "Health" | "Finance" | "Other";
    priority: "High" | "Medium" | "Low";
    reasoning: string;
    due_date: string;
}>;
export type TaskAnalysis = z.infer<typeof TaskAnalysisSchema>;
