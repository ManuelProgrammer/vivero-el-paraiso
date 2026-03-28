import { useState } from 'react'
import styles from './Producto.module.css'
import ProductCard from '../../components/ProductCard/ProductCard'

// Datos de prueba del producto
const productoDemo = {
  id: 1,
  nombre: 'Orquídea Phalaenopsis',
  precio: 45000,
  descripcion: 'La Orquídea Phalaenopsis es una de las orquídeas más populares y fáciles de cultivar en interiores. Sus flores duran semanas y vienen en una gran variedad de colores. Es perfecta para decorar cualquier espacio del hogar o la oficina.',
  stock: 8,
  nuevo: true,
  vendidos: 60,
  categoria: 'Flores',
  calificacion: 4.5,
  totalReseñas: 24,
  imagenes: [
    'https://images.unsplash.com/photo-1566907225472-514215c9e6e9?w=600',
    'https://images.unsplash.com/photo-1490750967868-88df5691cc2e?w=600',
    'https://images.unsplash.com/photo-1524247108137-732e0f642303?w=600',
  ],
  caracteristicas: {
    luz: 'Semisombra',
    riego: 'Medio',
    tamano: 'Mediana',
    clima: 'Cálido',
    tipo: 'Ornamental',
    ubicacion: 'Interior',
    toxicidad: 'No tóxica',
    floracion: 'Con flores',
    nivel_cuidado: 'Difícil',
  },
}

const reseñasDemo = [
  { id: 1, usuario: 'María García', calificacion: 5, comentario: 'Llegó en perfectas condiciones, muy bonita y bien empacada.', fecha: '2026-03-10', foto: 'https://images.unsplash.com/photo-1566907225472-514215c9e6e9?w=200' },
  { id: 2, usuario: 'Carlos López', calificacion: 4, comentario: 'Excelente calidad, ya tiene nuevas flores.', fecha: '2026-02-28', foto: null },
  { id: 3, usuario: 'Ana Martínez', calificacion: 5, comentario: 'La mejor orquídea que he comprado. Muy recomendada.', fecha: '2026-02-15', foto: null },
]

