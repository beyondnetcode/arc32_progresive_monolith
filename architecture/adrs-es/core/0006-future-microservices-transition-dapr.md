# [ADR 0006](0006-future-microservices-transition-dapr.md): Transición Futura a Microservicios con Sidecars Dapr

## Estado
Aprobado ”” Backlog (Hito de Fase 3)

## Fecha
2026-05-08

## Contexto
El sistema es actualmente un Monolito Modular (un solo proceso, contextos delimitados lógicamente aislados). A medida que los requisitos de negocio escalen ””mayor tráfico, ciclos de despliegue independientes o integración de servicios polí­glotas”” se requiere un camino claro y seguro hacia los microservicios. La transición no debe requerir la reescritura de ninguna lógica de dominio.

## Decisión
Adoptar **Dapr (Distributed Application Runtime)** como el runtime sidecar de microservicios cuando se divida el monolito en servicios independientes.

**Hitos de migración:**

| Hito | Descripción |
| :--- | :--- |
| **M1 ”” Monolito Modular** | Estado actual. Proceso íºnico con módulos de contexto delimitado aislados. |
| **M2 ”” Extracción de Servicios** | Contextos de alto tráfico o desplegables independientemente extraí­dos como microproyectos Nx. Se activa bajo las reglas en [ADR-0045](../core/0045-microservice-extraction-readiness-criteria.md). |
| **M3 ”” Malla Completa (Full Mesh)** | Estado avanzado del ecosistema donde la interacción a nivel de infraestructura utiliza la abstracción de Sidecar. |

### ðŸš¦ Puerta de Decisión de Dapr (Activation Gate)
Para prevenir el over-engineering prematuro, los Sidecars de Dapr **NO** están activos por defecto en el Hito 2. La organización operará inicialmente mediante despliegues Kubernetes puros utilizando comunicación gRPC explí­cita entre servicios. La activación de Dapr está condicionada a:
- El conjunto total de servicios extraí­dos supera los cinco (5).
- O BIEN: Se exige reintento automático / circuit breaking transparente avanzado que exceda la capacidad del cliente estándar.
- O BIEN: Integración polí­glota que requiere abstracción Pub/Sub uniforme (cargas Go/Python).

### ðŸª¢ Mecánica del Patrón Strangler Fig ví­a Kong
La evolución utiliza el **Patrón Strangler Fig** aprovechando el API Gateway de borde existente (Kong) para gobernar el desví­o gradual de tráfico desde endpoints legados hacia micro-unidades extraí­das sin modificar el monolito:

```yaml
# Ejemplo de Enrutamiento Strangler Estándar en Kong
routes:
  - name: facturacion-nuevo-servicio
    paths: ["/api/v2/billing"]      # Versión de servicio nuevo objetivo
    service: billing-service
  - name: facturacion-legado
    paths: ["/api/billing"]         # Ruta retirada gradualmente en monolito
    service: core-monolith
```

**Restricción clave:** El Core de dominio debe cambiar **cero lí­neas** cuando se introduzca Dapr. Todas las llamadas al SDK de Dapr se envuelven detrás de las abstracciones existentes `IEventBusPort` e `ICachePort` ([ADR-0015](0015-event-driven-architecture-intra-domain.md), [ADR-0014](0014-distributed-caching-strategy-redis.md)).

## Consecuencias

### Positivas
- Arquitectura polí­glota: otros servicios pueden escribirse en Go o Python mientras comparten las capacidades de Dapr.
- El intercambio de infraestructura (Redis -> Kafka, PostgreSQL -> Cosmos DB) solo requiere un cambio de YAML en el componente Dapr.
- Polí­ticas nativas de reintento, circuit breakers y trazado distribuido integrados en el sidecar de Dapr.

### Negativas
- Aí±ade Kubernetes/orquestación de contenedores como un prerrequisito para la fase de malla completa.
- El desarrollo local con Dapr aí±ade una sobrecarga de proceso sidecar por servicio.

---

## âž• Addenda: Integración de Observabilidad (Dapr + App)
Con la introducción de Dapr en fases avanzadas, se formalizan los siguientes mandatos de observabilidad para evitar duplicidad de hilos de correlación:
1. **Cero SDKs en Core**: La instrumentación de Dapr en la lógica de dominio debe invocarse EXCLUSIVAMENTE a través del sidecar HTTP/gRPC, nunca importando el SDK nativo de Dapr en capas de dominio.
2. **Unificación TraceContext**: El identificador de correlación manual pre-Dapr (`x-correlation-id`) debe converger con el estándar W3C TraceContext (`traceparent`) inyectado automáticamente por Dapr, gobernado por el **[ADR-0046](0046-dapr-observabilidad-unificada.md)**.
3. **Exportación Centralizada**: Ambas fuentes de telemetrí­a (Sidecar + App) deben utilizar el recolector OpenTelemetry unificado para garantizar vistas de traza de extremo a extremo coherentes.

## Referencias
- [ADR-0015: Arquitectura Dirigida por Eventos](../adrs/core/0015-event-driven-architecture-intra-domain.md)
- [ADR-0031: Esquema por Contexto y Catálogo de Eventos de Dominio](../adrs/core/0031-schema-per-context-domain-event-catalog.md)
- [ADR-0046: Observabilidad Unificada Dapr](./0046-dapr-observabilidad-unificada.md)
- [Documentación de Dapr](https://dapr.io)

---
[? Volver al Índice](./README.es.md)
