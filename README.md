# EzNotes

Una aplicación web moderna para la gestión de notas con una interfaz de usuario elegante y una API REST robusta.

## Descripción del Proyecto

EzNotes es una aplicación full-stack que permite a los usuarios crear, leer, actualizar y eliminar notas de manera intuitiva. La aplicación está construida con tecnologías modernas y cuenta con una interfaz responsiva con diseño dark mode y animaciones suaves.

### Características Principales

- **CRUD Completo**: Crear, leer, actualizar y eliminar notas
- **Búsqueda en Tiempo Real**: Filtrar notas por título o contenido
- **Interfaz Moderna**: Diseño dark mode con gradientes y animaciones
- **Responsive Design**: Optimizado para dispositivos móviles y desktop
- **Gestión de Estados**: Manejo de estados de carga, errores y éxito
- **Persistencia de Datos**: Almacenamiento en MongoDB con timestamps automáticos

## Arquitectura del Proyecto

```
AppNotes/
├── frontend/          # Cliente React con Vite
│   ├── src/
│   │   ├── App.jsx    # Componente principal
│   │   ├── main.jsx   # Punto de entrada
│   │   └── styles/    # Estilos con Tailwind CSS
│   └── vite.config.js # Configuración de Vite con proxy
├── backend/           # Servidor Node.js/Express
│   ├── src/
│   │   ├── server.js  # Servidor principal
│   │   ├── config/    # Configuración de base de datos
│   │   ├── models/    # Modelos de Mongoose
│   │   └── routes/    # Rutas de la API
│   └── package.json
└── api/              # Configuración para deployment
```

## Stack Tecnológico

### Frontend
- **React 19.1.1** - Framework de interfaz de usuario
- **Vite 5.0** - Build tool y dev server
- **Tailwind CSS 4.1** - Framework de estilos
- **JavaScript ES6+** - Lenguaje de programación

### Backend
- **Node.js** - Runtime de JavaScript
- **Express 4.18** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose 8.17** - ODM para MongoDB
- **CORS** - Manejo de Cross-Origin Resource Sharing
- **dotenv** - Gestión de variables de entorno

## Requisitos del Sistema

### Requisitos Previos
- **Node.js** v18+ (recomendado v20+)
- **npm** v8+ o **yarn** v1.22+
- **MongoDB** 5.0+ (local o remoto)
- **Git** para control de versiones

### Variables de Entorno
El backend requiere las siguientes variables de entorno:

```env
# Backend (.env)
PORT=3001
MONGO_URI=mongodb://localhost:27017/appnotes
```

```env
# Frontend (.env.development)
VITE_API_URL=http://localhost:3001
```

## Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/J3r0x/EzNotes.git
cd AppNotes
```

### 2. Configurar Backend
```bash
cd backend
npm install

# Crear archivo .env
echo "PORT=3001" > .env
echo "MONGO_URI=mongodb://localhost:27017/appnotes" >> .env
```

### 3. Configurar Frontend
```bash
cd ../frontend
npm install
```

### 4. Configurar Base de Datos
Asegúrate de que MongoDB esté ejecutándose:
```bash
# Para MongoDB local
mongod

# O usar MongoDB Atlas (cloud) actualizando MONGO_URI en .env
```

## Ejecución del Proyecto

### Modo Desarrollo

1. **Iniciar Backend**:
   ```bash
   cd backend
   npm run dev
   ```
   El servidor se ejecutará en `http://localhost:3001`

2. **Iniciar Frontend** (en otra terminal):
   ```bash
   cd frontend
   npm start
   ```
   La aplicación se abrirá en `http://localhost:5173`

### Modo Producción

1. **Build del Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Ejecutar Backend**:
   ```bash
   cd backend
   npm start
   ```

## API Endpoints

La API REST proporciona los siguientes endpoints:

### Notas
- `GET /api/notes` - Obtener todas las notas
- `GET /api/notes/:id` - Obtener una nota específica
- `POST /api/notes` - Crear una nueva nota
- `PUT /api/notes/:id` - Actualizar una nota existente
- `DELETE /api/notes/:id` - Eliminar una nota

