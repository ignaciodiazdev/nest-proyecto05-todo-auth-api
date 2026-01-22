<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<h1 align="center">Task Manager API</h1>

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
</p>

## Description

REST API para gestión de tareas con autenticación JWT.
Cada usuario puede crear y administrar únicamente sus propias tareas.

## Tecnologías utilizadas
- Node.js
- NestJS
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Docker

## Requisitos
- Node.js >= 18
- Docker y Docker Compose

## Instalación y ejecución

1. Clonar el repositorio

```bash
git clone https://github.com/ignaciodiazdev/nest-proyecto05-todo-auth-api.git
cd nest-proyecto05-todo-auth-api
```

2. Crear un archivo `.env` basado en `.env.example`.
```bash
DATABASE_URL= "postgresql://postgres:MySecretPassword@localhost:5420/task-manager?schema=public"

JWT_SECRET="MyJwtSecretKey"
```
3. Levantar la base de datos
```bash
docker-compose up -d
```
4. Instalar dependencias
```bash
npm install
```
5. Ejecutar migraciones de Prisma
```bash
npx prisma migrate dev
```
6. Iniciar la aplicación
```bash
npm run start:dev
```
La API estará disponible en `http://localhost:3000`.

## Endpoints
### Auth
- **POST /auth/register**: Registrar un nuevo usuario.
- **POST /auth/login**: Iniciar sesión y obtener un token JWT.
- **GET /tasks**: Obtener todas las tareas del usuario autenticado.
### Tasks
- **POST /tasks**: Crear una nueva tarea.
- **GET /tasks/:id**: Obtener una tarea específica por ID.
- **GET /my-tasks/:id**: Obtener las tareas de un usuario autenticado.
- **PATCH /tasks/:id**: Actualizar una tarea de un usuario autenticado.
- **DELETE /tasks/:id**: Eliminar una tarea de un usuario autenticado.

## Autenticación

Las rutas de tareas están protegidas con JWT.

Enviar el token en el header:

Authorization: Bearer <token>

## Alcance

Este proyecto es una API backend enfocada en:

- Autenticación básica
- Gestión de tareas por usuario
- Protección de recursos (ownership)

No incluye frontend, roles ni funcionalidades avanzadas.

## Autor

Ignacio Diaz  
Backend Developer Jr.

