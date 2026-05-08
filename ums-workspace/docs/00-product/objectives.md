# 🎯 Strategic Product Objectives (OKRs) - User Management System (UMS)

To align technical delivery with corporate goals, the development of the User Management System (UMS) is governed by the following measurable **Objectives and Key Results (OKRs)**:

---

## 🚀 Objective 1: Deliver Enterprise-Grade, Passwordless Security
Ensure the platform eliminates traditional security risks associated with identity management.

- **KR 1.1**: Achieve **Zero local password hashes stored** in the application database, delegating 100% of credentials verification to Zitadel.
- **KR 1.2**: Support **MANDATORY Multi-Factor Authentication (MFA)** and WebAuthn (Passkeys) for 100% of administrative accounts at Go-Live.
- **KR 1.3**: Pass all external penetration tests with **Zero High or Critical vulnerabilities** (OWASP Top 10 compliant).

---

## ⚡ Objective 2: Maximize Authorization Latency & Build Performance
Guarantee that centralized permission checks do not degrade the downstream user experience.

- **KR 2.1**: Keep compiled permission graph retrieval latency **under 50ms** using Read-Aside Redis Caching with TTL < 1 hour.
- **KR 2.2**: Ensure the monorepo build time is **under 5 minutes** by utilizing Nx high-performance task caching.
- **KR 2.3**: Achieve a **TypeORM-level RLS overhead of < 5ms** per SQL query execution.

---

## 💼 Objective 3: Enable Self-Service B2B Scalability
Offload administrative tasks to clients, reducing support overhead.

- **KR 3.1**: Reduce client tenant onboarding time from **days to < 10 minutes** via self-service tenant registration portals.
- **KR 3.2**: Achieve **Zero support tickets** for password resets, since users manage their own cryptographic credentials through Zitadel's self-service portals.
- **KR 3.3**: Enable **Dynamic Menu Customization** allowing client admins to create and assign permission templates in real-time.
