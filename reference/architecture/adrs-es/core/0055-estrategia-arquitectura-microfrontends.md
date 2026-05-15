# ADR-0055: Estrategia de Arquitectura de Microfrontends

## Estado
Propuesto (Preparación para Fase 3)

## Contexto
La arquitectura de Monolito Progresivo se centra en la modularidad del backend y la eventual distribución de servicios. Sin embargo, a medida que el sistema alcanza la Fase 3 (Servicios Distribuidos), la aplicación frontend monolítica puede enfrentar desafíos similares:
* **Contención de Despliegue**: Múltiples equipos necesitando desplegar cambios en la misma UI monolítica.
* **Bloqueo Tecnológico**: Dificultad para actualizar partes de la UI a versiones más recientes de frameworks.
* **Complejidad de Escala**: Un solo bundle grande se vuelve difícil de gestionar y optimizar.

## Decisión
Adoptaremos una estrategia de **Microfrontends (MFE)** específicamente para sistemas que entren en la **Fase 3+**.

### Principios Clave:
1. **Propiedad Vertical**: Los equipos que poseen un servicio de dominio backend también deben poseer el fragmento de UI correspondiente.
2. **Integración en Tiempo de Ejecución**: Usar **Module Federation** (Vite o Webpack 5) como mecanismo principal de integración para permitir despliegues independientes sin recargas de página.
3. **Sistema de Diseño Compartido**: Todos los MFEs DEBEN utilizar el sistema de diseño corporativo (Variables CSS, Componentes Compartidos) para asegurar la consistencia visual.
4. **Alineación con BFF**: Cada MFE de cara al cliente debe comunicarse a través de su BFF (Backend-for-Frontend) específico o un Gateway unificado.

### Disparadores de Extracción (Cuándo pasar a MFEs):
* El tamaño del equipo supera los 15-20 desarrolladores frontend.
* La frecuencia de despliegue de módulos específicos supera la tolerancia del ciclo de lanzamiento principal.
* Requisito de ciclos de vida tecnológicos independientes en secciones aisladas de la UI.

## Consecuencias
* **Positivo**: Desplegabilidad independiente, opciones tecnológicas localizadas, mayor autonomía del equipo.
* **Negativo**: Mayor complejidad de infraestructura (pipelines de CI/CD por MFE), riesgo de inconsistencia visual si se ignora el sistema de diseño, sobrecarga inicial en la configuración del orquestador.
* **Neutral**: Requiere una aplicación "Shell" u "Orquestador" centralizada para gestionar el enrutamiento y el estado compartido.
