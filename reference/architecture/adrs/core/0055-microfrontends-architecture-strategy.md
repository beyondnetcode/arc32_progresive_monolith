# ADR-0055: Microfrontends Architecture Strategy

## Status
Proposed (Phase 3 Readiness)

## Context
The Progressive Monolith architecture focuses on backend modularity and eventual service distribution. However, as the system reaches Phase 3 (Distributed Services), the frontend application may face similar scaling challenges:
* **Deployment Contention**: Multiple teams needing to deploy changes to the same monolithic UI.
* **Technology Lock-in**: Difficulty in upgrading parts of the UI to newer framework versions.
* **Scaling Complexity**: A single large bundle becoming difficult to manage and optimize.

## Decision
We will adopt a **Microfrontend (MFE)** strategy specifically for systems entering **Phase 3+**. 

### Key Principles:
1. **Vertical Ownership**: Teams that own a backend domain service should also own the corresponding UI fragment.
2. **Runtime Integration**: Use **Module Federation** (Vite or Webpack 5) as the primary integration mechanism to allow independent deployments without page reloads.
3. **Shared Design System**: All MFEs MUST utilize the corporate design system (CSS Variables, Shared Components) to ensure visual consistency.
4. **BFF Alignment**: Each client-facing MFE should communicate via its specific BFF (Backend-for-Frontend) or a unified Gateway.

### Extraction Triggers (When to move to MFEs):
* Team size exceeds 15-20 frontend developers.
* Deployment frequency of specific modules exceeds the tolerance of the main release cycle.
* Requirement for independent technology lifecycles in isolated UI sections.

## Consequences
* **Positive**: Independent deployability, localized technology choices, improved team autonomy.
* **Negative**: Increased infrastructure complexity (CI/CD pipelines per MFE), risk of visual inconsistency if the design system is bypassed, initial overhead in orchestrator setup.
* **Neutral**: Requires a centralized "Shell" or "Orchestrator" application to manage routing and shared state.
