# AgencyOS — Implementation Plan

## 1. Project Context & Objectives
AgencyOS is an agency management platform built for digital agencies to run their business operations:
- Project tracking, deliverables, budgets, deadlines, and completion metrics
- CRM pipeline with multi-stage deal tracking and 1-click lead-to-client conversion
- Client directory with contact info, status, linked projects, and lifetime billing records
- Task management with a Kanban board (To Do, In Progress, In Review, Done) and list views
- Executive & operational dashboard with real database-backed KPIs, revenue charts, status breakdown, and recent activity
- Team member permissions with role-based access control (Admin, Team Member, Client)
- Real event-triggered notifications and activity logs
- Synthetic demo dataset designed for a partner demonstration

## 2. Architecture Overview
- **Backend**: Node.js + Express with TypeScript (`server.ts`), running on port 3000.
- **Vite Integration**: In development mode, Vite's dev server middleware is mounted inside Express. In production, Express serves compiled assets from `dist`.
- **Database Layer**: File-backed atomic JSON storage engine (`data/database.json`) with transactions, relational integrity, migrations, and seeding.
- **Frontend**: React 19 + TypeScript + Tailwind CSS v4, adhering to the Warm Ivory & Buttery Yellow design system from `DESIGN.md` and the Zero-Pill & Top Bar Contract from the Universal Frontend Design Constitution.
- **State Management & API**: Clean REST client with typed hooks, optimistic updates, client-side validation, error banners, search, and date-range filters.

## 3. Milestones & Phases

### Phase 1: Foundations & Documentation (Completed)
- Inspect environment and dependencies.
- Update `metadata.json`, `index.html`, and `package.json`.
- Create foundational documentation files: `PRD.md`, `DESIGN.md`, `ARCHITECTURE.md`, `DATABASE.md`, `API.md`, `SECURITY.md`, `TESTING.md`, `DEPLOYMENT.md`, `CHANGELOG.md`, `TASKS.md`, `CONTRIBUTING.md`, `AGENTS.md`.
- Generate professional photographic avatar assets for sample agency personas.

### Phase 2: Data Model & Backend API Layer
- Define TypeScript schemas for Agency, Users, Clients, Projects, Tasks, Leads, Notifications, Activity.
- Implement storage engine with automatic database initialization, atomic file writes, and realistic seed dataset.
- Implement REST API endpoints:
  - Auth: `/api/auth/login`, `/api/auth/logout`, `/api/auth/session`
  - Dashboard: `/api/dashboard/summary`, `/api/dashboard/charts`, `/api/dashboard/activity`
  - Projects: CRUD + filtering + progress recalculation
  - Tasks: CRUD + Kanban status transition
  - Leads: CRUD + stage transitions + atomic `POST /api/leads/:id/convert` to Client + Project
  - Clients: CRUD + linked records
  - Team: List + role updates
  - Notifications: List + mark as read + mark all read
  - Settings: Agency profile + display preferences
- Build `server.ts` with Vite middleware mounting.

### Phase 3: Design System & Shared UI Components
- Setup CSS variables and Tailwind utilities in `src/index.css`.
- Implement responsive App Shell:
  - Top Bar with 3-Zone Contract (brand, navigation, user profile / quick demo role switcher)
  - Sidebar with collapsible mobile drawer
  - Clean unboxed metadata with typographic separators (Zero-Pill rule)
  - Metric cards, interactive segmented filter controls, tabular figure formatting
  - Modal dialogs, drawer panels, confirmation alerts, toast notifications

### Phase 4: Core Feature Views
- **Dashboard View**: 4 core KPI cards, Revenue & Cash Flow interactive SVG chart, Project Status distribution donut, Quick Actions, Upcoming Deadlines, Recent Activity feed.
- **Projects View**: Grid & table views, status filters, search, project modal with task completion %, budgets, team member assignments, create/edit project dialog.
- **Tasks & Kanban View**: Drag/click Kanban board across 4 columns, priority badges, due dates, assignee avatars, new task dialog.
- **CRM & Leads View**: Pipeline stage view & list view, deal value tallies, "Convert to Client" workflow with automatic client creation and duplicate prevention.
- **Clients View**: Client directory, contact details, total contracted projects, notes, and add/edit modal.
- **Team View**: Member directory, role display (Admin, Team Member, Client), project assignment count, status toggle.
- **Notifications View**: Interactive unread/read state, filter by category, clear all.
- **Settings View**: Profile info, agency information, currency and date preferences.

### Phase 5: Verification & Production Readiness
- Verify compilation with `npm run build` and `compile_applet`.
- Verify role permissions (Admin, Team Member, Client restrictions).
- Verify responsive layout across mobile (<768px), tablet, and desktop (1440px).
