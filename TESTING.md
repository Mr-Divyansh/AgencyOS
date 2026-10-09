# AgencyOS — Testing & Verification Strategy

## 1. Test Coverage Areas
1. **Authentication & Role Switching**:
   - Switching between Admin (Sarah Lin), Team Member (Alex Rivera), and Client (Marcus Vance).
   - Verifying that Client users only see their organization's projects and invoices.
2. **Project Lifecycle**:
   - Creating projects with budget, client link, and team assignments.
   - Progress percentage correctly updates based on completed tasks.
   - Status updates and archival.
3. **Kanban & Task Management**:
   - Moving tasks between To Do, In Progress, In Review, Done.
   - Task creation and assignment to team members.
4. **CRM Lead Pipeline**:
   - Creating inbound leads with deal values.
   - Transitioning stages (New -> Contacted -> Qualified -> Proposal Sent -> Won).
   - Atomically converting a Won lead into an active Client + inaugural Project without duplicates.
5. **Client Portal Workflows**:
   - Milestone reviews and deliverable approvals.
   - Submitting client feedback.
   - Invoice summary verification.
6. **Responsive Layout Verification**:
   - Mobile navigation drawer (<768px).
   - Tablet 2-column layout.
   - Desktop 1440px multi-column layout.
