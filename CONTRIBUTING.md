# Contributing to AgencyOS

## Code Architecture Guidelines
1. **Design System**: Strictly adhere to the Warm Ivory palette (`#F7F5F0`, `#FFFFFF`, `#FFF0C2`, `#F6B91A`, `#17212B`) and the Zero-Pill rule.
2. **Tabular Numerals**: Enforce `tabular-nums` for all metrics, currency amounts, and dates.
3. **Backend API**: All mutations must validate payload data, enforce `agencyId`, and log an `Activity` event.
4. **Build & Lint**: Always ensure `npm run build` succeeds cleanly without TypeScript errors.
