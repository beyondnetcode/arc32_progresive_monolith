# 🎯 Product Vision - User Management System (UMS)

## 1. Executive Summary
The **User Management System (UMS)** is the central foundation of the Product Planner suite. Its core vision is to centralize and standardize the governance of identities, organizations, and fine-grained permissions across a federated **B2B Multi-tenant SaaS architecture**.

Rather than serving as a simple user store, UMS acts as a **Specialized Authorization Engine** that manages "what a user can do," delegating "who the user is" to secure, sovereign external Identity Providers (IdP) via Zitadel.

---

## 2. Strategic Pillars

### A. Sovereign Identity (Delegated Authentication)
- Traditional password databases are obsolete. UMS mandates a **Passwordless, cryptographic first** model.
- Authentication is completely delegated to **Zitadel** via modern OpenID Connect (OIDC) and OAuth 2.0 (Auth Code Flow with PKCE).
- Support for federated single sign-on (SSO), SAML, and WebAuthn (Passkeys) is natively provided at the organization level.

### B. Dynamic B2B Multi-Tenancy
- High-performance tenant isolation is enforced at the PostgreSQL database level using **Row-Level Security (RLS)**.
- Organizations (Tenants) have total self-service autonomy to manage their local employees, roles, and profiles, freeing the primary platform operator from daily administrative overhead.

### C. Dynamic UI Injection & Granular Authorization
- Application interfaces are rendered dynamically. The client UI queries UMS to inject customized **Menus, Options, and Actions** in real-time based on the user's compiled permission graph.
- Granular authorization merges Roles, Profiles, and Policy Templates to enforce the strict **Explicit-Deny Precedence** rule.

---

## 3. Core Philosophy & Future Readiness
By keeping the Domain Core completely pure and decoupled from external frameworks, UMS is designed for seamless, future-proof evolution. The application code adopts strict **Hexagonal Architecture** (Ports and Adapters), making it ready to transition into independent microservices governed by **Dapr** sidecars when scalability triggers are met.
