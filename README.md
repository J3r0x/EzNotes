# AppNotes

Aplicación de notas simple con frontend en React y backend en Node.js/Express.

Estado actual (lo que hay en el repo):
- Frontend: aplicación creada con Create React App (carpeta `frontend`).
- Backend: API con Express y Mongoose para MongoDB (carpeta `backend`).

## Estructura del proyecto

- `frontend/` — código del cliente React (scripts: `start`, `build`, `test`).
- `backend/` — servidor Node.js (script: `dev` que ejecuta `node --watch src/server.js`).
- `.gitignore` — reglas para ignorar archivos (se actualizó para excluir `node_modules/`).

## Requisitos previos

- Node.js (v16+ recomendado)
- npm
- MongoDB accesible (local o remoto) — la conexión se configura vía variables de entorno en el backend (`.env`).

## Instalación y ejecución (rápida)

1. Instala dependencias en cada carpeta:

   ```bash
   cd frontend
   npm install

   cd ../backend
   npm install
   ```

2. Configura variables de entorno para el backend (opcionalmente crea `backend/.env`):

   ```
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/appnotes
   ```

3. Ejecuta el backend (modo desarrollo):

   ```bash
   cd backend
   npm run dev
   ```

4. Ejecuta el frontend:

   ```bash
   cd frontend
   npm start
   ```

El backend por defecto escucha en `PORT` o `3001` si no se provee (ver `backend/src/server.js`).

## Scripts útiles

- En `frontend`:
  - `npm start` — arranca la app React en modo desarrollo.
  - `npm run build` — genera la versión para producción.

- En `backend`:
  - `npm run dev` — arranca el servidor con `node --watch src/server.js`.

## Notas sobre Git y remoto

- El repositorio está conectado con `https://github.com/J3r0x/EzNotes.git` en la rama `main`.
- Si al hacer push hay diferencias con el remoto, primero haz `git pull origin main --allow-unrelated-histories` y resuelve conflictos locales antes de pushear.

## Siguientes pasos sugeridos

- Añadir un README específico en `backend/` y `frontend/` con comandos más detallados.
- Añadir pruebas básicas y un pequeño script de start/production para backend.
- Documentar el contrato de la API (`/api/notes`) y ejemplos de uso.

Si quieres, puedo añadir ejemplos de llamadas a la API o crear un `.env.example` y un README por carpeta.
