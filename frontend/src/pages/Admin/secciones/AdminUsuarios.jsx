import { useState, useEffect } from 'react'
import styles from './AdminSeccion.module.css'

function AdminUsuarios({ API }) {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [usuarioEditando, setUsuarioEditando] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const token = localStorage.getItem('accessToken')

  useEffect(() => { cargarUsuarios() }, [])

  const cargarUsuarios = async () => {
    setCargando(true)
    try {
      const res = await fetch(API + '/usuarios', {
        headers: { 'Authorization': 'Bearer ' + token }
      })
      const data = await res.json()
      setUsuarios(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error:', err)
    }
    setCargando(false)
  }

  const cambiarEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 'activo' ? 'bloqueado' : 'activo'
    if (!confirm('¿' + (nuevoEstado === 'bloqueado' ? 'Bloquear' : 'Activar') + ' esta cuenta?')) return
    try {
      const res = await fetch(API + '/usuarios/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ estado: nuevoEstado }),
      })
      if (res.ok) cargarUsuarios()
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const eliminarUsuario = async (id, nombre) => {
    if (!confirm('¿Eliminar la cuenta de "' + nombre + '"? Esta acción no se puede deshacer.')) return
    try {
      const res = await fetch(API + '/usuarios/' + id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token },
      })
      if (res.ok) cargarUsuarios()
    } catch (err) {
      console.error('Error:', err)
    }
  }

  if (cargando) return <div className={styles.cargando}>Cargando usuarios...</div>

  return (
    <div className={styles.seccion}>

      <div className={styles.seccionHeader}>
        <p className={styles.total}>{usuarios.length} usuarios registrados</p>
        <button className={styles.btnAgregar} onClick={() => setModalAbierto(true)}>
          + Crear cuenta
        </button>
      </div>

      <div className={styles.tablaWrapper}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="7" className={styles.sinDatos}>No hay usuarios registrados</td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.id}>
                  <td className={styles.tablaTexto}>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>{u.telefono || '—'}</td>
                  <td>
                    <span className={u.rol === 'admin' ? styles.badgeAdmin : styles.badgeUsuario}>
                      {u.rol === 'admin' ? '⚙️ Admin' : '👤 Usuario'}
                    </span>
                  </td>
                  <td>
                    <span className={u.estado === 'activo' ? styles.badgeActivo : styles.badgeInactivo}>
                      {u.estado}
                    </span>
                  </td>
                  <td>{u.created_at ? u.created_at.split('T')[0] : '—'}</td>
                  <td>
                    <div className={styles.acciones}>
                      <button
                        className={u.estado === 'activo' ? styles.btnBloquear : styles.btnActivar}
                        onClick={() => cambiarEstado(u.id, u.estado)}
                        title={u.estado === 'activo' ? 'Bloquear' : 'Activar'}
                      >
                        {u.estado === 'activo' ? '🔒' : '🔓'}
                      </button>
                      <button
                        className={styles.btnEliminar}
                        onClick={() => eliminarUsuario(u.id, u.nombre)}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
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

export default AdminUsuarios
