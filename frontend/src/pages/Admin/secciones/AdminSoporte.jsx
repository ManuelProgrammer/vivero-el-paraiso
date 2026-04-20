import { useState, useEffect } from 'react'
import styles from './AdminSeccion.module.css'

// ===== ADMIN SOPORTE =====
export function AdminSoporte({ API }) {
  const [mensajes, setMensajes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [seleccionado, setSeleccionado] = useState(null)
  const token = localStorage.getItem('accessToken')

  useEffect(() => { cargarMensajes() }, [])

  const cargarMensajes = async () => {
    setCargando(true)
    try {
      const res = await fetch(API + '/soporte', { headers: { 'Authorization': 'Bearer ' + token } })
      const data = await res.json()
      setMensajes(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err) }
    setCargando(false)
  }

  if (cargando) return <div className={styles.cargando}>Cargando mensajes...</div>

  return (
    <div className={styles.seccion}>
      <div className={styles.seccionHeader}>
        <p className={styles.total}>{mensajes.length} mensajes recibidos</p>
      </div>
      <div className={styles.tablaWrapper}>
        <table className={styles.tabla}>
          <thead><tr><th>Nombre</th><th>Email</th><th>Asunto</th><th>Estado</th><th>Fecha</th><th>Ver</th></tr></thead>
          <tbody>
            {mensajes.length === 0 ? (
              <tr><td colSpan="6" className={styles.sinDatos}>No hay mensajes de soporte</td></tr>
            ) : mensajes.map((m) => (
              <tr key={m.id}>
                <td className={styles.tablaTexto}>{m.nombre}</td>
                <td>{m.email}</td>
                <td>{m.asunto}</td>
                <td><span className={m.estado === 'nuevo' ? styles.badgeSinStock : m.estado === 'leído' ? styles.badgeUsuario : styles.badgeActivo}>{m.estado}</span></td>
                <td>{m.created_at ? m.created_at.split('T')[0] : '—'}</td>
                <td><button className={styles.btnEditar} onClick={() => setSeleccionado(m)}>👁️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {seleccionado && (
        <div className={styles.modalOverlay} onClick={() => setSeleccionado(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>📩 {seleccionado.asunto}</h3>
              <button className={styles.modalCerrar} onClick={() => setSeleccionado(null)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <p><strong>De:</strong> {seleccionado.nombre} ({seleccionado.email})</p>
              <p><strong>Fecha:</strong> {seleccionado.created_at}</p>
              <hr />
              <p style={{ marginTop: '16px', lineHeight: '1.6' }}>{seleccionado.mensaje}</p>
            </div>
            <div className={styles.modalFooter}>
              <a href={'mailto:' + seleccionado.email} className={styles.btnGuardar}>📧 Responder por email</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export default AdminSoporte