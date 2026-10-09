# AgencyOS — Security Architecture

## 1. Authentication & Session Strategy
- Authenticated sessions identify the caller's `userId`, `role`, and `agencyId`.
- Demo personas (Admin, Team Member, Client) allow reviewers to test role isolation safely without exposing production credentials.

## 2. Role-Based Access Control (RBAC) Matrix
- **Admin**: Complete read/write access to agency financials, projects, tasks, leads, clients, team assignments, and settings.
- **Team Member**: Access to assigned projects and tasks; read-only CRM access; financial and administrative settings are protected.
- **Client**: Access strictly isolated to the client's own organization (`clientId`). Clients cannot see other clients, other agency projects, or internal agency financial dashboards.

## 3. Multi-Tenant Isolation
Every query in the database layer enforces `agencyId` scoping. Cross-tenant leakage is prevented at the data access layer.

## 4. Input Validation & Data Sanitization
- Form payloads are sanitized on input.
- Numeric fields (budgets, hours, deal values) are strictly parsed and validated against negative or invalid inputs.
- Safe JSON encoding prevents XSS injection.
