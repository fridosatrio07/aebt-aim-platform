# Migration Control

Release 0 does not run migrations automatically. The schema is a foundation baseline and must be reviewed by UBT/IT before a real migration is generated or applied.

Required pre-migration checks for future agents:

- Confirm task scope permits migration changes.
- Confirm database target is not production unless explicitly approved.
- Run `npm run migration:check`.
- Confirm no business module tables are added outside active release scope.
- Confirm tenant isolation fields and auditability are present for operational tables.
