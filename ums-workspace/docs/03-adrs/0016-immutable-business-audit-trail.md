# ADR 0016: Immutable Business Audit Trail and Change Tracking

## Status
Proposed

## Date
2026-05-08

## Context
In regulated logistics and customs systems, absolute traceability is required by law. It is not enough to know the current state of a container's weight or seal; auditors must be able to trace exactly who changed it, when, from what IP, and what the previous values were.

## Decision
We will implement an automated, immutable audit trail system at the application ORM level:

1. **TypeORM Subscribers / Interceptors**: We will utilize TypeORM entity subscribers (`afterInsert`, `afterUpdate`, `afterRemove`) or a specialized NestJS interceptor to automatically capture data mutations on critical entities.
2. **Immutable Ledger**: The audit logs will be written to a dedicated, append-only Audit Table (or an isolated NoSQL document store) capturing: `timestamp`, `tenant_id`, `user_id`, `entity_name`, `entity_id`, `old_values`, and `new_values`.
3. **Tamper-Proof Design**: The audit table will have database-level triggers preventing `UPDATE` and `DELETE` operations, ensuring legal immutability.

## Consequences
* **Pros**: Fulfills strict legal and customs audit requirements perfectly. Provides invaluable data for forensic debugging.
* **Cons**: Doubles the write operations for critical entities, potentially affecting transaction throughput. Database storage will grow significantly over time.