const productosRelacionados = [
  { id: 2, nombre: 'Rosa Roja', precio: 15000, imagen: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400', stock: 10, nuevo: true },
  { id: 3, nombre: 'Helecho Boston', precio: 25000, imagen: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400', stock: 5, nuevo: false },
  { id: 4, nombre: 'Cactus Barrel', precio: 18000, imagen: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400', stock: 0, nuevo: false },
]

const WHATSAPP_NUMBER = '573145964947'

function Producto() {
  const [imagenActiva, setImagenActiva] = useState(0)
  const [favorito, setFavorito] = useState(false)
  const [cantidad, setCantidad] = useState(1)
  const [miCalificacion, setMiCalificacion] = useState(0)
  const [miComentario, setMiComentario] = useState('')
  const [miFoto, setMiFoto] = useState(null)
  const [tabActiva, setTabActiva] = useState('descripcion')

  const formatPrecio = (val) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val)

  const handleCantidad = (accion) => {
    if (accion === 'mas' && cantidad < productoDemo.stock) setCantidad(cantidad + 1)
    if (accion === 'menos' && cantidad > 1) setCantidad(cantidad - 1)
  }

  const handleCotizar = () => {
    const mensaje = 'Hola, estoy interesado en cotizar: ' + productoDemo.nombre + ' (x' + cantidad + '). Precio unitario: ' + formatPrecio(productoDemo.precio)
    const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(mensaje)
    window.open(url, '_blank')
  }

  const handleFoto = (e) => {
    const file = e.target.files[0]
    if (file) setMiFoto(URL.createObjectURL(file))
  }

  const renderEstrellas = (cal, interactivo = false) => {
    return [1, 2, 3, 4, 5].map((estrella) => (
      <span
        key={estrella}
        className={styles.estrella + ' ' + (estrella <= cal ? styles.estrellaActiva : '')}
        onClick={interactivo ? () => setMiCalificacion(estrella) : undefined}
        style={interactivo ? { cursor: 'pointer' } : {}}
      >
        ★
      </span>
    ))
  }

  return (
    <main className={styles.main}>
      <div className={styles.contenedor}>

        {/* ===== BREADCRUMB ===== */}
        <nav className={styles.breadcrumb}>
          <a href="/">Inicio</a>
          <span>›</span>
          <a href="/tienda">Tienda</a>
          <span>›</span>
          <a href={'/tienda?categoria=' + productoDemo.categoria}>{productoDemo.categoria}</a>
          <span>›</span>
          <span>{productoDemo.nombre}</span>
        </nav>

        {/* ===== SECCIÓN PRINCIPAL ===== */}
        <div className={styles.seccionPrincipal}>

          {/* Galería de imágenes */}
          <div className={styles.galeria}>
            <div className={styles.imagenPrincipal}>
              <img
                src={productoDemo.imagenes[imagenActiva]}
                alt={productoDemo.nombre}
              />
              {productoDemo.nuevo && (
                <span className={styles.badgeNuevo}>Nuevo</span>
              )}
            </div>
            <div className={styles.miniaturas}>
              {productoDemo.imagenes.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={'Vista ' + (index + 1)}
                  className={styles.miniatura + ' ' + (imagenActiva === index ? styles.miniaturaActiva : '')}
                  onClick={() => setImagenActiva(index)}
                />
              ))}
            </div>
          </div>

          {/* Info del producto */}
          <div className={styles.info}>

            <p className={styles.categoria}>{productoDemo.categoria}</p>
            <h1 className={styles.nombre}>{productoDemo.nombre}</h1>

            {/* Calificación */}
            <div className={styles.calificacionWrapper}>
              <div className={styles.estrellas}>
                {renderEstrellas(Math.round(productoDemo.calificacion))}
              </div>
              <span className={styles.calificacionNum}>{productoDemo.calificacion}</span>
              <span className={styles.totalReseñas}>({productoDemo.totalReseñas} reseñas)</span>
            </div>

            {/* Precio */}
            <div className={styles.precioWrapper}>
              <p className={styles.precio}>{formatPrecio(productoDemo.precio)}</p>
              {productoDemo.stock > 0 && productoDemo.stock <= 5 && (
                <span className={styles.pocasUnidades}>¡Solo quedan {productoDemo.stock}!</span>
              )}
            </div>

            {/* Stock */}
            <p className={productoDemo.stock > 0 ? styles.enStock : styles.sinStock}>
              {productoDemo.stock > 0 ? '✅ En stock (' + productoDemo.stock + ' disponibles)' : '❌ Sin stock'}
            </p>

            {/* Cantidad */}
            {productoDemo.stock > 0 && (
              <div className={styles.cantidadWrapper}>
                <span className={styles.cantidadLabel}>Cantidad:</span>
                <div className={styles.cantidadControl}>
                  <button onClick={() => handleCantidad('menos')} className={styles.btnCantidad}>−</button>
                  <span className={styles.cantidadNum}>{cantidad}</span>
                  <button onClick={() => handleCantidad('mas')} className={styles.btnCantidad}>+</button>
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className={styles.acciones}>
              <button
                className={styles.btnCarrito}
                disabled={productoDemo.stock === 0}
                onClick={() => alert('Agregado al carrito')}
              >
                🛒 Agregar al carrito
              </button>
              <button
                className={styles.btnComprar}
                disabled={productoDemo.stock === 0}
                onClick={() => alert('Comprar ahora')}
              >
                Comprar ahora
              </button>
              <button className={styles.btnCotizar} onClick={handleCotizar}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                Cotizar por WhatsApp
              </button>
              <button
                className={styles.btnFavorito + ' ' + (favorito ? styles.favoritoActivo : '')}
                onClick={() => setFavorito(!favorito)}
              >
                {favorito ? '❤️' : '🤍'} {favorito ? 'En favoritos' : 'Agregar a favoritos'}
              </button>
            </div>

            {/* Medios de pago */}
            <div className={styles.mediosPago}>
              <p className={styles.mediosPagoTitulo}>Medios de pago:</p>
              <div className={styles.mediosPagoIconos}>
                <div className={styles.medioPago}>
                  <span className={styles.medioPagoIcono}>💜</span>
                  <span>Nequi</span>
                </div>
                <div className={styles.medioPago}>
                  <span className={styles.medioPagoIcono}>🔴</span>
                  <span>Daviplata</span>
                </div>
                <div className={styles.medioPago}>
                  <span className={styles.medioPagoIcono}>💳</span>
                  <span>Tarjeta</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ===== TABS ===== */}
        <div className={styles.tabs}>
          <div className={styles.tabsNav}>
            {['descripcion', 'caracteristicas', 'resenas'].map((tab) => (
              <button
                key={tab}
                className={styles.tabBtn + ' ' + (tabActiva === tab ? styles.tabBtnActivo : '')}
                onClick={() => setTabActiva(tab)}
              >
                {tab === 'descripcion' && 'Descripción'}
                {tab === 'caracteristicas' && 'Características'}
                {tab === 'resenas' && 'Reseñas (' + productoDemo.totalReseñas + ')'}
              </button>
            ))}
          </div>

          <div className={styles.tabContenido}>

            {/* Descripción */}
            {tabActiva === 'descripcion' && (
              <div className={styles.descripcion}>
                <p>{productoDemo.descripcion}</p>
              </div>
            )}

            {/* Características */}
            {tabActiva === 'caracteristicas' && (
              <div className={styles.caracteristicas}>
                {Object.entries(productoDemo.caracteristicas).map(([clave, valor]) => (
                  <div key={clave} className={styles.caracteristica}>
                    <span className={styles.caracteristicaClave}>
                      {clave === 'luz' && '☀️ Luz'}
                      {clave === 'riego' && '💧 Riego'}
                      {clave === 'tamano' && '📏 Tamaño'}
                      {clave === 'clima' && '🌡️ Clima'}
                      {clave === 'tipo' && '🌱 Tipo'}
                      {clave === 'ubicacion' && '🏡 Ubicación'}
                      {clave === 'toxicidad' && '🐾 Toxicidad'}
                      {clave === 'floracion' && '🌼 Floración'}
                      {clave === 'nivel_cuidado' && '🧑‍🌾 Nivel de cuidado'}
                    </span>
                    <span className={styles.caracteristicaValor}>{valor}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Reseñas */}
            {tabActiva === 'resenas' && (
              <div className={styles.reseñas}>

                {/* Resumen de calificaciones */}
                <div className={styles.resumenCalificacion}>
                  <div className={styles.calificacionGrande}>
                    <span className={styles.numGrande}>{productoDemo.calificacion}</span>
                    <div className={styles.estrellas}>
                      {renderEstrellas(Math.round(productoDemo.calificacion))}
                    </div>
                    <span>{productoDemo.totalReseñas} reseñas</span>
                  </div>
                </div>

                {/* Lista de reseñas */}
                <div className={styles.listaReseñas}>
                  {reseñasDemo.map((resena) => (
                    <div key={resena.id} className={styles.resena}>
                      <div className={styles.resenaHeader}>
                        <div className={styles.resenaUsuario}>
                          <div className={styles.avatar}>
                            {resena.usuario.charAt(0)}
                          </div>
                          <div>
                            <p className={styles.resenaUsuarioNombre}>{resena.usuario}</p>
                            <p className={styles.resenaFecha}>{resena.fecha}</p>
                          </div>
                        </div>
                        <div className={styles.estrellas}>
                          {renderEstrellas(resena.calificacion)}
                        </div>
                      </div>
                      <p className={styles.resenaComentario}>{resena.comentario}</p>
                      {resena.foto && (
                        <img src={resena.foto} alt="Foto de la reseña" className={styles.resenaFoto} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Formulario nueva reseña */}
                <div className={styles.nuevaResena}>
                  <h4>Deja tu reseña</h4>
                  <div className={styles.estrellas} style={{ fontSize: '2rem' }}>
                    {renderEstrellas(miCalificacion, true)}
                  </div>
                  <textarea
                    className={styles.comentarioInput}
                    placeholder="Escribe tu comentario..."
                    value={miComentario}
                    onChange={(e) => setMiComentario(e.target.value)}
                    rows={4}
                  />
                  <div className={styles.fotoInput}>
                    <label className={styles.btnFoto}>
                      📷 Agregar foto
                      <input type="file" accept="image/*" onChange={handleFoto} hidden />
                    </label>
                    {miFoto && <img src={miFoto} alt="Preview" className={styles.fotoPreview} />}
                  </div>
                  <button className={styles.btnEnviarResena}>
                    Publicar reseña
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>

        {/* ===== PRODUCTOS RELACIONADOS ===== */}
        <section className={styles.relacionados}>
          <h2 className={styles.relacionadosTitulo}>También te puede interesar</h2>
          <div className={styles.relacionadosGrid}>
            {productosRelacionados.map((producto) => (
              <ProductCard
                key={producto.id}
                nombre={producto.nombre}
                precio={producto.precio}
                imagen={producto.imagen}
                stock={producto.stock}
                nuevo={producto.nuevo}
                onAgregarCarrito={() => alert('Agregar: ' + producto.nombre)}
                onFavorito={() => alert('Favorito: ' + producto.nombre)}
              />
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}

export default Producto
