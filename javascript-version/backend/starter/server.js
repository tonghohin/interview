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
            1. Category: Choose from Work, Personal, Health, Finance, Other.
            2. Priority: Choose from High, Medium, Low based on urgency and importance.
            3. Reasoning: Provide a brief one-sentence explanation for your choices.
            4. Due Date: Extract the specific date/time mentioned. Use "Not specified" if none is found.
            
            Examples:
            - "Fix bug in authentication module - urgent" -> { category: "Work", priority: "High", reasoning: "Technical bug with explicit urgency", due_date: "Not specified" }
            - "Schedule dentist appointment for next Friday" -> { category: "Health", priority: "Medium", reasoning: "Medical appointment", due_date: "Next Friday" }
            - "Pay electricity bill before the 15th" -> { category: "Finance", priority: "High", reasoning: "Utility payment with deadline", due_date: "Before the 15th" }`,
            output: Output.object({
                schema: TaskAnalysisSchema
            }),
            prompt: task
        });

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
