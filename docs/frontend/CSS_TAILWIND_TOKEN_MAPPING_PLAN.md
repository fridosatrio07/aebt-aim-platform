# CSS and Tailwind Token Mapping Plan

## Objective

Translate semantic design tokens into CSS variables and Tailwind color keys that RoutePageShell and its dependent components can consume without repeating one-off color values.

## Core Principles

- CSS variables are the source of truth.
- Tailwind keys MUST be semantic, not decorative.
- shadcn/ui MUST map to the same CSS variables.
- Dark mode MUST use layered surfaces and contrast rules, not inversion.
- Existing `aim` keys MAY be retained temporarily during migration but MUST NOT be expanded with new one-off colors.

## Required CSS Variable Names

These variables MUST exist in light and dark themes:

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

## Existing `aim` Keys

Retain temporarily:

- `aim.ink`
- `aim.field`
- `aim.line`
- `aim.action`
- `aim.alert`

Do NOT expand `aim` with new colors. Any new color MUST be added as a semantic token key and mapped through the table above.

## Theme Representation

### AEBT Precision Light (Light)

Light theme MUST use white and light-gray surfaces, dark navy/ink text, teal/cyan accents for operational actions, and constrained use of navy/blue for identity.

### AEBT Control Room Dark (Dark)

Dark theme MUST layer surfaces:

- `--surface-1` is the darkest page background.
- `--surface-2` is cards and panels.
- `--surface-3` is elevated/sticky/selected shell sections.
- Borders MUST be visible without relying on contrast inversion.

Dark mode MUST NOT be a simple color inversion.

## shadcn/ui Override Behavior

shadcn/ui components must inherit:

- `background` and `foreground` on default surfaces.
- `card` on card surfaces.
- `primary` on primary actions.
- `destructive` on rejection/danger scenarios.
- `border` and `ring` for focus and boundary.

Radius, padding, and typography overrides fall outside Release 8 token scope but MUST be considered before final shadcn/ui acceptance.

## Mapping Table

| Semantic Concept | CSS Variable | Tailwind Key | shadcn/ui Mapping |
| --- | --- | --- | --- |
| Base background | `--background` | `background` | `background` |
| Base foreground | `--foreground` | `foreground` | `foreground` |
| Main surface | `--surface-1` | `surface-1` | `card` |
| Raised surface | `--surface-2` | `surface-2` | `popover` |
| Elevated surface | `--surface-3` | `surface-3` | not mapped directly |
| Subtle border | `--border-subtle` | `border-subtle` | `border` |
| Strong border | `--border-strong` | `border-strong` | not mapped directly |
| Muted text | `--text-muted` | `text-muted` | `muted-foreground` |
| Disabled text | `--text-disabled` | `text-disabled` | not mapped directly |
| Brand navy | `--brand-navy` | `brand-navy` | not mapped directly |
| Brand blue | `--brand-blue` | `brand-blue` | not mapped directly |
| Intelligence cyan | `--intelligence-cyan` | `intelligence-cyan` | not mapped directly |
| Integrity teal | `--integrity-teal` | `integrity-teal` | not mapped directly |
| Success | `--status-success` | `status-success` | not mapped directly |
| Warning | `--status-warning` | `status-warning` | not mapped directly |
| Danger | `--status-danger` | `status-danger` | `destructive` |
| Draft | `--status-draft` | `status-draft` | not mapped directly |
| Pending review | `--status-pending-review` | `status-pending-review` | not mapped directly |
| Approved | `--status-approved` | `status-approved` | not mapped directly |
| Risk low | `--risk-low` | `risk-low` | not mapped directly |
| Risk medium | `--risk-medium` | `risk-medium` | not mapped directly |
| Risk high | `--risk-high` | `risk-high` | not mapped directly |
| Risk critical | `--risk-critical` | `risk-critical` | not mapped directly |
| Due normal | `--due-normal` | `due-normal` | not mapped directly |
| Due soon | `--due-soon` | `due-soon` | not mapped directly |
| Due overdue | `--due-overdue` | `due-overdue` | not mapped directly |
| Evidence ready | `--evidence-ready` | `evidence-ready` | not mapped directly |
| Evidence missing | `--evidence-missing` | `evidence-missing` | not mapped directly |
| Export ready | `--export-ready` | `export-ready` | not mapped directly |
| Export warning | `--export-warning` | `export-warning` | not mapped directly |

## Proposed Tailwind Color Keys

These keys map to the CSS variables above:

- `background`
- `foreground`
- `surface-1`
- `surface-2`
- `surface-3`
- `border-subtle`
- `border-strong`
- `text-muted`
- `text-disabled`
- `brand-navy`
- `brand-blue`
- `intelligence-cyan`
- `integrity-teal`
- `status-success`
- `status-warning`
- `status-danger`
- `status-draft`
- `status-pending-review`
- `status-approved`
- `risk-low`
- `risk-medium`
- `risk-high`
- `risk-critical`
- `due-normal`
- `due-soon`
- `due-overdue`
- `evidence-ready`
- `evidence-missing`
- `export-ready`
- `export-warning`