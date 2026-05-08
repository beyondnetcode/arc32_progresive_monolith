# 💼 Business Context - User Management System (UMS)

## 1. Problem Statement
Historically, corporate software ecosystems suffer from fragmented identity and access governance. Each system (TMS, WMS, CRM) manages its own local database of users, password hashes, and authorization roles. This results in:
- **Severe Security Vulnerabilities**: Fragmented password databases increase the attack surface and make password policy enforcement impossible.
- **High Administrative Overhead**: Employees must be manually onboarded and offboarded across multiple applications, leading to "orphan accounts" with active access.
- **Lack of Central Auditability**: Tracking "who did what" and "who has access to what" across multiple isolated databases is practically impossible, violating regulatory compliance.
- **Inefficient Multi-Tenancy**: B2B clients cannot self-manage their organizations, causing continuous support ticket overhead for the primary software vendor.

---

## 2. Proposed Solution
UMS resolves these issues by serving as the **Unified Gatekeeper** of the Product Planner ecosystem. 

```mermaid
graph TD
    User["👥 Multi-Tenant Users"] -->|1. Authenticates (SSO/Passkey)| IdP["🔒 Zitadel IDP<br/>(Authentication Store)"]
    IdP -->|2. Issues JWT token| User
    User -->|3. Requests Page Access (with JWT)| UMS["🏢 UMS Authorization Engine"]
    UMS -->|4. Compiles Permission Graph| DB[(PostgreSQL RLS)]
    UMS -->|5. Injects Dynamic Menu & Roles| Client["⚛️ Client Portal UI"]
```

UMS separates **Authentication** from **Authorization**:
1.  **Authentication (Identity)**: Delegated entirely to Zitadel. Zitadel validates "who" the user is using secure, federated single sign-on or WebAuthn.
2.  **Authorization (Permissions)**: Controlled centrally by UMS. UMS stores the definitions of client systems, menus, permission graphs, roles, and profiles, injecting authorization tokens and dynamic menus into downstream applications on demand.

---

## 3. Executive Business Rationale
Standardizing access under UMS provides three massive business benefits:
- **Zero Ticket Onboarding**: Clients self-manage their administrative scopes through delegable profiles.
- **Compliance Ready**: Immutable business audit logs (CDC/Subscribers) track all critical permission mutations, making the system instantly ready for SOC 2 and ISO 27001 certifications.
- **Enterprise-Grade Security**: Passwordless cryptography completely eliminates brute-force vectors and credentials theft.
