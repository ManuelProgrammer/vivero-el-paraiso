# 📋 Requerimientos del Sistema — Vivero El Paraíso

**Proyecto:** Vivero El Paraíso — Tienda Virtual  
**Versión del documento:** 1.4  
**Fecha:** 2026  
**Estado:** En definición  

---

## 1. Requerimientos Funcionales

---

### RF-01 — Registro de usuarios

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-01-1 | El sistema debe permitir registrar un nuevo usuario con los siguientes datos: nombre completo, email, contraseña, teléfono y fecha de nacimiento | Alta |
| RF-01-2 | El sistema debe permitir iniciar sesión con email y contraseña | Alta |
| RF-01-3 | El sistema debe permitir cerrar sesión | Alta |
| RF-01-4 | El sistema debe permitir recuperar la contraseña por correo electrónico | Media |

---

### RF-02 — Perfil de usuario

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-02-1 | Cada usuario debe tener una página de perfil personal | Alta |
| RF-02-2 | El usuario puede editar su información personal: nombre, teléfono, fecha de nacimiento y foto de perfil | Alta |
| RF-02-3 | El usuario puede agregar y editar su información de envío: dirección, ciudad, departamento, código postal y país | Alta |

| RF-02-5 | El usuario puede ver su historial de órdenes desde su perfil | Alta |
| RF-02-6 | El usuario puede ver y gestionar su lista de favoritos desde su perfil | Media |

---

### RF-03 — Catálogo de productos

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-03-1 | El sistema debe mostrar un listado de productos disponibles | Alta |
| RF-03-2 | El sistema debe permitir filtrar productos por categoría: Plantas, Árboles, Flores, Herramientas, Abonos y Fertilizantes | Alta |
| RF-03-3 | El sistema debe mostrar el detalle de un producto (nombre, descripción, precio, imágenes, stock, características) | Alta |
| RF-03-4 | El sistema debe tener un buscador por palabras clave (nombre del producto) | Alta |
| RF-03-5 | El sistema debe mostrar un aviso visible cuando un producto no tiene stock disponible | Alta |
| RF-03-6 | El sistema debe mostrar productos relacionados en la vista de detalle | Baja |

---

### RF-04 — Sistema de filtrado dinámico

> Permite al cliente filtrar productos usando múltiples atributos simultáneamente, sin recargar la página.

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-04-1 | El sistema debe permitir filtrar plantas por sus características específicas | Alta |
| RF-04-2 | Los filtros deben funcionar con lógica AND (se deben cumplir todas las condiciones seleccionadas) | Alta |
| RF-04-3 | Se deben poder seleccionar múltiples valores dentro de una misma categoría (ej: sol Y semisombra) | Alta |
| RF-04-4 | El filtrado debe ser dinámico, sin recargar la página | Alta |
| RF-04-5 | Los filtros deben combinarse con el buscador por palabras | Media |

#### Características filtrables de plantas:

| Atributo | Valores posibles |
|----------|-----------------|
| ☀️ Luz | Sol, Sombra, Semisombra |
| 💧 Riego | Bajo, Medio, Alto |
| 📏 Tamaño | Pequeña, Mediana, Grande |
| 🌡️ Clima | Cálido, Templado, Frío |
| 🌱 Tipo | Ornamental, Medicinal, Frutal, Suculenta, Árbol, Arbusto |
| 🏡 Ubicación | Interior, Exterior |
| 🐾 Toxicidad | Tóxica, No tóxica |
| 🌼 Floración | Con flores, Sin flores |
| 🧑‍🌾 Nivel de cuidado | Fácil, Intermedio, Difícil |

---

### RF-05 — Carrito de compras

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-05-1 | El sistema debe permitir agregar productos al carrito | Alta |
| RF-05-2 | El sistema debe permitir eliminar productos del carrito | Alta |
| RF-05-3 | El sistema debe permitir modificar la cantidad de un producto en el carrito | Alta |
| RF-05-4 | El sistema debe calcular y mostrar el subtotal y total de la compra | Alta |
| RF-05-5 | El carrito debe persistir mientras el usuario está autenticado | Media |

