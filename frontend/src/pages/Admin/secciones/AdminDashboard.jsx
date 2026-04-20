import { useState, useEffect } from 'react'
import styles from './AdminSeccion.module.css'

function AdminDashboard({ API }) {
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalUsuarios: 0,
    totalOrdenes: 0,
    ingresosTotales: 0,
    productosSinStock: 0,
    ordenesPendientes: 0,
  })
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Por ahora usamos datos de prueba
    // Cuando tengamos más endpoints los conectamos
    setTimeout(() => {
      setStats({
        totalProductos: 6,
        totalUsuarios: 1,
        totalOrdenes: 0,
        ingresosTotales: 0,
        productosSinStock: 1,
        ordenesPendientes: 0,
      })
      setCargando(false)
    }, 500)
  }, [])

  const formatPrecio = (val) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val)

  if (cargando) return <div className={styles.cargando}>Cargando dashboard...</div>

  return (
    <div className={styles.seccion}>

      {/* Tarjetas de estadísticas */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcono} style={{ backgroundColor: '#e8f5e9' }}>🌱</div>
          <div>
            <p className={styles.statNum}>{stats.totalProductos}</p>
            <p className={styles.statLabel}>Productos</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcono} style={{ backgroundColor: '#e3f2fd' }}>👤</div>
          <div>
            <p className={styles.statNum}>{stats.totalUsuarios}</p>
            <p className={styles.statLabel}>Usuarios</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcono} style={{ backgroundColor: '#fff3e0' }}>🛒</div>
          <div>
            <p className={styles.statNum}>{stats.totalOrdenes}</p>
            <p className={styles.statLabel}>Órdenes</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcono} style={{ backgroundColor: '#f3e5f5' }}>💰</div>
          <div>
            <p className={styles.statNum}>{formatPrecio(stats.ingresosTotales)}</p>
            <p className={styles.statLabel}>Ingresos totales</p>
          </div>
        </div>
      </div>

      {/* Alertas */}
      {stats.productosSinStock > 0 && (
        <div className={styles.alerta}>
          ⚠️ Tienes <strong>{stats.productosSinStock}</strong> producto(s) sin stock. Actualiza el inventario.
        </div>
      )}

      {/* Accesos rápidos */}
      <div className={styles.accesoRapido}>
        <h3 className={styles.subtitulo}>Accesos rápidos</h3>
        <div className={styles.accesoGrid}>
          <div className={styles.accesoCard}>
            <span>🌱</span>
            <p>Agregar producto</p>
          </div>
          <div className={styles.accesoCard}>
            <span>📝</span>
            <p>Nuevo artículo</p>
          </div>
          <div className={styles.accesoCard}>
            <span>🖼️</span>
            <p>Editar banner</p>
          </div>
          <div className={styles.accesoCard}>
            <span>📞</span>
            <p>Ver mensajes</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard
