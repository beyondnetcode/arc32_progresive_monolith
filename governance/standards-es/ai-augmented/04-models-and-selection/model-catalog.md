# Catálogo de Modelos Autorizados (Horizonte Mayo 2026)

A continuación se presentan las íºnicas familias de LLM autorizadas por el Comité de Arquitectura para su integración en productos corporativos. Cualquier modelo no listado requiere un ticket de autorización temporal para pruebas.

## Familias Comerciales Autorizadas (Ví­a Gateway Corporativo)

### â˜ï¸ Familia Google Gemini
*   **Gemini 1.5 Pro**: Recomendado para lectura masiva de código debido a su ventana de tokens de 2M. Capacidad superior para razonamiento estructural entre repositorios.
*   **Gemini 1.5 Flash**: Recomendado para extracción barata y rápida de metadatos estructurados de imágenes o grandes volíºmenes de texto.

### â˜ï¸ Familia Anthropic Claude
*   **Claude 3.5 Sonnet**: Benchmark global actual para codificación de software nativo y llamadas deterministas a herramientas. Designado como modelo primario para IDEs y agentes locales.
*   **Claude 3.5 Haiku**: El rendimiento más rápido para clasificación con latencia inferior a un segundo.

### â˜ï¸ Familia OpenAI GPT
*   **GPT-4o**: Altamente robusto para lógica de workflows legados y llamadas complejas a funciones donde la compatibilidad nativa requiere el estándar histórico de OpenAI.
*   **o1 (Serie de Razonamiento)**: Autorizado solo para cálculos cientí­ficos o tareas intensas de optimización algorí­tmica. Bloqueado para chatbots conversacionales debido al alto costo por token de razonamiento.

## Familias Open Source / Locales Autorizadas (Autohospedadas)

### ðŸ  Serie Meta Llama 3.x
*   **Llama 3.1 70B / 405B**: Alternativa primaria para soberaní­a de datos absoluta. Debe correr en clíºsteres internos de Kubernetes/GPU (vLLM).
*   **Llama 3.1 8B**: Para runtimes en el borde (edge) o micro-agentes embebidos rápidos.

---
*Nota: Los modelos listados aquí­ se derivan de tablas de clasificación estándar de la industria y superan nuestros benchmarks internos de RPT (Reasoning Per Token).*

---
[? Volver al Índice](./README.es.md)
