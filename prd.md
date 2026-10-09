# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# AgencyOS — Agency Management Platform

**Product type:** Full-stack SaaS web application
**Project owner:** D Web Studio
**Prepared for:** Portfolio / Agency Partnership Demonstration
**Version:** 1.0
**Status:** Ready for development planning

---

## 1. Product Overview

### 1.1 Vision

AgencyOS is a modern agency management platform that helps digital agencies manage projects, clients, leads, tasks, team workflows, and business performance from one centralized workspace.

The product should demonstrate strong UI/UX design, frontend engineering, backend development, database design, authentication, authorization, and real-world problem-solving.

### 1.2 Problem Statement

Digital agencies often manage their work across disconnected tools, spreadsheets, chats, and documents. This makes it harder to:

* Track project progress and deadlines.
* Manage leads and client relationships.
* Assign tasks and monitor team workloads.
* Communicate project progress to clients.
* Understand business performance at a glance.

AgencyOS brings these workflows into one organized application.

### 1.3 Product Goals

1. Deliver a premium, professional SaaS experience.
2. Make core workflows functional, not just visually simulated.
3. Demonstrate production-minded full-stack development.
4. Provide a convincing live demo for a potential agency partner.
5. Create a foundation that can later evolve into a commercial SaaS product.

### 1.4 Target Users

**Agency owner / administrator**

* Manages clients, projects, leads, team members, and business metrics.
* Controls access and oversees operations.

**Team member**

* Views assigned projects and tasks.
* Updates progress and deadlines.
* Collaborates on assigned work.

**Client**

* Views their own projects and milestones.
* Reviews deliverables and submits feedback.
* Tracks agreed project progress and invoice status.

---

## 2. Product Scope

### 2.1 MVP — Must Have

* Authentication and protected routes.
* Role-based authorization.
* Dashboard with real database-backed metrics.
* Project management.
* Task management and Kanban board.
* CRM and lead pipeline.
* Client management.
* Search, sorting, and filters.
* Notifications and activity history.
* Responsive UI.
* Database persistence.
* Form validation and error handling.
* Live deployment with demo data.

### 2.2 Phase 2 — After MVP

* Dedicated client portal.
* File and deliverable management.
* Milestone approvals and revision requests.
* Invoice records and payment-status tracking.
* Team workload analytics.
* Advanced reporting and export.
* Email notifications.
* Workflow automation.

### 2.3 Out of Scope for Initial Demo

* Real payment processing.
* Automatic accounting or tax calculations.
* Complex payroll.
* Native mobile applications.
* AI features without a clearly defined use case.
* Unnecessary integrations that do not improve the core workflow.

**Scope rule:** Complete the MVP properly before starting Phase 2.

---

## 3. Information Architecture

### Public routes

* `/` — Product landing page
* `/login` — Authentication
* `/demo` — Demo access instructions or entry point

### Protected application routes

* `/app/dashboard`
* `/app/projects`
* `/app/projects/:id`
* `/app/tasks`
* `/app/crm`
* `/app/clients`
* `/app/team`
* `/app/notifications`
* `/app/settings`

### Future client portal

* `/portal/dashboard`
* `/portal/projects/:id`
* `/portal/deliverables`
* `/portal/invoices`

Routes must enforce authorization on the server, not merely hide navigation items in the UI.

---

## 4. Detailed Functional Requirements

### 4.1 Authentication and Access Control

**Requirements**

* Secure login and logout.
* Protected application routes.
* Persistent authenticated sessions.
* Role-based access permissions.
* Unauthorized requests return appropriate errors.
* Users can only access records belonging to their authorized agency.
* Demo credentials must not grant administrative access to real production data.

**Roles**

| Capability               | Admin | Team member         | Client            |
| ------------------------ | ----- | ------------------- | ----------------- |
| View agency dashboard    | Yes   | Limited             | No                |
| Manage all projects      | Yes   | No                  | No                |
| View assigned projects   | Yes   | Yes                 | Own projects only |
| Manage leads             | Yes   | Optional permission | No                |
| Manage team              | Yes   | No                  | No                |
| Update assigned tasks    | Yes   | Yes                 | No                |
| View client deliverables | Yes   | Assigned access     | Own deliverables  |
| Manage agency settings   | Yes   | No                  | No                |

Implement least-privilege authorization. Every protected API operation must independently verify the user's permissions.

### 4.2 Dashboard

The dashboard is the main entry point after login.

**KPI cards**

* Total active projects.
* Projects completed in the selected period.
* Open tasks.
* Overdue tasks.
* Total leads.
* Won leads and recorded sales value.

**Charts**

* Project status distribution.
* Tasks completed over time.
* Lead conversion funnel.
* Recorded revenue trend.

**Additional sections**

