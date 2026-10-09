# AgencyOS — System Architecture

## 1. High-Level Architecture Overview

AgencyOS uses a full-stack Node.js + Express + React architecture configured for AI Studio.

```
┌────────────────────────────────────────────────────────┐
│                   Web Browser Client                   │
│   (React 19 SPA + Tailwind CSS v4 + Motion + Lucide)   │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP / JSON API
                            ▼
┌────────────────────────────────────────────────────────┐
│               Express Server (server.ts)               │
│  - Vite Middleware (dev) / Static file server (prod)   │
│  - Auth & Session Middleware                           │
│  - RBAC Permission Guards                              │
│  - REST API Routers (/api/*)                           │
└───────────────────────────┬────────────────────────────┘
                            │ Atomic read/write
                            ▼
┌────────────────────────────────────────────────────────┐
│            Transactional Data Engine (JSON)            │
│  - Agency scoping on every query                       │
│  - Relational consistency & Foreign Key resolution     │
│  - Atomic disk persistence (`data/database.json`)      │
└────────────────────────────────────────────────────────┘
```

---

## 2. Directory Structure

- `server.ts`: Express application entry point that mounts Vite middleware during development and serves compiled production assets in production.
- `server/`:
  - `server/db.ts`: Data access layer, seeding mechanism, schema validations, and atomic persistence.
  - `server/routes.ts`: Express API route handlers for auth, dashboard, projects, tasks, CRM leads, clients, team, notifications, and settings.
- `src/`:
  - `src/main.tsx`: React mounting entry.
  - `src/App.tsx`: Layout shell, routing, global notifications, and modal managers.
  - `src/api.ts`: Typed API client for all backend endpoints.
  - `src/types.ts`: TypeScript data models and DTO interfaces.
  - `src/context/`: Authentication context, active persona state, and real-time event notifications.
  - `src/components/`: Reusable UI primitives (Button, Modal, Card, Dropdown, Table, Input).
  - `src/views/`:
    - `DashboardView.tsx`: KPI cards, revenue charts, status breakdown, upcoming deadlines.
    - `ProjectsView.tsx`: Project directory, project creation modal, project detail drawer.
    - `TasksView.tsx`: Interactive Kanban board (To Do, In Progress, In Review, Done).
    - `CrmView.tsx`: Lead pipeline stage board, deal conversion workflow.
    - `ClientsView.tsx`: Client roster, linked engagements, notes.
    - `TeamView.tsx`: Agency team roster, role permissions.
    - `NotificationsView.tsx`: Event notification center.
    - `SettingsView.tsx`: Agency and profile settings.

---

## 3. Data Flow & State Management

1. **Client-Side Data Fetching**: Centralized data management in `AppContext` fetches initialized datasets from `/api/*`.
2. **Optimistic UI Updates**: User mutations immediately reflect in UI state while persisting synchronously to the backend.
3. **Event Logging**: Any core action (task completion, lead stage change, project creation) appends to the `Activity` log and triggers appropriate `Notification` records.
4. **Data Isolation**: All operations enforce `agencyId` checks ensuring multi-tenant safety.
