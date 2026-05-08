# 📄 AGENT_CONTEXT: Product Planner - UMS (User Management System)

**Documento de Gobernanza y Visión Técnica** **Autor:** Principal Software Architect  
**Iniciativa:** BeyondNet - Ecosistema Product Planner  
**Estado:** Definición Conceptual y Hoja de Ruta

---

## 1. Visión Estratégica del Producto
El **UMS** es el corazón de la suite **Product Planner**. Su propósito es centralizar la gobernanza de identidades y accesos bajo un modelo de **Arquitectura Multitenant (B2B)**. El sistema debe evolucionar de un esquema de autenticación básica hacia un modelo **Passwordless (IDP)**, garantizando que la seguridad criptográfica sea el estándar desde el primer día.

## 2. Alineación del Modelo Conceptual (Source of Truth)
Basado en el diseño de **Data Maestra**, el sistema se divide en dos grandes dominios que convergen en el nodo de **Perfiles**:

### A. Dominio de Configuración de Sistemas (Sistemas Cliente)
* **Sistemas:** Registro único de aplicaciones que consumen el UMS.
* **Parametrización:** Configuración de comportamiento específica por aplicación.
* **Capa de Interfaz:** Definición de **Plantillas** y **Menús** dinámicos que se inyectan en el cliente según el contexto del usuario.
* **Gobernanza de Accesos:** Declaración de **Roles** y **Autorizaciones** (RBAC) vinculados a la lógica de negocio de cada sistema.

### B. Dominio de Identidad y Organización (Identidad)
* **Organización:** Entidades corporativas (Tenants) que agrupan a los usuarios.
* **Usuarios:** Identidades únicas asociadas a empleados de una organización.
* **Transición de Credenciales:** Sustitución del bloque de *Contraseñas* tradicionales por **Identidades Criptográficas** (IDP Externo).

---

## 3. Análisis de Producto: Integración con Zitadel
Para acelerar el *Go-to-Market* y asegurar cumplimiento con estándares (OIDC, WebAuthn), se adopta **Zitadel** como motor de identidad.

| Capacidad | Integración con el Diseño Conceptual |
| :--- | :--- |
| **Multi-tenancy** | Mapea directamente al bloque **Organización**. Permite aislamiento total entre clientes. |
| **Passwordless** | Reemplaza el bloque de **Contraseñas** por Passkeys (criptografía de clave pública). |
| **OIDC / JWT** | Provee el token que el UMS usará para extraer el `OrgID` y `UserID` y buscar su **Perfil**. |
| **Delegación** | Permite que cada Organización gestione sus propios usuarios, liberando al equipo de BeyondNet de tareas administrativas. |

---

## 4. Hoja de Ruta Progresiva (Roadmap)

### Fase 1: Cimientos de Gobernanza (Backend UMS)
* Implementación de las tablas maestras: Sistemas, Menús, Roles y Plantillas.
* Desarrollo de la API de gestión de autorizaciones basada en el perfil.
* **Meta:** Tener la capacidad de definir qué ve un usuario antes incluso de tener el login listo.

### Fase 2: Modernización de la Identidad (IDP Setup)
* Configuración de Zitadel como proveedor de identidad oficial.
* Implementación de flujos de registro y login mediante **Passkeys**.
* Eliminación de la dependencia de hashes de contraseñas locales.

### Fase 3: Orquestación y Perfiles Dinámicos
* Integración final: El sistema de Perfiles lee los *claims* del token de Zitadel.
* Inyección de Menús y Autorizaciones en tiempo real según el binomio (Usuario + Organización).

---

## 5. Directrices para el Análisis Funcional (Instrucciones para Bmad)
Al generar Historias de Usuario o especificaciones técnicas, el agente debe observar estas reglas:

1.  **Separación de Preocupaciones:** Zitadel maneja "Quién es el usuario". Nuestro UMS maneja "Qué puede hacer" (Menús, Roles, Accesos).
2.  **Contexto Organizacional:** No existen usuarios "sueltos"; toda acción o permiso debe estar anclado a una **Organización**.
3.  **Seguridad Criptográfica:** El análisis debe ignorar flujos de "Recuperar Contraseña" tradicionales, priorizando flujos de "Registro de Dispositivo/Passkey".
4.  **Inyección Dinámica:** Las especificaciones de UI deben contemplar que el Menú se construye dinámicamente desde la Data Maestra del UMS.