* Recent activity.
* Upcoming deadlines.
* Overdue items.
* Recent leads.
* Project progress overview.
* Quick actions.

**Interactions**

* Date-range filters update applicable metrics.
* Clicking a KPI opens the corresponding filtered page.
* Charts display tooltips.
* Loading, empty, and error states are provided.

All metrics must be derived from stored data. Revenue must represent recorded business data, not invented financial claims.

### 4.3 Project Management

**Project fields**

* Project name.
* Client.
* Description.
* Project type.
* Status.
* Priority.
* Start date.
* Due date.
* Budget.
* Assigned team members.
* Created and updated timestamps.

**Project statuses**

* Planning.
* In Progress.
* On Hold.
* In Review.
* Completed.
* Cancelled.

**Features**

* Create, view, edit, and archive projects.
* Search by project name or client.
* Filter by status, priority, and deadline.
* Sort by recent activity and due date.
* View project details.
* Display project completion percentage.
* Link tasks and milestones to projects.
* Show overdue indicators.
* Maintain an activity history.

The completion percentage must follow a defined rule, such as completed tasks divided by total active tasks. Projects without tasks should show an appropriate empty state.

### 4.4 Task Management

**Task fields**

* Title.
* Description.
* Project.
* Assignee.
* Priority.
* Status.
* Due date.
* Optional estimated hours.

**Statuses**

* To Do.
* In Progress.
* In Review.
* Done.

**Features**

* Create and edit tasks.
* Assign tasks to authorized team members.
* Update task status.
* Display tasks in a Kanban board.
* Filter by project, assignee, priority, and status.
* Identify overdue tasks.
* Sort tasks by deadline.
* Display task details and activity.

Drag-and-drop is desirable, but a reliable status-update interaction takes priority over animation.

### 4.5 CRM and Lead Management

**Lead fields**

* Name.
* Company.
* Email.
* Phone, optional.
* Source.
* Service interest.
* Estimated deal value.
* Status.
* Notes.
* Created date.
* Assigned team member.

**Lead statuses**

* New.
* Contacted.
* Qualified.
* Proposal Sent.
* Won.
* Lost.

**Features**

* Add, view, edit, and archive leads.
* Search and filter leads.
* Move leads through pipeline stages.
* Record notes and follow-up dates.
* Display lead conversion metrics.
* Convert a won lead into a client and optionally create a project.
* Validate duplicate records where appropriate.

A lead conversion must not silently create duplicate clients or projects.

### 4.6 Client Management

**Client fields**

* Name or company name.
* Contact email.
* Phone, optional.
* Company website, optional.
* Notes.
* Relationship status.
* Linked projects.
* Created date.

**Features**

* Create and edit client records.
* View a client's projects and activity.
* Search and filter clients.
* Link clients to leads and projects.
* Prevent unauthorized access to client information.

### 4.7 Team Management

**Features**

* View authorized team members.
* Display name, email, role, and active status.
* Assign members to projects and tasks.
* Restrict role changes to administrators.
* Prevent users from escalating their own permissions.

Team invitations and account provisioning can be implemented after the core MVP, provided the initial demo has a secure way to provision test accounts.

### 4.8 Notifications and Activity

**Notifications**

* Task assigned.
* Task due soon.
* Task overdue.
* Project status changed.
* Lead status changed.
* Client feedback received, in Phase 2.

**Requirements**

* Read and unread states.
* Mark notification as read.
* Navigate to the relevant record.
* Display a useful empty state.

The activity feed should record important events, including project creation, status changes, task assignments, and lead updates.

Notifications must be generated by actual application events, not hardcoded messages presented as real activity.

### 4.9 Settings

**MVP settings**

* Profile information.
* Display preferences.
* Theme preference, if supported.
* Session logout.
* Agency profile information for authorized administrators.

Settings must persist when they are presented as configurable application options.

---

## 5. UI/UX and Design System

### 5.1 Visual Direction

The product should feel like a premium modern SaaS application: restrained, clean, information-dense where necessary, and easy to navigate.

**Suggested palette**

| Token            | Value     | Purpose                |
| ---------------- | --------- | ---------------------- |
| Background       | `#0C0F13` | Main dark canvas       |
| Surface          | `#151A21` | Cards and panels       |
| Elevated surface | `#1B222C` | Menus and dialogs      |
| Primary accent   | `#2F7EF2` | Main actions           |
| Secondary accent | `#6FB2FF` | Interactive highlights |
| Primary text     | `#F4F1EA` | Main content           |
| Secondary text   | `#C3CAD6` | Supporting content     |
| Borders          | `#2B323D` | Dividers and outlines  |

Avoid excessive gradients, unnecessary glass effects, oversaturated accents, and decorative animations.

### 5.2 Layout

