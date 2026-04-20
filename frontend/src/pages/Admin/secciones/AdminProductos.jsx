import { useState, useEffect } from 'react'
import styles from './AdminSeccion.module.css'

const productoVacio = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  categoria_id: '',
  subcategoria_id: '',
  imagen_principal: '',
}

function AdminProductos({ API }) {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [subcategorias, setSubcategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [productoEditando, setProductoEditando] = useState(productoVacio)
  const [esNuevo, setEsNuevo] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [subiendoImagen, setSubiendoImagen] = useState(false)
  const [previewImagen, setPreviewImagen] = useState('')
  const token = localStorage.getItem('accessToken')

  useEffect(() => { cargarProductos(); cargarCategorias() }, [])

  const cargarProductos = async () => {
    setCargando(true)
    try {
      const res = await fetch(API + '/productos')
      const data = await res.json()
      setProductos(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err) }
    setCargando(false)
  }

  const cargarCategorias = async () => {
    try {
      const res = await fetch(API + '/categorias')
      const data = await res.json()
      setCategorias(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err) }
  }

  const cargarSubcategorias = async (categoriaId) => {
    if (!categoriaId) { setSubcategorias([]); return }
    try {
      const res = await fetch(API + '/subcategorias?categoria_id=' + categoriaId)
      const data = await res.json()
      setSubcategorias(Array.isArray(data) ? data : [])
    } catch (err) { console.error(err) }
  }

  const handleCategoriaChange = (e) => {
    const categoriaId = e.target.value
    setProductoEditando({ ...productoEditando, categoria_id: categoriaId, subcategoria_id: '' })
    cargarSubcategorias(categoriaId)
  }

  const abrirNuevo = () => {
    setProductoEditando(productoVacio)
    setPreviewImagen('')
    setSubcategorias([])
    setEsNuevo(true)
    setMensaje('')
    setModalAbierto(true)
  }

  const abrirEditar = (producto) => {
    setProductoEditando(producto)
    setPreviewImagen(producto.imagen_principal || '')
    if (producto.categoria_id) cargarSubcategorias(producto.categoria_id)
    setEsNuevo(false)
    setMensaje('')
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setProductoEditando(productoVacio)
    setPreviewImagen('')
    setMensaje('')
  }

  const handleChange = (e) => {
    setProductoEditando({ ...productoEditando, [e.target.name]: e.target.value })
  }

  const handleSubirImagen = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPreviewImagen(URL.createObjectURL(file))
    setSubiendoImagen(true)
    const formData = new FormData()
    formData.append('imagen', file)
    try {
      const res = await fetch(API + '/imagenes', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token },
        body: formData,
      })
      const data = await res.json()
      if (res.ok) {
        setProductoEditando((prev) => ({ ...prev, imagen_principal: data.url }))
        setMensaje('✅ Imagen subida correctamente')
      } else {
        setMensaje('❌ ' + (data.error || 'Error al subir imagen'))
      }
    } catch (err) {
      setMensaje('❌ Error de conexión')
    }
    setSubiendoImagen(false)
  }

  const guardarProducto = async () => {
    if (!productoEditando.nombre || !productoEditando.precio) {
      setMensaje('❌ Nombre y precio son obligatorios')
      return
    }
    setGuardando(true)
    try {
      const url = esNuevo ? API + '/productos' : API + '/productos/' + productoEditando.id
      const method = esNuevo ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify(productoEditando),
      })
      const data = await res.json()
      if (res.ok) {
        setMensaje('✅ Producto ' + (esNuevo ? 'creado' : 'actualizado') + ' exitosamente')
        cargarProductos()
        setTimeout(() => cerrarModal(), 1500)
      } else {
        setMensaje('❌ ' + (data.error || 'Error al guardar'))
      }
    } catch (err) {
      setMensaje('❌ Error de conexión')
    }
    setGuardando(false)
  }

  const eliminarProducto = async (id, nombre) => {
    if (!confirm('¿Eliminar "' + nombre + '"?')) return
    try {
      const res = await fetch(API + '/productos/' + id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token },
      })
      if (res.ok) cargarProductos()
    } catch (err) { console.error(err) }
  }

  const formatPrecio = (val) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val)

  if (cargando) return <div className={styles.cargando}>Cargando productos...</div>

  return (
    <div className={styles.seccion}>
      <div className={styles.seccionHeader}>
        <p className={styles.total}>{productos.length} productos registrados</p>
        <button className={styles.btnAgregar} onClick={abrirNuevo}>+ Agregar producto</button>
      </div>

      <div className={styles.tablaWrapper}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Imagen</th><th>Nombre</th><th>Categoría</th>
              <th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr><td colSpan="7" className={styles.sinDatos}>No hay productos. ¡Agrega el primero!</td></tr>
            ) : productos.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.imagen_principal
                    ? <img src={p.imagen_principal} alt={p.nombre} className={styles.tablaImagen} />
                    : <div className={styles.sinImagen}>🌱</div>
                  }
                </td>
                <td className={styles.tablaTexto}>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{formatPrecio(p.precio)}</td>
                <td>
                  <span className={p.stock === 0 ? styles.badgeSinStock : styles.badgeEnStock}>
                    {p.stock === 0 ? 'Sin stock' : p.stock + ' uds'}
                  </span>
                </td>
                <td>
                  <span className={p.estado === 'activo' ? styles.badgeActivo : styles.badgeInactivo}>
                    {p.estado}
                  </span>
                </td>
                <td>
                  <div className={styles.acciones}>
                    <button className={styles.btnEditar} onClick={() => abrirEditar(p)}>✏️</button>
                    <button className={styles.btnEliminar} onClick={() => eliminarProducto(p.id, p.nombre)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAbierto && (
        <div className={styles.modalOverlay} onClick={cerrarModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{esNuevo ? '➕ Nuevo producto' : '✏️ Editar producto'}</h3>
              <button className={styles.modalCerrar} onClick={cerrarModal}>✕</button>
            </div>
            <div className={styles.modalBody}>

              {/* Subida de imagen */}
              <div className={styles.imagenUpload}>
                {previewImagen
                  ? <img src={previewImagen} alt="Preview" className={styles.imagenPreview} />
                  : <div className={styles.imagenPlaceholder}><span>📷</span><p>Sin imagen</p></div>
                }
                <label className={styles.btnSubirImagen}>
                  {subiendoImagen ? '⏳ Subiendo...' : '📷 Subir imagen'}
                  <input type="file" accept="image/*" onChange={handleSubirImagen} hidden disabled={subiendoImagen} />
                </label>
                <p className={styles.imagenTip}>JPG, PNG o WEBP — máximo 5MB</p>
              </div>

              <div className={styles.campoGrupo}>
                <label>Nombre *</label>
                <input name="nombre" value={productoEditando.nombre} onChange={handleChange} placeholder="Nombre del producto" />
              </div>

              <div className={styles.campoDoble}>
                <div className={styles.campoGrupo}>
                  <label>Precio (COP) *</label>
                  <input name="precio" type="number" value={productoEditando.precio} onChange={handleChange} placeholder="25000" />
                </div>
                <div className={styles.campoGrupo}>
                  <label>Stock</label>
                  <input name="stock" type="number" value={productoEditando.stock} onChange={handleChange} placeholder="10" />
                </div>
              </div>

              <div className={styles.campoDoble}>
                <div className={styles.campoGrupo}>
                  <label>Categoría</label>
                  <select name="categoria_id" value={productoEditando.categoria_id} onChange={handleCategoriaChange}>
                    <option value="">Seleccionar categoría</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.campoGrupo}>
                  <label>Subcategoría</label>
                  <select name="subcategoria_id" value={productoEditando.subcategoria_id} onChange={handleChange} disabled={subcategorias.length === 0}>
                    <option value="">
                      {subcategorias.length === 0 ? 'Selecciona una categoría primero' : 'Seleccionar subcategoría'}
                    </option>
                    {subcategorias.map((sub) => (
                      <option key={sub.id} value={sub.id}>{sub.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.campoGrupo}>
                <label>Descripción</label>
                <textarea name="descripcion" value={productoEditando.descripcion} onChange={handleChange} rows={3} placeholder="Descripción del producto..." />
              </div>

              {mensaje && (
                <div className={mensaje.startsWith('✅') ? styles.mensajeExito : styles.mensajeError}>{mensaje}</div>
              )}
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnCancelar} onClick={cerrarModal}>Cancelar</button>
              <button className={styles.btnGuardar} onClick={guardarProducto} disabled={guardando || subiendoImagen}>
                {guardando ? 'Guardando...' : 'Guardar producto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProductos
