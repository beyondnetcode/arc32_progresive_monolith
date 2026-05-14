# ADR-AI-002: MCP como protocolo estándar para la integración agente-servicio

*   **Estado:** Propuesto
*   **Fecha:** 2026-05-11

## Contexto
A medida que los agentes de IA deben interactuar con los servicios de inventario, facturación y logí­stica de la compaí±í­a, surge la necesidad de definir una interfaz comíºn. Sin un estándar, cada equipo de producto implementa su propia pegamento propietario (wrappers personalizados) para exponer endpoints REST a sus agentes, dificultando la reutilización inter-departamental y la auditorí­a centralizada.

## Decisión
Se aprueba el **Model Context Protocol (MCP)** como la capa de integración estandarizada para conectar servicios de backend con cualquier agente autónomo o entorno de desarrollo aumentado por IA. Los dominios que deseen "servir" datos a agentes corporativos DEBEN construir y exponer un **Servidor MCP**.

## Alternativas Consideradas
*   **REST Directo + RAG Dinámico:** Requiere código manual para cada conector y sufre de falta de un catálogo de herramientas estandarizado y tipado para los modelos.
*   **SDK Propietario de Proveedor:** (ej. usar solo plugins de Semantic Kernel). Nos ata a un stack especí­fico y limita el uso de herramientas IDE agénticas modernas (como Claude o Cursor) que son MCP-First.
*   **gRPC para Llamada a Herramientas:** Excesivamente pesado para orquestadores agénticos basados en JSON y carece del ecosistema maduro de hosts MCP.

## Consecuencias y Trade-offs
*   âœ… **Interoperabilidad Directa:** El mismo Servidor MCP sirve simultáneamente para potenciar tanto el IDE del desarrollador como el Agente del CRM.
*   âœ… **Seguridad Unificada:** Facilita la creación de Gateways que auditan llamadas a herramientas en un formato íºnico universal.
*   âš ï¸ **Trade-off:** Exige aí±adir una envoltura de transporte (Stdio o SSE) a microservicios que tradicionalmente solo eran REST/gRPC.

## Referencias
*   Especificación Oficial de MCP: https://modelcontextprotocol.io

---
[? Volver al Índice](./README.es.md)