* Persistent sidebar on desktop.
* Compact top navigation with search and user menu.
* Responsive sidebar or drawer on mobile.
* Consistent content widths and spacing.
* Clear visual hierarchy.
* Reusable cards, tables, dialogs, and form components.

### 5.3 UI States

Every data-driven screen must handle:

* Initial loading.
* Empty dataset.
* Search with no results.
* Validation errors.
* API failures.
* Successful updates.
* Disabled or unauthorized actions.
* Confirmation before destructive actions.

### 5.4 Accessibility

* Keyboard navigation.
* Visible focus states.
* Semantic HTML.
* Accessible form labels.
* Sufficient text contrast.
* Status indicators that do not rely on color alone.
* Reduced-motion support where applicable.

---

## 6. Recommended Technical Architecture

The exact stack should match the existing repository and deployment constraints. For a new implementation, the following is a suitable baseline.

### Frontend

* React.
* TypeScript.
* Vite or the repository's existing framework.
* Tailwind CSS.
* A consistent component library, where useful.
* Recharts for charts.
* A drag-and-drop library only if required.

### Backend

* Node.js.
* TypeScript.
* A structured API layer.
* Server-side validation.
* Centralized error handling.
* Server-enforced authorization.

### Database

* PostgreSQL.
* Prisma ORM.
* Database migrations and seed scripts.

### Authentication

* A reputable authentication solution compatible with the selected framework.
* Secure session or token handling.
* Password hashing when managing passwords directly.
* HttpOnly, Secure, and appropriate SameSite cookie settings when using cookie-based sessions.

### Deployment

* Frontend hosting compatible with the selected framework.
* Managed PostgreSQL.
* Environment variables for secrets.
* HTTPS.
* Separate development and production configuration.

Do not introduce a new stack merely for novelty if the existing project already provides a reliable equivalent.

---

## 7. Data Model

### Core entities

**User**

* id
* name
* email
* passwordHash or external auth identifier
* createdAt
* updatedAt

**Agency**

* id
* name
* createdAt

**Membership**

* id
* agencyId
* userId
* role
* status

**Client**

* id
* agencyId
* name
* email
* phone
* website
* notes
* status
* createdAt
* updatedAt

**Project**

* id
* agencyId
* clientId
* name
* description
* status
* priority
* startDate
* dueDate
* budget
* createdAt
* updatedAt

**ProjectMember**

* projectId
* userId
* assignedAt

**Task**

* id
* agencyId
* projectId
* title
* description
* assigneeId
* status
* priority
* dueDate
* completedAt
* createdAt
* updatedAt

**Lead**

* id
* agencyId
* name
* company
* email
* phone
* source
* serviceInterest
* estimatedValue
* status
* assignedToId
* notes
* createdAt
* updatedAt

**Notification**

* id
* agencyId
* userId
* type
* title
* body
* readAt
* createdAt

**Activity**

* id
* agencyId
* actorId
* entityType
* entityId
* action
* metadata
* createdAt

### Data integrity requirements

* Use foreign keys and appropriate indexes.
* Enforce valid relationships.
* Apply agency scoping to all relevant queries.
* Define deletion and archival behavior.
* Store timestamps consistently.
* Use database transactions for multi-step operations such as lead conversion.
* Never trust a client-supplied agency ID or role without server-side verification.

---

## 8. API Requirements

Use REST endpoints or an equivalent structured API.

Example endpoint groups:

**Authentication**

* `POST /api/auth/login`
* `POST /api/auth/logout`
* `GET /api/auth/session`

**Dashboard**

* `GET /api/dashboard/summary`
* `GET /api/dashboard/activity`
* `GET /api/dashboard/charts`

**Projects**

* `GET /api/projects`
* `POST /api/projects`
* `GET /api/projects/:id`
* `PATCH /api/projects/:id`
* `DELETE /api/projects/:id` — if permitted by the deletion policy.

**Tasks**

* `GET /api/tasks`
* `POST /api/tasks`
* `PATCH /api/tasks/:id`
* `DELETE /api/tasks/:id`

**CRM**

* `GET /api/leads`
* `POST /api/leads`
* `PATCH /api/leads/:id`
* `POST /api/leads/:id/convert`

**Clients**

* `GET /api/clients`
* `POST /api/clients`
* `PATCH /api/clients/:id`

All list endpoints should support appropriate pagination, sorting, and filtering.

All write endpoints must validate input, check authorization, and return consistent error responses.

---

## 9. Security and Privacy

Security is a core requirement, even for a portfolio demo.

* Enforce authorization on the server.
* Prevent cross-agency data access.
* Validate all inputs.
* Protect authentication endpoints against abuse.
* Avoid exposing secrets in frontend bundles or repositories.
* Use secure session management.
* Apply appropriate CSRF protection when cookie-based authentication requires it.
* Avoid unsafe rendering of user-generated HTML.
* Keep production error responses free of stack traces and secrets.
* Protect destructive operations.
* Use synthetic demo data.
* Do not store real client credentials or confidential business records in the demo.

