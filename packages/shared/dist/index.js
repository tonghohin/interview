import { z } from "zod";
export const TaskAnalysisSchema = z.object({
    category: z.enum(["Work", "Personal", "Health", "Finance", "Other"]),
    priority: z.enum(["High", "Medium", "Low"]),
    reasoning: z.string().min(1, "Reasoning is required"),
    due_date: z.string()
});
