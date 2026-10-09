# AgencyOS — Design System & UI Guidelines

> Design reference: the approved AgencyOS dashboard mockup.
> Purpose: guide implementation toward a warm, polished, human-designed agency management interface—not a generic AI-generated SaaS template.

## 1. Design Intent

AgencyOS should feel calm, capable, welcoming, and professional. The interface is light, organized, and easy to scan, with warm ivory surfaces, soft cream panels, restrained golden-yellow accents, dark readable typography, and small amounts of color for data status.

Prioritize clarity and practical usability over visual effects. Every element should have a purpose. Avoid an overly futuristic look, excessive gradients, glassmorphism, giant headings, decorative blobs, and unnecessary animation.

## 2. Visual Principles

- **Warm, not stark:** use ivory/off-white rather than pure white as the overall canvas.
- **Simple hierarchy:** clear page titles, concise labels, readable metrics, and predictable spacing.
- **Quiet surfaces:** white cards with subtle borders and restrained shadows.
- **Accent with intent:** yellow highlights the primary action and selected navigation; do not use it everywhere.
- **Data first:** charts and tables should be legible at a glance and never compete with each other.
- **Human details:** use natural copy, small contextual labels, meaningful empty states, and consistent alignment.
- **Responsive by design:** preserve information hierarchy on mobile instead of squeezing the desktop layout.

## 3. Color Palette

Use these as design tokens. Keep the overall interface warm and low-contrast in decoration while maintaining strong text contrast.

| Token | Hex | Usage |
|---|---|---|
| `--color-canvas` | `#F7F5F0` | Main app background |
| `--color-surface` | `#FFFFFF` | Cards, menus, dialogs |
| `--color-surface-warm` | `#FFF8E8` | Warm promotional panels and selected subtle surfaces |
| `--color-surface-yellow` | `#FFF0C2` | Selected navigation background and soft highlights |
| `--color-accent` | `#F6B91A` | Primary buttons, active indicators, key highlights |
| `--color-accent-hover` | `#E5A80C` | Hover/pressed state for primary actions |
| `--color-accent-soft` | `#FFE6A0` | Pale accent backgrounds |
| `--color-ink` | `#17212B` | Main text and headings |
| `--color-ink-secondary` | `#526174` | Supporting text |
| `--color-muted` | `#7B8794` | Timestamps, metadata, helper labels |
| `--color-border` | `#E9E6DF` | Card outlines and dividers |
| `--color-border-strong` | `#DAD5CA` | Stronger separators and input outlines |
| `--color-success` | `#16A36A` | Success, completed, positive movement |
| `--color-success-soft` | `#E0F6E9` | Success status backgrounds |
| `--color-info` | `#3478F6` | Links, in-progress states, informational elements |
| `--color-info-soft` | `#E8F0FF` | Informational status backgrounds |
| `--color-violet` | `#8B5CF6` | Secondary status/category |
| `--color-violet-soft` | `#F0E9FF` | Violet status backgrounds |
| `--color-danger` | `#EF6262` | Errors, overdue, cancelled |
| `--color-danger-soft` | `#FDE8E8` | Danger status backgrounds |
| `--color-sidebar` | `#FCFBF8` | Sidebar background |
| `--color-dark-panel` | `#202A33` | Occasional dark CTA panel |

### Color rules

- The overall page should remain predominantly ivory and white.
- Yellow is the primary brand accent; use it for primary buttons, selected nav, and a few highlighted icons.
- Use green, blue, violet, and red only when communicating statuses or chart categories.
- Do not color every card differently.
- Avoid orange-heavy styling, neon colors, rainbow gradients, and full-page yellow backgrounds.
- Always maintain readable contrast for text and interactive controls.

## 4. Typography

Use a modern, neutral sans-serif with a natural product feel.

**Preferred stack:** `Inter`, `DM Sans`, or the existing project's sans-serif. If adding a font requires a network request, include a reliable system fallback.

