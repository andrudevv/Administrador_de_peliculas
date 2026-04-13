# Movie Management App

Aplicación de gestión de películas con backend en NestJS y frontend en React.

## Tecnologías Utilizadas

- **Backend**: NestJS, TypeORM, PostgreSQL
- **Frontend**: React, TypeScript, Vite, Bootstrap
- **Base de Datos**: PostgreSQL
- **Contenedor**: Docker (opcional)

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- PostgreSQL (si no se usa Docker)
- Docker y Docker Compose (opcional, para ejecución completa)

## Instalación y Ejecución

### Ejecución Manual

#### Backend (NestJS)

1. Instalar dependencias:
```bash
cd backend
npm install
```

2. Configurar la base de datos:
   - Asegúrate de tener PostgreSQL corriendo
   - Actualiza las variables de entorno en `backend/.env` si es necesario
   - Ejecutar Docker-compose up para instalar la imagen de la base de datos en caso de no tenerse instalado

3. Ejecutar el servidor de desarrollo:
```bash
npm run start:dev
```

El backend estará disponible en http://localhost:3000

#### Frontend (React)

1. Instalar dependencias:
```bash
cd frontend
npm install
```

2. Ejecutar el servidor de desarrollo:
```bash
npm run dev
```

El frontend estará disponible en http://localhost:5173

## Uso

Una vez que ambos servidores estén corriendo:

1. Abre http://localhost:5173 en tu navegador
2. Navega por la aplicación:
   - Ver lista de películas
   - Crear nuevas películas
   - Buscar películas
   - Ver películas favoritas
   - Editar y eliminar películas

## API Endpoints

### Películas

- `GET /movie` - Obtener todas las películas
- `POST /movie` - Crear nueva película
- `GET /movie/search` - Obtener película por filtro
- `PATCH /movie/:id` - Actualizar película
- `DELETE /movie/:id` - Eliminar película




## Desarrollo

### Backend

- `npm run start:dev` - Desarrollo con hot reload
- `npm run test` - Ejecutar tests
- `npm run build` - Construir para producción

### Frontend

- `npm run dev` - Desarrollo con hot reload
- `npm run build` - Construir para producción
- `npm run lint` - Ejecutar linter

