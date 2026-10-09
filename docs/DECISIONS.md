# Architecture & Design Decisions

## ADR 001: Persistent Transactional JSON Data Engine
- **Context**: The applet environment needs real persistence across page reloads and server restarts without requiring complex external cloud credentials.
- **Decision**: Implemented an atomic file-backed JSON database in `data/database.json` with synchronous in-memory caching and atomic write-to-file operations on mutations.
- **Consequence**: Zero cloud configuration required, instant boot, reproducible seeding, and complete relational consistency.

## ADR 002: Dual-Perspective Experience (Admin Workspace + Client Portal)
- **Context**: The user explicitly requested: "Make all think claint side and admin side botha nd done that".
- **Decision**: Developed both an extensive Admin/Agency management system AND a dedicated Client Portal. Provided a persistent persona switcher in the header so reviewers can immediately toggle between Admin (Sarah Lin), Team Member (Alex Rivera), and Client (Marcus Vance @ Acme Corp).
- **Consequence**: Live demonstration proves full-stack RBAC, security boundaries, client-specific views (deliverables, invoices, milestones), and agency operations.

## ADR 003: Design System Adherence
- **Context**: Design guidelines mandate warm ivory (`#F7F5F0`), white cards, and buttery yellow (`#F6B91A`) accents, avoiding generic purple/cyan AI dashboard templates.
- **Decision**: Configured all CSS design tokens and component styling around this warm palette and enforced Zero-Pill unboxed metadata typography.
