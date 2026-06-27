# Design Tokens Theme Contract

## Source Rule
CSS variables are the primary design-token source. Tailwind classes MUST map to semantic tokens. shadcn/ui components MUST be theme-overridden before they are accepted as final AIM Platform UI.

## Theme Names
- Light theme: AEBT Precision Light.
- Dark theme: AEBT Control Room Dark.

Dark mode MUST use layered surfaces and contrast rules. It MUST NOT be a simple color inversion.

## Required Token Categories

### Base
- `--background`
- `--foreground`

### Surfaces
- `--surface-1`: main page background.
- `--surface-2`: cards, panels, drawers.
- `--surface-3`: raised/sticky/selected shell surfaces.

### Borders
- `--border-subtle`
- `--border-strong`

### Text
- `--text-muted`
- `--text-disabled`

### Brand
- `--brand-navy`
- `--brand-blue`

### Intelligence / Analytics
- `--intelligence-cyan`

### Integrity / Validated Workflow
- `--integrity-teal`

### Semantic Operational States
- `--success`
- `--warning`
- `--due`
- `--overdue`
- `--high`
- `--critical`
- `--danger`
- `--rejected`
- `--missing-evidence`
- `--draft`
- `--pending-review`
- `--approved`
- `--exported`

## Tailwind Mapping Rule
Tailwind names SHOULD be semantic, not decorative. Examples: `bg-surface-1`, `border-border-subtle`, `text-text-muted`, `bg-state-overdue`, `text-state-draft`, `bg-integrity-teal`.

## shadcn/ui Override Rule
Default shadcn/ui styling MUST NOT be accepted as final UI. shadcn/ui primitives MAY be used only after mapping surfaces, borders, focus states, radius, typography, status colors, and density to AIM tokens.

## Hard-Coded Color Rule
Page components MUST NOT hard-code colors when a token exists. Repeated new visual needs MUST be added to a token decision log or theme contract instead of scattered as one-off Tailwind utilities.

## Current Implementation Note
Current code uses a small `aim` color set in `main/apps/web/tailwind.config.ts` and several raw Tailwind color utilities in `release5-ui.tsx` and shell components. Release 7 documents the target contract; it does not complete token migration.

## Token Decision Log Template
- Token need:
- Operational meaning:
- Proposed CSS variable:
- Proposed Tailwind alias:
- Light theme value:
- Dark theme value:
- Component/page users:
- Reviewer required:
- Status:
