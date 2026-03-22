# 🌿 Vivero El Paraíso — Tienda Virtual

> Plataforma de comercio electrónico para la compra de plantas, herramientas de jardín, abonos y fertilizantes.

---

## 📌 Descripción

**Vivero El Paraíso** es una tienda virtual desarrollada como proyecto personal con fines de portafolio profesional. El proyecto busca simular un e-commerce real de un vivero, aplicando buenas prácticas de desarrollo web moderno.

---

## 🚀 Tecnologías utilizadas

### Frontend
- [React](https://react.dev/) — Librería para construir interfaces de usuario
- [CSS Modules](https://github.com/css-modules/css-modules) — Estilos encapsulados por componente
- [React Router DOM](https://reactrouter.com/) — Navegación entre páginas
- [Vite](https://vitejs.dev/) — Empaquetador moderno y rápido

### Backend
- [PHP](https://www.php.net/) — Lenguaje del servidor (API REST)
- [MySQL](https://www.mysql.com/) — Base de datos relacional

### Herramientas de desarrollo
- [Git](https://git-scm.com/) — Control de versiones
- [GitHub](https://github.com/) — Repositorio remoto
- [Postman](https://www.postman.com/) — Pruebas de la API

---

## 📁 Estructura del proyecto

```
vivero-el-paraiso/
├── frontend/              # Aplicación React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Vistas / páginas
│   │   ├── context/       # Estado global (carrito, auth, favoritos)
│   │   ├── hooks/         # Custom hooks reutilizables
│   │   ├── services/      # Llamadas a la API
│   │   └── utils/         # Funciones utilitarias
│   └── public/
│
└── backend/               # API REST en PHP
    ├── config/            # Configuración de base de datos
    ├── controllers/       # Lógica de negocio
    ├── models/            # Representación de datos
    ├── routes/            # Rutas de la API
    └── middleware/        # Autenticación y seguridad
```

---

## ⚙️ Instalación y configuración

### Requisitos previos
- Node.js >= 18
- PHP >= 8.1
- MySQL >= 8.0
- Composer (gestor de dependencias PHP)

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/vivero-el-paraiso.git
cd vivero-el-paraiso
```

### 2. Configurar el frontend
```bash
cd frontend
npm install
cp .env.example .env       # Copiar variables de entorno
npm run dev                # Iniciar en modo desarrollo
```

### 3. Configurar el backend
```bash
cd backend
cp config/database.example.php config/database.php
# Editar database.php con tus credenciales de MySQL
```

### 4. Configurar la base de datos
```bash
# Importar el esquema en MySQL
mysql -u root -p < database/schema.sql
```

---

## 🌐 Páginas del sitio

| Página | Ruta | Descripción |
|--------|------|-------------|
| Inicio | `/` | Hero, productos destacados y categorías |
| Tienda | `/tienda` | Catálogo con filtros por categoría |
| Producto | `/producto/:id` | Detalle de un producto |
| Carrito | `/carrito` | Gestión de compra |
| Favoritos | `/favoritos` | Productos guardados por el usuario |
| Login | `/login` | Inicio de sesión |
| Registro | `/registro` | Crear cuenta nueva |
| Blog | `/blog` | Artículos sobre el vivero |
| Admin | `/admin` | Panel de administración (protegido) |

---

## 🔐 Variables de entorno

Crear un archivo `.env` en `/frontend` con:

```env
VITE_API_URL=http://localhost:8000/api
```

---

## 📄 Documentación

- [`docs/requerimientos.md`](docs/requerimientos.md) — Requerimientos funcionales y no funcionales
- [`docs/changelog.md`](docs/changelog.md) — Historial de cambios y versiones
- [`docs/base-de-datos.md`](docs/base-de-datos.md) — Diagrama y descripción de tablas *(próximamente)*
- [`docs/wireframes/`](docs/wireframes/) — Bocetos de las interfaces *(próximamente)*

---

## 👤 Autor

**[Tu nombre aquí]**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [linkedin.com/in/tu-perfil](https://linkedin.com/in/tu-perfil)

---

## 📜 Licencia

Este proyecto está bajo la licencia MIT. Ver [`LICENSE`](LICENSE) para más detalles.
