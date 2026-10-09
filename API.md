# AgencyOS — REST API Documentation

Base URL: `/api`  
All endpoints require authentication (or default to the authenticated demo session). Multi-tenant isolation is enforced via `agencyId`.

---

## 1. Authentication & Session

### `POST /api/auth/login`
Authenticate a user by email or persona ID.
- **Request Body**: `{ "email": "sarah@dwebstudio.com" }` or `{ "userId": "usr_admin_1" }`
- **Response**: `{ "user": User, "token": string }`

### `POST /api/auth/logout`
Terminates current session.
- **Response**: `{ "success": true }`

### `GET /api/auth/session`
Returns currently active authenticated user and agency context.
- **Response**: `{ "user": User, "agency": Agency }`

---

## 2. Dashboard Analytics

### `GET /api/dashboard/summary`
Returns high-level business KPIs.
- **Response**:
```json
{
  "activeProjects": 7,
  "completedProjects": 12,
  "openTasks": 18,
  "overdueTasks": 2,
  "totalLeads": 9,
  "wonLeadsValue": 142000,
  "revenueTotal": 286500,
  "activeClients": 5
}
```

### `GET /api/dashboard/charts`
Returns dataset for revenue trajectories and project status distributions.

### `GET /api/dashboard/activity`
Returns the 15 most recent real application audit records.

---

## 3. Projects

### `GET /api/projects`
List projects. Supports query filters: `?status=in_progress`, `?clientId=cli_1`, `?search=ecommerce`.

### `POST /api/projects`
Create a new project.
- **Request Body**:
```json
{
  "name": "Acme Brand Refresh",
  "clientId": "cli_acme_1",
  "description": "Full brand identity and website redesign.",
  "status": "in_progress",
  "priority": "high",
  "budget": 24000,
  "startDate": "2026-10-01",
  "dueDate": "2026-11-15",
  "assignedUserIds": ["usr_team_1", "usr_team_2"]
}
```

### `PATCH /api/projects/:id`
Update project details or status.

### `DELETE /api/projects/:id`
Archive or delete a project.

---

## 4. Tasks & Kanban

### `GET /api/tasks`
List all tasks or filter by project: `?projectId=proj_1`, `?assigneeId=usr_1`, `?status=todo`.

### `POST /api/tasks`
Create a new task.

### `PATCH /api/tasks/:id`
Update task status (`todo`, `in_progress`, `in_review`, `done`), priority, assignee, or deadline.

### `DELETE /api/tasks/:id`
Delete a task.

---

## 5. CRM Leads

### `GET /api/leads`
List all leads in the CRM pipeline.

### `POST /api/leads`
Create a new inbound or outbound lead.

### `PATCH /api/leads/:id`
Update lead details or move stage (`new`, `contacted`, `qualified`, `proposal_sent`, `won`, `lost`).

### `POST /api/leads/:id/convert`
Convert a won lead into a client atomically.
- **Request Body**:
```json
{
  "createProject": true,
  "projectName": "Mobile App V1",
  "budget": 35000,
  "dueDate": "2026-12-20"
}
```
- **Response**: `{ "client": Client, "project": Project | null, "lead": Lead }`

---

## 6. Clients & Client Portal

### `GET /api/clients`
List all clients with linked projects count and total contracted value.

### `GET /api/clients/:id`
Get detailed client profile including active projects, deliverables, invoices, and activity.

### `POST /api/clients`
Add a new client.

### `PATCH /api/clients/:id`
Update client profile details.

### `GET /api/portal/client`
Client-specific endpoint returning the authenticated client's projects, deliverables, invoices, and feedback items.

### `POST /api/portal/feedback`
Submit client feedback or revision request on a project deliverable.

---

## 7. Team & Settings

### `GET /api/team`
List all team members and their roles.

### `PATCH /api/team/:id`
Update team member details or roles (Admin restricted).

### `GET /api/notifications`
Get user notifications.

### `PATCH /api/notifications/:id/read`
Mark single notification as read.

### `POST /api/notifications/read-all`
Mark all notifications as read.

### `GET /api/settings`
Get agency and workspace preferences.

### `PATCH /api/settings`
Update agency settings.
