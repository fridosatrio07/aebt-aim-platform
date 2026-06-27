# Token Decision Log

## Purpose

Record provisional runtime token decisions introduced before final Project Owner and design-system approval. This log prevents one-off color drift while making clear that Release 8 token values are implementation placeholders, not final brand or regulatory approvals.

## 2026-06-27 - Release 8 Runtime Token Pilot

- Related release: Release 8 - UI Runtime Tokenization & Industrial Console Shell Implementation.
- Related files: `main/apps/web/app/globals.css`, `main/apps/web/tailwind.config.ts`, `main/apps/web/src/components/RoutePageShell.tsx`, `main/apps/web/src/components/app-shell-chrome.tsx`.
- Decision: Implemented provisional AEBT Precision Light and AEBT Control Room Dark CSS variables so RoutePageShell can use semantic runtime tokens.
- Source basis: Existing `aim` palette in `tailwind.config.ts`, Release 7 design token contract, and Release 8 token mapping plan.
- Impact: Enables runtime verification and dark/light layered surfaces without app-wide visual rewrite.
- Required reviewer: Project Owner + UBT/IT + UI/UX owner.
- Status: Needs Review.

## Guardrail

Future agents MUST update this log when a repeated visual need is added or when token values are approved/replaced. Token values MUST NOT be treated as final brand or compliance approval until explicitly reviewed.
