# Global Master Index

> Bilingual navigation: [Español](./MASTER_INDEX.es.md) 
> Main portal: [README](./README.md)

This is the complete navigation index for **arc32**. Use it when you already know what type of artifact you need, or when you want to move across repository areas without browsing directories manually.

---

## 1. Start by Intent

| Intent | Primary entry point | Supporting reference |
|---|---|---|
| Understand the architecture vision | [Architectural Directives](./governance/standards/vision/architectural-directives.md) | [Evolutionary Strategy Roadmap](./governance/standards/vision/evolutionary-strategy-roadmap.md) |
| Understand the progressive architecture model | [Reference Blueprint](./architecture/blueprints/reference-blueprint.md) | [Microservice Extraction Readiness Criteria](./architecture/adrs/core/0045-microservice-extraction-readiness-criteria.md) |
| Review technology choices | [Authoritative Tech Stack](./architecture/blueprints/authoritative-tech-stack.md) | [Agnostic Baseline](./architecture/blueprints/authoritative-tech-stack-agnostic.md) |
| Review architectural decisions | [ADR Registry](./architecture/adrs/README.md) | [Core ADRs](./architecture/adrs/core/README.md) |
| Learn engineering standards | [Engineering Manifesto](./governance/standards/engineering/engineering-manifesto.md) | [Contract Testing Guideline](./governance/standards/engineering/contract-testing-guideline.md) |
| Understand SDLC expectations | [SDLC Framework](./governance/sdlc/README.md) | [Construction-Focused SDLC](./governance/sdlc/02-engineering/construction-focused-sdlc-framework.md) |
| Explore the demo sandbox | [Demo Hub](./knowledge/demo/README.md) | [Sandbox Verification Matrix](./knowledge/demo/technical/sandbox-verification.md) |
| Operate or deploy locally | [Operations Hub](./operations/README.md) | [Infrastructure Hub](./infrastructure/README.md) |

---

## 2. Recommended Reading by Role

| Role | Reading path |
|---|---|
| **Executive / Sponsor** | [Architectural Directives](./governance/standards/vision/architectural-directives.md) -> [Evolutionary Roadmap](./governance/standards/vision/evolutionary-strategy-roadmap.md) -> [Maturity Matrix](./governance/standards/vision/maturity-matrix.md) |
| **Product Owner / PM** | [Demo PRD](./knowledge/demo/project/01-prd-demo-sandbox.md) -> [Business Glossary](./knowledge/demo/functional/business-glossary.md) -> [Backlog and Epics](./knowledge/demo/project/02-backlog-and-epics.md) |
| **Software Architect** | [Reference Blueprint](./architecture/blueprints/reference-blueprint.md) -> [ADR Registry](./architecture/adrs/README.md) -> [Microservice Extraction Criteria](./architecture/adrs/core/0045-microservice-extraction-readiness-criteria.md) |
| **Principal / Staff Engineer** | [Agnostic Baseline](./architecture/blueprints/authoritative-tech-stack-agnostic.md) -> [Tactical Design Patterns](./architecture/adrs/core/0019-tactical-design-patterns-future-proofing.md) -> [Simplicity Checklist](./architecture/blueprints/simplicity-checklist-phase-01.md) |
| **Backend Developer** | [Engineering Manifesto](./governance/standards/engineering/engineering-manifesto.md) -> [Clean Architecture ADR](./architecture/adrs/nodejs/0002-clean-architecture-nestjs.md) -> [Sandbox Verification](./knowledge/demo/technical/sandbox-verification.md) |
| **Frontend Developer** | [Frontend Offline Resilience ADR](./architecture/adrs/nodejs/0004-frontend-offline-resilience.md) -> [Gateway/BFF ADR](./architecture/adrs/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md) -> [To-Do Web App](./src/apps/todo-web/README.md) |
| **DevOps / SRE** | [Infrastructure Hub](./infrastructure/README.md) -> [Operations Hub](./operations/README.md) -> [Observability ADR](./architecture/adrs/nodejs/0007-observability-telemetry-loki-opentelemetry.md) |
| **QA / SDET** | [Testing Pyramid ADR](./architecture/adrs/core/0018-testing-pyramid-quality-gates.md) -> [Contract Testing Guideline](./governance/standards/engineering/contract-testing-guideline.md) -> [Integration and E2E Testing ADR](./architecture/adrs/core/0053-integration-e2e-testing-strategy.md) |
| **Security Engineer** | [Vendor Risk Assessment](./governance/standards/engineering/vendor-risk-assessment.md) -> [Multi-Tenancy ADR](./architecture/adrs/core/0010-multi-tenancy-architecture-strategy.md) -> [Immutable Audit Trail ADR](./architecture/adrs/core/0016-immutable-business-audit-trail.md) |
| **AI Contributor** | [AI-Augmented Standards](./governance/standards/ai-augmented/README.md) -> [Harness Rules](./.harness/rules/global-rules.md) -> [AI ADRs](./governance/standards/ai-augmented/06-adrs/README.md) |
| **New Joiner** | [Product Quick Start](./governance/standards/onboarding/product-quick-start.md) -> [Repository Taxonomy](./governance/standards/repository-taxonomy.md) -> [README Portal](./README.md) |

