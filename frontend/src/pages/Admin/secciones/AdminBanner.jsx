import { useState, useEffect } from 'react'
import styles from './AdminSeccion.module.css'

// ===== ADMIN BANNER =====
export function AdminBanner({ API }) {
  const [imagenes, setImagenes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [nueva, setNueva] = useState({ url: '', descripcion: '', orden: '' })
  const [mensaje, setMensaje] = useState('')
  const token = localStorage.getItem('accessToken')

  useEffect(() => { cargarBanner() }, [])

  const cargarBanner = async () => {
    setCargando(true)
    try {
      const res = await fetch(API + '/banner')
      const data = await res.json()
      setImagenes(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err) }
    setCargando(false)
  }

  const agregar = async () => {
    if (!nueva.url) { setMensaje('❌ La URL es obligatoria'); return }
    try {
      const res = await fetch(API + '/banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify(nueva),
      })
      if (res.ok) { setMensaje('✅ Imagen agregada'); setNueva({ url: '', descripcion: '', orden: '' }); cargarBanner() }
    } catch (err) { setMensaje('❌ Error') }
  }

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar esta imagen del banner?')) return
    try {
      await fetch(API + '/banner/' + id, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token } })
      cargarBanner()
    } catch (err) { console.error(err) }
  }

  if (cargando) return <div className={styles.cargando}>Cargando banner...</div>

  return (
    <div className={styles.seccion}>
      <div className={styles.bannerGrid}>
        {imagenes.map((img) => (
          <div key={img.id} className={styles.bannerCard}>
            <img src={img.url} alt={img.descripcion} className={styles.bannerImagen} />
            <div className={styles.bannerInfo}>
              <p>{img.descripcion || 'Sin descripción'}</p>
              <button className={styles.btnEliminar} onClick={() => eliminar(img.id)}>🗑️ Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.formAgregar}>
        <h4>Agregar nueva imagen</h4>
        <div className={styles.campoGrupo}><label>URL de la imagen *</label><input value={nueva.url} onChange={(e) => setNueva({ ...nueva, url: e.target.value })} placeholder="https://..." /></div>
        <div className={styles.campoDoble}>
          <div className={styles.campoGrupo}><label>Descripción</label><input value={nueva.descripcion} onChange={(e) => setNueva({ ...nueva, descripcion: e.target.value })} placeholder="Descripción..." /></div>
          <div className={styles.campoGrupo}><label>Orden</label><input type="number" value={nueva.orden} onChange={(e) => setNueva({ ...nueva, orden: e.target.value })} placeholder="1" /></div>
        </div>
        {mensaje && <div className={mensaje.startsWith('✅') ? styles.mensajeExito : styles.mensajeError}>{mensaje}</div>}
        <button className={styles.btnAgregar} onClick={agregar}>+ Agregar imagen</button>
      </div>
    </div>
  )
}

export default AdminBanner