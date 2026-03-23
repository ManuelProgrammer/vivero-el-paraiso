# 🗄️ Base de Datos — Vivero El Paraíso

**Proyecto:** Vivero El Paraíso — Tienda Virtual  
**Versión del documento:** 1.0  
**Motor de base de datos:** MySQL  
**Fecha:** 2026  

---

## 1. Diagrama de relaciones (ERD)

```
usuarios ─────────── ordenes ─────────── detalle_ordenes ─── productos
    │                                                              │
    ├─── carrito ──────────────────────────────────────────── productos
    │                                                              │
    ├─── favoritos ─────────────────────────────────────────── productos
    │                                                              │
    └─── soporte                                            categorias
                                                                   │
                                                    caracteristicas_plantas
                                                    
blog (independiente)
banner (independiente)
redes_sociales (independiente)
```

---

## 2. Descripción de tablas

---

### 📋 Tabla: `usuarios`

Guarda la información de todos los usuarios registrados en el sistema.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT, PK, AUTO_INCREMENT | Identificador único del usuario |
| `nombre` | VARCHAR(100) | Nombre completo del usuario |
| `email` | VARCHAR(150), UNIQUE | Correo electrónico (usado para iniciar sesión) |
| `contrasena` | VARCHAR(255) | Contraseña cifrada con bcrypt |
| `telefono` | VARCHAR(20) | Número de teléfono o celular |
| `fecha_nacimiento` | DATE | Fecha de nacimiento |
| `foto_perfil` | VARCHAR(255) | Ruta de la imagen de perfil |
| `rol` | ENUM('usuario', 'admin') | Rol del usuario en el sistema (los invitados no se registran en esta tabla) |
| `estado` | ENUM('activo', 'bloqueado') | Estado de la cuenta |
| `direccion` | VARCHAR(255) | Dirección de envío |
| `ciudad` | VARCHAR(100) | Ciudad de envío |
| `departamento` | VARCHAR(100) | Departamento o estado de envío |
| `codigo_postal` | VARCHAR(20) | Código postal |
| `pais` | VARCHAR(100) | País de envío |
| `created_at` | TIMESTAMP | Fecha de registro |
| `updated_at` | TIMESTAMP | Fecha de última actualización |

---

### 📋 Tabla: `categorias`

Guarda las categorías de productos del vivero.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT, PK, AUTO_INCREMENT | Identificador único de la categoría |
| `nombre` | VARCHAR(100) | Nombre de la categoría (Plantas, Árboles, Flores...) |
| `descripcion` | TEXT | Descripción de la categoría |
| `imagen` | VARCHAR(255) | Imagen representativa de la categoría |
| `created_at` | TIMESTAMP | Fecha de creación |

---

### 📋 Tabla: `productos`

Guarda todos los productos disponibles en la tienda.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT, PK, AUTO_INCREMENT | Identificador único del producto |
| `categoria_id` | INT, FK | Referencia a la tabla categorias |
| `nombre` | VARCHAR(150) | Nombre del producto |
| `descripcion` | TEXT | Descripción detallada del producto |
| `precio` | DECIMAL(10,2) | Precio del producto |
| `stock` | INT | Cantidad disponible en inventario |
| `imagen_principal` | VARCHAR(255) | Imagen principal del producto |
| `estado` | ENUM('activo', 'inactivo') | Si el producto está visible o no |
| `created_at` | TIMESTAMP | Fecha de creación |
| `updated_at` | TIMESTAMP | Fecha de última actualización |

---

### 📋 Tabla: `caracteristicas_plantas`

Guarda las características específicas de las plantas para el sistema de filtrado dinámico. Solo aplica a productos de la categoría Plantas, Árboles y Flores.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT, PK, AUTO_INCREMENT | Identificador único |
| `producto_id` | INT, FK | Referencia a la tabla productos |
| `luz` | ENUM('sol', 'sombra', 'semisombra') | Tipo de luz que necesita |
| `riego` | ENUM('bajo', 'medio', 'alto') | Frecuencia de riego |
| `tamano` | ENUM('pequeña', 'mediana', 'grande') | Tamaño de la planta |
| `clima` | ENUM('cálido', 'templado', 'frío') | Clima ideal |
| `tipo` | ENUM('ornamental', 'medicinal', 'frutal', 'suculenta', 'árbol', 'arbusto') | Tipo de planta |
| `ubicacion` | ENUM('interior', 'exterior') | Ubicación ideal |
| `toxicidad` | ENUM('tóxica', 'no tóxica') | Si es tóxica para mascotas o niños |
| `floracion` | ENUM('con flores', 'sin flores') | Si produce flores |
| `nivel_cuidado` | ENUM('fácil', 'intermedio', 'difícil') | Nivel de cuidado requerido |

---

### 📋 Tabla: `imagenes_productos`

Guarda las imágenes adicionales de cada producto (un producto puede tener varias fotos).

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT, PK, AUTO_INCREMENT | Identificador único |
| `producto_id` | INT, FK | Referencia a la tabla productos |
| `url` | VARCHAR(255) | Ruta de la imagen |
| `orden` | INT | Orden de aparición de la imagen |

---

### 📋 Tabla: `carrito`

Guarda los productos que cada usuario tiene en su carrito de compras.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT, PK, AUTO_INCREMENT | Identificador único |
| `usuario_id` | INT, FK | Referencia a la tabla usuarios |
| `producto_id` | INT, FK | Referencia a la tabla productos |
| `cantidad` | INT | Cantidad del producto en el carrito |
| `created_at` | TIMESTAMP | Fecha en que se agregó al carrito |

---

### 📋 Tabla: `favoritos`

Guarda los productos que cada usuario ha marcado como favoritos.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT, PK, AUTO_INCREMENT | Identificador único |
| `usuario_id` | INT, FK | Referencia a la tabla usuarios |
| `producto_id` | INT, FK | Referencia a la tabla productos |
| `created_at` | TIMESTAMP | Fecha en que se marcó como favorito |

---

### 📋 Tabla: `ordenes`

Guarda cada compra realizada por un usuario.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT, PK, AUTO_INCREMENT | Identificador único de la orden |
| `usuario_id` | INT, FK | Referencia a la tabla usuarios |
| `total` | DECIMAL(10,2) | Monto total de la compra |
| `estado` | ENUM('pendiente', 'pagado', 'enviado', 'entregado', 'cancelado') | Estado de la orden |
| `direccion_envio` | VARCHAR(255) | Dirección de envío de la orden |
| `ciudad_envio` | VARCHAR(100) | Ciudad de envío |
| `referencia_pago` | VARCHAR(255) | Referencia de MercadoPago |
| `created_at` | TIMESTAMP | Fecha de la compra |
| `updated_at` | TIMESTAMP | Fecha de última actualización |

---

### 📋 Tabla: `detalle_ordenes`

Guarda los productos específicos de cada orden de compra.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT, PK, AUTO_INCREMENT | Identificador único |
| `orden_id` | INT, FK | Referencia a la tabla ordenes |
| `producto_id` | INT, FK | Referencia a la tabla productos |
| `cantidad` | INT | Cantidad comprada del producto |
| `precio_unitario` | DECIMAL(10,2) | Precio del producto al momento de la compra |
| `subtotal` | DECIMAL(10,2) | precio_unitario × cantidad |

---

### 📋 Tabla: `blog`

Guarda los artículos del blog del vivero.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT, PK, AUTO_INCREMENT | Identificador único del artículo |
| `titulo` | VARCHAR(200) | Título del artículo |
| `contenido` | LONGTEXT | Contenido completo del artículo |
| `imagen_portada` | VARCHAR(255) | Imagen de portada del artículo |
| `autor_id` | INT, FK | Referencia al usuario administrador que lo escribió |
| `estado` | ENUM('publicado', 'borrador') | Si el artículo es visible o no |
| `created_at` | TIMESTAMP | Fecha de publicación |
| `updated_at` | TIMESTAMP | Fecha de última edición |

