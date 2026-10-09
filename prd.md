# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# AgencyOS — Agency Management Platform

**Product type:** Full-stack SaaS web application  
**Project owner:** D Web Studio  
**Prepared for:** Portfolio / Agency Partnership Demonstration  
**Version:** 1.0  
**Status:** In Development  

---

## 1. Product Overview

### 1.1 Vision
AgencyOS is a modern agency management platform that helps digital agencies manage projects, clients, leads, tasks, team workflows, and business performance from one centralized workspace. The product demonstrates strong UI/UX design, frontend engineering, backend development, database design, authentication, authorization, and real-world problem-solving.

### 1.2 Problem Statement
Digital agencies often manage their work across disconnected tools, spreadsheets, chats, and documents. This makes it harder to:
- Track project progress and deadlines.
- Manage leads and client relationships.
- Assign tasks and monitor team workloads.
- Communicate project progress to clients.
- Understand business performance at a glance.

AgencyOS brings these workflows into one organized application.

### 1.3 Product Goals
1. Deliver a premium, professional SaaS experience.
2. Make core workflows functional, not just visually simulated.
3. Demonstrate production-minded full-stack development.
4. Provide a convincing live demo for a potential agency partner.
5. Create a foundation that can later evolve into a commercial SaaS product.

### 1.4 Target Users
- **Agency owner / administrator**: Manages clients, projects, leads, team members, and business metrics. Controls access and oversees operations.
- **Team member**: Views assigned projects and tasks, updates progress and deadlines, collaborates on assigned work.
- **Client**: Views their own projects and milestones, reviews deliverables and submits feedback, tracks agreed project progress and invoice status.

---

## 2. Product Scope

### 2.1 MVP — Must Have
- Authentication and protected routes with role-based access.
- Role-based authorization (Admin, Team Member, Client).
- Dashboard with real database-backed metrics.
- Project management with lifecycle statuses, progress calculation, and team assignments.
- Task management and Kanban board with status movement.
- CRM and lead pipeline with stage progression and 1-click client conversion.
- Client directory with linked project records.
- Team directory with roles and activity status.
- Search, sorting, and filters across views.
- Real event-triggered notifications and activity history.
- Responsive UI across mobile (<768px), tablet, and desktop (1440px).
- Database persistence across browser refreshes and server restarts.
- Form validation and comprehensive error handling.
- Realistic, internally consistent demo data.

### 2.2 Phase 2 — Beyond MVP
- Dedicated external client portal URLs.
- Cloud file storage and deliverable asset upload.
- Milestone approvals and revision requests.
- Integrated invoice records and Stripe payment webhooks.
- Team workload analytics and billable time logs.

---

## 3. Information Architecture

### Public & Demo Routes
- `/` or `/app/dashboard`: Main authenticated dashboard with quick demo persona switcher.
- `/login`: Dedicated authentication screen with 1-click persona logins.

### Protected Application Routes
- `/app/dashboard`: KPI metrics, revenue charts, status donut, quick actions, deadlines.
- `/app/projects`: Project grid/table, filters, create/edit project modal, project detail modal.
- `/app/tasks`: Kanban board (To Do, In Progress, In Review, Done) and task management.
- `/app/crm`: Lead pipeline (New, Contacted, Qualified, Proposal Sent, Won, Lost) and conversion.
- `/app/clients`: Client directory, contact details, linked engagements.
- `/app/team`: Team member directory, roles, and status.
- `/app/notifications`: Notification center with read/unread filters.
- `/app/settings`: Agency profile, currency settings, personal preferences.

---

## 4. Role Permissions Matrix

| Capability | Admin | Team Member | Client |
|---|---|---|---|
| View agency dashboard & revenue | Yes | Limited (no financials) | No |
| Manage all projects (Create/Edit/Archive) | Yes | View only | Own projects only |
| Update task status | Yes | Yes (Assigned) | No |
| Create tasks | Yes | Yes | No |
| Manage CRM leads | Yes | Read-only | No |
| Convert lead to client | Yes | No | No |
| Manage team members & roles | Yes | No | No |
| Update agency settings | Yes | No | No |

---

## 5. Success Metrics & Acceptance Criteria
1. User can authenticate or switch personas instantly.
2. Dashboard metrics reconcile accurately with stored database records.
3. Projects can be created, edited, filtered, searched, and updated.
4. Tasks can be moved across Kanban columns with automatic timestamping.
5. Won leads can be converted into clients without creating duplicates.
6. All changes persist across page reloads.
7. Mobile and desktop layouts conform to the AgencyOS Warm Ivory design system.
