# AgencyOS — Design System & UI Guidelines

> Purpose: Guide implementation toward a warm, polished, human-designed agency management interface—not a generic AI-generated SaaS template.

## 1. Design Intent
AgencyOS feels calm, capable, welcoming, and professional. The interface is light, organized, and easy to scan, with warm ivory surfaces, soft cream panels, restrained golden-yellow accents, dark readable typography, and purposeful semantic color for data status.

Prioritize clarity and practical usability over visual tricks. Avoid an overly futuristic look, excessive gradients, glassmorphism, decorative blobs, and non-functional animation.

---

## 2. Color Palette & Design Tokens

| Token | Hex | Usage |
|---|---|---|
| `--color-canvas` | `#F7F5F0` | Main application background (warm ivory) |
| `--color-surface` | `#FFFFFF` | Cards, menus, modals, input backgrounds |
| `--color-surface-warm` | `#FFF8E8` | Warm highlight panels, secondary subtle callouts |
| `--color-surface-yellow` | `#FFF0C2` | Selected navigation item background |
| `--color-accent` | `#F6B91A` | Primary action buttons, brand indicator |
| `--color-accent-hover` | `#E5A80C` | Hover/active state for primary actions |
| `--color-accent-soft` | `#FFE6A0` | Light accent highlights |
| `--color-ink` | `#17212B` | Primary headings and text |
| `--color-ink-secondary` | `#526174` | Supporting descriptive text |
| `--color-muted` | `#7B8794` | Timestamps, metadata, subtle borders |
| `--color-border` | `#E9E6DF` | Primary hairline divider and card border |
| `--color-border-strong` | `#DAD5CA` | Input outlines and emphasized borders |
| `--color-success` | `#16A36A` | Completed, won leads, positive progress |
| `--color-info` | `#3478F6` | In-progress states, client links |
| `--color-violet` | `#8B5CF6` | Planning status, creative categories |
| `--color-danger` | `#EF6262` | Overdue deadlines, errors, lost leads |
| `--color-sidebar` | `#FCFBF8` | Sidebar navigation background |

---

## 3. Universal Anti-Slop & Typography Rules

### A. Zero-Pill Discipline
- **No Static Pill Enclosures**: Never wrap metadata (categories, tags, dates, statuses, scores) in pill capsules or candy badges. Render metadata as clean unboxed text with subtle typographic separators (`·`, `/`).
- **Interactive Controls**: Segmented tabs, filter toggles, and status buttons are functional button controls styled with subtle segmented surfaces.

### B. Top Bar Contract
The top header strictly follows a 3-zone layout:
1. **Brand Zone**: Clean wordmark (`AgencyOS`) with subtle subtitle.
2. **Navigation / Search Zone**: Single-line contextual navigation or unified global search bar.
3. **Action Zone**: Role persona switcher, notifications bell with count indicator, and user profile avatar.

### C. Tabular Numerals
All numeric metrics, dates, currency amounts, and timers use `font-variant-numeric: tabular-nums` to ensure exact column alignment and avoid layout jitter.

---

## 4. Layout & Spacing Scale
- Sidebar width: 240px desktop, full-width sliding drawer on mobile.
- Top bar height: 60px fixed header.
- Main content container: fluid with 24px–32px padding, maximum width 1536px.
- Card padding: 20px standard, 16px compact.
- Border radius:
  - Controls: 8px (`rounded-lg`)
  - Cards: 12px (`rounded-xl`)
  - Dialogs: 16px (`rounded-2xl`)