---

### RF-06 — Proceso de compra (Checkout)

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-06-1 | El sistema debe permitir al usuario confirmar o ingresar una dirección de envío | Alta |
| RF-06-2 | El sistema debe integrarse con una pasarela de pagos (MercadoPago) | Alta |
| RF-06-3 | El sistema debe generar un número de orden al finalizar la compra | Alta |
| RF-06-4 | El sistema debe enviar un correo de confirmación al usuario tras la compra | Media |
| RF-06-5 | El sistema debe mostrar el historial de órdenes del usuario | Media |

---

### RF-07 — Favoritos

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-07-1 | El sistema debe permitir guardar productos en una lista de favoritos | Media |
| RF-07-2 | El sistema debe permitir eliminar productos de favoritos | Media |
| RF-07-3 | El sistema debe mostrar la lista de favoritos del usuario autenticado | Media |

---

### RF-08 — Blog

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-08-1 | El sistema debe mostrar un listado de artículos del blog | Media |
| RF-08-2 | El sistema debe mostrar el detalle de un artículo | Media |
| RF-08-3 | Los artículos deben tener título, imagen de portada, contenido y fecha | Media |

---

### RF-09 — Soporte al cliente

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-09-1 | El sistema debe tener una página de Soporte con formulario de contacto | Alta |
| RF-09-2 | El formulario debe permitir enviar nombre, email, asunto y mensaje | Alta |
| RF-09-3 | El administrador debe poder ver los mensajes de soporte desde el panel | Media |

---

### RF-10 — Panel de administración — Productos

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-10-1 | Solo usuarios con rol administrador pueden acceder al panel | Alta |
| RF-10-2 | El administrador puede crear, editar y eliminar productos | Alta |
| RF-10-3 | Al crear o editar un producto se puede ingresar: nombre, foto(s), precio, stock, descripción y todas las características filtrables | Alta |
| RF-10-4 | El administrador puede subir imágenes de productos directamente desde el panel | Alta |
| RF-10-5 | El administrador puede gestionar el inventario (cantidad de stock por producto) | Alta |
| RF-10-6 | El administrador puede gestionar categorías de productos | Media |
| RF-10-7 | El administrador puede ver y actualizar el estado de las órdenes | Alta |
| RF-10-8 | El administrador puede crear, editar y eliminar artículos del blog | Media |
| RF-10-9 | El administrador puede ver los mensajes de soporte recibidos | Media |

---

### RF-11 — Panel de administración — Gestión de cuentas

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-11-1 | El administrador puede crear nuevas cuentas y asignarles un rol: usuario normal o administrador | Alta |
| RF-11-2 | El administrador puede editar cualquier cuenta existente (datos personales y rol) | Alta |
| RF-11-3 | El administrador puede bloquear una cuenta sin eliminarla (el usuario no podrá iniciar sesión) | Alta |
| RF-11-4 | El administrador puede desbloquear una cuenta previamente bloqueada | Alta |
| RF-11-5 | El administrador puede eliminar cuentas de usuarios | Alta |
| RF-11-6 | El administrador puede ver el listado completo de usuarios con su rol y estado (activo/bloqueado) | Alta |
| RF-11-7 | El sistema debe mostrar claramente el rol de cada cuenta: Usuario o Administrador | Alta |

---

### RF-12 — Banner dinámico

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-12-1 | La página de inicio debe tener un banner tipo carrusel con imágenes | Alta |
| RF-12-2 | El administrador puede agregar, cambiar o eliminar imágenes del banner desde el panel sin tocar el código | Alta |
| RF-12-3 | El banner debe tener transición automática entre imágenes | Media |

---

