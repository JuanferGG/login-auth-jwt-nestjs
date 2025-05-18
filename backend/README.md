# Backend - Autenticación JWT con NestJS

Este proyecto es una API RESTful construida con [NestJS](https://nestjs.com/) que implementa autenticación de usuarios mediante JWT, manejo de imágenes de perfil, validación de datos y protección de rutas. Utiliza MongoDB como base de datos y Mongoose como ODM.

## Características principales
- Registro de usuarios con imagen de perfil (opcional)
- Autenticación y autorización con JWT (cookies httpOnly)
- Validación de datos con pipes personalizados
- Actualización y eliminación de usuarios
- Protección de rutas con guards
- Manejo seguro de contraseñas (bcrypt)
- Subida y eliminación de imágenes de usuario

## Requisitos
- Node.js >= 18
- pnpm (o npm/yarn)
- MongoDB

## Instalación

```bash
pnpm install
```

## Variables de entorno
Copia el archivo `.env.example` y renómbralo a `.env`. Completa los valores según tu entorno:

```
MONGODB_URI="mongodb://localhost:27017/tu_db"
PORT=3000
JWT_SECRET="tu_secreto_jwt"
```

## Comandos útiles

```bash
# Desarrollo
pnpm run start:dev

# Producción
pnpm run build
pnpm run start:prod

# Pruebas unitarias
dpnm run test

# Pruebas e2e
pnpm run test:e2e

# Cobertura de tests
pnpm run test:cov
```

## Endpoints principales

- `POST /user/RegisterUser` — Registro de usuario (requiere campos válidos y puede incluir imagen)
- `POST /user/login` — Login de usuario (devuelve JWT en cookie)
- `POST /user/logout` — Logout (elimina cookie JWT)
- `GET /user` — Listado de usuarios (protegido por JWT)
- `GET /user/:id` — Obtener usuario por ID
- `PATCH /user/:id` — Actualizar usuario (puede actualizar imagen)
- `DELETE /user/:id` — Eliminar usuario

## Estructura del proyecto

- `src/user/` — Controlador, servicio, DTOs, pipes y esquema de usuario
- `src/assets/guards/` — Guard para autenticación JWT
- `uploads/Users/` — Carpeta para imágenes de usuario

## Buenas prácticas y seguridad
- Las contraseñas se almacenan hasheadas con bcrypt
- El JWT se almacena en una cookie httpOnly para mayor seguridad
- Las imágenes subidas se eliminan si ocurre un error de validación
- Las rutas sensibles están protegidas por guards personalizados

## Recursos
- [Documentación oficial de NestJS](https://docs.nestjs.com)
- [Mongoose ODM](https://mongoosejs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## Licencia
Este proyecto es de uso privado y no tiene licencia asignada.
