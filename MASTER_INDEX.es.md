# Índice Maestro Global

> Navegación bilingüe: [English](./MASTER_INDEX.md) 
> Portal principal: [README](./README.es.md)

Este es el índice completo de navegación para **arc32**. Úsalo cuando ya sepas qué tipo de artefacto necesitas o cuando quieras moverte entre áreas del repositorio sin explorar directorios manualmente.

---

## 1. Empieza por Intención

| Intención | Entrada principal | Referencia de apoyo |
|---|---|---|
| Entender la visión arquitectónica | [Directivas Arquitectónicas](./governance/standards-es/vision/architectural-directives.md) | [Roadmap Evolutivo](./governance/standards-es/vision/evolutionary-strategy-roadmap.md) |
| Entender el modelo de arquitectura progresiva | [Blueprint de Referencia](./architecture/blueprints-es/reference-blueprint.md) | [Criterios de Extracción a Microservicios](./architecture/adrs-es/core/0045-microservice-extraction-readiness-criteria.md) |
| Revisar decisiones tecnológicas | [Stack Tecnológico Autorizado](./architecture/blueprints-es/authoritative-tech-stack.md) | [Línea Base Agnóstica](./architecture/blueprints-es/authoritative-tech-stack-agnostic.md) |
| Revisar decisiones arquitectónicas | [Registro ADR](./architecture/adrs-es/README.md) | [ADRs Core](./architecture/adrs-es/core/README.es.md) |
| Aprender estándares de ingeniería | [Manifiesto de Ingeniería](./governance/standards-es/engineering/engineering-manifesto.md) | [Guía de Contract Testing](./governance/standards-es/engineering/contract-testing-guideline.md) |
| Entender expectativas SDLC | [Framework SDLC](./governance/sdlc-es/README.md) | [SDLC enfocado en Construcción](./governance/sdlc-es/02-engineering/construction-focused-sdlc-framework.md) |
| Explorar el demo sandbox | [Hub Demo](./knowledge/demo/README.md) | [Matriz de Verificación Sandbox](./knowledge/demo/technical/sandbox-verification.md) |
| Operar o desplegar localmente | [Hub de Operaciones](./operations/README.es.md) | [Hub de Infraestructura](./infrastructure/README.es.md) |

---

## 2. Lectura Recomendada por Rol

| Rol | Ruta de lectura |
|---|---|
| **Ejecutivo / Sponsor** | [Directivas Arquitectónicas](./governance/standards-es/vision/architectural-directives.md) -> [Roadmap Evolutivo](./governance/standards-es/vision/evolutionary-strategy-roadmap.md) -> [Matriz de Madurez](./governance/standards-es/vision/maturity-matrix.md) |
| **Product Owner / PM** | [PRD Demo](./knowledge/demo/project/01-prd-demo-sandbox-es.md) -> [Glosario de Negocio](./knowledge/demo/functional/business-glossary.md) -> [Backlog y Epics](./knowledge/demo/project/02-backlog-and-epics-es.md) |
| **Arquitecto de Software** | [Blueprint de Referencia](./architecture/blueprints-es/reference-blueprint.md) -> [Registro ADR](./architecture/adrs-es/README.md) -> [Criterios de Extracción](./architecture/adrs-es/core/0045-microservice-extraction-readiness-criteria.md) |
| **Principal / Staff Engineer** | [Línea Base Agnóstica](./architecture/blueprints-es/authoritative-tech-stack-agnostic.md) -> [Patrones Tácticos](./architecture/adrs-es/core/0019-tactical-design-patterns-future-proofing.md) -> [Checklist de Simplicidad](./architecture/blueprints-es/simplicity-checklist-phase-01.md) |
| **Backend Developer** | [Manifiesto de Ingeniería](./governance/standards-es/engineering/engineering-manifesto.md) -> [ADR Clean Architecture](./architecture/adrs-es/nodejs/0002-clean-architecture-nestjs.md) -> [Verificación Sandbox](./knowledge/demo/technical/sandbox-verification.md) |
| **Frontend Developer** | [ADR Resiliencia Frontend](./architecture/adrs-es/nodejs/0004-frontend-offline-resilience.md) -> [ADR Gateway/BFF](./architecture/adrs-es/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md) -> [To-Do Web App](./src/apps/todo-web/README.md) |
| **DevOps / SRE** | [Hub de Infraestructura](./infrastructure/README.es.md) -> [Hub de Operaciones](./operations/README.es.md) -> [ADR Observabilidad](./architecture/adrs-es/nodejs/0007-observability-telemetry-loki-opentelemetry.md) |
| **QA / SDET** | [ADR Pirámide de Testing](./architecture/adrs-es/core/0018-testing-pyramid-quality-gates.md) -> [Guía de Contract Testing](./governance/standards-es/engineering/contract-testing-guideline.md) -> [ADR Integración y E2E](./architecture/adrs-es/core/0053-estrategia-pruebas-integracion-e2e.md) |
| **Security Engineer** | [Vendor Risk Assessment](./governance/standards-es/engineering/vendor-risk-assessment.md) -> [ADR Multi-Tenancy](./architecture/adrs-es/core/0010-multi-tenancy-architecture-strategy.md) -> [ADR Auditoría Inmutable](./architecture/adrs-es/core/0016-immutable-business-audit-trail.md) |
| **AI Contributor** | [Estándares AI-Augmented](./governance/standards-es/ai-augmented/README.md) -> [Reglas Harness](./.harness/rules/global-rules.md) -> [ADRs de IA](./governance/standards-es/ai-augmented/06-adrs/README.md) |
| **New Joiner** | [Product Quick Start](./governance/standards-es/onboarding/product-quick-start.md) -> [Taxonomía del Repositorio](./governance/standards-es/repository-taxonomy.es.md) -> [Portal README](./README.es.md) |

