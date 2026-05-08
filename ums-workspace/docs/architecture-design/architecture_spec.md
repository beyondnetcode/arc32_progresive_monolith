# ðŸ›ï¸ Documento de DiseÃ±o y Arquitectura de Software (UMS)

Este documento detalla la especificaciÃ³n formal del diseÃ±o del sistema para el monorepo **`ums-workspace`**. Adopta el estÃ¡ndar de modelado de software **C4 Model** (Nivel 1: Contexto de Sistema, Nivel 2: Contenedores, Nivel 3: Componentes) y presenta el inventario tÃ©cnico unificado y auditado del proyecto.

---

## ðŸ—ºï¸ 1. Modelo C4 (C4 Model)

El diseÃ±o arquitectÃ³nico de UMS se modela en tres niveles progresivos de abstracciÃ³n para alinear la visiÃ³n del negocio con la implementaciÃ³n fÃ­sica en cÃ³digo.

### Nivel 1: Contexto de Sistema (System Context Diagram)
Define la frontera del sistema de gestiÃ³n de usuarios (UMS) interactuando con los usuarios corporativos y los servicios externos de UMS.

```mermaid
graph TD
    User["ðŸ‘¥ Usuario UMS<br/>(Personal Corporativo / Operadores)"]
    UMS["ðŸ¢ Sistema de GestiÃ³n de Usuarios (UMS)<br/>(ums-workspace)"]
    ExternalAuth["ðŸ”’ Servicio de Identidad UMS<br/>(OAuth / LDAP Externo)"]

    User -->|Inicia sesiÃ³n / Administra usuarios| UMS
    UMS -->|Verifica credenciales federadas| ExternalAuth
```

---

### Nivel 2: Diagrama de Contenedores (Container Diagram)
Mapea los subsistemas fÃ­sicos (Frontend React, API NestJS, Base de Datos PostgreSQL) que componen el monorepo y cÃ³mo se comunican mediante protocolos seguros.

```mermaid
graph TD
    subgraph Browser["ðŸŒ Navegador del Cliente"]
        ReactApp["âš›ï¸ Frontend React Web App<br/>(Zustand + React Query + Lucide)"]
    end

    subgraph Server["ðŸ–¥ï¸ Servidor de AplicaciÃ³n (Host Local/Nube)"]
        NestAPI["ðŸ¦ API RESTful NestJS<br/>(Clean Architecture / TypeORM)"]
        PostgresDB["ðŸ˜ Base de Datos PostgreSQL 16<br/>(TypeORM Persistence)"]
    end

    ReactApp -->|1. Consultas HTTPS / TLS segura| NestAPI
    NestAPI -->|2. ConexiÃ³n TCP / TypeORM Driver| PostgresDB
```

---

### Nivel 3: Diagrama de Componentes de la API (Component Diagram)
Zoom interactivo a la estructura de la **API NestJS**, demostrando el flujo de control hacia el interior (*Inversion of Control*) de la Arquitectura Hexagonal.

```mermaid
graph TD
    subgraph HTTP["ðŸŒ Capa de Adaptadores Externos (HTTP)"]
        Controller["UserController<br/>(HTTP Controller con Helmet y Throttler)"]
    end

    subgraph Application["âš™ï¸ Capa de Casos de Uso (Application)"]
        UseCase["RegisterUserUseCase<br/>(Caso de Uso de Negocio)"]
        DTO["RegisterUserDto<br/>(ValidaciÃ³n de Atributos)"]
    end

    subgraph Core["ðŸ’Ž Capa del NÃºcleo de Dominio (Core)"]
        UserEntity["User Entity<br/>(Entidad Pura de Negocio)"]
        IUserRepo["IUserRepository<br/>(Puerto de Persistencia)"]
        IPassHasher["IPasswordHasher<br/>(Puerto de Hashing)"]
    end

    subgraph Infrastructure["ðŸ’¾ Capa de Adaptadores de Persistencia"]
        TypeOrmRepo["TypeOrmUserRepository<br/>(Adaptador de Persistencia)"]
        BcryptHasher["BcryptPasswordHasher<br/>(Adaptador de Hashing)"]
    end

    Controller -->|Invoca| UseCase
    UseCase -->|Valida entrada con| DTO
    UseCase -->|Instancia y crea| UserEntity
    UseCase -.->|Depende de| IUserRepo
    UseCase -.->|Depende de| IPassHasher

    TypeOrmRepo --.->|Implementa| IUserRepo
    BcryptHasher --.->|Implementa| IPassHasher
```

---

## ðŸ“Š 2. Inventario TÃ©cnico de Dependencias (Sovereign Tech Inventory)

Este inventario detalla todas las herramientas, librerÃ­as, plugins y componentes por espacio de trabajo con su respectiva versiÃ³n instalada, su recomendaciÃ³n de ciclo de vida tecnolÃ³gica (*Staff Recommendation*) y su documentaciÃ³n oficial de referencia.

### ðŸ¦ A. Backend (Capa API NestJS)

