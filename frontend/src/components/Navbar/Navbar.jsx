import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

const categorias = [
  { nombre: 'Plantas', icono: '🌱', ruta: '/tienda?categoria=plantas' },
  { nombre: 'Árboles', icono: '🌳', ruta: '/tienda?categoria=arboles' },
  { nombre: 'Flores', icono: '🌸', ruta: '/tienda?categoria=flores' },
  { nombre: 'Herramientas', icono: '🛠️', ruta: '/tienda?categoria=herramientas' },
  { nombre: 'Abonos', icono: '🌿', ruta: '/tienda?categoria=abonos' },
  { nombre: 'Fertilizantes', icono: '💧', ruta: '/tienda?categoria=fertilizantes' },
]

function Navbar() {
  const navigate = useNavigate()
  const [menuMovil, setMenuMovil] = useState(false)
  const [scrollVisible, setScrollVisible] = useState(true)
  const [ultimoScroll, setUltimoScroll] = useState(0)

useEffect(() => {
  const handleScroll = () => {
    const scrollActual = window.scrollY

    if (scrollActual <= 0) {
      setScrollVisible(true)
      return
    }

    if (scrollActual < ultimoScroll) {
      // Scrolling hacia arriba — mostrar
      setScrollVisible(true)
    } else {
      // Scrolling hacia abajo — ocultar
      setScrollVisible(false)
    }

    setUltimoScroll(scrollActual)
  }

  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [ultimoScroll])

  const usuario = JSON.parse(localStorage.getItem('usuario'))

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuario')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/login')
  }

  const handleBuscar = () => {
    if (busqueda.trim()) {
      navigate(`/tienda?buscar=${busqueda}&categoria=${categoriaSeleccionada}`)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleBuscar()
  }

  return (
    <header className={`${styles.header} ${!scrollVisible ? styles.headerOculto : ''}`}>

      {/* ===== BARRA SUPERIOR ===== */}
      <div className={styles.topBar}>
        <div className={styles.topBarInfo}>
          <span>🕐 Lunes a Viernes 8am - 5pm</span>
          <span className={styles.separador}>|</span>
          <span>🚚 Envíos a todo Colombia</span>
        </div>
        <div className={styles.topBarRedes}>
          <a href="#" className={styles.redSocial} aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" className={styles.redSocial} aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="#" className={styles.redSocial} aria-label="WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.849L.057 23.428a.5.5 0 0 0 .609.61l5.652-1.48A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.52-5.166-1.427l-.371-.22-3.844 1.006 1.022-3.737-.242-.386A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </a>
          <a href="#" className={styles.redSocial} aria-label="TikTok">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
            </svg>
          </a>
          <a href="#" className={styles.redSocial} aria-label="YouTube">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
              <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ===== BARRA PRINCIPAL ===== */}
      <div className={styles.mainBar}>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img src="/logo_solo.png" alt="Vivero El Paraíso" />
          <div className={styles.logoTexto}>
            <span className={styles.logoNombre}>El Paraíso</span>
            <span className={styles.logoSlogan}>Tu Vivero Favorito</span>
          </div>
        </Link>

        {/* Navegación centrada */}
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Inicio</Link>
          <Link to="/tienda" className={styles.navLink}>Tienda</Link>
          <Link to="/blog" className={styles.navLink}>Blog</Link>
          <Link to="/soporte" className={styles.navLink}>Soporte</Link>
          {usuario && usuario.rol === 'admin' && (
            <Link to="/admin" className={styles.navLinkAdmin}>⚙️ Admin</Link>
          )}
        </nav>

        {/* Acciones — siempre visibles */}
        <div className={styles.acciones}>
          <Link to="/favoritos" className={styles.btnAccion} title="Favoritos">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </Link>

          <Link to="/carrito" className={styles.btnCarrito} title="Carrito">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span className={styles.carritoCount}>0</span>
          </Link>

          {usuario ? (
          <div className={styles.usuarioMenu}>
            <span className={styles.usuarioNombre}>👤 {usuario.nombre}</span>
            <div className={styles.usuarioDropdown}>
              <Link to="/perfil">Mi Perfil</Link>
              <button onClick={handleCerrarSesion}>Cerrar Sesión</button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/registro" className={styles.btnRegistro}>
              Registrarse
            </Link>
            <Link to="/login" className={styles.btnLogin}>
              Iniciar Sesión 👤
            </Link>
          </>
        )}
        </div>

        {/* Botón menú móvil */}
        <button
          className={styles.btnMenuMovil}
          onClick={() => setMenuMovil(!menuMovil)}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      {/* ===== MENÚ MÓVIL ===== */}
      {menuMovil && (
        <div className={styles.menuMovil}>
          <Link to="/" onClick={() => setMenuMovil(false)}>Inicio</Link>
          <Link to="/tienda" onClick={() => setMenuMovil(false)}>Tienda</Link>
          <Link to="/blog" onClick={() => setMenuMovil(false)}>Blog</Link>
          <Link to="/soporte" onClick={() => setMenuMovil(false)}>Soporte</Link>
          {!usuario && (
            <Link to="/login" onClick={() => setMenuMovil(false)}>Login / Registro</Link>
          )}
          {usuario && (
            <>
              <Link to="/perfil" onClick={() => setMenuMovil(false)}>Mi Perfil</Link>
              <button onClick={handleCerrarSesion}>Cerrar Sesión</button>
            </>
          )}
        </div>
      )}

    </header>
  )
}

export default Navbar
