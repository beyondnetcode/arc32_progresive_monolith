# 🧪 Aplicación Demo / Sandbox de Referencia ("To-Do App")

Esta sección documenta la implementación física provista en este repositorio. Su único objetivo es actuar como un **Laboratorio de Patrones**, demostrando en código vivo cómo los estándares corporativos operan en conjunto.

---

## 🎯 Mapa de Navegación de la Demo

### 📋 1. Capa Funcional
Descripción de negocio y casos de uso que el sistema soporta para disparar los flujos técnicos.
*   [Visión del Producto](./functional/product-vision.md)
*   [Contexto de Negocio y Drivers](./functional/business-context.md)
*   [Alcance Funcional Atómico](./functional/domain-scope.md)
*   [Modelo Conceptual de Datos](./functional/data-model.md)

### 🏗️ 2. Capa Técnica de la Demo
Cómo se aplica tácticamente el blueprint en el código de esta solución.
*   [Mapa de Bounded Contexts (Auth vs Tasks)](./technical/bounded-context-map.md)
*   👉 **[Matriz de Verificación de Patrones (Sandbox Scope)](./technical/sandbox-verification.md)** *(Revisa qué ADRs se comprueban aquí)*

### 🚀 3. Casos de Uso Atómicos (Simulación)
*   [UC-01: User Authentication](./functional/usecases/uc-01-user-authentication.md)
*   [UC-02: Create To-Do Task](./functional/usecases/uc-02-create-todo-task.md)
*   [UC-03: List Personal Tasks](./functional/usecases/uc-03-list-filter-tasks.md)
*   [UC-04: Manage Task Tags](./functional/usecases/uc-04-manage-task-tags.md)

---

## 🚦 Limitaciones Conocidas
Esta aplicación NO es un producto productivo final. Carece intencionalmente de lógica de negocio compleja (colaboración, búsquedas semánticas) para mantener el código limpio y enfocado al 100% en los **Límites Arquitectónicos**.
