## Configuración del Entorno Local
Este documento proporciona instrucciones paso a paso para configurar y ejecutar la aplicación en un entorno local.

Requisitos Previos

- Node.js (versión recomendada: 16.x o superior)
- PostgreSQL
- Una cuenta en GitHub (para autenticación OAuth)

### Instalación
- Instalar dependencias
```bash
$ npm install
```
- Crear archivo .env.local en la raiz y generar hash Next Auth Secret
```bash
$ openssl rand -base64 32
```
- Configurar Github como proveedor OAuth
- ir a github, developer settings, OAuth Apps y crear una nueva OAuth App
```bash
  Homepage URL
  http://localhost:3000

  Authorization callback URL
  http://localhost:3000/api/auth/callback/github
```
- Copiar la llave Client secret en la variable de entorno AUTH_GITHUB_SECRET
- Copiar el Client ID en la variable de entorno AUTH_GITHUB_ID

- Database: para crear la base de datos en PostgreSQL debemos crear el archivo .env con la cadena de conexion
```bash
$ DATABASE_URL=postgresql://[user]:[password]@[server]:5432/postgres
```

- Ejecutar migraciones
 ```bash
$ npx prima migrate 
$ npx prisma generate  
# Seed the database
$ npx prisma db seed
``` 

- Ejecutar pruebas:  
```bash
$  npm run test
```
- Ejecutar app en modo desarrollo
```bash
$  npm run dev
```

## Prueba Técnica para Desarrollador Fullstack

### Introducción

El objetivo de esta prueba técnica es evaluar tus habilidades en el desarrollo de una aplicación fullstack. Deberás implementar un sistema de gestión de ingresos y egresos, la gestión de usuarios y la generación de reportes. El proyecto cuenta con [wireframes](<https://www.figma.com/design/2PINjveveJJ9ZAAwxwNoRK/Wireframes-(Copy)?node-id=0-1&t=6q0Q0id8YnjH9fJt-1>) que pueden servir de guía para el candidato. Sin embargo, el diseño de la interfaz de usuario es libre.

### Requisitos del Proyecto

#### Funcionalidades Principales

1. **Roles y Permisos**

   - **Roles:**
     - **Usuario:** Solo puede acceder a la gestión de movimientos.
     - **Administrador:** Puede ver los reportes, editar usuarios y agregar movimientos.

2. **Home**

   - Página de inicio con un menú principal que permite la navegación a tres secciones:
     - Sistema de gestión de ingresos y gastos (disponible para todos los roles)
     - Gestión de usuarios (solo para administradores)
     - Reportes (solo para administradores)

3. **Sistema de Gestión de Ingresos y Gastos**

   - **Vista de Ingresos y Egresos**
     - Implementar una tabla que muestre los ingresos y egresos registrados con las siguientes columnas:
       - Concepto
       - Monto
       - Fecha
       - Usuario
     - Botón "Nuevo" para agregar un nuevo ingreso o egreso (solo para administradores).
   - **Formulario de Nuevo Ingreso/Egreso**
     - Formulario con los campos:
       - Monto
       - Concepto
       - Fecha
     - Botón para guardar el nuevo movimiento.

4. **Gestión de Usuarios** (solo para administradores)

   - **Vista de Usuarios**
     - Tabla que muestre la lista de usuarios con las siguientes columnas:
       - Nombre
       - Correo
       - Teléfono
       - Acciones (editar usuario)
   - **Formulario de Edición de Usuario**
     - Formulario con los campos:
       - Nombre
       - Rol
     - Botón para guardar los cambios.

5. **Reportes** (solo para administradores)
   - Mostrar un gráfico de movimientos financieros.
   - Mostrar el saldo actual.
   - Botón para descargar el reporte en formato CSV.

### Requisitos Técnicos

- **Tecnologías y Herramientas:**
  - **Frontend:**
    - Next.js utilizando `pages` router.
    - TypeScript.
    - Tailwind CSS.
    - Shadcn para componentes de la interfaz de usuario.
    - GraphQL con Apollo Client para queries y mutaciones.
  - **Backend:**
    - API GraphQL con Apollo Server implementada en una ruta de API de Next.js.
    - Base de datos de Postgres en Supabase.
  - **Protección de Datos:** 
    - Implementar control de acceso basado en roles (RBAC) para asegurar que solo los usuarios autorizados puedan acceder a ciertas funcionalidades y datos.
    - Proteger el backend para que rechace conexiones no autenticadas.
  - **Autenticación:**
    - Utilizar [Authjs](https://authjs.dev/) con [Auth0](https://auth0.com/) como proveedor y [Prisma](https://prisma.io) como adaptador para la autenticación por sesiones de base de datos.
  - **Pruebas unitarias**
    - El candidato debe agregar al menos 3 pruebas unitarias donde considere necesario.
  - **Despliegue:**
    - Desplegar el proyecto en Vercel.

### Entregables

1. **Código Fuente:**

   - Repositorio en GitHub con el código fuente del proyecto.
   - Incluir un archivo README con instrucciones claras sobre cómo ejecutar el proyecto localmente y cómo desplegarlo en Vercel.

2. **Despliegue:**
   - Proyecto desplegado en Vercel con la URL proporcionada.

### Criterios de Evaluación

- **Funcionalidad:**

  - Cumplimiento de todos los requisitos funcionales.
  - Correcta implementación del CRUD para ingresos, egresos y usuarios.
  - Generación y descarga de reportes en formato CSV.

- **Calidad del Código:**

  - Calidad y claridad del código.
  - Uso adecuado de las mejores prácticas de desarrollo.
  - Estructura del proyecto.

- **Diseño y UX:**

  - Usabilidad de la interfaz.
  - Implementación de un diseño atractivo.

- **Pruebas y Documentación:**

  - Cobertura de pruebas unitarias.
  - Calidad de los comentarios dentro del proyecto.

- **Seguridad:**

  - Implementación efectiva de control de acceso basado en roles (RBAC).
  - Protección adecuada de los datos sensibles.

- **Notas**:
  - El aplicativo no debe contener diseño responsivo.
  - El candidato puede utilizar el código cargado en este repositorio. Sin embargo, esta no es una condición necesaria y el candidato puede iniciar el proyecto de 0 si lo desea.
  - El candidato puede cambiar las versiones de las librerías si lo considera necesario.
  - El candidato debe compartir el acceso al repositorio de GitHub y el .env a los correos mlopera@prevalentware.com, jdsanchez@prevalentware.com y dfsorza@prevalentware.com
