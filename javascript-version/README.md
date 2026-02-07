# 🤖 Smart Task Manager

An AI-powered task management application that transforms natural language into structured, categorized, and prioritized task data.

## 🏗️ Project Structure

This monorepo is managed with **pnpm workspaces**:

- `backend/`: Node.js/Express server integrating with Claude/Anthropic for task analysis.
- `frontend/`: Next.js application for a modern, responsive user experience.
- `packages/shared/`: A shared library containing Zod schemas and TypeScript types used by both applications.

## 🚀 Getting Started

### Setup

1. **Install Dependencies** (from the root directory):

    ```bash
    pnpm install
    ```

2. **Configure Backend Environment**:
    - Navigate to the `backend` folder.
    - Rename `.env.example` to `.env`.
    - Add your `AI_GATEWAY_API_KEY` to the `.env` file.

3. **Build Shared Packages**:
   The shared package must be compiled before the apps can use it.
    ```bash
    pnpm build:shared
    ```

## 💻 Development

Start both the frontend and backend simultaneously with a single command:

```bash
pnpm dev
```

_Note: The root `predev` script automatically handles the building of shared packages._

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:8000](http://localhost:8000)
