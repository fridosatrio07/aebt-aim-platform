# UI Runtime Tokenization Implementation Spec

## Objective

Define how design tokens move from documented intent to runtime CSS variables, Tailwind semantic mappings, and shadcn/ui theme overrides so that RoutePageShell becomes the pilot Industrial Integrity Command Console surface.

## Design Tokens vs Runtime Tokens

Release 7 documented which token categories are required and how they should behave. Release 8 defines how those tokens are implemented in `globals.css`, `tailwind.config.ts`, and component classes.

Runtime token implementation is NOT decorative polish. Every token MUST map to an operational meaning: background layering, surface elevation, boundary strength, text hierarchy, risk state, evidence state, review state, export state, or draft/preliminary state.

## Required Implementation Layers

### Layer 1 — CSS Variables in globals.css

Define these in `:root` for light and `.dark` for dark mode:

- `--background`
- `--foreground`
- `--surface-1`
- `--surface-2`
- `--surface-3`
- `--border-subtle`
- `--border-strong`
- `--text-muted`
- `--text-disabled`
- `--brand-navy`
- `--brand-blue`
- `--intelligence-cyan`
- `--integrity-teal`
- `--status-success`
- `--status-warning`
- `--status-danger`
- `--status-draft`
- `--status-pending-review`
- `--status-approved`
- `--risk-low`
- `--risk-medium`
- `--risk-high`
- `--risk-critical`
- `--due-normal`
- `--due-soon`
- `--due-overdue`
- `--evidence-ready`
- `--evidence-missing`
- `--export-ready`
- `--export-warning`

Actual hex values MUST be taken from documented design-system guidance where available. If repository docs do not finalize values yet, record the token decision in the decision log instead of inventing ungrounded colors.

### Layer 2 — Tailwind Semantic Mapping in tailwind.config.ts

Extend the color object with semantic keys that map to the CSS variables above. Retain the existing `aim` keys until all other components migrate. The mapping table in `CSS_TAILWIND_TOKEN_MAPPING_PLAN.md` is the source of truth for key names.

### Layer 3 — shadcn/ui-Compatible Variable Mapping

Override shadcn/ui token names through the same CSS variables:

- `--background` -> surfaces
- `--foreground` -> text on surfaces
- `--card` -> raised panel surface
- `--popover` -> elevated surface
- `--primary` -> primary action surface
- `--secondary` -> secondary action surface
- `--muted` -> muted surface for disabled or secondary text
- `--border` -> default border
- `--input` -> input border
- `--ring` -> focus ring
- `--destructive` -> warning, danger, and rejection states

### Layer 4 — Dark and Light Theme Class Behavior

Dark mode MUST be class-based. The active theme is reflected via `.dark` or `.light` ancestor class (recommended on `html`). Media queries alone are insufficient because operators may want explicit control and layered contrast testing.

### Layer 5 — Component Class Usage Rules

- RoutePageShell MUST use semantic classes only.
- No hard-coded visual color when a semantic token exists.
- Any new visual need MUST be recorded as a token decision, not a scattered one-off class.
- Existing Release 5 UI primitives MAY keep `aim` utilities temporarily if RoutePageShell itself moves to tokens first.

## Migration Sequence

1. Add CSS variables for light and dark themes in `globals.css` without removing existing base rules.
2. Add Tailwind semantic color mapping in `tailwind.config.ts` while retaining `aim` keys.
3. Override shadcn/ui CSS variables in `globals.css`.
4. Update only `RoutePageShell.tsx` and its direct dependencies to use semantic classes.
5. Manually verify light and dark modes.
6. Record token decision log updates.
7. Hand off for human review.

## Anti-Slop Guardrails

- Do not introduce a huge color palette. Keep it semantic and maintainable.
- Do not write motivational prose about modern or beautiful UI.
- Do not invent hex values not grounded in repository design-system guidance.
- Do not claim full compliance after only RoutePageShell pilot.