# AgencyOS — Database Architecture & Schema

## 1. Storage Strategy
AgencyOS uses an atomic, persistent transactional JSON database located at `data/database.json`. This provides:
- Complete persistence across dev restarts and browser reloads.
- Predictable and rapid seeding with relational consistency.
- Pure zero-external-dependency portability.
- Complete agency tenant isolation on every collection.

---

## 2. Entity Schemas

### Agency
- `id`: string (UUID)
- `name`: string (e.g., "D Web Studio")
- `website`: string
- `currency`: string ("USD", "EUR", "GBP")
- `createdAt`: ISO 8601 string

### User
- `id`: string
- `agencyId`: string (FK)
- `name`: string
- `email`: string
- `role`: `"admin"` | `"team"` | `"client"`
- `title`: string
- `avatarUrl`: string (Local high-res portrait asset)
- `active`: boolean
- `clientId`: optional string (FK, for Client role)
- `createdAt`: ISO 8601 string

### Client
- `id`: string
- `agencyId`: string (FK)
- `name`: string
- `company`: string
- `email`: string
- `phone`: string
- `website`: string
- `status`: `"active"` | `"lead"` | `"churned"`
- `notes`: string
- `createdAt`: ISO 8601 string

### Project
- `id`: string
- `agencyId`: string (FK)
- `clientId`: string (FK)
- `name`: string
- `description`: string
- `status`: `"planning"` | `"in_progress"` | `"in_review"` | `"on_hold"` | `"completed"` | `"cancelled"`
- `priority`: `"low"` | `"medium"` | `"high"` | `"urgent"`
- `budget`: number
- `startDate`: string (YYYY-MM-DD)
- `dueDate`: string (YYYY-MM-DD)
- `assignedUserIds`: string[]
- `createdAt`: ISO 8601 string
- `updatedAt`: ISO 8601 string

### Task
- `id`: string
- `agencyId`: string (FK)
- `projectId`: string (FK)
- `title`: string
- `description`: string
- `assigneeId`: string (FK to User)
- `status`: `"todo"` | `"in_progress"` | `"in_review"` | `"done"`
- `priority`: `"low"` | `"medium"` | `"high"` | `"urgent"`
- `dueDate`: string (YYYY-MM-DD)
- `completedAt`: optional ISO 8601 string
- `createdAt`: ISO 8601 string
- `updatedAt`: ISO 8601 string

### Lead
- `id`: string
- `agencyId`: string (FK)
- `name`: string
- `company`: string
- `email`: string
- `phone`: string
- `source`: string ("Inbound", "Referral", "LinkedIn", "Conference")
- `serviceInterest`: string ("Full-Stack SaaS", "UI/UX Redesign", "Mobile App", "Brand Identity")
- `estimatedValue`: number
- `status`: `"new"` | `"contacted"` | `"qualified"` | `"proposal_sent"` | `"won"` | `"lost"`
- `assignedToId`: string (FK to User)
- `notes`: string
- `convertedClientId`: optional string (FK)
- `createdAt`: ISO 8601 string
- `updatedAt`: ISO 8601 string

### Notification
- `id`: string
- `agencyId`: string (FK)
- `userId`: string (FK)
- `type`: `"task_assigned"` | `"task_due"` | `"project_status"` | `"lead_won"` | `"system"`
- `title`: string
- `message`: string
- `read`: boolean
- `targetRoute`: string
- `createdAt`: ISO 8601 string

### Activity
- `id`: string
- `agencyId`: string (FK)
- `actorId`: string (FK to User)
- `actorName`: string
- `action`: string
- `entityType`: `"project"` | `"task"` | `"lead"` | `"client"`
- `entityId`: string
- `entityName`: string
- `timestamp`: ISO 8601 string

---

## 3. Relational Consistency Rules
- **Lead Conversion**: When a lead is converted to a client, a new `Client` record is generated, the lead status changes to `"won"`, and an optional inaugural `Project` is provisioned atomically.
- **Project Progress Calculation**: A project's progress percentage is derived dynamically as `(completedTasks / totalTasks) * 100`.
- **Tenant Isolation**: Every query must filter by `agencyId`.