```css
font-family: Inter, "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Typography guidance:
- Page title: 24–30px, weight 600–700.
- Section heading: 14–17px, weight 600.
- KPI number: 28–36px, weight 650–700.
- Body text: 13–15px, weight 400.
- Table text: 12–14px, weight 400–500.
- Metadata: 11–12px, weight 400.
- Line height: 1.4–1.6 for body text.
- Avoid oversized display typography inside the app dashboard.
- Use sentence case, not all caps, for normal UI labels.

## 5. Layout & Grid

### Desktop shell

- Target reference width: approximately 1440–1536px.
- Sidebar: approximately 208–224px wide, fixed while the main content scrolls.
- Top bar: approximately 60px high.
- Main content: fluid width with 24–28px horizontal padding.
- Use a 12-column or CSS grid layout where appropriate.
- Main dashboard content may use a wide center column and a narrower right rail.
- Standard card gap: 12–16px.
- Card padding: 16–20px.
- Card radius: 10–14px.
- Inputs and buttons: 8–10px radius.
- Use consistent spacing tokens; do not tune each card independently.

### Suggested spacing scale

| Token | Value |
|---|---:|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |

### Main dashboard composition

1. Sidebar with brand, primary navigation, a low-emphasis upgrade card, and workspace identity near the bottom.
2. Top bar with global search, notifications, user profile, and a compact theme control if theme switching exists.
3. Page introduction with greeting/title and a date-range control.
4. Four KPI cards: Total Projects, Active Clients, Open Tasks, Leads.
5. Main analytics area: Revenue Overview and Project Status.
6. A warm, low-profile product/agency promo panel only if relevant to the current product.
7. Recent Projects, Tasks, Recent Leads, Team, Recent Activity, and Upcoming Deadlines.
8. Keep the layout balanced; avoid squeezing every module above the fold on smaller screens.

## 6. Component Guidelines

### Sidebar
- Warm near-white background with a thin right border.
- Logo and product name at the top.
- Simple line icons, consistent size and stroke.
- Active navigation item uses a pale yellow fill and dark text.
- Other items use secondary ink with a restrained hover surface.
- Keep navigation labels short and consistently aligned.
- On mobile, use a drawer or compact navigation pattern.

### Top bar
- White or lightly warm surface.
- Search field with a soft neutral fill and subtle border.
- Notification icon with a small unread indicator.
- Avatar, name, role, and menu affordance.
- Avoid multiple competing controls.

### KPI cards
- White background, fine border, restrained shadow.
- Small icon inside a pale category-colored circle.
- Short label, prominent number, and optional comparison to a previous period.
- Tiny sparklines are optional; omit them if data is not meaningful.
- Positive/negative indicators must reflect actual data, not decorative invented percentages.

### Charts
- Use simple line/area charts and a clear status donut when helpful.
- Revenue chart: warm yellow line, light yellow area fill, subtle grid lines, compact axes.
- Project status chart: distinct but muted green, blue, yellow, violet, and red categories.
- Include a legend, labels, and accessible text equivalents.
- Ensure chart data matches the dashboard metrics and selected date range.

### Tables
- White surface, minimal dividers, compact but comfortable row heights.
- Use a clear column header style and align dates/numbers consistently.
- Use small thumbnails only where they add useful context.
- Status pills should be compact and readable, with soft tinted backgrounds.
- Provide row hover feedback and clear links/actions.
- Include pagination or progressive loading for longer lists.
- On mobile, use horizontal scrolling only when reasonable; otherwise transform rows into stacked summaries.

### Status pills
Use semantic color, not arbitrary decoration:
- **In Progress:** blue background/text.
- **Completed / Won:** green background/text.
- **Planning / Proposal Sent:** violet background/text.
- **On Hold / New:** pale yellow background with dark text.
- **Overdue / Cancelled / Error:** soft red background with dark red text.
- Always include readable text; color alone must not convey the state.

### Buttons
- Primary: golden yellow fill with dark text, clear hover and focus states.
- Secondary: white fill, neutral border, dark text.
- Tertiary: text-only for low-emphasis actions.
- Destructive: restrained red treatment and confirmation where appropriate.
- Button labels should describe the action (“Create project”, “Save changes”), not vague labels (“Go”, “Submit”) unless context is obvious.
- Use a consistent height of approximately 36–42px for standard actions.

### Forms and dialogs
- Labels above fields.
- Clear required/optional indicators.
- Helpful validation messages adjacent to the relevant field.
- Avoid giant modals; use a side panel or compact dialog for short forms.
- Preserve entered values if a server error occurs.
- Confirm destructive actions.

### Activity feed
- Small semantic icon inside a soft tinted circle.
- One clear sentence describing the event.
- Relative timestamp beneath or beside it.
- Avoid fake activity; show only real events or clearly labelled demo seed events.

### Promotional panels
- Use sparingly.
- Warm cream/yellow background, concise copy, one clear CTA, and restrained illustration if it serves a purpose.
- The dashboard's primary work tools must remain visually dominant.
- Do not let marketing panels make an internal management app feel like an advertisement.

## 7. Icons & Illustration

- Use one consistent outline icon family, such as Lucide.
- Standard navigation icons: 16–18px.
- Small inline icons: 14–16px.
- Do not mix outline, filled, emoji, and 3D icon styles.
- Use illustrations only in empty states or a small contextual promo area.
- Avoid generic AI-looking abstract blobs, excessive floating shapes, and decorative visuals that do not explain anything.
- User avatars and project thumbnails must be authentic demo assets or neutral placeholders; do not imply fictional people are real customers.

## 8. Motion & Interaction

- Use motion only to clarify a state change or provide feedback.
- Typical transitions: 120–200ms.
- Prefer subtle opacity, color, and small transform transitions.
- Avoid scroll-jacking, oversized entrance animations, constant pulsing, and animation on every element.
- Support `prefers-reduced-motion`.
- Focus, hover, pressed, disabled, loading, and success states must be designed consistently.

## 9. Responsive Behavior

### Desktop: 1200px and above
- Full sidebar and multi-column dashboard.
- KPI cards on one row where space permits.
- Analytics and activity rail arranged by importance.

### Tablet: 768–1199px
- Sidebar can collapse to an icon rail or drawer.
- KPI cards use two columns.
- Reduce dashboard columns without making charts or tables unreadable.

### Mobile: below 768px
- Use a drawer or compact navigation.
- Stack KPI cards in two columns when readable, otherwise one column.
- Stack charts and panels vertically.
- Use a compact page header and move date filters to a secondary row.
- Ensure buttons and touch targets are comfortable.
- Prevent horizontal overflow.
- Preserve the most important information first: summary, deadlines, tasks, and projects.

## 10. Empty, Loading, Error & Success States

- **Empty:** explain what belongs here and provide one useful next action.
- **Loading:** use subtle skeletons that match the final layout.
- **Error:** explain what happened in plain language and provide retry when appropriate.
- **Success:** show concise confirmation near the action or with a toast.
- **No search results:** show the search context and a way to clear filters.
- **Permission denied:** explain that the user does not have access without exposing private information.

Never use blank panels, endless spinners, or browser alert boxes as the primary product experience.

## 11. Content & Microcopy

Use short, natural, specific language.

Prefer:
- “Create project”
- “No projects yet”
- “Due tomorrow”
- “Saved successfully”
- “Try clearing your filters”

Avoid:
- Overly enthusiastic AI-style phrases.
- Repeated exclamation marks.
- Generic filler copy.
- Fake testimonials or unsupported business claims.
- Placeholder text left in the final demo.

Demo records must be internally consistent and should be clearly understood as sample data.

## 12. Accessibility

- Use semantic HTML landmarks and headings.
- Ensure keyboard access to navigation, forms, menus, and dialogs.
- Show visible focus rings.
- Use accessible names for icon-only buttons.
- Maintain sufficient contrast for text, controls, and status labels.
- Do not use color as the only way to communicate status.
- Provide labels or summaries for charts.
- Respect reduced-motion preferences.

## 13. Design Tokens — Starter CSS

```css
:root {
  color-scheme: light;

  --color-canvas: #F7F5F0;
  --color-surface: #FFFFFF;
  --color-surface-warm: #FFF8E8;
  --color-surface-yellow: #FFF0C2;
  --color-accent: #F6B91A;
  --color-accent-hover: #E5A80C;
  --color-accent-soft: #FFE6A0;

  --color-ink: #17212B;
  --color-ink-secondary: #526174;
  --color-muted: #7B8794;

  --color-border: #E9E6DF;
  --color-border-strong: #DAD5CA;

  --color-success: #16A36A;
  --color-success-soft: #E0F6E9;
  --color-info: #3478F6;
  --color-info-soft: #E8F0FF;
  --color-violet: #8B5CF6;
  --color-violet-soft: #F0E9FF;
  --color-danger: #EF6262;
  --color-danger-soft: #FDE8E8;

  --color-sidebar: #FCFBF8;
  --color-dark-panel: #202A33;

  --font-sans: Inter, "DM Sans", -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;

  --radius-control: 9px;
  --radius-card: 12px;
  --radius-panel: 14px;

  --shadow-card: 0 2px 8px rgba(23, 33, 43, 0.035);
  --shadow-popover: 0 8px 28px rgba(23, 33, 43, 0.10);

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
}

body {
  margin: 0;
  background: var(--color-canvas);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
}
```

## 14. Definition of Design Done

A screen is design-complete when:

- It follows the shared palette, typography, spacing, and component rules.
- Visual hierarchy is clear without excessive decoration.
- All interactive elements have visible states.
- Loading, empty, error, and success states are accounted for.
- The layout is tested at desktop, tablet, and mobile widths.
- Text contrast and keyboard focus are acceptable.
- Charts, labels, and status colors are consistent with the data.
- There are no broken layouts, arbitrary spacing values, or inconsistent component styles.
- The finished screen feels calm, practical, and deliberately designed.

## 15. Final Design Rule

Use the reference image as direction, not as a pixel-perfect screenshot to copy. Keep the warm off-white and buttery-yellow identity, the quiet card surfaces, the restrained status colors, and the clean dashboard hierarchy. Make every component feel intentional, functional, and consistent with the rest of AgencyOS.
