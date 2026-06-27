# Front-End Acceptance Checklist

## Visual And UX Readiness

- [x] App shell is consistent across the Release 5 workbench sections.
- [x] Route accessibility basics are supported through keyboard-focusable navigation buttons and table action buttons.
- [x] Navigation is consistent with role, tenant, project, and site context.
- [x] Breadcrumb/current-page context is shown through the page header and active workbench section.
- [x] Role-aware menu behavior is labelled as Needs RBAC Review where final permission is not approved.
- [x] Existing Tailwind design tokens are used for core shell, line, field, action, and ink colors.
- [x] Hard-coded colors are limited to status/warning states where no finalized token exists; final token governance remains a design review item.
- [x] Table density and readability support high-volume scanning.
- [x] Status badge behavior is consistent.
- [x] Risk badge behavior is consistent and preliminary where applicable.
- [x] Evidence badge behavior is consistent.
- [x] Data quality badge behavior is consistent.
- [x] Draft/preliminary labels are visible on technical output pages.
- [x] Empty/loading/error/access denied states exist in the state matrix section.
- [x] Drawer behavior is implemented through a local detail drawer that does not lose list context.
- [x] Dashboard-to-action behavior opens filtered local detail context and stays labelled API-ready/mock.
- [x] Saved view/filter behavior is visible through reusable filter chips and remains API-ready/mock.
- [x] Mock data is consistent across pages and sourced from shared R1-R4 foundations.
- [x] No misleading final decision language is present in the implemented UI.
- [x] No unsupported domain/compliance/RBI/legal/certification logic is introduced.
- [x] Export actions show warning, approval state, and export-log implications.
- [x] Reviewer queue actions show authority and review boundary.
- [x] Access denied state does not leak hidden object data.
- [x] Helpdesk/support route planning exists for access/error/manual review paths.

## Front-End Build/Check Commands Run From `main/`

- [x] pnpm run lint
- [x] pnpm run typecheck
- [x] pnpm run test
- [x] pnpm run build
- [x] pnpm run migration:check
- [x] pnpm run analytics:check
- [x] pnpm run release4:verify
- [x] node scripts/verify-release-4.mjs

## Manual Review Gates

- [ ] Project Owner review.
- [ ] UBT/IT review for architecture/API/RBAC/storage/auth boundaries.
- [ ] Legal/Q&C review for compliance/certification/export wording.
- [ ] Engineer/inspector/SME review for RBI, risk, inspection, and technical labels.

## Release 6 Route Shell Hardening

- [x] Route-based pages exist for the planned Release 6 route hierarchy.
- [x] Root workbench remains available at `/`.
- [x] Sidebar route links work in route-page shell mode.
- [x] Dynamic placeholder routes build successfully.
- [x] Route pages show Mock/API-ready/Pending Backend/Needs Review/Draft labels.
- [x] Browser smoke check passed at `http://127.0.0.1:3007/integrity/rbi`.

## Release 7 Design-System Compliance

- [x] Release 7 design-system compliance guidance exists.
- [x] Industrial Integrity Command Console direction is documented.
- [x] Anti-generic SaaS rule is documented.
- [x] Token coverage requirements are documented.
- [x] AEBT Precision Light and AEBT Control Room Dark themes are specified.
- [x] No hard-coded color rule is documented for final page components when a token exists.
- [x] Dark mode layered surface rule is documented.
- [x] Semantic badge families are specified conceptually.
- [x] Page templates are specified for dashboard, list, detail, workflow, review queue, and evidence/export pages.
- [x] Shell status labels are specified.
- [x] Draft/preliminary output visibility is required.
- [x] Export warning behavior is specified.
- [x] Accessibility baseline is specified.
- [x] Release 7 metadata and verification scripts are aligned.
- [ ] Full component/page token refactor completed in code.
- [ ] Dark mode visually implemented and reviewed.
- [ ] Project Owner/UBT/IT/Legal/Q&C/SME manual review completed.

## Release 8 Runtime Tokenization Pilot

- [x] CSS variables exist for light and dark token layers.
- [x] Tailwind semantic token mappings exist.
- [x] Existing im compatibility keys remain available during migration.
- [x] RoutePageShell uses semantic runtime tokens.
- [x] App shell chrome uses semantic token classes.
- [x] Shared route-shell UI primitives use semantic token classes.
- [x] Mock/API-ready/pending-backend and draft/preliminary labels remain visible.
- [x] No final technical/legal/certification/RBI/RLA/FFS/fit-for-operation decision wording was introduced.
- [ ] Browser screenshot review completed for light mode.
- [ ] Browser screenshot review completed for dark mode.
- [ ] Final token values approved by Project Owner/UI/UX/UBT/IT.
