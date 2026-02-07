import cors from "cors";
import dotenv from "dotenv";
import express from "express";

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
        const { task } = req.body;

        if (!task) {
            return res.status(400).json({
                error: "Task is required"
            });
        }

        /**
         * TODO: Implement your AI logic here
         *
         * Expected response format:
         * {
         *   category: "Work|Personal|Health|Finance|Other",
         *   priority: "High|Medium|Low",
         *   reasoning: "Brief explanation",
         *   due_date: "Extracted date or 'Not specified'"
         * }
         */

        // Placeholder response - replace with your implementation
        const result = {
            category: "Work",
            priority: "High",
            reasoning: "This is a placeholder response. Implement AI logic to analyze the task.",
            due_date: "Not specified"
        };

        res.json(result);
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
