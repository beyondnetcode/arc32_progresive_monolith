# 🌐 Corporate Reference Platform Architecture (bMAD)

## 🎯 Propósito del Repositorio
Esta es la base canónica autorizada para la construcción de productos digitales escalables, multi-tenant y políglotas dentro de la organización. El sistema implementa un Monolito Modular Progresivo que evoluciona físicamente hacia Microservicios.

Este repositorio contiene una división estricta para dos audiencias distintas:

---

### 🏛️ Capa 1: Estándares Corporativos (EAC)
**Para**: Líderes Técnicos, Arquitectos, Equipos de Desarrollo y Proveedores Externos.
Aquí reside la ley inmutable: los 42 ADRs autorizados, el Blueprint Corporativo (arc42) y los manifiestos de ingeniería universal que DEBEN seguirse para cualquier nuevo proyecto.
👉 **[Ver Estándares Corporativos](./corporate-standards/README.md)**

---

### 🧪 Capa 2: Demo / Sandbox App
**Para**: Desarrolladores que desean ejecutar el código de referencia y ver los patrones implementados.
Incluye la aplicación "To-Do" que valida físicamente las fronteras hexagonales, seguridad RLS y telemetría distribuida en ejecución local.
👉 **[Explorar la Aplicación Demo](./demo/README.md)**

---

## 🚀 Runtimes Oficiales Autorizados
La arquitectura es políglota por diseño (ADR-0040). Cada runtime posee su propia guía canónica autorizada:

| Runtime | Rol Canónico | Guía de Arquitectura |
| :--- | :--- | :--- |
| **Node.js / TS** | Principal API / BFF | [ADR 0002] / [ADR 0003] |
| **.NET (C#)** | High Compute / Batch | [ADR 0041] |
| **Android** | Nativo Offline Mobile | [ADR 0042] |

---

## 📚 Guía de Adopción Rápida
¿Deseas iniciar un nuevo producto a partir de esta plantilla de referencia?
👉 **[Consultar el Getting Started (Product Setup)](./corporate-standards/05-onboarding/product-quick-start.md)**
