import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Admin.module.css'

// Secciones del panel
import AdminDashboard from './secciones/AdminDashboard'
import AdminProductos from './secciones/AdminProductos'
import AdminUsuarios from './secciones/AdminUsuarios'
import AdminOrdenes from './secciones/AdminOrdenes'
import AdminBlog from './secciones/AdminBlog'
import AdminBanner from './secciones/AdminBanner'
import AdminRedes from './secciones/AdminRedes'
import AdminSoporte from './secciones/AdminSoporte'
import AdminConfiguracion from './secciones/AdminConfiguracion'

const menuItems = [
  { id: 'dashboard', icono: '📊', label: 'Dashboard' },
  { id: 'productos', icono: '🌱', label: 'Productos' },
  { id: 'usuarios', icono: '👤', label: 'Usuarios' },
  { id: 'ordenes', icono: '🛒', label: 'Órdenes' },
  { id: 'blog', icono: '📝', label: 'Blog' },
  { id: 'banner', icono: '🖼️', label: 'Banner' },
  { id: 'redes', icono: '🌐', label: 'Redes Sociales' },
  { id: 'soporte', icono: '📞', label: 'Soporte' },
  { id: 'configuracion', icono: '⚙️', label: 'Configuración' },
]

const API = 'http://localhost/vivero-el-paraiso/backend/api'

function Admin() {
  const navigate = useNavigate()
  const [seccionActiva, setSeccionActiva] = useState('dashboard')
  const [sidebarAbierto, setSidebarAbierto] = useState(true)
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  useEffect(() => {
    if (!usuario || usuario.rol !== 'admin') {
      navigate('/')
    }
  }, [])

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuario')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/login')
  }

  const renderSeccion = () => {
    switch (seccionActiva) {
      case 'dashboard': return <AdminDashboard API={API} />
      case 'productos': return <AdminProductos API={API} />
      case 'usuarios': return <AdminUsuarios API={API} />
      case 'ordenes': return <AdminOrdenes API={API} />
      case 'blog': return <AdminBlog API={API} />
      case 'banner': return <AdminBanner API={API} />
      case 'redes': return <AdminRedes API={API} />
      case 'soporte': return <AdminSoporte API={API} />
      case 'configuracion': return <AdminConfiguracion API={API} />
      default: return <AdminDashboard API={API} />
    }
  }

  return (
    <div className={styles.admin}>

      {/* ===== SIDEBAR ===== */}
      <aside className={styles.sidebar + ' ' + (!sidebarAbierto ? styles.sidebarCerrado : '')}>

        {/* Logo */}
        <div className={styles.sidebarLogo}>
          <img src="/logo_solo.png" alt="Logo" className={styles.logoImg} />
          {sidebarAbierto && (
            <div>
              <p className={styles.logoNombre}>El Paraíso</p>
              <p className={styles.logoRol}>Panel Admin</p>
            </div>
          )}
        </div>

        {/* Menú */}
        <nav className={styles.menu}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={styles.menuItem + ' ' + (seccionActiva === item.id ? styles.menuItemActivo : '')}
              onClick={() => setSeccionActiva(item.id)}
              title={!sidebarAbierto ? item.label : ''}
            >
              <span className={styles.menuIcono}>{item.icono}</span>
              {sidebarAbierto && <span className={styles.menuLabel}>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer sidebar */}
        <div className={styles.sidebarFooter}>
          <button className={styles.btnCerrarSesion} onClick={handleCerrarSesion}>
            <span>🚪</span>
            {sidebarAbierto && <span>Cerrar Sesión</span>}
          </button>
        </div>

      </aside>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <div className={styles.contenido}>

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerIzquierda}>
            <button
              className={styles.btnToggle}
              onClick={() => setSidebarAbierto(!sidebarAbierto)}
              title="Colapsar menú"
            >
              ☰
            </button>
            <h1 className={styles.headerTitulo}>
              {menuItems.find((m) => m.id === seccionActiva)?.icono}{' '}
              {menuItems.find((m) => m.id === seccionActiva)?.label}
            </h1>
          </div>
          <div className={styles.headerDerecha}>
            <span className={styles.usuarioNombre}>👤 {usuario?.nombre}</span>
            <a href="/" className={styles.btnVerSitio} target="_blank">
              🌐 Ver sitio
            </a>
          </div>
        </header>

        {/* Sección activa */}
        <main className={styles.main}>
          {renderSeccion()}
        </main>

      </div>
    </div>
  )
}

export default Admin
