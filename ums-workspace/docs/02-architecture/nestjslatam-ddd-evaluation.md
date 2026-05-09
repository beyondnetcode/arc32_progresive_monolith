# 📐 Evaluación Arquitectónica — Utilización de `@nestjslatam/packages` para DDD en UMS Core

**Documento:** Evaluación Tecnológica  
**Estado:** Propuesto / Bajo Revisión  
**Fecha:** 2026-05-09  
**Autor:** Solutions Architect Agent  

---

## 🧭 1. Introducción y Contexto

El diseño arquitectónico de **UMS (User Management System)** exige que el núcleo del dominio (Domain Core) se adhiera estrictamente a patrones de **Domain-Driven Design (DDD)** y mantenga una separación total de dependencias externas en la capa del dominio (Arquitectura Hexagonal / Puertos y Adaptadores).

Se evalúa la adopción de las librerías de la organización **`@nestjslatam`** (especialmente su conjunto de bloques constructivos para DDD como `@nestjslatam/ddd`) como el conjunto de primitivas base para definir Entidades, Objetos de Valor (Value Objects), Agregados (Aggregates) y Eventos de Dominio (Domain Events) en nuestro monorrepo NestJS.

---

## 📊 2. Análisis de Alineación Arquitectónica

Para que una librería de soporte DDD sea aceptada en el núcleo del dominio de UMS, debe superar estrictamente las siguientes restricciones y directrices arquitectónicas:

### A. Restricción de Cero Dependencias de Infraestructura (Cumplimiento: ✅ EXCELENTE)
*   **Criterio:** La capa de dominio no debe depender de bases de datos, ORMs (como TypeORM), controladores HTTP o frameworks de mensajería.
*   **Evaluación:** Las librerías de DDD de `@nestjslatam` proporcionan abstracciones puras en TypeScript para primitivas DDD sin arrastrar dependencias pesadas de base de datos o red. Los bloques constructivos base (`Entity`, `ValueObject`, `AggregateRoot`) operan en memoria y son completamente portables y testeables en aislamiento.

### B. Primitivas de Diseño Táctico Soportadas (Cumplimiento: ✅ COMPLETO)
La librería provee implementaciones estandarizadas para los patrones tácticos de DDD:
1.  **`ValueObject`**: Manejo nativo de igualdad estructural basada en propiedades (en lugar de igualdad por referencia de memoria) y validación de invariantes inmutables.
2.  **`Entity<ID>`**: Definición de objetos con identidad única duradera a lo largo del tiempo.
3.  **`AggregateRoot<ID>`**: Gestión del ciclo de vida de entidades agrupadas y recolección interna de **Domain Events** para despacho asíncrono posterior a la transacción de persistencia.
4.  **`DomainEvent`**: Eventos ligeros de dominio con marcas de tiempo e identificadores de correlación nativos para propagar cambios de estado de manera eventual.

---

## 📈 3. Beneficios de su Adopción

1.  **Erradicación de Código Repetitivo (Boilerplate):** Evita que el equipo tenga que reescribir clases abstractas para comparar objetos de valor, manejar despachos de eventos internos o estructurar identificadores de entidades, acelerando el desarrollo inicial.
2.  **Estandarización del Equipo:** Al ser un conjunto de paquetes unificados para la comunidad de NestJS en Latam, promueve patrones limpios y consistentes que facilitan el onboarding de nuevos desarrolladores TypeScript al proyecto.
3.  **Alineación con el Ecosistema NestJS:** Aunque las clases de dominio permanecen desacopladas (POJOs puros), la suite está diseñada para integrarse fluidamente con el contenedor de inyección de NestJS y los módulos de CQRS en la capa de aplicación.

---

## ⚠️ 4. Riesgos y Estrategias de Mitigación

| Riesgo Detectado | Nivel de Riesgo | Estrategia de Mitigación |
| :--- | :--- | :--- |
| **Acoplamiento del Dominio (Vendor Lock-in en Código de Dominio)** | **Medio** | Si bien las entidades extienden de `@nestjslatam/ddd`, se puede crear una interfaz intermedia o encapsular los imports en un archivo barril local (`libs/domain/core`). Si la librería cambia de licencia o se vuelve obsoleta, se puede clonar/forkear el repositorio de origen de manera sencilla al ser Open-Source. |
| **Rendimiento en Comparación de Propiedades** | **Bajo** | La comparación profunda de objetos de valor (`ValueObject.equals`) debe ser óptima para evitar sobrecostos de CPU en la compilación de gráficos de autorización con alta concurrencia. Se realizarán pruebas de carga automatizadas con Jest y Testcontainers. |
| **Evolución y Soporte de la Comunidad** | **Medio** | Mantener una versión estable bloqueada en el `package.json` de nuestro monorrepo de Nx para evitar actualizaciones disruptivas de terceros. |

---

## 🏛️ 5. Recomendación del Arquitecto

**ESTADO: APROBADO CON CONDICIONES**

Se recomienda la adopción de `@nestjslatam/ddd` para el núcleo del dominio de UMS bajo las siguientes directrices obligatorias de diseño de software:

1.  **Encapsulamiento de Imports (Barrel Pattern):** No importar directamente `@nestjslatam/ddd` en cada archivo de entidad de manera indiscriminada. En su lugar, exponer las primitivas autorizadas a través de un archivo barril centralizado en nuestro monorrepo (e.g., `libs/domain/src/core-primitives.ts`), facilitando cualquier reemplazo futuro con cero impacto en las clases del negocio.
2.  **Inmutabilidad de los Objetos de Valor:** Todos los `ValueObject` heredados deben ser declarados estrictamente con propiedades de solo lectura (`readonly`) para evitar mutaciones de estado colaterales fuera del Agregado.
3.  **Desacoplamiento de Persistencia:** Queda estrictamente prohibido colocar decoradores de TypeORM (`@Entity`, `@Column`) en las clases de dominio que extienden de `@nestjslatam/ddd`. La persistencia debe resolverse exclusivamente mediante mapeadores (*Mappers*) en los adaptadores de infraestructura.

---

## 🔄 6. Siguiente Paso de Integración

*   Añadir la dependencia `@nestjslatam/ddd` al `package.json` principal del monorrepo.
*   Crear la biblioteca de abstracción interna `libs/domain/core` para exponer los bloques de construcción DDD de forma segura y controlada al resto de contextos acotados (`Identity`, `Authorization`, `Configuration`).
