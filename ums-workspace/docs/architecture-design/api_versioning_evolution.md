# 🏷️ API Versioning, Event Evolution & Contract Governance

This document formalizes the architectural guidelines, versioning schemes, breaking-change policies, and backward-compatibility strategies for APIs and Events under the **bMAD Method**.

---

## 🏛️ 1. API Versioning Strategy (HTTP REST)

To prevent breaking client-side React web applications or third-party logistics integrations (e.g., SUNAT, shipping agencies), we enforce **URL Path Versioning** for all public and internal REST APIs:

*   **URL Pattern**: `/api/v{major_version}/{resource}`
    *   *Example*: `/api/v1/containers`, `/api/v2/containers`
*   **Version Definition**:
    *   **Major Version (v1, v2)**: Incremented only when there are **breaking changes** (e.g., removing fields, renaming endpoints, changing parameter types, altering authentication payloads).
    *   **Minor/Patch Version**: Handled transparently by the server. Adding optional fields or new endpoints does not require incrementing the major version.

---

## 📢 2. Event Evolution Strategy (Pub/Sub Contracts)

Asynchronous events also require contract governance. We adopt the following event versioning strategies:

### A. Tolerant Reader Pattern
*   **Rule**: Downstream consumers must be coded defensively. When reading an event payload, they **must** parse only the fields they explicitly require and ignore any new or unrecognized fields. This allows publishers to append new properties to events without breaking existing subscribers.

### B. Explicit Event Payload Versioning
*   **Rule**: The event name or payload must explicitly declare its contract version:
    *   *Example*: `ContainerWeighedEvent` carries a `"version": 1` or `"version": 2` property inside its metadata envelope, or the event identifier is mapped as `inventory.container-weighed.v1`.
*   **Dual-Version Support**: If a breaking change occurs on an event payload, the publisher will publish both `.v1` and `.v2` formats simultaneously during a migration transition window, allowing downstream teams to upgrade at their own pace.

---

## 🛡️ 3. Contract Deprecation & Graceful Transition Policy

To sunset legacy API endpoints or Event contracts sustainably, we enforce the following four-step deprecation policy:

```mermaid
chronology
    title API Deprecation Lifecycle (6-Month Grace Period)
    2026-05-01 : Declare Deprecation & Add Warning Header
    2026-08-01 : Publish v2 Endpoints & Push Migration Guides
    2026-10-01 : Monitor v1 Usage Logs (Verify Zero Traffic)
    2026-11-01 : Decommission v1 Endpoints Permanently
```

1.  **Warning Header**: Deprecated HTTP endpoints return a standard HTTP response header:
    `Warning: 299 - "API v1 is deprecated and will be removed on 2026-11-01. Please migrate to v2."`
2.  **OpenTelemetry Auditing**: OpenTelemetry traces log calls to deprecated endpoints. The operations team monitors usage logs to identify clients that have not migrated.
3.  **Migration Guides**: Releasing a new major version mandates publishing a detailed migration guide explaining the payload changes and mapping old structures to new ones.
4.  **Decommissioning**: Legacy endpoints are permanently decommissioned only after verifying zero active traffic over a rolling 30-day period.
