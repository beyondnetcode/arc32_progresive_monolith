# ðŸ“œ Polí­tica de Taxonomí­a y Estructuración del Repositorio (Enterprise)

> **Estado:** ðŸŸ¡ Propuesto | **Versión:** 3.0.0 | **Framework:** Enterprise Repository Taxonomy & Docs-as-Code

Este documento establece la **polí­tica oficial e inmutable** de estructuración, taxonomí­a y gobernanza para este repositorio empresarial.

---

## ðŸ—ï¸ 1. Estructura Estándar de Directorios (The Blue-Map Layout)

```text
/ (Repository Root) ”” [CAPA DE GOBERNANZA]
â”œâ”€â”€ ðŸ“œ README.md                 # Portal Ejecutivo (Visión y onboarding)
â”œâ”€â”€ ðŸ“œ MASTER_INDEX.md           # Hub de Navegación SSoT
â”œâ”€â”€ ðŸ“ .harness/                 # Contexto de IA (Reglas, Memoria)
â”œâ”€â”€ ðŸ“ governance/               # âš–ï¸ LEYES: Polí­ticas, Requisitos y Roadmap
â”œâ”€â”€ ðŸ“ architecture/             # ðŸ—ï¸ PLANOS: ADRs, Blueprints y C4 Model
â”œâ”€â”€ ðŸ“ infrastructure/           # ðŸ› ï¸ CIMIENTOS: IaC, Docker, despliegue
â”œâ”€â”€ ðŸ“ operations/               # ðŸš€ RUN: Observabilidad y Playbooks
â”œâ”€â”€ ðŸ“ knowledge/                # ðŸŽ“ APRENDIZAJE: POCs y Onboarding
â””â”€â”€ ðŸ“ src/                      # [CAPA Tí‰CNICA / SOURCE]
    â”œâ”€â”€ ðŸ“ apps/                 # Aplicaciones desplegables (app-*)
    â”œâ”€â”€ ðŸ“ libs/                 # Librerí­as compartidas (lib-*)
    â”œâ”€â”€ ðŸ“œ package.json          # Orquestación del Monorepo
    â””â”€â”€ ðŸ“œ nx.json               # Grafo de tareas
```

> [!IMPORTANT]
> **Prohibición de Carpetas "Basura":** Está estrictamente prohibido crear carpetas con nombres como `utils`, `misc`, `temp`, `common`, `shared` sin contexto. Toda pieza de código debe pertenecer a un Dominio, Infraestructura u Operaciones.

## ðŸ—‚ï¸ 2. Taxonomí­a y Convenciones de Nombres

- **Directorios y Archivos Base:** `kebab-case` estricto (ej. `user-management`).
- **ADRs:** `[ID-4-digitos]-[titulo-descriptivo].md` -> `0001-use-postgresql-for-users.md`
- **Naming de Capas en Dominios:**
  - `app-*`: Aplicación o artefacto desplegable (Ej: `app-user-api`).
  - `lib-*`: Librerí­a de dominio o técnica compartida (Ej: `lib-auth-guard`).

## ðŸ§­ 3. Estrategia de Navegación (SSoT)

1. **Role-Based Navigation:** Guiada por `MASTER_INDEX.md`.
2. **Docs-as-Code:** Prohibido repetir estándares; siempre enlazar a `governance/`.
3. **Breadcrumbs:** Todo documento Markdown profundo debe contener un enlace de retroceso a `MASTER_INDEX.md`.

## ðŸ§© 4. Separación de Responsabilidades

1.  **Código Fuente (`src/apps`, `src/libs`)**: Contiene la lógica de negocio, implementaciones técnicas y pruebas unitarias.
2.  **Gobernanza Arquitectónica (`architecture/`)**: Contiene la justificación de las decisiones (ADRs) y la visión técnica a largo plazo.
3.  **Gobernanza de Producto (`governance/`)**: Contiene el alcance, los requisitos y la validación de negocio.

Está terminantemente prohibido duplicar información de gobernanza dentro de los directorios de código fuente. Toda referencia técnica debe apuntar a la raí­z del repositorio.

---
[? Volver al Índice](./README.es.md)