### RF-13 — Dashboard de estadísticas (Admin)

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-13-1 | El panel debe mostrar estadísticas de ventas (total de compras e ingresos) | Alta |
| RF-13-2 | El panel debe mostrar estadísticas de productos (más vendidos, con bajo stock) | Alta |
| RF-13-3 | El panel debe mostrar alertas cuando un producto tenga stock igual a cero | Alta |

---

### RF-14 — Redes sociales del vivero

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-14-1 | El footer del sitio debe mostrar los íconos y enlaces a las redes sociales del vivero | Alta |
| RF-14-2 | El administrador puede agregar nuevas redes sociales al footer desde el panel | Media |
| RF-14-3 | El administrador puede editar los enlaces de redes sociales existentes | Media |
| RF-14-4 | El administrador puede eliminar redes sociales del footer | Media |
| RF-14-3 | Las redes sociales contempladas son: Facebook, Instagram, WhatsApp, TikTok y YouTube | Media |

---

## 2. Requerimientos No Funcionales

---

### RNF-01 — Seguridad

| Código | Descripción |
|--------|-------------|
| RNF-01-1 | Las contraseñas deben almacenarse cifradas (bcrypt) |
| RNF-01-2 | La autenticación debe usar tokens JWT con expiración |
| RNF-01-3 | Las rutas protegidas deben verificar el token en cada petición |
| RNF-01-4 | El sistema debe protegerse contra SQL Injection usando consultas preparadas |
| RNF-01-5 | Las cuentas bloqueadas no deben poder autenticarse bajo ninguna circunstancia |

---

### RNF-02 — Rendimiento

| Código | Descripción |
|--------|-------------|
| RNF-02-1 | Las páginas deben cargar en menos de 3 segundos en condiciones normales |
| RNF-02-2 | Las imágenes deben estar optimizadas (formato WebP cuando sea posible) |
| RNF-02-3 | El filtrado de productos debe responder en tiempo real sin recargar la página |

---

### RNF-03 — Usabilidad

| Código | Descripción |
|--------|-------------|
| RNF-03-1 | El sitio debe ser completamente responsivo (móvil, tablet y escritorio) |
| RNF-03-2 | La navegación debe ser intuitiva y consistente en todas las páginas |
| RNF-03-3 | El sistema debe mostrar mensajes claros de error o éxito en cada acción |
| RNF-03-4 | El diseño debe ser dinámico y visualmente atractivo para el cliente |

---

### RNF-04 — Identidad visual

| Código | Descripción |
|--------|-------------|
| RNF-04-1 | La paleta de colores principal debe basarse en tonos verdes |
| RNF-04-2 | El logo del árbol debe estar presente en el header y el footer |
| RNF-04-3 | El diseño debe transmitir naturaleza, frescura y confianza |

---

### RNF-05 — Mantenibilidad

| Código | Descripción |
|--------|-------------|
| RNF-05-1 | El código debe seguir una estructura modular y reutilizable |
| RNF-05-2 | Los componentes de React deben ser independientes y bien documentados |
| RNF-05-3 | El proyecto debe tener un README actualizado con instrucciones de instalación |

---

### RNF-06 — Compatibilidad

| Código | Descripción |
|--------|-------------|
| RNF-06-1 | El sitio debe funcionar correctamente en Chrome, Firefox, Edge y Safari modernos |

---

## 3. Datos requeridos al registrarse

Estos son los datos que el sistema le pedirá al usuario en el momento del registro:

| Campo | Obligatorio |
|-------|-------------|
| Nombre completo | ✅ Sí |
| Email | ✅ Sí |
| Contraseña | ✅ Sí |
| Teléfono / Celular | ✅ Sí |
| Fecha de nacimiento | ✅ Sí |

---

## 4. Datos del perfil (editables después del registro)

