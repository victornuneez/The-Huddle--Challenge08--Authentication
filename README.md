# Advanced Auth & Security Shield 🛡️

Este proyecto es un **Sistema de Autenticación Híbrido** de grado profesional desarrollado con Node.js y Express. Se enfoca en la implementación de "Defensa en Profundidad" para mitigar las vulnerabilidades más comunes del **OWASP Top 10**.

## 🎯 Propósito del Proyecto
Demostrar la implementación de estándares de seguridad modernos, combinando la flexibilidad de los tokens con la robustez de las sesiones tradicionales, protegiendo la integridad de los datos del usuario en cada capa.

## 🚀 Características de Seguridad

### 1. Autenticación Híbrida
El sistema permite gestionar la identidad del usuario mediante dos mecanismos coordinados:
* **Stateless JWT:** Uso de Access Tokens de corta vida y Refresh Tokens gestionados para sesiones modernas.
* **Stateful Sessions:** Implementación de `express-session` con almacenamiento persistente en disco (`session-file-store`).

### 2. Capas de Protección Avanzada
* **Protección CSRF:** Validación de tokens para prevenir ataques de falsificación de peticiones en sesiones basadas en cookies.
* **Mitigación de XSS:** Middleware personalizado de "escape" que sanitiza todas las entradas de texto (`username`, `email`, `password`) antes de ser procesadas.
* **Rate Limiting:** Protección contra ataques de fuerza bruta en el endpoint de login mediante limitación de intentos por ventana de tiempo.
* **Seguridad de Cabeceras:** Uso de `Helmet.js` para configurar automáticamente cabeceras HTTP seguras.

### 3. Autorización y Roles (RBAC)
* Sistema de **Role-Based Access Control** que restringe el acceso a rutas críticas (como eliminación de usuarios) exclusivamente a perfiles con rol `admin`.

## 🛠️ Stack Tecnológico
* **Runtime:** Node.js
* **Framework:** Express.js
* **Criptografía:** Bcrypt (hashing de contraseñas con Salt Rounds).
* **Tokens:** JSON Web Tokens (JWT).
* **Base de Datos:** Persistencia local mediante `db-local` (Schema-based).

## 📂 Estructura del Proyecto
middlewares/: Contiene los "guardias" de seguridad (JWT, CSRF, XSS filter, Role Guard).

controller/: Lógica de negocio para autenticación y administración.

routes/: Definición de endpoints protegidos y públicos.

models/: Repositorio de datos y esquemas de usuario.

utils/: Herramientas de ayuda para manejo de cookies y generación de tokens.

## ⚙️ Configuración del Entorno

Para ejecutar este proyecto localmente, crea un archivo `.env` en la raíz con las siguientes variables:

```env
PORT=3000
SECRET_JWT_KEY=tu_clave_secreta_super_larga_aqui
NODE_ENV=development 
