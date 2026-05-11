# 🌐 Corporate Reference Platform Architecture (bMAD)

## 🎯 Propósito del Repositorio
Esta es la base canónica autorizada para la construcción de productos digitales escalables, multi-tenant y políglotas dentro de la organización. El sistema implementa un Monolito Modular Progresivo diseñado matemáticamente para evolucionar quirúrgicamente hacia microservicios sin reescritura de dominio.

Este repositorio posee una segmentación física estricta para blindar las leyes inmutables frente a los experimentos:

---

### 🏛️ Capa 1: Estándares Corporativos (EAC)
**Para**: Líderes Técnicos, Arquitectos, Proveedores y Equipos que inician un desarrollo.
Aquí reside la "Ley": 42 ADRs autorizados, el Blueprint arc42, dictámenes de auditoría stack 2026 y los estándares de ingeniería global.
👉 **[Ver Estándares Corporativos](./corporate-standards/README.md)**

---

### 🧪 Capa 2: Demo / Sandbox App (To-Do)
**Para**: Desarrolladores e Ingenieros QA que desean ejecutar código real.
Incluye la aplicación demostrativa que valida físicamente las fronteras hexagonales, el Row-Level Security (RLS) y la telemetría en ejecución distribuida.
👉 **[Explorar la Aplicación Demo](./demo/README.md)**

---

## 🚀 Runtimes Oficiales Autorizados (Horizonte 2026)
La arquitectura es agnóstica y autoriza la siguiente matriz de selección basada en carga de trabajo (ADR-0040):

| Runtime | Ecosistema validado | Rol Canónico | Estatus de Guía |
| :--- | :--- | :--- | :--- |
| **Node.js / TS** | NestJS 11.1 / Node 24 LTS | APIs transaccionales y BFF | [ADR 0002 / 0003] |
| **.NET (C#)** | ASP.NET Core / .NET 10 LTS | High Compute / Batch / Workers | [ADR 0041] |
| **Android** | Kotlin 2.3 / Compose 1.11 | Aplicaciones Móviles Nativas | [ADR 0042] |

---

## 📚 Guía de Adopción Rápida
¿Vas a iniciar un nuevo producto corporativo?
Sigue el manual paso a paso para clonar, configurar y andamiar tu primer contexto delimitado:
👉 **[Consultar el Product Quick-Start (Getting Started)](./corporate-standards/05-onboarding/product-quick-start.md)**

---
**🔒 Nivel de Blindaje del Repositorio**: Estatus Saneado. Cumple licencias Apache 2.0 / BSD (Post-SSPL/BSL validado Mayo 2026).