| Campo | Sección |
|-------|---------|
| Foto de perfil | Información personal |
| Nombre completo | Información personal |
| Teléfono / Celular | Información personal |
| Fecha de nacimiento | Información personal |
| Dirección de envío | Información de envío |
| Ciudad | Información de envío |
| Departamento / Estado | Información de envío |
| Código postal | Información de envío |
| País | Información de envío |





---

## 5. Roles del sistema

### Invitado (sin cuenta)

| Acción | Permitido |
|--------|-----------|
| Ver catálogo de productos | ✅ Sí |
| Ver detalle de producto | ✅ Sí |
| Visitar el blog | ✅ Sí |
| Usar el buscador y filtros | ✅ Sí |
| Comentar en el blog | ❌ No |
| Agregar productos al carrito | ❌ No |
| Guardar en favoritos | ❌ No |
| Comprar | ❌ No |
| Ver su perfil | ❌ No |

> Cuando un invitado intente realizar una acción que requiere cuenta, el sistema lo redirigirá automáticamente a la página de Login/Registro.

### Usuario registrado


### RF-00 — Usuario invitado (sin cuenta)

| Código | Descripción | Prioridad |
|--------|-------------|-----------|
| RF-00-1 | Un visitante sin cuenta puede navegar y ver el catálogo de productos | Alta |
| RF-00-2 | Un visitante sin cuenta puede ver el detalle de cada producto | Alta |
| RF-00-3 | Un visitante sin cuenta puede leer los artículos del blog | Alta |
| RF-00-4 | Un visitante sin cuenta puede ver la página de soporte y enviar un mensaje | Alta |
| RF-00-5 | Un visitante NO puede agregar productos al carrito | Alta |
| RF-00-6 | Un visitante NO puede guardar productos en favoritos | Alta |
| RF-00-7 | Un visitante NO puede realizar compras | Alta |
| RF-00-8 | Un visitante NO puede comentar en el blog | Alta |
| RF-00-9 | Si un visitante intenta realizar una acción restringida, el sistema lo redirige al Login |  Alta |

| Rol | Permisos |
|-----|----------|
| Invitado | Ver catálogo, usar buscador y filtros, ver blog, ver soporte |
| Usuario | Todo lo anterior + carrito, favoritos, comprar, perfil e historial de órdenes |
|-----|----------|
|-----|----------|
| Invitado | Ver catálogo, ver productos, leer blog, enviar mensaje de soporte |
| Usuario | Todo lo anterior + comprar, carrito, favoritos, perfil, historial de órdenes |
|-----|----------|

---

## 6. Categorías de productos

| Categoría | Descripción |
|-----------|-------------|
| 🌱 Plantas | Plantas de interior y exterior |
| 🌳 Árboles | Árboles ornamentales y frutales |
| 🌸 Flores | Flores naturales y decorativas |
| 🛠️ Herramientas | Herramientas para jardín |
| 🌿 Abonos y Fertilizantes | Productos para el cuidado del suelo |

---

## 7. Prioridades

| Nivel | Significado |
|-------|-------------|
| 🔴 Alta | Debe estar en la primera versión del sistema |
| 🟡 Media | Importante pero puede implementarse después del lanzamiento inicial |
| 🟢 Baja | Deseable a futuro, no crítico |

---

## 8. Historial de versiones del documento

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 2026 | Documento inicial |
| 1.1 | 2026 | Agregados: banner dinámico, dashboard, soporte, inventario, categorías, identidad visual |
| 1.2 | 2026 | Agregados: sistema de filtrado dinámico, gestión de cuentas por admin, perfil editable, buscador |
| 1.4 | 2026 | Agregado: rol de invitado con permisos limitados |
| 1.3 | 2026 | Agregados: perfil detallado con info de envío y redes sociales, datos de registro, roles del sistema, gestión completa de cuentas, redes sociales del vivero en footer |
| 1.4 | 2026 | Agregado: usuario invitado con permisos limitados, tabla de roles actualizada con 3 niveles |

---

*Documento sujeto a cambios conforme avance el proyecto.*
