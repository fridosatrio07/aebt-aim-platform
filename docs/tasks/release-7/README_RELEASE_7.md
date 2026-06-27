# Release 7 - UI/UX Design System Compliance & App Shell Hardening

## Purpose
Release 7 establishes AIM Platform design-system compliance guidance, app-shell hardening rules, and release verification maturity alignment. It is not a broad UI rewrite.

## Task List
- [x] R7-01 - Release 7 source review and documentation consistency check
- [x] R7-02 - Design token and theme contract
- [x] R7-03 - Semantic status, badge, and operational state contract
- [x] R7-04 - shadcn/ui override and reusable component visual contract
- [x] R7-05 - Page template, density, and table/drawer pattern rules
- [x] R7-06 - App shell, route page shell, sidebar, and topbar hardening rules
- [x] R7-07 - Accessibility, dark mode, and non-color-only status baseline
- [x] R7-08 - Export warning, evidence visibility, and draft/preliminary label rules
- [x] R7-09 - Package metadata and release verification maturity alignment
- [x] R7-10 - Release 7 verification and handoff

## Verification
Run from `main/`:
- `pnpm run release7:verify`
- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm run test`
- `pnpm run build`

## Boundary
Release 7 completes guidance and maturity alignment only. Future implementation must apply tokens/components/templates in code and pass visual/accessibility/stakeholder review.
