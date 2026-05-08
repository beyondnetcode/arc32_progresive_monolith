# ADR 0008: Progressive Multi-Module Evolution with API Gateway and BFF Patterns

## Status
Accepted

## Date
2026-05-08

## Context
Currently, the UMS (User Management System) repository serves as an enterprise-grade reference architecture for 100% Node.js-based applications, operating as a single-solution modular monolith (with React frontend and NestJS backend). 

However, UMS is intended to scale into a unified gateway. In the future, the frontend application architecture must be preserved, but it will serve as the single entry point for multiple corporate modules and systems (such as Transport Management System - TMS, Warehouse Management System - WMS, etc.). These upcoming systems will be exposed as independent, decoupled services—each governed by its own business context and database. 

To prevent tight coupling between the client and multiple backends, and to accommodate potential mobile clients in the future, we need a robust, progressive architecture that guides this evolution while adhering to the **Backend For Frontend (BFF)** and **API Gateway** patterns.

## Decision
We decided to adopt a **Progressive Multi-Module and Distributed Gateway Architecture** for future phases:

1. **Frontend Preservation**: The React architecture (Zustand + TanStack Query) will remain unified as the central user portal, progressively lazy-loading modules (TMS, WMS, UMS) to optimize bundle size and performance.
2. **Exposed Independent Services**: Any new system (e.g., TMS, WMS) will be developed as a separate backend service with its own isolated database (Database-per-Service pattern), adhering to bounded contexts.
3. **Core API Gateway**: Introduce a central **API Gateway** as the single point of entry for the Web Portal. The Gateway will handle cross-cutting concerns like global authentication routing, rate limiting, and request aggregation, forwarding requests to the appropriate service (UMS, TMS, WMS).
4. **Backend For Frontend (BFF) Pattern**: If a Mobile Application is introduced, a separate, dedicated Mobile BFF Gateway will be established. This ensures that the web portal and the mobile app each have optimized data payloads, network protocols (e.g., gRPC for BFF-to-Service, HTTP/JSON for Client-to-BFF), and tailored rate limits.

```
                  +-------------------+
                  |   Web Browser     |
                  +---------+---------+
                            | HTTP / HTTPS
                            v
                  +---------+---------+
                  |  Web API Gateway  |
                  +----+----+----+----+
                       |    |    |
         +-------------+    |    +-------------+
         |                  |                  |
         v                  v                  v
+--------+--------+  +------+------+  +--------+--------+
|   UMS Service   |  | TMS Service |  |   WMS Service   |
| (PostgreSQL DB) |  | (Isolated)  |  | (Isolated DB)   |
+-----------------+  +-------------+  +-----------------+
```

## Consequences

### Positive (Pros)
* **High Scalability & Independence**: Different teams can work, deploy, and scale UMS, TMS, and WMS independently without affecting the core monorepo.
* **Optimized Client Experience (BFF)**: The React Web app and potential Mobile clients will fetch optimized payloads suited for their respective devices through custom gateways, avoiding over-fetching.
* **Security & Centralization**: The Web API Gateway acts as a single security shield (handling CORS, SSL termination, and global JWT verification).

### Negative (Cons)
* **Infrastructure Complexity**: Introduces additional network hops and requires managing multiple hosting instances, Docker environments, or Kubernetes clusters.
* **Data Consistency**: Cross-service operations will require eventual consistency patterns (e.g., Saga or Outbox) instead of simple ACID TypeORM transactions.
