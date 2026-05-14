# [ADR 0025](0025-feature-flag-provider-abstraction.md): Estrategia de Abstracción de Proveedor de Feature Flags

## Estado
Aprobado

## Fecha
2026-05-09

## Contexto
Incorporar Feature Flags introduce riesgos de bloqueo de proveedor. Codificar rí­gidamente la lógica del SDK directamente desde plataformas propietarias (Unleash, ConfigCat, LaunchDarkly) viola principios core al incrustar comportamientos no estándar directamente dentro de los casos de uso de negocio. Requerimos intercambiabilidad total de proveedores en caliente.

## Decisión
Subsumir la invocación de selectores de caracterí­sticas (feature toggles) bajo los principios clásicos de Puerto Hexagonal:

1. **Puerto Canónico**: El repositorio central define `IFeatureFlagPort`, detallando contratos de ejecución universales (`evaluate()`, `isHealthy()`) enteramente aislados de la sintaxis de librerí­as comerciales.
2. **Infraestructura Enchufable**: Confinar todos los SDKs concretos de terceros en capas de Adaptador externas explí­citas. Soportamos estrategias de respaldo internas de Postgres junto con módulos nativos de LaunchDarkly, ConfigCat o Azure simultáneamente.
3. **Resolución Dinámica**: Instanciar el adaptador del proveedor correcto ví­a inyectores de dependencia NestJS en tiempo de ejecución que miren claves de configuración activas especí­ficas.

## Consecuencias

### Positivas
- Inmunidad completa a picos de precios externos o problemas de estabilidad de la plataforma (respaldo local inmediato).
- Alta compatibilidad futura con respecto a la eventual estandarización en los esquemas openFeature de la CNCF.

### Negativas
- Costo de mantenimiento asociado al sostenimiento de míºltiples clases de adaptadores especializados orientados a diversos formatos de proveedores.

## Referencias
- [ADR-0024: Plataforma de Configuración](../adrs/core/0024-configuration-feature-management-platform.md)
- [ADR-0002: Arquitectura Hexagonal](../adrs/nodejs/0002-clean-architecture-nestjs.md)

---
[? Volver al Índice](./README.es.md)
