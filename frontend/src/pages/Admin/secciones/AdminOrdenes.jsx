// AdminOrdenes.jsx
import { useState, useEffect } from 'react'
import styles from './AdminSeccion.module.css'

export function AdminOrdenes({ API }) {
  const [ordenes, setOrdenes] = useState([])
  const [cargando, setCargando] = useState(true)
  const token = localStorage.getItem('accessToken')

  useEffect(() => { cargarOrdenes() }, [])

  const cargarOrdenes = async () => {
    setCargando(true)
    try {
      const res = await fetch(API + '/ordenes', {
        headers: { 'Authorization': 'Bearer ' + token }
      })
      const data = await res.json()
      setOrdenes(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err) }
    setCargando(false)
  }

  const cambiarEstado = async (id, estado) => {
    try {
      await fetch(API + '/ordenes/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ estado }),
      })
      cargarOrdenes()
    } catch (err) { console.error(err) }
  }

  const formatPrecio = (val) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val)

  if (cargando) return <div className={styles.cargando}>Cargando órdenes...</div>

  return (
    <div className={styles.seccion}>
      <div className={styles.seccionHeader}>
        <p className={styles.total}>{ordenes.length} órdenes en total</p>
      </div>
      <div className={styles.tablaWrapper}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Cambiar estado</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.length === 0 ? (
              <tr><td colSpan="6" className={styles.sinDatos}>No hay órdenes aún</td></tr>
            ) : (
              ordenes.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td className={styles.tablaTexto}>{o.cliente}</td>
                  <td>{formatPrecio(o.total)}</td>
                  <td>
                    <span className={styles['badge_' + o.estado] || styles.badgeActivo}>
                      {o.estado}
                    </span>
                  </td>
                  <td>{o.created_at ? o.created_at.split('T')[0] : '—'}</td>
                  <td>
                    <select
                      value={o.estado}
                      onChange={(e) => cambiarEstado(o.id, e.target.value)}
                      className={styles.selectEstado}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="pagado">Pagado</option>
                      <option value="enviado">Enviado</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminOrdenes
