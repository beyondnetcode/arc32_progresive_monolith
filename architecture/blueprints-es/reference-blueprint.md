# ðŸ›ï¸ Arquitectura de Referencia Corporativa (Multi-Runtime / arc42)

> [!IMPORTANT]
> **Blueprint de Referencia Corporativo Unificado**: Este documento define el estándar global para la arquitectura de software en toda la organización. Si bien la implementación fí­sica canónica utiliza Node.js, las restricciones arquitectónicas y los principios de diseí±o son agnósticos y aplicables a los entornos de ejecución aprobados (.NET / Android) para diversas cargas de trabajo.

---

## 1. Introducción y Metas

Esta arquitectura de referencia proporciona un plano estandarizado para construir sistemas modernos y altamente escalables.

### 1.1 Propósito y Aplicabilidad
Este patrón está diseí±ado especí­ficamente para sistemas que:
*   Tienen una fuerte orientación hacia la **utilización intensiva de APIs** con clientes multi-canal (Web, Móvil, B2B).
*   Requieren **aislamiento SaaS multi-tenant** nativo a nivel del motor de base de datos ([ADR-0010](../adrs-es/core/0010-multi-tenancy-architecture-strategy.md)).
*   Deben soportar una **evolución progresiva** desde un Monolito Modular hacia Microservicios Distribuidos.

> [!IMPORTANT]
> **Canon de Evolución Progresiva**: La arquitectura evoluciona en complejidad incremental. La Fase 1 es deliberadamente simple y no exige tecnologí­as, patrones o procesos que excedan las necesidades de un monolito modular. Cada requisito adicional se introduce en la fase donde la arquitectura lo justifica objetivamente, no antes.

### 1.2 Estrategia Corporativa Multi-Runtime (Polí­glota)
La organización promueve una arquitectura polí­glota deliberada donde los entornos de ejecución se eligen estrictamente en función de la idoneidad para la carga de trabajo, validados ví­a ADR:

| Runtime | Rol Canónico | Caso de Uso Tí­pico |
| :--- | :--- | :--- |
| **Node.js / TypeScript** | Runtime Principal | APIs REST/gRPC, Orquestación BFF, Servicios Web Transaccionales, Frontend SSR. |
| **.NET (C#)** | Alto Procesamiento | Computación por lotes, pipelines ETL, Tareas computacionales pesadas, interoperabilidad Legada. |
| **Android (Kotlin/Java)** | Cliente Móvil Nativo | Apps operativas industriales, captura offline, integración de hardware de escaneo/GPS. |

> **Regla de Contratos**: La comunicación entre distintos runtimes DEBE utilizar estrictamente definiciones de contrato explí­citas y versionadas (OpenAPI para HTTP, Protobuf para gRPC, AsyncAPI para Mensajerí­a) garantizando absoluta opacidad de la implementación.

### 1.3 Atributos de Calidad Obligatorios
| Atributo de Calidad | Origen ADR | Objetivo |
| :--- | :--- | :--- |
| **Evolución Progresiva** | [ADR-0006](../adrs-es/core/0006-future-microservices-transition-dapr.md), [ADR-0008](../adrs-es/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md) | Camino de cero refactorización hacia microservicios ví­a Dapr |
| **Multi-Tenancy SaaS** | [ADR-0010](../adrs-es/core/0010-multi-tenancy-architecture-strategy.md) | Aislamiento de Doble Capa (ORM + PostgreSQL RLS) |
| **Desacoplamiento Estricto** | [ADR-0002](../adrs-es/nodejs/0002-clean-architecture-nestjs.md), [ADR-0003](../adrs-es/nodejs/0003-strict-typescript-standards.md) | Aplicación de lí­mites ví­a ESLint |
| **Resiliencia** | [ADR-0011](../adrs-es/core/0011-fault-tolerance-resiliency-patterns.md) | Circuit Breakers Distribuidos (Redis + Kong) |
| **Seguridad** | [ADR-0005](../adrs-es/core/0005-ci-cd-quality-codeql.md), [ADR-0012](../adrs-es/nodejs/0012-advanced-authorization-rbac-abac.md), [ADR-0020](../adrs-es/core/0020-identity-provider-abstraction-strategy.md), [ADR-0026](../adrs-es/nodejs/0026-mfa-passwordless-adaptive-authentication.md) | Perí­metro Zero-trust + RBAC/ABAC |
| **Latencia de API Interna** | [ADR-0014](../adrs-es/core/0014-distributed-caching-strategy-redis.md), [ADR-0021](../adrs-es/nodejs/0021-high-performance-auth-and-graph-compilation.md) | Caché de 4 Niveles (Cliente + CDN + BFF + Core) |
| **Observabilidad** | [ADR-0007](../adrs-es/nodejs/0007-observability-telemetry-loki-opentelemetry.md), [ADR-0046](../adrs-es/core/0046-dapr-observabilidad-unificada.md) | OTel + Loki + trazado distribuido |
| **Auditorí­a Inmutable** | [ADR-0016](../adrs-es/core/0016-immutable-business-audit-trail.md) | Registro de auditorí­a de solo adición |
| **Soberaní­a Tecnológica** | [ADR-0002](../adrs-es/nodejs/0002-clean-architecture-nestjs.md), [ADR-0028](../adrs-es/core/0028-self-hosted-hybrid-infrastructure-on-premise.md) | Infra/AOP 100% intercambiable sin impacto en la lógica |

#### ðŸ” Marcos Estratégicos Complementarios
Para comprender profundamente la postura matemática y de riesgo de esta arquitectura, consulte:
*   ðŸ‘‰ **[Evaluación de Madurez y Patrones de Diseí±o](../vision/maturity-evaluation.md)**
*   ðŸ‘‰ **[Análisis Estratégico del Teorema CAP](./cap-strategic-analysis.md)**
*   ðŸ‘‰ **[Escenarios de Despliegue Multi-Cloud](./multi-cloud-deployment-scenarios.md)**

---

## 2. Restricciones de Arquitectura y Pilares Base

Cualquier sistema basado en este blueprint debe adherirse a los siguientes pilares no negociables:

*   **Gobernanza del Stack ([ADR-0001](../adrs-es/core/0001-monorepo-orchestration-nx.md))**: Nx Monorepo + npm Workspaces para una gobernanza centralizada de dependencias.
*   **Mandato de Ingenierí­a BMAD-METHOD ([ADR-0002](../adrs-es/nodejs/0002-clean-architecture-nestjs.md), [ADR-0003](../adrs-es/nodejs/0003-strict-typescript-standards.md))**: SOLID, Código Limpio, Arquitectura Hexagonal (Puertos/Adaptadores simples obligatorios), TypeScript estricto.
*   **Seguridad de Dependencias ([ADR-0009](../adrs-es/core/0009-strict-dependency-pinning-vulnerability-management.md))**: Todas las versiones de dependencias fijadas. Sin rangos `^` o `~`. Escaneo automatizado de vulnerabilidades en CI.
*   **Puertas de Calidad ([ADR-0018](../adrs-es/core/0018-testing-pyramid-quality-gates.md))**: Pirámide de pruebas automatizada. Mí­nimo 70% de cobertura obligatoria en CI.
*   **Portabilidad de Infraestructura ([ADR-0028](../adrs-es/core/0028-self-hosted-hybrid-infrastructure-on-premise.md))**: Prioridad de OSS autohospedado (MinIO, RabbitMQ, Vault) sobre el bloqueo de nube.

---

## 3. Contexto y Alcance (Modelo Operativo)

### 3.1 Patrón de Contexto General ”” Stack Completo con Niveles de Gateway y Bus de Eventos Inyectable

Este diagrama captura el contexto completo del sistema. Refleja:
- **[ADR-0030](../adrs-es/core/0030-api-gateway-kong-vs-nestjs.md)**: Gateway de Dos Niveles (Kong Edge + NestJS BFF)
- **[ADR-0008](../adrs-es/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md)**: Evolución Progresiva Multi-Módulo con BFF dedicado por canal de cliente
- **[ADR-0015](../adrs-es/core/0015-event-driven-architecture-intra-domain.md)**: Abstracción Inyectable `IEventBusPort` (En Memoria â†’ RabbitMQ â†’ Kafka)
- **[ADR-0020](../adrs-es/core/0020-identity-provider-abstraction-strategy.md)**: Proveedor de Identidad Conectable ví­a Patrón Strategy
- **[ADR-0007](../adrs-es/nodejs/0007-observability-telemetry-loki-opentelemetry.md)**: Trazado OpenTelemetry en todos los niveles

```mermaid
graph TD
    subgraph Clients["Capa de Canales ”” Aplicaciones Cliente"]
        WebApp["Web App\n[Caché React Query Â· ADR-0004]"]
        MobileApp["Mobile App\n[Persistencia Offline Â· ADR-0004]"]
        B2B["Socio B2B (gRPC / Clave API REST)"]
    end

    subgraph NetEdge["Borde de Red (Opcional)"]
        CDN["CDN (Content Delivery Network)\n[Caché Multi-Capa Â· ADR-0014]"]
    end

    subgraph Tier1["Tier 1 ”” Edge API Gateway (ADR-0030)"]
        Kong["Kong OSS\n[Lí­mites de Tasa Â· Validación JWT Â· CORS Â· Enrutamiento]"]
    end

    subgraph Tier2["Tier 2 ”” Capa de Orquestación BFF (ADR-0008)"]
        WebBFF["NestJS Web BFF\n[Agregación Â· Caché BFF]"]
        MobileBFF["NestJS Mobile BFF\n[Respuestas Compactas Â· Caché BFF]"]
        CoreAPI["NestJS Core API\n[Dominio Hexagonal Â· RBAC/ABAC]"]
    end

    subgraph ExternalIntegrations["Capa de Integración Externa"]
        IdP["IdP Federado (Auth0 / Entra ID)\n[ADR-0020, ADR-0026]"]
        
        subgraph EventBusAbstraction["Bus de Eventos Inyectable (ADR-0015, ADR-0031)"]
            IBusPort["Â«PortÂ» IEventBusPort"]
            InMemory["En-Memoria (Dev/Test)"]
            RabbitMQ["RabbitMQ (Producción)"]
            Kafka["Kafka (Alta Escala)"]
            IBusPort -.->|Impl| InMemory
            IBusPort -.->|Impl| RabbitMQ
            IBusPort -.->|Impl| Kafka
        end
    end

    subgraph ObsLayer["Observabilidad (ADR-0007)"]
        OTel["Coleccionista OpenTelemetry"]
        Loki["Grafana Loki (Logs)"]
        Jaeger["Jaeger (Trazas)"]
        OTel --> Loki
        OTel --> Jaeger
    end

    WebApp & MobileApp & B2B -->|TLS/HTTP| CDN
    CDN -->|Reenví­o Dinámico| Kong

    Kong -->|Ruta| WebBFF
    Kong -->|Ruta| MobileBFF
    Kong -->|Ruta B2B| CoreAPI

    WebBFF -->|gRPC Interno| CoreAPI
    MobileBFF -->|gRPC Interno| CoreAPI

    CoreAPI -->|Validar Claims| IdP
    CoreAPI -->|Publicar Eventos| IBusPort

    CoreAPI -.->|Trazas + Logs| OTel
    WebBFF -.->|Trazas + Logs| OTel
    Kong -.->|Logs de Acceso| OTel
```

---

## 4. Estrategia de Solución

### 4.1 Arquitectura Hexagonal ”” Puertos y Adaptadores ([ADR-0002](../adrs-es/nodejs/0002-clean-architecture-nestjs.md))
Toda la lógica de negocio en las capas de Dominio y Aplicación tiene **cero dependencias en tiempo de ejecución** de frameworks, ORMs o servicios en la nube. La capa de infraestructura implementa Puertos de TypeScript puros.

### 4.2 Estrategia de Multi-Tenancy SaaS ([ADR-0010](../adrs-es/core/0010-multi-tenancy-architecture-strategy.md))
Emplea **Defensa de Aislamiento de Doble Capa**. (Capa 1) Los adaptadores de persistencia aí±aden automáticamente el filtro `tenant_id` a las consultas genéricas. (Capa 2) Las polí­ticas de **Row-Level Security (RLS)** de PostgreSQL compartido imponen una contención estricta de la sesión a nivel del motor SQL como mecanismo infalible absoluto.

### 4.3 Patrón de Gateway de Dos Niveles ([ADR-0030](../adrs-es/core/0030-api-gateway-kong-vs-nestjs.md))
| Nivel | Tecnologí­a | Responsabilidad |
| :--- | :--- | :--- |
| **Tier 1 ”” Edge** | Kong OSS (NGINX/OpenResty) | Rate Limiting, validación JWT, terminación SSL, Enrutamiento |
| **Tier 2 ”” BFF** | NestJS | Agregación de datos, formateo de cargas íºtiles, lógica especí­fica del cliente |

### 4.4 Bus de Eventos Inyectable ([ADR-0015](../adrs-es/core/0015-event-driven-architecture-intra-domain.md))
El dominio nunca importa un bróker de mensajes concreto. Toda la comunicación así­ncrona se enruta a través de `IEventBusPort`. La implementación concreta (En Memoria / RabbitMQ / Kafka) es inyectada por el contenedor DI de NestJS al inicio, controlada por una variable de entorno.

### 4.5 Ruta de Evolución Progresiva ([ADR-0006](../adrs-es/core/0006-future-microservices-transition-dapr.md))
1.  **Hito 1 ”” Monolito Modular**: Proceso íºnico, módulos de dominio lógicamente aislados.
2.  **Hito 2 ”” Extracción de Servicios**: Dominios crí­ticos extraí­dos como microproyectos Nx con BDs aisladas, consumidos ví­a gRPC/Dapr.
3.  **Hito 3 ”” Malla Completa de Microservicios**: Dapr Sidecars, Malla de Servicios, Kong como superficie de API unificada.

---

## 5. Bloques de Construcción Técnica ”” Vista Completa de Contenedores

Este diagrama de Contenedor Nivel-2 de C4 refleja **todos los ADRs activos** en sus posiciones fí­sicas de tiempo de ejecución.

```mermaid
graph TD
    subgraph ClientLayer["Capa de Canales de Cliente (ADR-0004)"]
        WebApp["Web App\n[React Query / Stale-While-Revalidate]"]
        MobileApp["Mobile App\n[Almacenamiento Offline Nativo]"]
        B2BClient["Cliente B2B (Clave API)"]
    end

    subgraph EdgeNet["Red Nivel 0: Caché Estática"]
        CDN["CDN (Content Delivery Network)\n[Cloudflare / Akamai / Opcional]"]
    end

    subgraph GatewayTier["Niveles de Gateway (ADR-0030, ADR-0008, ADR-0027, ADR-0032)"]
        Kong["Gateway Edge Kong OSS\n[Rate Limiting Â· SSL Â· JWT Â· CORS]"]
        WebBFF["NestJS Web BFF\n[REST/GraphQL + Caché Multi-Capa]"]
        MobileBFF["NestJS Mobile BFF\n[Cargas Compactas + Caché Multi-Capa]"]
    end

    subgraph CoreTier["Nivel de Aplicación Core (ADR-0002, ADR-0012, ADR-0016, ADR-0019, ADR-0029)"]
        CoreAPI["NestJS Core API\nHexagonal + Auditorí­a + UnitOfWork"]
        FeatureFlags["Motor de Feature Flags\n[ADR-0017, ADR-0025]"]
        ConfigPlatform["Plataforma de Configuración\n[ADR-0024]"]
    end

    subgraph PersistenceTier["Nivel de Persistencia (ADR-0014, ADR-0022)"]
        PgSQL[("PostgreSQL 16\n[Dual-Layer RLS Â· ADR-0010]")]
        Redis[("Clíºster Distribuido Redis\n[Caché Escalonada Multi-Capa Â· ADR-0014]")]
        AuditLog[("Registro Auditorí­a (Append-Only)\n[ADR-0016]")]
    end

    subgraph MessagingTier["Nivel Mensajerí­a Así­ncrona (ADR-0015, ADR-0031)"]
        IBusPort["Â«PortÂ» IEventBusPort"]
        InMemoryBus["Bus En-Memoria\n(Dev/Test)"]
        RabbitMQBus["RabbitMQ\n(Producción)"]
        IBusPort -.->|Impl| InMemoryBus
        IBusPort -.->|Impl| RabbitMQBus
    end

    subgraph SecurityTier["Nivel de Seguridad (ADR-0020, ADR-0026, ADR-0021)"]
        IdP["Adaptador IdP Conectable\n[Auth0 / Entra / Zitadel]"]
        AuthGraph["Motor Gráfico de Autorización\n[RBAC/ABAC < 5ms Â· ADR-0021]"]
        MFA["Motor MFA / Passkeys\n[WebAuthn Â· ADR-0026]"]
    end

    subgraph ObservabilityTier["Nivel de Observabilidad (ADR-0007)"]
        OTel["Coleccionista OTel"]
        Loki["Grafana Loki"]
        Jaeger["Trazado Jaeger"]
        OTel --> Loki & Jaeger
    end

    subgraph InfraTier["Infraestructura OSS Autohospedada (ADR-0028)"]
        Vault["HashiCorp Vault\n[Gestión de Secretos]"]
        MinIO["MinIO\n[Almacenamiento de Objetos]"]
    end

    WebApp & MobileApp & B2BClient -->|TLS/HTTP| CDN
    CDN -->|Peticiones de Origen| Kong
    Kong -->|Ruta| WebBFF & MobileBFF & CoreAPI

    WebBFF & MobileBFF -->|gRPC| CoreAPI
    WebBFF & MobileBFF <-->|Lecturas Caché BFF| Redis
    CoreAPI <-->|Lecturas Caché Core| Redis

    CoreAPI -->|SQL/Dual-Layer RLS| PgSQL
    CoreAPI --> PgSQL & AuditLog
    CoreAPI --> IBusPort
    CoreAPI --> AuthGraph
    CoreAPI --> FeatureFlags
    CoreAPI --> ConfigPlatform

    AuthGraph --> IdP
    AuthGraph --> MFA
    IdP --> PgSQL

    CoreAPI -.-> OTel
    Kong -.-> OTel
    WebBFF -.-> OTel

    CoreAPI --> Vault
    CoreAPI --> MinIO
```

---

## 6. Vista de Tiempo de Ejecución ”” Patrones de Flujo de Petición

### 6.1 Flujo de Petición Autenticada ([ADR-0030](../adrs-es/core/0030-api-gateway-kong-vs-nestjs.md), [ADR-0008](../adrs-es/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md), [ADR-0021](../adrs-es/nodejs/0021-high-performance-auth-and-graph-compilation.md), [ADR-0014](../adrs-es/core/0014-distributed-caching-strategy-redis.md))

```mermaid
sequenceDiagram
    autonumber
    participant C as Web App
    participant CL as Caché Cliente (ADR-0004)
    participant CDN as CDN (Capa 1)
    participant B as NestJS BFF (Capa 2)
    participant R as Redis Distribuido
    participant A as Core API (Capa 3)
    participant D as PostgreSQL (RLS)

    C->>CL: Consultar Estado (React Query)
    alt Acierto de Caché (Renderizado Inmediato)
        CL-->>C: Datos (Stale-While-Revalidate)
    end
    C->>CDN: Petición HTTPS (Fetch/Actualización en Segundo Plano)
    alt Acierto CDN
        CDN-->>C: Devolver Contenido Estático
    else Fallo CDN
        CDN->>B: Reenviar Petición a Origen
        B->>R: Bíºsqueda en Caché BFF (Modelos de Vista)
        alt Acierto Caché BFF
            R-->>B: Devolver Respuesta Compuesta
            B-->>CDN: Respuesta Cacheable
            CDN-->>C: Contenido Entregado
            C->>CL: Sincronizar Caché del Cliente
        else Fallo Caché BFF
            B->>A: Llamada gRPC (ADR-0032)
            A->>R: Bíºsqueda Caché Core (Permisos/Datos)
            alt Acierto Core
                R-->>A: Objeto de Dominio
            else Fallo Core
                A->>D: Consulta SQL (Aislamiento Doble Capa)
                D-->>A: Resultados Filtrados
                A->>R: Poblar Caché Core
            end
            A-->>B: Respuesta gRPC
            B->>R: Poblar Caché BFF
            B-->>CDN: Cuerpo Completamente Compuesto
            CDN-->>C: Entregar Respuesta
            C->>CL: Poblar/Sincronizar Caché Cliente
        end
    end
```

### 6.2 Flujo de Eventos Así­ncronos ”” Bus Inyectable ([ADR-0015](../adrs-es/core/0015-event-driven-architecture-intra-domain.md), [ADR-0016](../adrs-es/core/0016-immutable-business-audit-trail.md))

```mermaid
sequenceDiagram
    autonumber
    participant UC as Caso de Uso
    participant Port as IEventBusPort
    participant Bus as Impl Concreta (RabbitMQ / En-Memoria)
    participant AuditSvc as Servicio de Auditorí­a
    participant AuditDB as Registro Auditorí­a (Append-Only)

    UC->>Port: publish(DomainEvent)
    Port->>Bus: Despachar (ví­a impl inyectada)
    Bus-->>AuditSvc: Entregar evento así­ncronamente
    AuditSvc->>AuditDB: INSERT delta inmutable (ADR-0016)
    Note over AuditDB: UPDATE/DELETE bloqueados por trigger de BD
```

### 6.3 Flujo de Resiliencia ”” Circuit Breaker ([ADR-0011](../adrs-es/core/0011-fault-tolerance-resiliency-patterns.md))

```mermaid
sequenceDiagram
    autonumber
    participant A as API Core
    participant CB as Circuit Breaker (opossum)
    participant Ext as Servicio Externo

    A->>CB: execute(llamada)
    alt Circuito CERRADO
        CB->>Ext: Reenviar llamada
        Ext-->>CB: í‰xito
        CB-->>A: Resultado
    else Circuito ABIERTO (umbral excedido)
        CB-->>A: Respuesta Alternativa (sin llamada ejecutada)
        Note over CB: Previene fallo en cascada (ADR-0011)
    end
```

---

## 7. Vista de Despliegue ”” Infraestructura Cloud Objetivo ([ADR-0013](../adrs-es/core/0013-cloud-infrastructure-topology-dr.md), [ADR-0028](../adrs-es/core/0028-self-hosted-hybrid-infrastructure-on-premise.md))
> [!IMPORTANT]
> **Estrategia de Despliegue Progresivo**: El diagrama siguiente representa la arquitectura de despliegue objetivo en estado maduro (**Fase 3+**). De acuerdo con el principio de Complejidad Progresiva, en la **Fase 1 (Monolito)** se permite la ejecución directa de los contenedores en hosts de cómputo mí­nimo (VMs, Container Apps o Docker Compose), escalando hacia clíºsteres gestionados íºnicamente cuando la descomposición modular lo requiera.

```mermaid
graph TD
    subgraph CloudZoneA["Zona de Disponibilidad A"]
        KongA["Nodo Kong"]
        BFFA["Pod NestJS BFF"]
        APIA["Pod Core API"]
        PgPrimary[("PostgreSQL Primario")]
    end

    subgraph CloudZoneB["Zona de Disponibilidad B (DR ”” ADR-0013)"]
        KongB["Nodo Kong"]
        BFFB["Pod NestJS BFF"]
        APIB["Pod Core API"]
        PgReplica[("PostgreSQL Réplica")]
    end

    subgraph SharedInfra["OSS Autohospedado Compartido (ADR-0028)"]
        Redis[("Clíºster Redis")]
        RabbitMQ["Clíºster RabbitMQ"]
        Vault["HashiCorp Vault"]
        MinIO["Almacenamiento MinIO"]
    end

    Internet -->|DNS Failover| KongA & KongB
    KongA --> BFFA --> APIA --> PgPrimary
    KongB --> BFFB --> APIB --> PgReplica
    PgPrimary -.->|Replicación en Streaming| PgReplica
    APIA & APIB <--> Redis
    APIA & APIB --> RabbitMQ
    APIA & APIB --> Vault
```

---

## 8. Conceptos Corporativos Transversales ”” Matriz ADR Completa

| Preocupación Arquitectónica | ADR(s) Implementado(s) | Patrón / Tecnologí­a | Sección del Diagrama |
| :--- | :--- | :--- | :--- |
| **Gobernanza de Monorepo** | [ADR-0001](../adrs-es/core/0001-monorepo-orchestration-nx.md) | Nx + npm workspaces | Â§2 |
| **Arquitectura Hexagonal** | [ADR-0002](../adrs-es/nodejs/0002-clean-architecture-nestjs.md) | Puertos y Adaptadores | Â§4.1, Â§5 |
| **Estándares de TypeScript** | [ADR-0003](../adrs-es/nodejs/0003-strict-typescript-standards.md) | Modo estricto + ESLint Boundaries | Â§2 |
| **Resiliencia en Frontend** | [ADR-0004](../adrs-es/nodejs/0004-frontend-offline-resilience.md) | Caché offline de React Query | Â§3.1 |
| **Seguridad CI/CD** | [ADR-0005](../adrs-es/core/0005-ci-cd-quality-codeql.md) | CodeQL + GitHub Actions | Â§2 |
| **Camino a Microservicios** | [ADR-0006](../adrs-es/core/0006-future-microservices-transition-dapr.md) | Triggers de migración Dapr Sidecar | Â§4.5 |
| **Observabilidad** | [ADR-0007](../adrs-es/nodejs/0007-observability-telemetry-loki-opentelemetry.md) | OpenTelemetry + Loki + Jaeger | Â§3.1, Â§5, Â§6 |
| **Patrón de Gateway BFF** | [ADR-0008](../adrs-es/nodejs/0008-progressive-multimodule-evolution-gateway-bff.md) | NestJS BFF por canal de cliente | Â§3.1, Â§4.3, Â§5 |
| **Fijación de Dependencias** | [ADR-0009](../adrs-es/core/0009-strict-dependency-pinning-vulnerability-management.md) | Versiones exactas + `npm audit` | Â§2 |
| **Multi-Tenancy (SaaS)** | [ADR-0010](../adrs-es/core/0010-multi-tenancy-architecture-strategy.md) | PostgreSQL RLS + AsyncLocalStorage | Â§4.2, Â§5, Â§6.1 |
| **Circuit Breakers** | [ADR-0011](../adrs-es/core/0011-fault-tolerance-resiliency-patterns.md) | `opossum` + Exponential Backoff | Â§5, Â§6.3 |
| **Autorización RBAC/ABAC** | [ADR-0012](../adrs-es/nodejs/0012-advanced-authorization-rbac-abac.md) | JWT Claims + NestJS Guards | Â§5 |
| **Topologí­a Cloud DR** | [ADR-0013](../adrs-es/core/0013-cloud-infrastructure-topology-dr.md) | Multi-AZ + Replicación en Streaming | Â§7 |
| **Caché Distribuida** | [ADR-0014](../adrs-es/core/0014-distributed-caching-strategy-redis.md) | Caché Escalonada Multi-Capa tras `ICachePort` | Â§5, Â§6.1 |
| **Orientado a Eventos (Bus Inyectable)** | [ADR-0015](../adrs-es/core/0015-event-driven-architecture-intra-domain.md) | `IEventBusPort` â†’ En-Mem / RabbitMQ | Â§3.1, Â§4.4, Â§5, Â§6.2 |
| **Pista de Auditorí­a Inmutable** | [ADR-0016](../adrs-es/core/0016-immutable-business-audit-trail.md) | Tabla append-only + trigger de BD | Â§5, Â§6.2 |
| **Feature Flagging** | [ADR-0017](../adrs-es/core/0017-feature-flagging-strategy.md) | `IFeatureFlagPort` (Unleash/ConfigCat) | Â§5 |
| **Pirámide de Pruebas** | [ADR-0018](../adrs-es/core/0018-testing-pyramid-quality-gates.md) | Unitarias + Contrato (Pact) + E2E | Â§2 |
| **Patrones Funcionales / Result** | [ADR-0019](../adrs-es/core/0019-tactical-design-patterns-future-proofing.md) | `Result<T,E>` en lugar de excepciones | Â§4.1 |
| **Abstracción de Proveedor Identidad** | [ADR-0020](../adrs-es/core/0020-identity-provider-abstraction-strategy.md) | Strategy Pattern â†’ Auth0/Entra/Zitadel | Â§3.1, Â§5 |
| **Compilación de Gráfico de Auth** | [ADR-0021](../adrs-es/nodejs/0021-high-performance-auth-and-graph-compilation.md) | Gráfico de permisos en caché Redis < 5ms | Â§5 |
| **Proyecciones Conectables** | [ADR-0022](../adrs-es/nodejs/0022-contextual-auth-and-pluggable-projections.md) | Proyecciones de lectura conscientes del contexto | Â§5 |
| **Níºcleo de Autenticación Centralizado** | [ADR-0023](../adrs-es/nodejs/0023-centralized-TODO-vs-decentralized-access.md) | Níºcleo compartido de autorización | Â§5 |
| **Plataforma de Config & Features** | [ADR-0024](../adrs-es/core/0024-configuration-feature-management-platform.md) | Motor de parámetros multi-IdP | Â§5 |
| **Abstracción de Feature Flags** | [ADR-0025](../adrs-es/core/0025-feature-flag-provider-abstraction.md) | Proveedores conectables de `IFeatureFlagPort` | Â§5 |
| **MFA y Passkeys** | [ADR-0026](../adrs-es/nodejs/0026-mfa-passwordless-adaptive-authentication.md) | WebAuthn + Passkeys + TOTP + Adaptativo | Â§5 |
| **Protocolo Dual REST/gRPC** | [ADR-0027](../adrs-es/nodejs/0027-dual-protocol-rest-grpc-api-gateway.md) | REST (externo) + gRPC (interno) | Â§3.1 |
| **Infraestructura OSS Autohospedada** | [ADR-0028](../adrs-es/core/0028-self-hosted-hybrid-infrastructure-on-premise.md) | MinIO + RabbitMQ + Vault OSS | Â§5, Â§7 |
| **Primitivas DDD Tácticas** | [ADR-0029](../adrs-es/nodejs/0029-tactical-ddd-primitives-library.md) | `@nestjslatam/ddd` ví­a re-exportaciones | Â§4.1 |
| **Gateway de Dos Niveles** | [ADR-0030](../adrs-es/core/0030-api-gateway-kong-vs-nestjs.md) | Kong (Edge) + NestJS BFF (Agregación) | Â§3.1, Â§4.3, Â§5, Â§6.1 |
| **Catálogo de Eventos de Dominio** | [ADR-0031](../adrs-es/core/0031-schema-per-context-domain-event-catalog.md) | Extracción multi-esquema + Contratos Así­ncronos | Â§5, Â§6.2 |
| **Selección de Protocolo** | [ADR-0032](../adrs-es/core/0032-api-protocol-decision-matrix-rest-grpc-graphql.md) | gRPC (Int) vs REST (Ext) vs GraphQL | Â§3.1, Â§5, Â§6.1 |
| **Transactional Outbox** | [ADR-0033](../adrs-es/core/0033-transactional-outbox-pattern.md) | DB Atómica + Garantí­a atómica de eventos | Â§6.2 |
| **Separación CQRS** | [ADR-0034](../adrs-es/core/0034-cqrs-pattern-applicability-matrix.md) | Matriz de Evaluación para Modelos de Lectura/Escritura | Â§5, Â§6.1 |
| **Sagas Distribuidas** | [ADR-0035](../adrs-es/core/0035-distributed-saga-pattern-strategy.md) | Estrategia de Transacción Compensatoria | Â§6.2 |
| **Estrategia de Mensajerí­a** | [ADR-0036](../adrs-es/core/0036-message-bus-delivery-strategy-fifo-dlq.md) | Polí­ticas FIFO vs Disparar y Olvidar vs DLQ | Â§6.2 |
| **Pruebas de Rendimiento** | [ADR-0037](../adrs-es/core/0037-performance-concurrency-chaos-strategy.md) | Carga K6 + Verificación de Contratos Pact | Â§5, Â§6.3 |
| **Gestión de Errores** | [ADR-0038](../adrs-es/nodejs/0038-error-handling-result-pattern-strategy.md) | Patrón Result + Lí­mites Unificados | Â§5, Â§6.3 |
| **Selector de Despliegue** | [ADR-0039](../adrs-es/core/0039-deployment-topology-abstraction-switcher.md) | Abstracción de Topologí­a basada en Factory | Â§7 |
| **Selección Polí­glota** | [ADR-0040](../adrs-es/core/0040-multi-runtime-selection-contracts.md) | Matriz de Carga de Trabajo y Contratos Type-Safe | Â§1.2 |
| **Arquitectura Canónica .NET** | [ADR-0041](../adrs-es/dotnet/0041-canonical-dotnet-backend-architecture.md) | Clean Arch C# / Minimal APIs | Â§1.2 |
| **Arquitectura Canónica Android** | [ADR-0042](../adrs-es/android/0042-canonical-android-mobile-architecture.md) | Kotlin Nativo / Compose / Offline | Â§1.2 |

---

## 9. Requisitos de Calidad (NFR Benchmark)

| Métrica | Objetivo | ADR(s) Aplicables |
| :--- | :--- | :--- |
| **Latencia de API (P95)** | < 50ms | [ADR-0014](../adrs-es/core/0014-distributed-caching-strategy-redis.md), [ADR-0021](../adrs-es/nodejs/0021-high-performance-auth-and-graph-compilation.md) |
| **Resolución de Gráfico de Auth** | < 5ms | [ADR-0021](../adrs-es/nodejs/0021-high-performance-auth-and-graph-compilation.md) |
| **Vulnerabilidades SAST** | 0 Altas/Crí­ticas | [ADR-0005](../adrs-es/core/0005-ci-cd-quality-codeql.md), [ADR-0009](../adrs-es/core/0009-strict-dependency-pinning-vulnerability-management.md) |
| **Cobertura de Pruebas** | â‰¥ 70% | [ADR-0018](../adrs-es/core/0018-testing-pyramid-quality-gates.md) |
| **Huella de Memoria** | Baja inactividad (densidad de microservicios) | [ADR-0002](../adrs-es/nodejs/0002-clean-architecture-nestjs.md), [ADR-0006](../adrs-es/core/0006-future-microservices-transition-dapr.md) |
| **Filtración de Datos de Tenencia** | Tolerancia cero | [ADR-0010](../adrs-es/core/0010-multi-tenancy-architecture-strategy.md) (Aislamiento Doble Capa) |

---

## 10. Implementación de Referencia Canónica

ðŸ‘‰ **[Volver a la Raí­z del Proyecto y Guí­a de Inicio](../../README.md)**

Implementado usando:
- **Framework**: NestJS (v10) con lí­mites estrictamente hexagonales.
- **ORM**: TypeORM con soporte nativo de PostgreSQL RLS.
- **Gateway**: Kong OSS (YAML sin BD) + capas de NestJS BFF.
- **Bus de Eventos**: `IEventBusPort` por defecto en Memoria, inyectable con RabbitMQ.
- **Pruebas**: Jest (unitarias/integración) + Pact (pruebas de contrato).

---

## 11. Riesgos y Deuda Técnica

Seguimiento estratégico de las limitaciones actuales del diseí±o y riesgos del sistema reconocidos.

### 11.1 Riesgos Inherentes
| ID del Riesgo | Descripción | Estrategia de Mitigación | Severidad |
| :--- | :--- | :--- | :--- |
| **R-01** | **Rendimiento de BD Compartida** | El empaquetamiento fí­sico de la BD crea un dominio de fallo íºnico. | Imponer replicación de lectura estricta y techos de tiempo de espera de consulta. | Media |
| **R-02** | **Desbordamiento de RabbitMQ** | Picos de mensajes en memoria durante interrupciones. | Control de Flujo / Cuotas obligatorias segíºn **[ADR-0036](../adrs-es/core/0036-message-bus-delivery-strategy-fifo-dlq.md)**. | Alta |
| **R-03** | **Acoplamiento Polí­glota gRPC** | Cambios de protocolo no compatibles con versiones anteriores. | Verificación obligatoria de contratos **Pact JS** en CI. | Alta |

### 11.2 Deuda Técnica Conocida
*   **Hinchazón de Monorepo**: A medida que el conteo de librerí­as supere las 200+, la gestión de caché Nx requerirá la migración de almacenamiento en caché local a la nube.
*   **Vulnerabilidad de Librerí­a de Dí­a Cero**: Los ciclos de actualización rápidos impuestos por la fijación estricta de dependencias ([ADR-0009](../adrs-es/core/0009-strict-dependency-pinning-vulnerability-management.md)) pueden consumir entre el 5% y 10% del ancho de banda de desarrollo mensual.

---

## 12. Glosario de Conceptos Arquitectónicos

Nomenclatura de referencia utilizada por este blueprint.

*   **ACL (Anti-Corruption Layer)**: Aí­sla el modelo de dominio interno de esquemas/contratos externos.
*   **BFF (Backend for Frontend)**: API de borde de un solo propósito que optimiza las cargas íºtiles para un cliente especí­fico.
*   **Bounded Context**: Lí­mite estratégico de lógica propietario de su propio esquema de base de datos privado.
*   **Arquitectura Limpia**: Paradigma de diseí±o donde el flujo de control siempre apunta hacia adentro, hacia las dependencias.
*   **Circuit Breaker Distribuido**: Mecanismo para detener la entrega de peticiones a servicios aguas arriba con fallas compartiendo el estado entre pods ví­a Redis.
*   **Arquitectura Hexagonal**: Ver *Puertos y Adaptadores*.
*   **Puerto**: Contrato explí­cito (Interfaz) que requiere la aplicación para comunicarse con sistemas externos.
*   **RLS (Row-Level Security)**: Seguridad nativa del motor de BD que restringe las filas de la tabla al usuario de la sesión activa.
*   **Patrón Saga**: Gestión de la consistencia transaccional distribuida a través de eventos de compensación.

---
[? Volver al Índice](./README.es.md)