---

## 3. Arquitectura

| Área | Entrada |
|---|---|
| Blueprints | [architecture/blueprints-es](./architecture/blueprints-es/README.md) |
| Registro ADR | [architecture/adrs-es](./architecture/adrs-es/README.md) |
| ADRs Core | [architecture/adrs-es/core](./architecture/adrs-es/core/README.es.md) |
| ADRs Node.js | [architecture/adrs-es/nodejs](./architecture/adrs-es/nodejs/README.es.md) |
| ADRs .NET | [architecture/adrs-es/dotnet](./architecture/adrs-es/dotnet/README.es.md) |
| ADRs Android | [architecture/adrs-es/android](./architecture/adrs-es/android/README.es.md) |

Referencias clave:

- [Blueprint de Referencia](./architecture/blueprints-es/reference-blueprint.md)
- [Índice del Stack Tecnológico Autorizado](./architecture/blueprints-es/authoritative-tech-stack.md)
- [Especificación C4](./architecture/blueprints-es/c4-topology-spec.md)
- [Análisis CAP](./architecture/blueprints-es/cap-strategic-analysis.md)
- [Escenarios Multi-Cloud](./architecture/blueprints-es/multi-cloud-deployment-scenarios.md)

---

## 4. Gobernanza

| Área | Entrada |
|---|---|
| Estándares | [governance/standards-es](./governance/standards-es/README.md) |
| Visión | [governance/standards-es/vision](./governance/standards-es/vision/README.es.md) |
| Ingeniería | [governance/standards-es/engineering](./governance/standards-es/engineering/README.es.md) |
| Onboarding | [governance/standards-es/onboarding](./governance/standards-es/onboarding/README.es.md) |
| AI-Augmented Engineering | [governance/standards-es/ai-augmented](./governance/standards-es/ai-augmented/README.md) |
| SDLC | [governance/sdlc-es](./governance/sdlc-es/README.md) |
| Estándares de Documentación | [governance/sdlc-es/03-documentation](./governance/sdlc-es/03-documentation/README.es.md) |

Referencias clave:

- [Manifiesto de Ingeniería](./governance/standards-es/engineering/engineering-manifesto.md)
- [Taxonomía del Repositorio](./governance/standards-es/repository-taxonomy.es.md)
- [Product Quick Start](./governance/standards-es/onboarding/product-quick-start.md)
- [Estándar de Escritura de Functional Stories](./governance/sdlc-es/03-documentation/functional-story-writing-standard.md)
- [Buenas Prácticas de Documentación SDLC](./governance/sdlc-es/03-documentation/sdlc-documentation-best-practices.md)

---

## 5. Demo y Base de Conocimiento

| Área | Entrada |
|---|---|
| Hub Demo | [knowledge/demo](./knowledge/demo/README.md) |
| Planificación Demo | [knowledge/demo/project](./knowledge/demo/project/README.es.md) |
| Capa Funcional Demo | [knowledge/demo/functional](./knowledge/demo/functional/README.md) |
| Capa Técnica Demo | [knowledge/demo/technical](./knowledge/demo/technical/README.md) |
| Investigación | [knowledge/research](./knowledge/research/README.md) |
| Proofs of Concept | [knowledge/poc](./knowledge/poc/README.md) |

Referencias clave:

- [PRD Demo](./knowledge/demo/project/01-prd-demo-sandbox-es.md)
- [Backlog y Epics](./knowledge/demo/project/02-backlog-and-epics-es.md)
- [Glosario de Negocio](./knowledge/demo/functional/business-glossary.md)
- [Mapa de Bounded Contexts](./knowledge/demo/technical/bounded-context-map.md)
- [Matriz de Verificación Sandbox](./knowledge/demo/technical/sandbox-verification.md)

---

## 6. Operaciones e Infraestructura

| Área | Entrada |
|---|---|
| Operaciones | [operations](./operations/README.es.md) |
| OpenTelemetry | [operations/otel](./operations/otel/README.md) |
| Grafana | [operations/grafana](./operations/grafana/README.md) |
| Tempo | [operations/tempo](./operations/tempo/README.md) |
| Infraestructura | [infrastructure](./infrastructure/README.es.md) |

---

## 7. Código Fuente

| Componente | Entrada |
|---|---|
| To-Do API | [src/apps/todo-api](./src/apps/todo-api/README.md) |
| To-Do Web | [src/apps/todo-web](./src/apps/todo-web/README.md) |
| Librería AOP compartida | [src/libs/aop](./src/libs/aop/package.json) |

---

## 8. Línea Base Mandatoria

Todo artefacto e implementación debe respetar estos pilares:

1. [Baseline Agnóstico](./architecture/blueprints-es/authoritative-tech-stack-agnostic.md)
2. [Arquitectura de Referencia](./architecture/blueprints-es/reference-blueprint.md)
3. [Manifiesto de Ingeniería](./governance/standards-es/engineering/engineering-manifesto.md)
4. [Definition of Done](./governance/sdlc-es/02-engineering/construction-focused-sdlc-framework.md)
5. [Taxonomía del Repositorio](./governance/standards-es/repository-taxonomy.es.md)

---

<div align="center">
 <a href="./README.es.md">Volver al Portal Principal</a>
</div>
