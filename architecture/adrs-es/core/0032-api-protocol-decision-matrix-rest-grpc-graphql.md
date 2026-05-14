# [ADR 0032](0032-api-protocol-decision-matrix-rest-grpc-graphql.md): Matriz de Selección de Protocolo de API (REST vs gRPC vs GraphQL)

## Estado
Aprobado

## Fecha
2026-05-11

## Contexto
A medida que el monolito modular evoluciona hacia un ecosistema multi-módulo con míºltiples BFFs (Backend For Frontends), apps móviles e integraciones corporativas externas, la selección del protocolo de comunicación correcto para cada ruta de interacción es crí­tica. Emplear una estrategia de "talla íºnica" conduce a un tráfico interno con bajo rendimiento (REST) o a clientes de navegador excesivamente complejos (gRPC/Protobuf). Necesitamos un marco decisivo que guí­e a los desarrolladores sobre qué protocolo exacto adoptar en función del lí­mite de interacción y del tipo de consumidor.

## Decisión
Establecemos una **Matriz de Ajuste de Protocolo Estricta** adaptada a niveles arquitectónicos especí­ficos:

### 1. Comunicación Interna Servicio-a-Servicio
ðŸ“œ **MANDATO: gRPC (Protocol Buffers sobre HTTP/2)**
*   **Alcance**: Llamadas sí­ncronas entre contextos delimitados internos (ej., el contexto de Pedidos validando la autorización del usuario con el contexto de Identidad).
*   **Razón fundamental**: Alto rendimiento, la serialización binaria colapsa el uso del ancho de banda, y seguridad de tipos estricta a través de contratos `.proto` unificados.

### 2. Integración Externa y Terceros Píºblicos
ðŸ“œ **MANDATO: REST (JSON sobre HTTPS)**
*   **Alcance**: Integraciones de clientes externos, conexiones de gateways corporativos legacy, y APIs píºblicas globales para desarrolladores.
*   **Razón fundamental**: Universalidad en la industria, consumo trivial ví­a librerí­as HTTP estándar, depuración/pruebas más sencillas, y documentación interactiva amplia (OpenAPI/Swagger).

### 3. Portales Frontend y Orquestación de BFF Dinámica
ðŸ“œ **MANDATO: REST (Primario) / GraphQL (Enriquecimiento Dirigido)**
*   **Flujos Estándar**: Por defecto a APIs REST convencionales para comandos transaccionales (Crear/Actualizar).
*   **Escenarios de Lectura Ricos/Anidados**: Adoptar **GraphQL** estrictamente al nivel de BFF NestJS cuando una pantalla requiera agregación de datos compleja (obtener Entidades, Taxonomí­as asociadas, Auditorí­as y relaciones simultáneamente) para prevenir el over-fetching móvil/web y los míºltiples roundtrips secuenciales.

### írbol de Decisión de Selección

| Escenario | Protocolo Preferido | Justificación |
| :--- | :--- | :--- |
| **Máquina-a-Máquina (Interno)** | **gRPC** | Baja latencia, compactación binaria, fuertemente tipado. |
| **Cargas/Streams de Archivos** | **gRPC / REST** | Capacidad de streaming nativa o multipart simple. |
| **Open API Píºblica / Docs Desarrollador** | **REST** | Estándar absoluto, adopción de proveedores más fácil. |
| **Tableros Agregados de Alta Densidad** | **GraphQL** | Resuelve el under-fetching / bíºsquedas recursivas. |
| **Recuperación de Datos Móviles Bajo Consumo**| **GraphQL** | El cliente define estrictamente la forma de los datos hasta el bit. |
| **CRUD Estándar (Guardar Usuario, Borrar Tarea)**| **REST** | Cacheabilidad predecible, semántica HTTP nativa. |

## Directrices de Arquitectura
- **Aislamiento de GraphQL**: La lógica de tiempo de ejecución de GraphQL DEBE existir solo dentro de los nodos de aplicación BFF del Tier-2. Las definiciones de API de dominio core nunca soportan nativamente resolutores de GraphQL para evitar la fuga de restricciones especí­ficas de la vista hacia la lógica de negocio del dominio.
- **Centralización de Protobuf**: Todos los esquemas de servicios gRPC internos (.proto) se alojan y versionan en un espacio de trabajo unificado `libs/contracts` para evitar modelos de interfaz con deriva (drift).

## Consecuencias

### Positivas
- La aplicación correcta de herramientas optimiza la huella de red general.
- Empodera la velocidad del frontend permitiendo actualizaciones dinámicas de consultas de vista sin forzar ciclos de despliegue del backend (ví­a GraphQL).
- Asegura la máxima escalabilidad para interconexiones de microservicios ví­a conductos binarios multiplexados.

### Negativas
- Los desarrolladores deben navegar por tres ecosistemas de protocolos concurrentes.
- Introduce costos de configuración para capas de ejecución GraphQL y herramientas de gobernanza de esquemas dentro de los stacks BFF.

## Referencias
- [ADR-0027: Estrategia de Protocolo Dual](../adrs/nodejs/0027-dual-protocol-rest-grpc-api-gateway.md)
- [ADR-0030: Patrones de Gateway de Dos Capas](../adrs/core/0030-api-gateway-kong-vs-nestjs.md)

---
[? Volver al Índice](./README.es.md)
