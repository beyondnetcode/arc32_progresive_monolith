# 🧪 Aplicación Demo / Sandbox de Referencia ("To-Do App")

Esta sección documenta la implementación física provista en este repositorio. Su único objetivo es actuar como un **Laboratorio de Patrones**, demostrando en código vivo cómo los estándares corporativos operan en conjunto.

---

## 🎯 Mapa de Navegación de la Demo (Exhaustivo)

### 📋 1. Capa Funcional y Negocio del Sandbox
Descripción del dominio para disparar los flujos técnicos demostrativos.
*   [Visión del Producto Demo](./functional/product-vision.md)
*   [Contexto de Negocio](./functional/business-context.md)
*   [Objetivos y OKRs del Producto](./functional/product-objectives.md)
*   [Matriz de Stakeholders](./functional/stakeholders.md)
*   [Alcance Funcional Atómico](./functional/domain-scope.md)
*   [Glosario de Negocio (Ubiquitous Language)](./functional/business-glossary.md)
*   [Modelo Conceptual de Datos](./functional/data-model.md)

### 🏗️ 2. Capa Técnica de la Demo
Cómo se aplica tácticamente el blueprint arquitectónico corporativo en el código de esta solución específica.
*   [Mapa de Bounded Contexts (Auth vs Tasks)](./technical/bounded-context-map.md)
*   👉 **[Matriz de Verificación de Patrones (Sandbox Scope)](./technical/sandbox-verification.md)** *(Revisa qué ADRs se comprueban físicamente en el código)*

### 🚀 3. Casos de Uso Atómicos Implementados
*   [UC-01: User Authentication](./functional/usecases/uc-01-user-authentication.md)
*   [UC-02: Create To-Do Task](./functional/usecases/uc-02-create-todo-task.md)
*   [UC-03: List Personal Tasks](./functional/usecases/uc-03-list-filter-tasks.md)
*   [UC-04: Manage Task Tags](./functional/usecases/uc-04-manage-task-tags.md)

---

## 🚦 Limitaciones Conocidas
Esta aplicación NO es un producto productivo final. Carece intencionalmente de lógica de negocio compleja (colaboración multi-usuario, búsquedas semánticas densas) para mantener el código limpio, ligero y enfocado al 100% en validar los **Límites Arquitectónicos** y las **Capacidades de Framework**.
