# [ADR 0007](0007-observability-telemetry-loki-opentelemetry.md): Observabilidad con OpenTelemetry, Loki y Jaeger

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
Sin registros estructurados y rastreo distribuido, diagnosticar problemas en producción requiere conjeturas. Mensajes de registro sin IDs de correlación hacen imposible rastrear una íºnica petición de usuario a través de míºltiples capas de servicio (Kong -> BFF -> API Core -> Base de Datos). La observabilidad debe ser un ciudadano de primera clase, no una ocurrencia tardí­a.

## Decisión
Adoptar el estándar **OpenTelemetry (OTel)** como el espinazo unificado de observabilidad, con la siguiente cadena de herramientas:

| Seí±al | Tecnologí­a | Propósito |
| :--- | :--- | :--- |
| **Trazas** | OpenTelemetry SDK + Jaeger | Rastreo distribuido de peticiones a través de todos los niveles |
| **Logs** | Pino + Grafana Loki | Agregación y consulta de logs JSON estructurados |
| **Métricas**| Prometheus + Grafana | Métricas SRE: latencia, tasa de errores, rendimiento |

**Reglas de implementación:**

1. **Auto-instrumentación**: Las llamadas HTTP de NestJS, TypeORM y Redis se instrumentan automáticamente ví­a paquetes de auto-instrumentación de OTel ”” no se requiere la creación manual de span para flujos estándar.
2. **Enrutamiento Agnóstico al Proveedor**: La aplicación DEBE íšNICAMENTE emitir telemetrí­a neutral al proveedor hacia un **Colector OpenTelemetry** local. Cambiar los backends finales (ej., de Jaeger a Datadog, o de Loki a Elastic) requiere cambiar íšNICAMENTE la configuración YAML del Colector, con **cero modificaciones o re-despliegues** en el código fuente de la aplicación.
3. **Spans manuales**: Las operaciones significativas de negocio (ejecución de casos de uso, fallos de caché) obtienen una envoltura explí­cita con `tracer.startSpan()`.
4. **Propagación de trazas**: Todas las llamadas HTTP salientes incluyen cabeceras `traceparent` (estándar W3C Trace Context).
5. **Logs estructurados**: Cada entrada de registro incluye `traceId`, `spanId`, `tenantId` y `userId` para una correlación completa.

## Consecuencias

### Positivas
- Un íºnico `traceId` rastrea una petición desde el log del gateway Kong hasta el plan de consulta de PostgreSQL.
- Los dashboards de Grafana proporcionan visibilidad a nivel de SRE con desglose de latencia P50/P95/P99.
- Cero cambios de código en el Core de dominio ”” toda la instrumentación reside en las capas de infraestructura y adaptadores.
- **Soberaní­a Tecnológica Absoluta**: Cero bloqueo de proveedor. El protocolo OTel nos desacopla de Datadog, Dynatrace, Grafana, o cualquier proveedor comercial de forma nativa.

### Negativas
- El Colector de OTel es un componente de infraestructura adicional para desplegar y mantener.
- La creación descuidada de spans puede introducir sobrecarga de rendimiento; la auto-instrumentación debe ser perfilada.

## Referencias
- [Documentación de OpenTelemetry](https://opentelemetry.io)
- [ADR-0002: Arquitectura Hexagonal Limpia](../adrs/nodejs/0002-clean-architecture-nestjs.md)

---
[? Volver al Índice](./README.es.md)
