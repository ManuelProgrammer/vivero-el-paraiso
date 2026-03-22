# 🌿 Vivero El Paraíso — Tienda Virtual

> Plataforma de comercio electrónico para la compra de plantas, árboles, flores, herramientas de jardín, abonos y fertilizantes.

---

## 📌 Descripción

**Vivero El Paraíso** es una tienda virtual desarrollada como proyecto personal con fines de portafolio profesional. El proyecto busca simular un e-commerce real de un vivero, aplicando buenas prácticas de desarrollo web moderno como componentes reutilizables, separación de responsabilidades, control de versiones y documentación profesional.

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
- [Node.js](https://nodejs.org/) v24 — Entorno de ejecución para el frontend

---

## 📁 Estructura del proyecto

```
vivero-el-paraiso/
├── README.md
├── .gitignore
├── docs/
│   ├── requerimientos.md      # Requerimientos funcionales y no funcionales
│   └── changelog.md           # Historial de cambios y versiones
│
├── frontend/                  # Aplicación React (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/             # Vistas / páginas
│   │   ├── context/           # Estado global (carrito, auth, favoritos)
│   │   ├── hooks/             # Custom hooks reutilizables
│   │   ├── services/          # Llamadas a la API
│   │   └── utils/             # Funciones utilitarias
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/                   # API REST en PHP (próximamente)
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    └── middleware/
```

---

## ⚙️ Instalación y configuración

### Requisitos previos
- Node.js >= 18
- PHP >= 8.1
- MySQL >= 8.0

### 1. Clonar el repositorio
```bash
git clone https://github.com/ManuelProgrammer/vivero-el-paraiso.git
cd vivero-el-paraiso
```

### 2. Configurar el frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 3. Configurar el backend *(próximamente)*
```bash
cd backend
cp config/database.example.php config/database.php
# Editar database.php con tus credenciales de MySQL
```

---

## 🌐 Páginas del sitio

| Página | Ruta | Descripción |
|--------|------|-------------|
| Inicio | `/` | Hero con banner dinámico, productos destacados y categorías |
| Tienda | `/tienda` | Catálogo con filtros dinámicos por categoría y características |
| Producto | `/producto/:id` | Ficha completa del producto |
| Carrito | `/carrito` | Gestión de compra |
| Favoritos | `/favoritos` | Productos guardados por el usuario |
| Login | `/login` | Inicio de sesión |
| Registro | `/registro` | Crear cuenta nueva |
| Perfil | `/perfil` | Datos personales, envío e historial de órdenes |
| Blog | `/blog` | Artículos sobre el vivero |
| Soporte | `/soporte` | Formulario de contacto y ayuda |
| Admin | `/admin` | Panel de administración (protegido) |

---

## ✅ Estado del proyecto

| Fase | Descripción | Estado |
|------|-------------|--------|
| 📄 Documentación inicial | README, requerimientos, changelog | ✅ Completado |
| 🌱 Configuración Git y GitHub | Repositorio, ramas, .gitignore | ✅ Completado |
| ⚛️ Inicialización React + Vite | Proyecto base con estructura de carpetas | ✅ Completado |
| 🗄️ Diseño de base de datos | Diagrama ERD y tablas | ⏳ Pendiente |
| 🔧 API REST en PHP | Endpoints de productos, usuarios, órdenes | ⏳ Pendiente |
| 🎨 Desarrollo del frontend | Páginas y componentes | ⏳ Pendiente |
| 💳 Pasarela de pagos | Integración MercadoPago | ⏳ Pendiente |
| 🚀 Despliegue | Publicación en servidor | ⏳ Pendiente |

---

## 🧩 Funcionalidades principales

- 🛍️ Tienda virtual con carrito de compras
- 🔍 Buscador y filtros dinámicos por características de plantas
- ❤️ Lista de favoritos por usuario
- 👤 Perfil de usuario con información personal y de envío
- 🔐 Autenticación con roles (Usuario / Administrador)
- 📊 Panel administrativo con dashboard de estadísticas
- 🖼️ Banner dinámico gestionable desde el panel
- 📝 Blog del vivero
- 📞 Página de soporte al cliente
- 🌿 Redes sociales del vivero en el footer

---

## 📄 Documentación

- [`docs/requerimientos.md`](docs/requerimientos.md) — Requerimientos funcionales y no funcionales (v1.3)
- [`docs/changelog.md`](docs/changelog.md) — Historial de cambios y versiones
- `docs/base-de-datos.md` — Diagrama y descripción de tablas *(próximamente)*
- `docs/wireframes/` — Bocetos de las interfaces *(próximamente)*

---

## 👤 Autor

**[Tu nombre aquí]**
- GitHub: [@ManuelProgrammer](https://github.com/ManuelProgrammer)
- LinkedIn: [linkedin.com/in/tu-perfil](https://linkedin.com/in/tu-perfil)

---

## 📜 Licencia

Este proyecto está bajo la licencia Creative Commons Attribution-NonCommercial-ShareAlike. Ver [`LICENSE`](LICENSE) para más detalles.
