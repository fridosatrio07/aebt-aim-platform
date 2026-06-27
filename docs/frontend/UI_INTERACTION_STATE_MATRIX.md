# UI Interaction State Matrix

| Interaction | Expected behavior | Disabled/API-ready behavior | Audit/evidence trace | Guardrail |
| --- | --- | --- | --- | --- |
| Button behavior | Primary action is specific and visible; secondary actions are restrained | Disabled buttons show reason or tooltip | Sensitive actions state audit impact | No final decision buttons unless authority approved |
| Disabled states | Use disabled style plus explanation | Show Pending backend, Needs permission, or Needs review | None unless attempted action logged later | Do not hide unfinished state |
| Placeholder/API-ready states | Label mock/static/API-ready/pending backend | Do not simulate persistence | Optional UI note | No fake production success |
| Drawer open/close | Open from table row without losing list context | Local state allowed | Show linked audit/evidence if applicable | Do not replace required full review |
| Modal behavior | Use for confirmations or focused forms only | Confirm disabled actions with reason | Sensitive modal actions require audit note | No final approval modal without authority |
| Table row action | Open drawer/detail; row action labels match object | Pending API actions disabled | Show object ID/source basis | No hidden destructive action |
| Bulk action | Available only for safe batch operations | Disabled if RBAC/API not ready | Batch review/export requires audit warning | No batch final technical approval |
| Filter/saved view | Filters visible and resettable; saved views named | Save disabled until persistence ready | Saved view changes auditable later | Filters must not encode unsupported compliance logic |
| Export | Show export warning and approval state | Export disabled/pending storage unless approved | Export log required | Export does not imply final legal/certification approval |
| Submit for review | Sends object to reviewer queue when implemented | API-ready/local mock must label pending backend | Review trail required | Submit is not final approval |
| Approve/reject/revision | Requires role/authority and confirmation | Disabled where authority TBD | Approval trail required | No final RBI/certification/legal decision unless approved source exists |
| Evidence selection | Select reusable evidence links | Storage pending label where needed | Evidence link/audit trail required | Missing evidence must remain visible |
| Data import | Stage, validate, show errors/duplicates | Real ingestion pending backend/storage | Import batch and validation log required | Do not silently promote staged data |
| Validation queue | Assign, review, require correction | Status changes API-ready unless backend exists | Status history required | Data Gap/Limited Basis preserved |
| Toast/notification | Short success/error feedback | Mock success must say local/demo | Sensitive action directs to log | No misleading production completion |
| Empty state | Explain why no records and safe next action | Show required permission/setup if applicable | None | Do not imply all obligations complete |
| Loading state | Skeleton/aria-busy | Avoid blocking navigation unnecessarily | None | Do not hide stale/mock data as live |
| Error state | Clear retry/support path | Include safe reference only | Error event logging later | Do not expose secrets |
| Access denied | Explain scope/permission boundary | Link helpdesk/request access where approved | Access attempt audit later | Do not leak hidden data |
