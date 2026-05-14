# [ADR 0013](0013-cloud-infrastructure-topology-dr.md): Topologí­a de Infraestructura Cloud y Recuperación ante Desastres (DR)

## Estado
Aprobado

## Fecha
2026-05-08

## Contexto
Las operaciones de negocio manejadas por esta arquitectura demandan una estabilidad de ejecución continua las 24 horas del dí­a, los 7 dí­as de la semana. El fallo de un componente del centro de datos o un apagón amplio de una zona de disponibilidad no pueden dejar fuera de lí­nea el procesamiento de la ruta crí­tica operativa durante horas manuales. Nuestro plan de distribución a través de las topologí­as de nube objetivo requiere definiciones de polí­tica explí­citas.

## Decisión
Diseí±ar la topologí­a de infraestructura apuntando a patrones Cloud-Native que impongan alta resiliencia y potencial de failover instantáneo:

1. **Orquestación Automatizada**: El despliegue evoluciona por fase arquitectónica. Mientras que la Fase 1 exige solo contenedores OCI estándar sobre cómputo simple (VMs, Compose), el despliegue en plataformas de clíºster gestionadas capaces de HPA se activa estrictamente a partir de la Fase 3.
2. **Estrategia Multi-AZ**: La operación estándar ocurre de forma activo-activo a través de varias Zonas de Disponibilidad (Availability Zones) explí­citas. Una región de respaldo secundaria permanece en warm-standby para un pivot de desastre inmediato.
3. **Entrada de Red Global**: Desplegar un punto unificado de ingreso externo (ej. Cloudflare/Azure Front Door) para analizar la salud y realizar redirección de enrutamiento instantánea entre regiones si se detecta degradación del clíºster local.

## Consecuencias

### Positivas
- Preserva los compromisos de tiempo de actividad (uptime) sin interrupciones para las cadenas operativas corporativas globales.
- Mitiga el daí±o potencial de interrupciones estructurales o de zonas de proveedores.

### Negativas
- La distribución Activo-Activo duplica matemáticamente los costos de ejecución de infraestructura.
- Requiere pipelines CI/CD sofisticados diseí±ados para configuraciones de orquestación de míºltiples objetivos.

## Referencias
- [ADR-0011: Tolerancia a Fallos](../adrs/core/0011-fault-tolerance-resiliency-patterns.md)
- [ADR-0028: Estrategia Hí­brida Autohospedada](../adrs/core/0028-self-hosted-hybrid-infrastructure-on-premise.md)

---
[? Volver al Índice](./README.es.md)
