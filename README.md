# Books React Client

Una aplicación React minimalista (Vite) que consume la **Books API** (Express + MongoDB + JWT).  
Una solución rápida para gestionar libros con registro, autenticación y operaciones CRUD.

---

## Características

- **Listados Públicos:** Consulta libros sin necesidad de autenticación.
- **Autenticación JWT:** Registro y Login para proteger operaciones sensibles.
- **Gestión de Libros:** Crear, actualizar y eliminar libros (requiere login).
- **Interfaz Simple y Limpia:** Sin uso de frameworks de CSS.
- **Proxy Integrado:** El servidor de desarrollo de Vite redirige `/api` a tu backend, evitando problemas de CORS.

---

## Requisitos

- Node.js 18+
- Backend en ejecución en `http://localhost:3000` (según el ZIP de la API proporcionada)

---

## Instalación & Ejecución

### Desarrollo

1. Clona el repositorio o descarga el proyecto.
2. Abre la terminal y navega hasta el directorio del proyecto.
3. Ejecuta los siguientes comandos:

  ```bash
  npm install
  npm run dev
  ```

4. Abre tu navegador en: [http://localhost:5173](http://localhost:5173)

  > Nota: El servidor de Vite redirige `/api` a `http://localhost:3000`, por lo que la API se puede consumir localmente sin configurar CORS.

### Configuración de Variables de Entorno

Puedes personalizar la base de tu API, por defecto es `/api`:

```bash
echo "VITE_API_BASE=/api" > .env
```

---

## Construcción para Producción

Para desplegar tu aplicación en un entorno de producción:

1. Genera los archivos estáticos:

  ```bash
  npm run build
  ```

2. Para previsualizar el resultado:

  ```bash
  npm run preview
  ```

3. Opcional: Si deseas servir la aplicación directamente desde Express, copia el contenido del directorio `dist/` a tu servidor y configura el hosting estático en Express.

---

## Uso de la Aplicación

1. **Registro y Login:**
  - Registra un nuevo usuario en la pestaña *Register*.
  - Inicia sesión en la pestaña *Login*.

2. **Gestión de Libros en la Pestaña *Books*:**
  - **Crear:** Añade nuevos libros.
  - **Editar:** Modifica libros existentes.
  - **Eliminar:** Quita libros del listado.  
    > Nota: Las operaciones de creación, edición y eliminación requieren autenticación; la consulta pública no lo requiere.

3. **Campos del Libro:**
  - `title`
  - `author`
  - `year`
  - `status` (valores: `disponible` o `reservado`)

---

## Endpoints del Backend

Asegúrate que el backend responde a los siguientes endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login` → Devuelve `{ token }`
- `GET /api/books`
- `POST /api/books` (requiere autenticación)
- `PUT /api/books/:id` (requiere autenticación)
- `DELETE /api/books/:id` (requiere autenticación)

---

## Documentación de la API (Swagger)

Con el backend en ejecución, accede a los documentos de la API visitando:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Despliegue

Para "subir" o desplegar tu aplicación en producción:

1. Construye la aplicación con `npm run build`.
2. Sube el contenido del directorio `dist/` a tu servidor web o configúralo en Express.
3. Asegura que tu backend esté correctamente configurado para servir el contenido estático y gestionar los endpoints.

---

Disfruta de una configuración rápida y un flujo de trabajo intuitivo para gestionar tu catálogo de libros.
