# [ADR 0023](0023-centralized-TODO-vs-decentralized-access.md): Estrategia de Níºcleo de Autorización Centralizado

## Estado
Aprobado

## Fecha
2026-05-09

## Contexto
Los clíºsteres de plataformas empresariales sufren de silos de identidad inconexos. Repartir la verificación de roles a través de las aplicaciones aguas abajo invita a una imposición de polí­ticas fragmentada, agujeros de seguridad ocultos, una latencia administrativa masiva y una auditabilidad legal fragmentada. Requerimos un "kernel" de autorización consolidado.

## Decisión
Comprometerse a construir y desplegar el sistema como el **Níºcleo de Autorización Centralizado** que sirve a todas las herramientas de la compaí±í­a satélites:

1. **Consolidación de Kernel**: Centralizar la responsabilidad de analizar identidades, agregar árboles de roles activos y ejecutar puertas lógicas en un íºnico dominio altamente endurecido (hardened).
2. **Entrega Desacoplada**: Retener la abstracción funcional: la validación de identidad (encontrar *quién*) se mantiene desacoplada de la compilación de autorización lógica (conceder *qué*), delegada limpiamente a través de capas de inyección de Estrategia establecidas.
3. **Salida Multi-Proyección**: Producir cargas íºtiles canónicas de permisos formateadas al vuelo ya sea en árboles JSON pesados para el renderizado de portales o en conjuntos de claims JWT comprimidos eficientes para la verificación interna de microservicios.
4. **Velocidad Masiva**: Anclar la estabilidad de recuperación sobre clíºsteres de Redis Distribuidos ejecutando resoluciones de permisos bajo **presupuestos de latencia total <5ms**.

## Consecuencias

### Positivas
- Separación de preocupaciones (SoC) absoluta. Las aplicaciones aguas abajo se enfocan solo en el flujo de negocio, dejando la seguridad de autenticación al kernel consolidado.
- Registro de gobernanza singular y autoritativo de todos los accesos al sistema y mutaciones de privilegios.
- Velocidades de respuesta excepcionales ví­a almacenamiento en caché Distribuido de Míºltiples Capas.

### Negativas
- Forma un punto íºnico de fallo arquitectónico si no se escala fuertemente y se hace redundante a través de clíºsteres de zona.

## Referencias
- [ADR-0021: Grafo de Autorización de Alto Rendimiento](../adrs/nodejs/0021-high-performance-auth-and-graph-compilation.md)
- [ADR-0022: Autorización Contextual y Proyecciones](../adrs/nodejs/0022-contextual-auth-and-pluggable-projections.md)

---
[? Volver al Índice](./README.es.md)