| Dependencia / LibrerÃ­a | VersiÃ³n Instalada | RecomendaciÃ³n TÃ©cnica | URL de Referencia |
| :--- | :--- | :--- | :--- |
| `@nestjs/core` | `^10.0.0` | **Mantener (Estable)** - NÃºcleo robusto para inyecciÃ³n de dependencias. | [NestJS Docs](https://docs.nestjs.com/) |
| `@nestjs/throttler` | `^6.5.0` | **Mantener (Estable)** - PrevenciÃ³n de ataques de fuerza bruta y DDoS local. | [NestJS Rate Limiting](https://docs.nestjs.com/security/rate-limiting) |
| `@nestjs/typeorm` | `^11.0.1` | **Mantener (Estable)** - IntegraciÃ³n nativa de persistencia con soporte de transacciones. | [NestJS TypeORM](https://docs.nestjs.com/techniques/database) |
| `typeorm` | `^0.3.28` | **Mantener (Estable)** - ORM maduro con soporte excelente de migraciones y Type Safety. | [TypeORM Official](https://typeorm.io/) |
| `bcrypt` | `^6.0.0` | **Mantener (Estable)** - Algoritmo criptogrÃ¡fico robusto para almacenamiento de contraseÃ±as. | [Bcrypt GitHub](https://github.com/kelektiv/node.bcrypt.js) |
| `helmet` | `^8.1.0` | **Mantener (CrÃ­tico)** - InyecciÃ³n automÃ¡tica de cabeceras HTTP de seguridad (CORS, XSS). | [Helmet Docs](https://helmetjs.github.com/) |
| `pg` | `^8.20.0` | **Mantener (Estable)** - Driver de conexiÃ³n nativa de alto rendimiento para PostgreSQL. | [Node Postgres](https://node-postgres.com/) |
| `class-validator` | `^0.15.1` | **Mantener (Estable)** - ValidaciÃ³n declarativa de DTOs en tiempo de ejecuciÃ³n. | [Class Validator](https://github.com/typestack/class-validator) |

---

### âš›ï¸ B. Frontend (React Web Client)

| Dependencia / LibrerÃ­a | VersiÃ³n Instalada | RecomendaciÃ³n TÃ©cnica | URL de Referencia |
| :--- | :--- | :--- | :--- |
| `react` | `^18.3.1` | **Mantener (Estable)** - VersiÃ³n ultra-estable compatible con ecosistemas maduros. | [React Documentation](https://react.dev/) |
| `vite` | `^5.4.10` | **Mantener (Estable)** - Bundler de altÃ­sima velocidad compatible con Node 18. | [Vite JS](https://vitejs.dev/) |
| `@tanstack/react-query`| `^5.100.9` | **Mantener (CrÃ­tico)** - SincronizaciÃ³n asÃ­ncrona de estado de servidor y cachÃ© inteligente. | [TanStack Query Docs](https://tanstack.com/query/latest) |
| `zustand` | `^5.0.13` | **Mantener (Estable)** - Gestor de estado global super ligero alternativo a Redux. | [Zustand GitHub](https://github.com/pmndrs/zustand) |
| `tailwindcss` | `^3.4.19` | **Mantener (Estable)** - Motor CSS utilitario de alto rendimiento y customizaciÃ³n. | [Tailwind CSS](https://tailwindcss.com/) |
| `axios` | `^1.16.0` | **Mantener (Estable)** - Cliente HTTP robusto con soporte de interceptores globales. | [Axios Docs](https://axios-http.com/) |
| `lucide-react` | `^1.14.0` | **Mantener (Estable)** - ColecciÃ³n moderna de iconos en formato SVG reactivos. | [Lucide Icons](https://lucide.dev/) |

---

### ðŸ› ï¸ C. Calidad y Gobernanza Global (Monorepo RaÃ­z)

| Dependencia / LibrerÃ­a | VersiÃ³n Instalada | RecomendaciÃ³n TÃ©cnica | URL de Referencia |
| :--- | :--- | :--- | :--- |
| `nx` | `^20.3.0` | **Mantener (CrÃ­tico)** - Task runner de alto rendimiento con soporte de caching. | [Nx Dev Docs](https://nx.dev/) |
| `eslint-plugin-boundaries`| `^5.0.0` | **Mantener (Estable)** - Gobernanza estricta para lÃ­mites Hexagonales. | [eslint-plugin-boundaries](https://github.com/javierguzman/eslint-plugin-boundaries) |
| `eslint-plugin-sonarjs` | `^3.0.0` | **Mantener (Estable)** - AnÃ¡lisis estÃ¡tico Sonar a costo $0 para proyectos locales. | [SonarJS ESLint](https://github.com/SonarSource/eslint-plugin-sonarjs) |
| `husky` | `^9.0.0` | **Mantener (Estable)** - IntercepciÃ³n y automatizaciÃ³n de Git Hooks. | [Husky Docs](https://typicode.github.io/husky/) |
| `lint-staged` | `^15.0.0` | **Mantener (Estable)** - EjecuciÃ³n optimizada de linters solo en Git Staged files. | [lint-staged GitHub](https://github.com/lint-staged/lint-staged) |

---

## ðŸ“ˆ 3. GestiÃ³n de Deuda TÃ©cnica y Roadmap de Arquitectura (Backlog)

Para garantizar la evoluciÃ³n saludable del monorepo hacia modelos distribuidos y telemetrÃ­a de producciÃ³n, se establecen los siguientes elementos en el backlog de arquitectura:

*   **[ADR 0006: Future Microservices Transition with Dapr](file:///d:/Users/aarroyo/personal/sources/ums/ums-workspace/docs/architecture-design/adrs/0006-future-microservices-transition-dapr.md)**: Establece los criterios y gatilladores tÃ©cnicos (*triggers*) que determinarÃ¡n cuÃ¡ndo dividir el monolito modular en microservicios independientes gobernados por sidecars de Dapr.
*   **[ADR 0007: Observability Telemetry with Grafana Loki and OpenTelemetry](file:///d:/Users/aarroyo/personal/sources/ums/ums-workspace/docs/architecture-design/adrs/0007-observability-telemetry-loki-opentelemetry.md)**: Detalla la arquitectura de telemetrÃ­a e instrumentaciÃ³n asÃ­ncrona mediante OpenTelemetry y recolecciÃ³n ligera en Grafana Loki.