### Esquema de Datos
```json
{
  "_id": "ObjectId",
  "title": "String (requerido)",
  "description": "String (requerido)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Ejemplos de Uso

**Crear una nota:**
```bash
curl -X POST http://localhost:3001/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "Mi primera nota", "description": "Contenido de la nota"}'
```

**Obtener todas las notas:**
```bash
curl http://localhost:3001/api/notes
```

**Actualizar una nota:**
```bash
curl -X PUT http://localhost:3001/api/notes/[ID] \
  -H "Content-Type: application/json" \
  -d '{"title": "Título actualizado", "description": "Nuevo contenido"}'
```

**Eliminar una nota:**
```bash
curl -X DELETE http://localhost:3001/api/notes/[ID]
```

## Funcionalidades de la Interfaz

### Gestión de Notas
- **Crear Notas**: Formulario intuitivo con validación
- **Editar Notas**: Edición in-line con confirmación
- **Eliminar Notas**: Confirmación antes de eliminar
- **Búsqueda**: Filtrado en tiempo real por título y contenido

### Experiencia de Usuario
- **Loading States**: Indicadores de carga durante las operaciones
- **Error Handling**: Mensajes de error claros y auto-dismiss
- **Success Feedback**: Notificaciones de éxito para acciones completadas
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla
- **Dark Theme**: Diseño moderno con gradientes y efectos visuales

## Scripts Disponibles

### Frontend (`frontend/`)
```bash
npm start      # Inicia servidor de desarrollo (Vite)
npm run build  # Construye para producción
npm run preview # Vista previa del build de producción
npm test       # Ejecuta pruebas unitarias
```

### Backend (`backend/`)
```bash
npm run dev    # Inicia servidor con hot-reload (node --watch)
npm start      # Inicia servidor en modo producción
```

## Configuración de Seguridad

- **CORS**: Configurado para permitir requests del frontend
- **Environment Variables**: Datos sensibles en archivos .env
- **Input Validation**: Validación de datos en frontend y backend
- **Error Handling**: Manejo seguro de errores sin exposición de datos

## Dependencias Principales

### Frontend
```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "vite": "^5.0.0",
  "tailwindcss": "^4.1.12"
}
```

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.17.2",
  "cors": "^2.8.5",
  "dotenv": "^17.2.1"
}
```

## Configuración de Proxy

El frontend utiliza un proxy de Vite para redirigir las llamadas a la API:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

## Estructura de Base de Datos

### Colección: notes
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Flujo de Desarrollo

1. **Desarrollo Local**:
   - Backend en `localhost:3001`
   - Frontend en `localhost:5173`
   - MongoDB en `localhost:27017`

2. **Hot Reload**:
   - Backend: `node --watch` para recarga automática
   - Frontend: Vite HMR (Hot Module Replacement)

3. **Testing**:
   - Frontend: React Testing Library
   - Backend: Pendiente implementación

## Deployment

### Variables de Entorno en Producción
```env
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/appnotes
PORT=3001
```

## Troubleshooting

### Problemas Comunes

1. **Error de conexión MongoDB**:
   - Verificar que MongoDB esté ejecutándose
   - Comprobar MONGO_URI en variables de entorno

2. **Error de CORS**:
   - Verificar configuración de proxy en Vite
   - Comprobar que el backend esté en el puerto correcto

3. **Error de dependencias**:
   ```bash
   # Limpiar cache de npm
   npm cache clean --force
   
   # Reinstalar dependencias
   rm -rf node_modules package-lock.json
   npm install
   ```

## Roadmap y Mejoras Futuras

- [ ] Autenticación y autorización de usuarios
- [ ] Categorías y etiquetas para notas
- [ ] Editor de texto enriquecido (Rich Text)
- [ ] Exportación de notas (PDF, Markdown)
- [ ] Modo offline con sincronización
- [ ] API de búsqueda avanzada
- [ ] Pruebas unitarias e integración
- [ ] Docker containerization
- [ ] CI/CD pipeline

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Autor

- **GitHub**: [@J3r0x](https://github.com/J3r0x)
- **Repositorio**: [EzNotes](https://github.com/J3r0x/EzNotes)

---

Si este proyecto te fue útil, considera darle una estrella en GitHub.
