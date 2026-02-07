# Smart Task Manager

An AI-powered task management application that transforms natural language into structured, categorized, and prioritized task data.

## Planning Notes

### Approach

I first set up the monorepo, knowing I’d need a frontend, a backend, and a shared package for schemas.

After that, I focused on the backend, using the AI SDK to define system prompt instructions that analyze tasks and return structured outputs.

Once the backend was ready, I jumped straight into building the frontend. I started simple, with just a basic form and a results display. After everything was connected, I began refining the UI, testing with example inputs, and improving error handling.

## Approach & Design Decisions

- **Provider-Agnostic AI Integration**: Built using the **Vercel AI SDK**, allowing the backend to switch between different LLM providers (Anthropic, OpenAI, etc.) with minimal code changes.
- **Unified AI Access**: Integrated via an **AI Gateway**, which centralizes multiple LLM providers under a single API key for simplified security and management.
- **Structured AI Output**: Leveraging **Zod schemas** to enforce strict data structures on AI responses. This ensures the output is always valid, typed, and predictable for the frontend.
- **High-Precision Prompting**: The system prompt is engineered with detailed instructions and **few-shot examples** to guide the AI in accurate categorization and consistent priority assessment.
- **Intelligent Input Validation**: The AI evaluates if an input is actually a "task to be done." If it's a general question or greeting, the system explicitly rejects it with a meaningful error.

### Future Improvements

- **Task History & Persistence**: Connect a database (Supabase/Prisma) to save the analyzed tasks into a personal board.
- **Bulk Processing**: Add support for multi-line inputs so users can paste a whole list of tasks and get them all categorized at once.

## Project Structure

This monorepo is managed with **pnpm workspaces**:

- `backend/`: Node.js/Express server integrating with Claude/Anthropic for task analysis.
- `frontend/`: Next.js application for a modern, responsive user experience.
- `packages/shared/`: Shared Zod schemas and TypeScript types used by both applications.

## Getting Started

### 1. Navigate and Install Dependencies

First, ensure you are in the `javascript-version` directory, then install the dependencies from the root:

```bash
pnpm install
```

### 2. Configure Environment

- Navigate to the `backend` folder.
- Create a `.env` file (copied from `.env.example` if available).
- Add your `AI_GATEWAY_API_KEY`.

## Development

Start both the frontend and backend simultaneously:

```bash
pnpm dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:8000](http://localhost:8000)
