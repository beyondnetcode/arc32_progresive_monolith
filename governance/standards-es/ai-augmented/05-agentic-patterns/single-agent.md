# Patrón: Agente íšnico con Herramientas (Single Agent with Tools)

El patrón más sencillo y comíºn. Un íºnico modelo envuelto por un bucle agéntico que posee acceso directo a un conjunto acotado de herramientas y memoria local del hilo de conversación.

## Cuándo Usar
- La tarea no requiere sub-tareas paralelas.
- El níºmero de herramientas es pequeí±o (< 10).
- El dominio de conocimiento está altamente concentrado.

## Flujo de Trabajo
1. El usuario enví­a el prompt.
2. El Agente selecciona la Herramienta A.
3. El Harness ejecuta la Herramienta A.
4. El Agente razona sobre el resultado.
5. El Agente entrega la respuesta final al usuario.

---
[? Volver al Índice](./README.es.md)
