# [ADR 0016](0016-immutable-business-audit-trail.md): Pista de Auditorí­a de Negocio Inmutable y Rastreo de Cambios

## Estado
Aprobado

## Fecha
2026-05-09

## Contexto
Las operaciones reguladas requieren una trazabilidad absoluta. Simplemente capturar el estado final de las entidades no es suficiente para propósitos forenses o de auditorí­a; debemos detectar con precisión *quién* cambió los datos, *cuándo*, desde *qué* vector de red, y registrando diferenciales exactos de los valores de *antes* y *después*.

## Decisión
Desplegar una **Estrategia de Auditorí­a Hí­brida** equilibrando la lectura directa performante con el archivado histórico profundo:

1. **Capa de Metadatos (Nivel de Fila)**: Las entidades fí­sicas heredan columnas de auditorí­a persistentes estándar: `created_at`, `created_by`, `updated_at`, `updated_by`, y un entero `version` para el rastreo de concurrencia.
2. **Capa de Libro Mayor (Deltas de Aplicación)**: Los manejadores de comandos de la aplicación generan eventos a nivel de aplicación que reenví­an paquetes JSON estructurados con los valores antiguos/nuevos directamente hacia el conector de infraestructura de auditorí­a.
3. **Persistencia Permanente**: Escribir los registros finales resueltos del libro mayor hacia un objetivo de "solo adición" (append-only). Aplicar triggers de base de datos que sobrescriban directamente el motor fí­sico de la BD para lanzar excepciones de bloqueo sobre cualquier usuario genérico SQL que intente acciones de `DELETE` o `UPDATE` contra los archivos de auditorí­a actuales.

## Consecuencias

### Positivas
- Beneficio dual: visibilidad local superrápida del íºltimo modificador, más capacidad absoluta de repetición legal desde el libro mayor de solo adición.
- Elimina el acoplamiento de triggers del proveedor al manejar la agregación de intenciones dentro del flujo de la aplicación.

### Negativas
- Se requiere rigor del desarrollador para asegurar que todas las operaciones de escritura se enganchen fielmente a los disparadores de despacho de auditorí­a.
- La huella de almacenamiento fí­sico se expande linealmente indefinidamente a través de continuas adiciones; los archivados eventualmente requerirán polí­ticas de rotación de ciclo de vida.

## Referencias
- [ADR-0031: Catálogo de Eventos de Dominio](../adrs/core/0031-schema-per-context-domain-event-catalog.md)
- [ADR-0015: Arquitectura Dirigida por Eventos](../adrs/core/0015-event-driven-architecture-intra-domain.md)

---
[? Volver al Índice](./README.es.md)
