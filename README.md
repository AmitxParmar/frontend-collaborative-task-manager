
# Collaborative Task Manager - Frontend

A modern, responsive task management dashboard built with React, TypeScript, and Tailwind CSS. This application serves as the user interface for the Collaborative Task Manager system, featuring real-time updates, drag-and-drop organization (planned), and a comprehensive task management suite.

## 🚀 Features

- **Authentication**: Secure login and registration with JWT handling using HTTP-only cookies (via backend).
- **Task Management**: Create, read, update, and delete tasks.
- **Dashboard**: "My Dashboard" view showing task statistics, recent activity, and filtered lists.
- **Real-Time Collaboration**: Instant updates on task changes (assignments, status updates) via Socket.io.
- **Responsive Design**: Mobile-first architecture using Tailwind CSS.
- **Optimized Data Fetching**: Powered by TanStack Query for caching and server state management.

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Framework** | [React](https://react.dev/) (Vite) | UI Library |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type Safety |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS |
| **State Management** | [TanStack Query](https://tanstack.com/query/latest) | Server State / Caching |
| **Routing** | [TanStack Router](https://tanstack.com/router) | Client-side Routing |
| **Real-Time** | [Socket.io Client](https://socket.io/) | WebSocket Communication |
| **HTTP Client** | [Axios](https://axios-http.com/) | API Requests |
| **Icons** | [Lucide React](https://lucide.dev/) | Iconography |

## 🏁 Getting Started

### Prerequisites

- Node.js (v16+)
- pnpm (recommended) or npm

### Installation

1.  **Navigate to the client directory:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Start the development server:**
    ```bash
    pnpm run dev
    ```
    The application will be available at `http://localhost:3000`.

## 🏗 Architecture & Design Decisions

### Component Structure
- **routes/**: File-based routing definitions (TanStack Router).
- **components/**: Reusable UI components (Atomic design principles).
  - `ui/`: Core generic components (buttons, inputs).
  - `features/`: Business-logic specific components (TaskCard, DashboardStats).
- **hooks/**: Custom React hooks (e.g., `useTasks`, `useAuth`) incorporating React Query logic.
- **services/**: API interaction layer, separated from UI components to enable easy testing and logic reuse.

### State Management Strategy
- **Server State**: Managed entirely by **TanStack Query**. This removes the need for global stores (like Redux) for data that comes from the backend. It handles caching, loading states, and background refetching out of the box.
- **Local State**: handled by React `useState` and `useReducer` for UI-specific state (modals, form inputs).

### Why Socket.io?
For a collaborative application, polling is inefficient. I chose Socket.io to push updates (like "Task Assigned" or "Status Changed") instantly to connected clients, ensuring users always see the latest state without manual refresh.

## 🤝 Socket.io Integration

The client initializes a socket connection on load (if authenticated). It listens for specific events:
- `task:created`, `task:updated`: Triggers a refetch of the relevant React Query keys to update the UI.
- `notification`: Displays a toast or popover alert when a task is assigned.

## 🧪 Testing

Run unit tests via Vitest:
```bash
pnpm test
```

## 📦 Build

To create a production build:
```bash
pnpm run build
```
