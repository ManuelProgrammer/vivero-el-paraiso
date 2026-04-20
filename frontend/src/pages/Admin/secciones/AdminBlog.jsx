import { useState, useEffect } from 'react'
import styles from './AdminSeccion.module.css'

// ===== ADMIN BLOG =====
export function AdminBlog({ API }) {
  const [articulos, setArticulos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [articulo, setArticulo] = useState({ titulo: '', contenido: '', imagen_portada: '', estado: 'borrador' })
  const [esNuevo, setEsNuevo] = useState(true)
  const [mensaje, setMensaje] = useState('')
  const token = localStorage.getItem('accessToken')
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  useEffect(() => { cargarArticulos() }, [])

  const cargarArticulos = async () => {
    setCargando(true)
    try {
      const res = await fetch(API + '/blog')
      const data = await res.json()
      setArticulos(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err) }
    setCargando(false)
  }

  const guardar = async () => {
    if (!articulo.titulo || !articulo.contenido) {
      setMensaje('❌ Título y contenido son obligatorios')
      return
    }
    try {
      const url = esNuevo ? API + '/blog' : API + '/blog/' + articulo.id
      const method = esNuevo ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ ...articulo, autor_id: usuario?.id }),
      })
      if (res.ok) {
        setMensaje('✅ Artículo guardado')
        cargarArticulos()
        setTimeout(() => { setModalAbierto(false); setMensaje('') }, 1500)
      }
    } catch (err) { setMensaje('❌ Error de conexión') }
  }

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar este artículo?')) return
    try {
      await fetch(API + '/blog/' + id, { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token } })
      cargarArticulos()
    } catch (err) { console.error(err) }
  }

  if (cargando) return <div className={styles.cargando}>Cargando blog...</div>

  return (
    <div className={styles.seccion}>
      <div className={styles.seccionHeader}>
        <p className={styles.total}>{articulos.length} artículos</p>
        <button className={styles.btnAgregar} onClick={() => { setArticulo({ titulo: '', contenido: '', imagen_portada: '', estado: 'borrador' }); setEsNuevo(true); setModalAbierto(true) }}>
          + Nuevo artículo
        </button>
      </div>
      <div className={styles.tablaWrapper}>
        <table className={styles.tabla}>
          <thead><tr><th>Título</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr></thead>
          <tbody>
            {articulos.length === 0 ? (
              <tr><td colSpan="4" className={styles.sinDatos}>No hay artículos</td></tr>
            ) : articulos.map((a) => (
              <tr key={a.id}>
                <td className={styles.tablaTexto}>{a.titulo}</td>
                <td><span className={a.estado === 'publicado' ? styles.badgeActivo : styles.badgeInactivo}>{a.estado}</span></td>
                <td>{a.created_at ? a.created_at.split('T')[0] : '—'}</td>
                <td>
                  <div className={styles.acciones}>
                    <button className={styles.btnEditar} onClick={() => { setArticulo(a); setEsNuevo(false); setModalAbierto(true) }}>✏️</button>
                    <button className={styles.btnEliminar} onClick={() => eliminar(a.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalAbierto && (
        <div className={styles.modalOverlay} onClick={() => setModalAbierto(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{esNuevo ? '➕ Nuevo artículo' : '✏️ Editar artículo'}</h3>
              <button className={styles.modalCerrar} onClick={() => setModalAbierto(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.campoGrupo}><label>Título *</label><input value={articulo.titulo} onChange={(e) => setArticulo({ ...articulo, titulo: e.target.value })} placeholder="Título del artículo" /></div>
              <div className={styles.campoGrupo}><label>Imagen de portada (URL)</label><input value={articulo.imagen_portada} onChange={(e) => setArticulo({ ...articulo, imagen_portada: e.target.value })} placeholder="https://..." /></div>
              <div className={styles.campoGrupo}><label>Estado</label><select value={articulo.estado} onChange={(e) => setArticulo({ ...articulo, estado: e.target.value })}><option value="borrador">Borrador</option><option value="publicado">Publicado</option></select></div>
              <div className={styles.campoGrupo}><label>Contenido *</label><textarea value={articulo.contenido} onChange={(e) => setArticulo({ ...articulo, contenido: e.target.value })} rows={6} placeholder="Escribe el contenido..." /></div>
              {mensaje && <div className={mensaje.startsWith('✅') ? styles.mensajeExito : styles.mensajeError}>{mensaje}</div>}
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnCancelar} onClick={() => setModalAbierto(false)}>Cancelar</button>
              <button className={styles.btnGuardar} onClick={guardar}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBlog