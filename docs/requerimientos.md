# 📋 Requerimientos del Sistema — Vivero El Paraíso

**Proyecto:** Vivero El Paraíso — Tienda Virtual  
**Versión del documento:** 1.0  
**Fecha:** 2026  
**Estado:** En definición  

---

## 1. Requerimientos Funcionales

> Los requerimientos funcionales describen **qué debe hacer** el sistema. Son las funcionalidades visibles para el usuario.

---

### RF-01 — Gestión de usuarios

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-01-1 | El sistema debe permitir registrar un nuevo usuario con nombre, email y contraseña | Alta |
| RF-01-2 | El sistema debe permitir iniciar sesión con email y contraseña | Alta |
| RF-01-3 | El sistema debe permitir cerrar sesión | Alta |
| RF-01-4 | El sistema debe mostrar el perfil del usuario autenticado | Media |
| RF-01-5 | El sistema debe permitir editar datos del perfil (nombre, dirección, teléfono) | Media |
| RF-01-6 | El sistema debe permitir recuperar la contraseña por correo electrónico | Baja |

---

### RF-02 — Catálogo de productos

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-02-1 | El sistema debe mostrar un listado de productos disponibles | Alta |
| RF-02-2 | El sistema debe permitir filtrar productos por categoría (plantas, herramientas, abonos, fertilizantes) | Alta |
| RF-02-3 | El sistema debe mostrar el detalle de un producto (nombre, descripción, precio, imágenes, stock) | Alta |
| RF-02-4 | El sistema debe permitir buscar productos por nombre | Media |
| RF-02-5 | El sistema debe mostrar productos relacionados en la vista de detalle | Baja |

---

### RF-03 — Carrito de compras

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-03-1 | El sistema debe permitir agregar productos al carrito | Alta |
| RF-03-2 | El sistema debe permitir eliminar productos del carrito | Alta |
| RF-03-3 | El sistema debe permitir modificar la cantidad de un producto en el carrito | Alta |
| RF-03-4 | El sistema debe calcular y mostrar el subtotal y total de la compra | Alta |
| RF-03-5 | El carrito debe persistir mientras el usuario está autenticado | Media |

---

### RF-04 — Proceso de compra (Checkout)

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-04-1 | El sistema debe permitir al usuario ingresar una dirección de envío | Alta |
| RF-04-2 | El sistema debe integrarse con una pasarela de pagos (MercadoPago) | Alta |
| RF-04-3 | El sistema debe generar un número de orden al finalizar la compra | Alta |
| RF-04-4 | El sistema debe enviar un correo de confirmación al usuario tras la compra | Media |
| RF-04-5 | El sistema debe mostrar el historial de órdenes del usuario | Media |

---

### RF-05 — Favoritos

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-05-1 | El sistema debe permitir guardar productos en una lista de favoritos | Media |
| RF-05-2 | El sistema debe permitir eliminar productos de favoritos | Media |
| RF-05-3 | El sistema debe mostrar la lista de favoritos del usuario autenticado | Media |

---

### RF-06 — Blog

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-06-1 | El sistema debe mostrar un listado de artículos del blog | Media |
| RF-06-2 | El sistema debe mostrar el detalle de un artículo | Media |
| RF-06-3 | Los artículos deben tener título, imagen de portada, contenido y fecha | Media |

---

### RF-07 — Panel de administración

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-07-1 | Solo usuarios con rol de administrador pueden acceder al panel | Alta |
| RF-07-2 | El administrador puede crear, editar y eliminar productos | Alta |
| RF-07-3 | El administrador puede gestionar categorías de productos | Media |
| RF-07-4 | El administrador puede ver y actualizar el estado de las órdenes | Alta |
| RF-07-5 | El administrador puede crear y editar artículos del blog | Media |
| RF-07-6 | El administrador puede ver la lista de usuarios registrados | Baja |

---

## 2. Requerimientos No Funcionales

> Los requerimientos no funcionales describen **cómo debe comportarse** el sistema. No son funciones, sino características de calidad.

---

### RNF-01 — Seguridad

| Código | Descripción |
|--------|-------------|
| RNF-01-1 | Las contraseñas deben almacenarse cifradas (bcrypt) |
| RNF-01-2 | La autenticación debe usar tokens JWT con expiración |
| RNF-01-3 | Las rutas protegidas deben verificar el token en cada petición |
| RNF-01-4 | El sistema debe protegerse contra SQL Injection usando consultas preparadas |

---

### RNF-02 — Rendimiento

| Código | Descripción |
|--------|-------------|
| RNF-02-1 | Las páginas deben cargar en menos de 3 segundos en condiciones normales |
| RNF-02-2 | Las imágenes deben estar optimizadas (formato WebP cuando sea posible) |

---

### RNF-03 — Usabilidad

| Código | Descripción |
|--------|-------------|
| RNF-03-1 | El sitio debe ser completamente responsivo (móvil, tablet y escritorio) |
| RNF-03-2 | La navegación debe ser intuitiva y consistente en todas las páginas |
| RNF-03-3 | El sistema debe mostrar mensajes claros de error o éxito en cada acción |

---

### RNF-04 — Mantenibilidad

| Código | Descripción |
|--------|-------------|
| RNF-04-1 | El código debe seguir una estructura modular y reutilizable |
| RNF-04-2 | Los componentes de React deben ser independientes y bien documentados |
| RNF-04-3 | El proyecto debe tener un README actualizado con instrucciones de instalación |

---

### RNF-05 — Compatibilidad

| Código | Descripción |
|--------|-------------|
| RNF-05-1 | El sitio debe funcionar correctamente en Chrome, Firefox, Edge y Safari modernos |

---

## 3. Prioridades

| Nivel | Significado |
|-------|-------------|
| 🔴 Alta | Debe estar en la primera versión del sistema |
| 🟡 Media | Importante pero puede implementarse después del lanzamiento inicial |
| 🟢 Baja | Deseable a futuro, no crítico |

---

*Documento sujeto a cambios conforme avance el proyecto.*
