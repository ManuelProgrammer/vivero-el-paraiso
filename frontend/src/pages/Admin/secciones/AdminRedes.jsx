import { useState, useEffect } from 'react'
import styles from './AdminSeccion.module.css'

// ===== ADMIN REDES SOCIALES =====
export function AdminRedes({ API }) {
  const [redes, setRedes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [nueva, setNueva] = useState({ nombre: '', url: '', icono: '', orden: '' })
  const [mensaje, setMensaje] = useState('')
  const token = localStorage.getItem('accessToken')

  useEffect(() => { cargarRedes() }, [])

  const cargarRedes = async () => {
    setCargando(true)
    try {
      const res = await fetch(API + '/redes')
      const data = await res.json()
      setRedes(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err) }
    setCargando(false)
  }

  const agregar = async () => {
    if (!nueva.nombre || !nueva.url) { setMensaje('❌ Nombre y URL son obligatorios'); return }
    try {
      const res = await fetch(API + '/redes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify(nueva),
      })
      if (res.ok) { setMensaje('✅ Red social agregada'); setNueva({ nombre: '', url: '', icono: '', orden: '' }); cargarRedes() }
    } catch (err) { setMensaje('❌ Error') }
  }

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar esta red social?')) return
    try {
      await fetch(API + '/redes/' + id, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token } })
      cargarRedes()
    } catch (err) { console.error(err) }
  }

  if (cargando) return <div className={styles.cargando}>Cargando redes sociales...</div>

  return (
    <div className={styles.seccion}>
      <div className={styles.tablaWrapper}>
        <table className={styles.tabla}>
          <thead><tr><th>Red Social</th><th>URL</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {redes.length === 0 ? (
              <tr><td colSpan="4" className={styles.sinDatos}>No hay redes sociales configuradas</td></tr>
            ) : redes.map((r) => (
              <tr key={r.id}>
                <td>{r.nombre}</td>
                <td className={styles.tablaTexto}>{r.url}</td>
                <td><span className={r.estado === 'activo' ? styles.badgeActivo : styles.badgeInactivo}>{r.estado}</span></td>
                <td><button className={styles.btnEliminar} onClick={() => eliminar(r.id)}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.formAgregar}>
        <h4>Agregar red social</h4>
        <div className={styles.campoDoble}>
          <div className={styles.campoGrupo}><label>Nombre *</label><input value={nueva.nombre} onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })} placeholder="Facebook" /></div>
          <div className={styles.campoGrupo}><label>URL *</label><input value={nueva.url} onChange={(e) => setNueva({ ...nueva, url: e.target.value })} placeholder="https://facebook.com/..." /></div>
        </div>
        {mensaje && <div className={mensaje.startsWith('✅') ? styles.mensajeExito : styles.mensajeError}>{mensaje}</div>}
        <button className={styles.btnAgregar} onClick={agregar}>+ Agregar</button>
      </div>
    </div>
  )
}

export default AdminRedes