---

### 📋 Tabla: `soporte`

Guarda los mensajes enviados por los usuarios desde la página de soporte.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT, PK, AUTO_INCREMENT | Identificador único del mensaje |
| `nombre` | VARCHAR(100) | Nombre de quien escribe |
| `email` | VARCHAR(150) | Email de contacto |
| `asunto` | VARCHAR(200) | Asunto del mensaje |
| `mensaje` | TEXT | Contenido del mensaje |
| `estado` | ENUM('nuevo', 'leído', 'respondido') | Estado del mensaje |
| `created_at` | TIMESTAMP | Fecha de envío |

---

### 📋 Tabla: `banner`

Guarda las imágenes del banner principal de la página de inicio.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT, PK, AUTO_INCREMENT | Identificador único |
| `url` | VARCHAR(255) | Ruta de la imagen |
| `descripcion` | VARCHAR(200) | Texto alternativo de la imagen |
| `orden` | INT | Orden de aparición en el carrusel |
| `estado` | ENUM('activo', 'inactivo') | Si la imagen se muestra o no |

---

### 📋 Tabla: `redes_sociales`

Guarda los enlaces a las redes sociales del vivero que aparecen en el footer.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | INT, PK, AUTO_INCREMENT | Identificador único |
| `nombre` | VARCHAR(50) | Nombre de la red social (Facebook, Instagram...) |
| `url` | VARCHAR(255) | Enlace a la red social |
| `icono` | VARCHAR(100) | Clase o nombre del ícono |
| `orden` | INT | Orden de aparición en el footer |
| `estado` | ENUM('activo', 'inactivo') | Si se muestra o no |

---

## 3. Relaciones entre tablas

| Tabla | Se relaciona con | Tipo de relación |
|-------|-----------------|-----------------|
| `usuarios` | `ordenes` | Un usuario puede tener muchas órdenes |
| `usuarios` | `carrito` | Un usuario puede tener muchos productos en el carrito |
| `usuarios` | `favoritos` | Un usuario puede tener muchos favoritos |
| `usuarios` | `blog` | Un admin puede escribir muchos artículos |
| `productos` | `categorias` | Un producto pertenece a una categoría |
| `productos` | `caracteristicas_plantas` | Un producto puede tener una ficha de características |
| `productos` | `imagenes_productos` | Un producto puede tener muchas imágenes |
| `productos` | `carrito` | Un producto puede estar en muchos carritos |
| `productos` | `favoritos` | Un producto puede ser favorito de muchos usuarios |
| `ordenes` | `detalle_ordenes` | Una orden puede tener muchos productos |
| `productos` | `detalle_ordenes` | Un producto puede aparecer en muchas órdenes |

---

## 4. Roles del sistema

| Rol | Registrado en BD | Permisos |
|-----|-----------------|----------|
| Invitado | ❌ No | Ver catálogo, buscador, filtros, blog y soporte |
| Usuario | ✅ Sí | Todo lo anterior + carrito, favoritos, comprar y perfil |
| Administrador | ✅ Sí | Todo lo anterior + panel de administración completo |

---

## 5. Glosario de términos

| Término | Significado |
|---------|-------------|
| `PK` | Primary Key — llave primaria, identifica de forma única cada fila |
| `FK` | Foreign Key — llave foránea, conecta esta tabla con otra |
| `AUTO_INCREMENT` | El número se genera automáticamente (1, 2, 3...) |
| `UNIQUE` | El valor no puede repetirse en la tabla |
| `ENUM` | El valor debe ser uno de los permitidos en la lista |
| `TIMESTAMP` | Guarda fecha y hora automáticamente |
| `VARCHAR` | Texto de longitud variable |
| `TEXT` | Texto largo |
| `DECIMAL` | Número con decimales (ideal para precios) |
| `INT` | Número entero |

---

*Documento sujeto a cambios conforme avance el proyecto.*