---

## 10. Non-Functional Requirements

### Performance

* Optimize images and static assets.
* Avoid unnecessary frontend dependencies.
* Paginate larger tables.
* Minimize redundant API calls.
* Avoid blocking the main interface with large data operations.

### Reliability

* Display meaningful error messages.
* Handle expired sessions.
* Prevent duplicate form submissions where appropriate.
* Keep database state consistent.
* Provide migrations and reproducible seed data.

### Maintainability

* Use reusable components.
* Keep business logic separate from presentation.
* Apply consistent naming conventions.
* Use TypeScript types and server-side schemas.
* Avoid duplicated validation and business rules.

### Responsive behavior

* Support mobile, tablet, laptop, and desktop layouts.
* Tables should remain usable on small screens.
* Dialogs and forms must fit within the viewport.

---

## 11. Testing Strategy

### Functional tests

* Create, edit, and archive a project.
* Create a task and update its status.
* Assign a task to a team member.
* Add and update a lead.
* Convert a won lead to a client without duplicates.
* Confirm dashboard metrics update after mutations.
* Verify search, sorting, and filters.

### Security tests

* Unauthenticated users cannot access protected data.
* Team members cannot perform admin-only actions.
* Clients cannot view other clients' records.
* Users cannot access records from another agency by changing an ID.
* Invalid inputs and unauthorized mutations are rejected.

### UI tests

* Forms display validation errors.
* Loading, empty, and error states render correctly.
* Navigation works on desktop and mobile.
* Keyboard focus remains visible.
* No critical horizontal overflow exists on mobile.

### Release checks

* Production build succeeds.
* Database migrations apply successfully.
* Demo seed script works.
* Core workflows pass smoke tests.
* No critical console errors or broken navigation remain.

---

## 12. Acceptance Criteria

The MVP is ready to demonstrate when:

1. A user can log in using the designated demo account.
2. Protected pages cannot be accessed without authorization.
3. Dashboard metrics reflect actual database records.
4. Projects can be created, edited, viewed, and archived according to the defined policy.
5. Tasks can be assigned and moved through their workflow.
6. Leads can be managed and converted into clients.
7. Search and filters work correctly.
8. Role permissions are enforced on the server.
9. Unauthorized cross-agency access is blocked.
10. Changes persist after page refresh.
11. The interface works on desktop and mobile.
12. Loading, empty, validation, and error states are handled.
13. The deployed application uses secure configuration and synthetic demo data.
14. Setup instructions and a reproducible seed process are documented.

---

## 13. Demo Data and Presentation

Prepare one fictional agency with:

* 4–6 sample clients.
* 6–10 projects in different statuses.
* 15–25 tasks.
* 8–12 leads in different pipeline stages.
* Sample team members.
* A limited set of meaningful activity records.

All sample data should be internally consistent so dashboard totals, project progress, and lead conversion metrics agree.

The demo should guide the viewer through:

1. Dashboard overview.
2. Project details and task updates.
3. CRM pipeline.
4. Client records.
5. Responsive behavior.
6. Permission differences between roles, if implemented in the demo environment.

Provide a short README with setup instructions, environment variables, database migrations, seeding, test commands, and demo-access instructions.

---

## 14. Success Metrics

Measure product quality using verifiable outcomes:

* Core workflows complete without critical defects.
* No critical authorization vulnerabilities.
* All major routes render and navigate correctly.
* Dashboard figures reconcile with stored data.
* No significant mobile usability issues.
* Production build and seed setup are reproducible.
* A reviewer can explore the demo without developer assistance.
* The product demonstrates both visual quality and working business logic.

The business objective is to give a potential agency partner credible evidence of development quality and delivery discipline. A successful demo can support that goal, but does not guarantee a contract.

---

## 15. Development Priorities

**P0 — Required before demo**

* Design foundation.
* Authentication and authorization.
* Dashboard.
* Projects.
* Tasks.
* CRM.
* Database persistence.
* Responsive behavior.
* Error and empty states.
* Deployment.

**P1 — Add after P0**

* Client portal.
* Milestones and deliverables.
* Invoices and payment-status tracking.
* More advanced analytics.
* Email notifications.

**P2 — Only if justified**

* Workflow automation.
* External integrations.
* AI assistance.
* Advanced exports and reporting.

### Final Product Principle

Build fewer features to a higher standard.

Every feature must be useful, functional, consistent with the product's purpose, and reliable enough to demonstrate. The goal is not to claim that AgencyOS can do everything. The goal is to show that D Web Studio can turn a product brief into a polished, functional, well-engineered application.
