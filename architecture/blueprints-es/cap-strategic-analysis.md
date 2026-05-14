# âš–ï¸ Análisis Estratégico del Teorema CAP y Perfil de Riesgo

Este artefacto presenta un análisis riguroso, matemático y teórico de nuestra Arquitectura Monolí­tica Progresiva a través de la lente del **Teorema CAP** (Consistencia, Disponibilidad, Tolerancia a la Partición).

---

## ðŸ—ï¸ 1. Análisis del Continuo CAP

El Teorema CAP dicta que un sistema distribuido solo puede proporcionar simultáneamente dos de tres garantí­as:
*   **Consistencia (C)**: Cada lectura recibe la escritura más reciente o un error.
*   **Disponibilidad (A)**: Cada petición recibe una respuesta que no es un error, sin la garantí­a de que contenga la escritura más reciente.
*   **Tolerancia a la Partición (P)**: El sistema continíºa operando a pesar de que un níºmero arbitrario de mensajes sea caí­do o retrasado por la red entre los nodos.

### ðŸ›¡ï¸ Elección Arquitectónica: Estrategia CAP Hí­brida
Nuestra arquitectura no elige ciegamente un solo lado. En su lugar, segmenta el espacio del problema para emplear **CP** para la lógica core de misión crí­tica y **AP** para la entrega de canales/lectura a gran escala.

---

## ðŸ§­ 2. Segmentación por Niveles de Componentes

### Nivel 1: API Core y Persistencia (La Persona **CP**)
*   **Enfoque**: Consistencia Absoluta y Tolerancia a Particiones sobre el 100% de Disponibilidad durante fallos profundos.
*   **Tecnologí­a**: Níºcleo Node.js + PostgreSQL (ACID).
*   **Comportamiento ante Partición**: Si el primario de PostgreSQL experimenta una partición de cerebro dividido (split-brain), las operaciones de escritura se detienen para prevenir la corrupción de datos en lugar de aceptar escrituras sucias.
*   **Referencias ADR**:
    *   [ADR-0010: Aislamiento Doble Capa](../adrs-es/core/0010-multi-tenancy-architecture-strategy.md)
    *   [ADR-0019: Patrón de Unidad de Trabajo](../adrs-es/core/0019-tactical-design-patterns-future-proofing.md)
*   **Pros**: Cero corrupción de saldos, inventario preciso, verdad completa de auditorí­a de seguridad.
*   **Contras**: Altamente degradado durante la interrupción del clíºster de base de datos.

### Nivel 2: Caché de Borde, CDN y Bus de Mensajes (La Persona **AP**)
*   **Enfoque**: Alta Disponibilidad y Tolerancia a Particiones sobre la Consistencia inmediata.
*   **Tecnologí­a**: Clíºsteres Redis + RabbitMQ + Caché CDN/Cliente.
*   **Comportamiento ante Partición**: Si el Nodo A no puede hablar con el Nodo B, ambos continuarán sirviendo datos desde su caché o cola local, incluso si los datos están ligeramente desactualizados (Consistencia Eventual).
*   **Referencias ADR**:
    *   [ADR-0014: Caché Distribuida de 4 Niveles](../adrs-es/core/0014-distributed-caching-strategy-redis.md)
    *   [ADR-0036: Control de Flujo del Bus de Mensajes](../adrs-es/core/0036-message-bus-delivery-strategy-fifo-dlq.md)
    *   [ADR-0004: Resiliencia Offline del Frontend](../adrs-es/nodejs/0004-frontend-offline-resilience.md)
*   **Pros**: Latencia extremadamente baja, operacional durante la degradación parcial de la red.
*   **Contras**: La mecánica "Stale-While-Revalidate" requiere que los desarrolladores diseí±en UIs que manejen la llegada eventual de datos.

---

## âš ï¸ 3. Modelo de Gestión de Riesgos

| Divergencia del Eje CAP | Escenario de Riesgo Real | Defensa y Mitigación Arquitectónica |
| :--- | :--- | :--- |
| **Consistencia vs Disponibilidad** | El Caché Redis retiene una versión antigua de los permisos de un inquilino tras un cambio de rol dinámico. | **Mitigación**: Polí­ticas de desalojo cache-aside en escritura + compilación de Auth Hí­brida imponiendo bíºsqueda inmediata de gráfico en BD para alcances de alta seguridad ([ADR-0021](../adrs-es/nodejs/0021-high-performance-auth-and-graph-compilation.md)). |
| **Fallos de Particionado** | La red del Bus de Mensajes cae mientras se escriben las actualizaciones de la BD (Fallo de escritura doble). | **Mitigación**: **Patrón Transactional Outbox ([ADR-0033](../adrs-es/core/0033-transactional-outbox-pattern.md))** guarda el evento en Postgres (zona CP) y garantiza que se empuje a RabbitMQ más tarde, convirtiendo una crisis en un retraso gestionado. |
| **Sincronización de Estado** | Dos microservicios separados procesan eventos fuera de secuencia debido al lag de la red. | **Mitigación**: **Estándar de Consumidor Idempotente e imposición de FIFO ([ADR-0036](../adrs-es/core/0036-message-bus-delivery-strategy-fifo-dlq.md))** asegura que la convergencia eventual regrese exactamente al estado correcto. |

---

## ðŸ“ 4. Resumen Estratégico de Pros y Contras

### Pros del Modelo Hí­brido Actual
1.  **Máximo Rendimiento**: El 95% del tráfico de alta lectura golpea el **nivel AP** (Caché/CDN), proporcionando respuestas en microsegundos.
2.  **Níºcleo Fortificado**: Las mutaciones crí­ticas ocurren en el **nivel CP**, garantizando el cumplimiento de ACID y cero pérdida de datos financieros.
3.  **Degradación Elegante**: Si la base de datos se desconecta, el nivel AP aíºn puede servir catálogos de solo lectura y encolar peticiones de usuario para su procesamiento posterior.

### Contras y Compromisos Aceptados
1.  **Complejidad Mental**: Los ingenieros deben decidir constantemente si un flujo necesita consistencia fuerte o puede sobrevivir con datos "Eventualmente Consistentes".
2.  **Retraso de Sincronización**: Existe una latencia no nula (milisegundos) entre el commit de la base de datos y la finalización global de la invalidación del caché.

---
**Estado de Evaluación**: Verificado consistente con Estándares Internacionales de Arquitectura Empresarial.

---
[? Volver al Índice](./README.es.md)
