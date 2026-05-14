# ðŸ“ Stack Tecnológico Autorizado: Ecosistema Node.js & TypeScript

> ðŸŒ **Navegación Bilingí¼e:** [ðŸ‡ºðŸ‡¸ English Version](./authoritative-tech-stack-nodejs.md)

**Tipo de Documento:** Apéndice de Runtime  
**Prerrequisito:** DEBE leerse después de la **[Lí­nea Base Agnóstica](./authoritative-tech-stack-agnostic.md)**.  

---

## ðŸ“‹ 1. Matriz de Cumplimiento Ejecutiva (Mandatos para Proveedores)

| Categorí­a | Herramienta / Framework Aprobado | Versión Validada | Â¿ADR Requerido para Cambiar? | Alternativas Explí­citamente Rechazadas |
| :--- | :--- | :--- | :--- | :--- |
| **Runtime Base** | **Node.js (LTS)** | 20.x | **Sí** | Bun, Deno (hasta próxima auditorí­a) |
| **Host Web** | **NestJS (Motor Express)** | 10.x+ | **Sí** | Fastify (requiere ADR aprobado), Express Puro |
| **BD Relacional** | **PostgreSQL** | v16+ | **SÍ** | MySQL, MariaDB |
| **BD No Relacional** | **MongoDB** | Última | **SÍ** | Cassandra, DynamoDB |
| **ORM Relacional** | **TypeORM** o **Drizzle** | Última | **NO** | Sequelize, Prisma (requiere ADR de rendimiento) |
| **Validación** | **class-validator** | íšltima | **NO** | Zod (excepto para contratos de API externos) |
| **Motor de Pruebas** | **Jest** | 29.x | **Sí** | Mocha, Ava |
| **Orquestador Monorepo**| **Nx** | 18.x+ | **Sí** | Turborepo, Lerna |

---

## ðŸ—ï¸ 2. Organización Arquitectónica (Espacio de Trabajo Nx)

Las soluciones Node.js DEBEN utilizar aislamiento estricto de librerí­as impuesto mediante **tags de Nx**:
1.  **`type:domain`**: Cero importaciones externas. Objetos TS puros.
2.  **`type:application`**: Contiene lógica agnóstica a NestJS, manejadores de comandos puramente por inyección de dependencias.
3.  **`type:infrastructure`**: Contiene módulos concretos de NestJS, entidades ORM y adaptadores.
4.  **`type:api`**: Cascarón de la aplicación NestJS de punto de entrada.

---

## ðŸ’¾ 3. Herramientas de Runtime Especí­ficas

*   **Compilador:** `@swc/core` para compilación 20 veces más rápida en CI/CD.
*   **Linting:** ESLint v8 modo estricto + configuración de Prettier.

---
ðŸ‘‰ Volver al **[índice Maestro Global](../../../MASTER_INDEX.es.md)**

---
[? Volver al Índice](./README.es.md)