---

## 3. Architecture

| Area | Entry point |
|---|---|
| Blueprints | [architecture/blueprints](./architecture/blueprints/README.md) |
| ADR Registry | [architecture/adrs](./architecture/adrs/README.md) |
| Core ADRs | [architecture/adrs/core](./architecture/adrs/core/README.md) |
| Node.js ADRs | [architecture/adrs/nodejs](./architecture/adrs/nodejs/README.md) |
| .NET ADRs | [architecture/adrs/dotnet](./architecture/adrs/dotnet/README.md) |
| Android ADRs | [architecture/adrs/android](./architecture/adrs/android/README.md) |

Key architecture references:

- [Reference Blueprint](./architecture/blueprints/reference-blueprint.md)
- [Authoritative Tech Stack Index](./architecture/blueprints/authoritative-tech-stack.md)
- [C4 Topology Spec](./architecture/blueprints/c4-topology-spec.md)
- [CAP Strategic Analysis](./architecture/blueprints/cap-strategic-analysis.md)
- [Multi-Cloud Deployment Scenarios](./architecture/blueprints/multi-cloud-deployment-scenarios.md)

---

## 4. Governance

| Area | Entry point |
|---|---|
| Standards | [governance/standards](./governance/standards/README.md) |
| Vision | [governance/standards/vision](./governance/standards/vision/README.md) |
| Engineering | [governance/standards/engineering](./governance/standards/engineering/README.md) |
| Onboarding | [governance/standards/onboarding](./governance/standards/onboarding/README.md) |
| AI-Augmented Engineering | [governance/standards/ai-augmented](./governance/standards/ai-augmented/README.md) |
| SDLC | [governance/sdlc](./governance/sdlc/README.md) |
| Documentation Standards | [governance/sdlc/03-documentation](./governance/sdlc/03-documentation/README.md) |

Key governance references:

- [Engineering Manifesto](./governance/standards/engineering/engineering-manifesto.md)
- [Repository Taxonomy](./governance/standards/repository-taxonomy.md)
- [Product Quick Start](./governance/standards/onboarding/product-quick-start.md)
- [Functional Story Writing Standard](./governance/sdlc/03-documentation/functional-story-writing-standard.md)
- [SDLC Documentation Best Practices](./governance/sdlc/03-documentation/sdlc-documentation-best-practices.md)

---

## 5. Demo and Knowledge Base

| Area | Entry point |
|---|---|
| Demo Hub | [knowledge/demo](./knowledge/demo/README.md) |
| Demo Project Planning | [knowledge/demo/project](./knowledge/demo/project/README.md) |
| Demo Functional Layer | [knowledge/demo/functional](./knowledge/demo/functional/README.md) |
| Demo Technical Layer | [knowledge/demo/technical](./knowledge/demo/technical/README.md) |
| Research | [knowledge/research](./knowledge/research/README.md) |
| Proofs of Concept | [knowledge/poc](./knowledge/poc/README.md) |

Key demo references:

- [Demo PRD](./knowledge/demo/project/01-prd-demo-sandbox.md)
- [Backlog and Epics](./knowledge/demo/project/02-backlog-and-epics.md)
- [Business Glossary](./knowledge/demo/functional/business-glossary.md)
- [Bounded Context Map](./knowledge/demo/technical/bounded-context-map.md)
- [Sandbox Verification Matrix](./knowledge/demo/technical/sandbox-verification.md)

---

## 6. Operations and Infrastructure

| Area | Entry point |
|---|---|
| Operations | [operations](./operations/README.md) |
| OpenTelemetry | [operations/otel](./operations/otel/README.md) |
| Grafana | [operations/grafana](./operations/grafana/README.md) |
| Tempo | [operations/tempo](./operations/tempo/README.md) |
| Infrastructure | [infrastructure](./infrastructure/README.md) |

---

## 7. Source Code

| Component | Entry point |
|---|---|
| To-Do API | [src/apps/todo-api](./src/apps/todo-api/README.md) |
| To-Do Web | [src/apps/todo-web](./src/apps/todo-web/README.md) |
| Shared AOP Library | [src/libs/aop](./src/libs/aop/package.json) |

---

## 8. Mandatory Compliance Baseline

Every artifact and implementation should respect these pillars:

1. [Agnostic Baseline](./architecture/blueprints/authoritative-tech-stack-agnostic.md)
2. [Reference Architecture](./architecture/blueprints/reference-blueprint.md)
3. [Engineering Manifesto](./governance/standards/engineering/engineering-manifesto.md)
4. [Definition of Done](./governance/sdlc/02-engineering/construction-focused-sdlc-framework.md)
5. [Repository Taxonomy](./governance/standards/repository-taxonomy.md)

---

<div align="center">
 <a href="./README.md">Back to Main Portal</a>
</div>
