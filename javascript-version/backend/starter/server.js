import { TaskAnalysisSchema } from "@smart-task/shared";
import { generateText, Output } from "ai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { z } from "zod";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.json({
        status: "ok",
        message: "Smart Task Manager API is running",
        endpoints: {
            "POST /api/analyze-task": "Analyze and categorize a task"
        }
    });
});

app.post("/api/analyze-task", async (req, res) => {
    try {
        const parsedBody = z.object({ task: z.string() }).parse(req.body);
        const { task } = parsedBody;

        if (!task) {
            return res.status(400).json({
                error: "Task is required"
            });
        }

        const { output } = await generateText({
            model: "openai/gpt-5-nano",
            system: `You are a specialized Task Analysis AI. Your sole purpose is to analyze natural language tasks and extract structured information.
            
            Guidelines:
            1. Is Task: Set to true if the input is an actionable task or appointment. Set to false if the input is a question, a greeting, gibberish, or anything that doesn't describe something to be done.
            2. Category: Choose from Work, Personal, Health, Finance, Other. (If is_task is false, defaults to Other)
            3. Priority: Choose from High, Medium, Low based on urgency and importance. (If is_task is false, defaults to Low)
            4. Reasoning: Provide a brief one-sentence explanation. If is_task is false, explain why it's not a task.
            5. Due Date: Extract the specific date/time mentioned. Use "Not specified" if none is found.
            
            Examples:
            - "Fix bug in authentication module - urgent" -> { is_task: true, category: "Work", priority: "High", reasoning: "Technical bug with explicit urgency", due_date: "Not specified" }
            - "What is the capital of France?" -> { is_task: false, category: "Other", priority: "Low", reasoning: "This is a question, not a task", due_date: "Not specified" }
            - "Hello there!" -> { is_task: false, category: "Other", priority: "Low", reasoning: "This is a greeting, not a task", due_date: "Not specified" }`,
            output: Output.object({
                schema: TaskAnalysisSchema.extend({ is_task: z.boolean() })
            }),
            prompt: task
        });

        if (!output.is_task) {
            return res.status(400).json({
                error: "Not a task",
                message: output.reasoning
            });
        }

        res.json(output);
    } catch (error) {
        console.error("Error analyzing task:", error);
        res.status(500).json({
            error: "Failed to analyze task",
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Smart Task Manager API running on http://localhost:${PORT}`);
    console.log(`Test the API: POST http://localhost:${PORT}/api/analyze-task`);
});
