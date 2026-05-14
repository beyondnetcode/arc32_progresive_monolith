# ADR-AI-003: Criterios de selección y gobernanza para modelos de lenguaje

*   **Estado:** Propuesto
*   **Fecha:** 2026-05-11

## Contexto
El uso no gobernado de modelos de lenguaje (LLMs) introduce riesgos sistémicos: fugas masivas de privacidad si se cargan datos a APIs píºblicas gratuitas, dependencia de un íºnico proveedor que puede duplicar precios sin previo aviso, y uso indiscriminado de modelos costosos para tareas computacionalmente triviales.

## Decisión
Adoptar un modelo de gobernanza hí­brido:
1.  **OSS Autohospedado (Llama 3.x, etc.) como primera opción** para tareas internas que no requieran razonamiento crí­tico superior ni procesen PII pura.
2.  **APIs Comerciales Federadas (AWS Bedrock, Azure AI) íšNICAMENTE si existe un DPA firmado** que prohí­ba el reentrenamiento del modelo con nuestros datos.
3.  Uso del **Catálogo de Modelos Oficial**, clasificando los modelos en Tiers (Large, Flash, Local) y asignándolos segíºn la complejidad de la tarea para optimizar costos.

## Alternativas Consideradas
*   **Libertad Total de Equipos:** Rechazada de plano por los auditores legales debido al riesgo irrecuperable de filtración de datos de clientes.
*   **Proveedor Corporativo íšnico (ej. Solo OpenAI):** Descartado para evitar Vendor Lock-In en caí­das prolongadas de servicio; preferimos estrategia multi-cloud agnóstica ví­a adaptadores unificados.

## Consecuencias
*   âœ… **Blindaje Legal:** Cumplimiento garantizado de regulaciones de privacidad.
*   âœ… **Eficiencia Financiera:** Reducción del 30-40% en gasto de tokens al forzar el uso de modelos pequeí±os para tareas no crí­ticas.
*   âŒ **Mayor Latencia Inicial:** El bootstrapping de clusters de inferencia local para OSS requiere tiempo de configuración de infraestructura GPU inicial.

---
[? Volver al Índice](./README.es.md)
