# Seguridad en MCP: Permisos y Guardrails

Conectar un motor de inferencia no determinista (LLM) directamente con tus APIs de backend introduce nuevos vectores de ataque. Un agente "convencido" ví­a jailbreak puede intentar abusar de sus herramientas. Por lo tanto, la seguridad en el harness MCP no es negociable.

## Modelo de Mí­nimo Privilegio
Aplicar el principio de menor privilegio a nivel de Herramientas:

*   **Separación por Rol:** Un agente de reportes de BI NUNCA debe recibir acceso a un Servidor MCP que exponga herramientas de escritura (`DELETE`, `UPDATE`).
*   **Alcances Dinámicos:** El harness debe filtrar el catálogo de herramientas inyectado en el LLM basándose en la identidad del usuario final que está operando a través del agente.

## Guardrails Obligatorios para Producción

Para que un Servidor MCP sea aprobado por Seguridad Corporativa, debe implementar:

1.  **Autenticación Robusta:** 
    *   Si se usa HTTP/SSE, validación de tokens mTLS o tokens Bearer de corta duración (OAuth2).
    *   No confiar en la seguridad por oscuridad dentro de la red interna.
2.  **Log de Auditorí­a Irrevocable:** 
    *   Cada petición `CallTool` debe registrarse en una base de datos inmutable con: `timestamp`, `agent_id`, `human_user_id`, `tool_name`, `input_arguments` y `response_hash`.
3.  **Limitación de Tasa Adaptativa (Rate Limiting):**
    *   Limitar no solo peticiones/segundo, sino el costo financiero acumulado (ej., no más de $10 USD en llamadas a APIs geolocalizadas por agente por hora).
4.  **Sandbox de Ejecución:**
    *   Las herramientas que permitan la ejecución de scripts, queries SQL en bruto o comandos del sistema DEBEN correr en contenedores efí­meros (Docker/gVisor) con acceso de red estrictamente bloqueado o con lista blanca (whitelisted).

## La Gran Advertencia de Veracidad

> [!CAUTION]
> **El modelo no valida la verdad.** El LLM asume que CUALQUIER RESPUESTA devuelta por una herramienta es la verdad absoluta y construirá su razonamiento sobre ella.
> Si un atacante compromete tu Servidor MCP para que devuelva datos falsos, engaí±ará instantáneamente a tu Agente. La integridad de los datos de salida de la herramienta es tan importante como la sanitización de la entrada.

## Human-in-the-Loop Obligatorio
Cualquier herramienta categorizada como **"Destructiva"** (Borrar base de datos, cancelar suscripción masiva, ejecutar pago por lote) requiere que el harness intercepte la llamada, establezca el estado en `PENDING_APPROVAL` (Pendiente de Aprobación) y espere a que un humano haga clic fí­sicamente en un botón antes de ejecutar el código del backend.

---
[? Volver al Índice](./README.es.md)
