# ADR-0048: Estandarización de Taxonomí­a Empresarial y Layout (Enterprise Standards)

## Estado
Aceptado

## Contexto
A medida que el ecosistema evoluciona hacia un Monolito Progresivo, la proliferación de carpetas anidadas y la falta de convenciones estrictas de nombres han generado una alta carga cognitiva para los equipos de ingenierí­a. Se requerí­a una polí­tica inmutable que unificara la estructura de directorios, la separación por dominios y la ubicación de los artefactos de gobernanza en la raí­z del repositorio, garantizando el principio de **Docs-as-Code**.

Esta estandarización también optimiza la interacción con agentes de Inteligencia Artificial mediante el soporte de la metodologí­a **BMAD-METHOD**, pero el driver principal es la mantenibilidad y la arquitectura enterprise.

## Decisión
Se ha decidido adoptar la **Taxonomí­a Enterprise v3.0 (Separated Governance & Source)** como el estándar arquitectónico oficial. Esta polí­tica impone la segregación absoluta entre la gobernanza documental (Raí­z) y la implementación técnica (`src/`).

Las reglas inmutables son:
1.  **Portal de Gobernanza (Raí­z)**: Los dominios transversales de gobernanza deben vivir exclusivamente en la raí­z del repositorio:
    *   `governance/`: Visión, requisitos (BMAD Phase 00-01) y roadmap (Phase 05).
    *   `architecture/`: ADRs (Phase 03) y Blueprints (Phase 02).
    *   `infrastructure/`: Configuraciones de plataforma e IaC.
    *   `operations/`: Observabilidad y monitoreo.
    *   `knowledge/`: Onboarding y POCs.
2.  **Source Root (`src/`)**: íšnico contenedor de la implementación técnica. No debe contener carpetas redundantes de dominio intermedio (ej. NO usar `src/TODO/`).
3.  **Monorepo Standard (Nx)**: Dentro de `src/`, el código se organiza siguiendo las mejores prácticas de Nx:
    *   `src/apps/`: Aplicaciones desplegables.
    *   `src/libs/`: Librerí­as compartidas.
    *   `src/package.json` & `src/nx.json`: El motor técnico reside en la raí­z de `src/`.
4.  **Lí­mites de Responsabilidad**: El código fuente debe ser agnóstico a la documentación de negocio, permitiendo que la gobernanza evolucione sin afectar el build path.

## Consecuencias
### Positivas:
* **Mejora del Developer Experience (DX):** La navegación se simplifica radicalmente y se guí­a a través del `MASTER_INDEX.md`.
* **Escalabilidad Inmediata:** La clara separación en `src` facilita la futura extracción de microservicios (Microservice Extraction Readiness).
* **Mejor Interacción con IA:** Los agentes como Cline/Windsurf/Cursor tienen ahora un "Contexto AI" aislado y optimizado (`.harness`) sin generar ruido visual en la raí­z.

### Negativas/Riesgos:
* **Refactoring Inicial:** Implicó un cambio mayor ("Breaking Change" a nivel de carpetas) que requirió actualizar `nx.json`, `package.json` y re-escribir hiperví­nculos internos en toda la documentación.
* **Curva de Aprendizaje:** Los nuevos desarrolladores deben ser capacitados obligatoriamente sobre la polí­tica de taxonomí­a (ubicada en `governance/standards/repository-taxonomy.md`) antes de crear nuevas carpetas.

---
[? Volver al Índice](./README.es.md)
