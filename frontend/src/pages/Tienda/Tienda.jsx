import { useState, useMemo } from 'react'
import styles from './Tienda.module.css'
import Buscador from '../../components/Buscador/Buscador'
import ProductCard from '../../components/ProductCard/ProductCard'

const productosDemo = [
  { id: 1, nombre: 'Rosa Roja', precio: 15000, imagen: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400', categoria: 'Flores', stock: 10, luz: 'sol', riego: 'medio', nivel_cuidado: 'fácil', nuevo: true, vendidos: 45 },
  { id: 2, nombre: 'Helecho Boston', precio: 25000, imagen: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400', categoria: 'Plantas', stock: 5, luz: 'sombra', riego: 'alto', nivel_cuidado: 'intermedio', nuevo: false, vendidos: 30 },
  { id: 3, nombre: 'Cactus Barrel', precio: 18000, imagen: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400', categoria: 'Plantas', stock: 0, luz: 'sol', riego: 'bajo', nivel_cuidado: 'fácil', nuevo: false, vendidos: 20 },
  { id: 4, nombre: 'Orquídea Phalaenopsis', precio: 45000, imagen: 'https://images.unsplash.com/photo-1566907225472-514215c9e6e9?w=400', categoria: 'Flores', stock: 8, luz: 'semisombra', riego: 'medio', nivel_cuidado: 'difícil', nuevo: true, vendidos: 60 },
  { id: 5, nombre: 'Pala de Jardín', precio: 35000, imagen: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', categoria: 'Herramientas', stock: 20, luz: null, riego: null, nivel_cuidado: null, nuevo: false, vendidos: 15 },
  { id: 6, nombre: 'Abono Orgánico 5kg', precio: 22000, imagen: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=400', categoria: 'Abonos', stock: 15, luz: null, riego: null, nivel_cuidado: null, nuevo: true, vendidos: 25 },
]

const PRECIO_MIN = 0
const PRECIO_MAX = 100000

const filtrosDisponibles = {
  luz: ['sol', 'sombra', 'semisombra'],
  riego: ['bajo', 'medio', 'alto'],
  nivel_cuidado: ['fácil', 'intermedio', 'difícil'],
}

const opcionesOrden = [
  { valor: 'relevancia', label: 'Relevancia' },
  { valor: 'precio_asc', label: 'Precio: Menor a Mayor' },
  { valor: 'precio_desc', label: 'Precio: Mayor a Menor' },
  { valor: 'nombre_az', label: 'Nombre: A → Z' },
  { valor: 'nombre_za', label: 'Nombre: Z → A' },
  { valor: 'mas_vendidos', label: 'Más Vendidos' },
  { valor: 'nuevos', label: 'Nuevos' },
]

function Tienda() {
  const [filtros, setFiltros] = useState({ luz: [], riego: [], nivel_cuidado: [] })
  const [categoriaActiva, setCategoriaActiva] = useState('')
  const [soloDisponibles, setSoloDisponibles] = useState(false)
  const [orden, setOrden] = useState('relevancia')
  const [precioMin, setPrecioMin] = useState(PRECIO_MIN)
  const [precioMax, setPrecioMax] = useState(PRECIO_MAX)
  const [inputMin, setInputMin] = useState(PRECIO_MIN)
  const [inputMax, setInputMax] = useState(PRECIO_MAX)

  const toggleFiltro = (tipo, valor) => {
    setFiltros((prev) => {
      const lista = prev[tipo]
      return {
        ...prev,
        [tipo]: lista.includes(valor)
          ? lista.filter((v) => v !== valor)
          : [...lista, valor],
      }
    })
  }

  const handleSliderMin = (e) => {
    const val = Math.min(Number(e.target.value), precioMax - 5000)
    setPrecioMin(val)
    setInputMin(val)
  }

  const handleSliderMax = (e) => {
    const val = Math.max(Number(e.target.value), precioMin + 5000)
    setPrecioMax(val)
    setInputMax(val)
  }

  const handleInputMin = (e) => {
    const val = Number(e.target.value)
    setInputMin(val)
    if (val >= PRECIO_MIN && val < precioMax) setPrecioMin(val)
  }

  const handleInputMax = (e) => {
    const val = Number(e.target.value)
    setInputMax(val)
    if (val <= PRECIO_MAX && val > precioMin) setPrecioMax(val)
  }

  const limpiarFiltros = () => {
    setFiltros({ luz: [], riego: [], nivel_cuidado: [] })
    setCategoriaActiva('')
    setSoloDisponibles(false)
    setPrecioMin(PRECIO_MIN)
    setPrecioMax(PRECIO_MAX)
    setInputMin(PRECIO_MIN)
    setInputMax(PRECIO_MAX)
    setOrden('relevancia')
  }

  const productosFiltrados = useMemo(() => {
    let lista = productosDemo.filter((p) => {
      if (categoriaActiva && p.categoria !== categoriaActiva) return false
      if (soloDisponibles && p.stock === 0) return false
      if (p.precio < precioMin || p.precio > precioMax) return false
      if (filtros.luz.length > 0 && !filtros.luz.includes(p.luz)) return false
      if (filtros.riego.length > 0 && !filtros.riego.includes(p.riego)) return false
      if (filtros.nivel_cuidado.length > 0 && !filtros.nivel_cuidado.includes(p.nivel_cuidado)) return false
      return true
    })

    switch (orden) {
      case 'precio_asc': return [...lista].sort((a, b) => a.precio - b.precio)
      case 'precio_desc': return [...lista].sort((a, b) => b.precio - a.precio)
      case 'nombre_az': return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre))
      case 'nombre_za': return [...lista].sort((a, b) => b.nombre.localeCompare(a.nombre))
      case 'mas_vendidos': return [...lista].sort((a, b) => b.vendidos - a.vendidos)
      case 'nuevos': return [...lista].sort((a, b) => b.nuevo - a.nuevo)
      default: return lista
    }
  }, [filtros, categoriaActiva, soloDisponibles, precioMin, precioMax, orden])

  const formatPrecio = (val) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val)

  return (
    <main className={styles.main}>

      {/* Buscador */}
      <div className={styles.buscadorWrapper}>
        <Buscador flotante={false} />
      </div>

      <div className={styles.contenedor}>

        {/* ===== SIDEBAR ===== */}
        <aside className={styles.sidebar}>
          <div className={styles.filtrosHeader}>
            <h3>Filtros</h3>
            <button onClick={limpiarFiltros} className={styles.btnLimpiar}>Limpiar</button>
          </div>

          {/* Categorías */}
          <div className={styles.filtroGrupo}>
            <h4 className={styles.filtroTitulo}>📦 Categoría</h4>
            {['Plantas', 'Árboles', 'Flores', 'Herramientas', 'Abonos', 'Fertilizantes'].map((cat) => (
              <button
                key={cat}
                className={styles.filtroBtn + ' ' + (categoriaActiva === cat ? styles.filtroBtnActivo : '')}
                onClick={() => setCategoriaActiva(categoriaActiva === cat ? '' : cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Disponibilidad */}
          <div className={styles.filtroGrupo}>
            <h4 className={styles.filtroTitulo}>📦 Disponibilidad</h4>
            <label className={styles.filtroLabel}>
              <input
                type="checkbox"
                checked={soloDisponibles}
                onChange={() => setSoloDisponibles(!soloDisponibles)}
              />
              Solo productos con stock
            </label>
          </div>

          {/* Precio */}
          <div className={styles.filtroGrupo}>
            <h4 className={styles.filtroTitulo}>💰 Precio</h4>
            <div className={styles.sliderWrapper}>
              <div className={styles.sliderTrack}>
                <input
                  type="range"
                  min={PRECIO_MIN}
                  max={PRECIO_MAX}
                  step={1000}
                  value={precioMin}
                  onChange={handleSliderMin}
                  className={styles.sliderMin}
                />
                <input
                  type="range"
                  min={PRECIO_MIN}
                  max={PRECIO_MAX}
                  step={1000}
                  value={precioMax}
                  onChange={handleSliderMax}
                  className={styles.sliderMax}
                />
              </div>
              <div className={styles.precioLabels}>
                <span>{formatPrecio(precioMin)}</span>
                <span>{formatPrecio(precioMax)}</span>
              </div>
            </div>
            <div className={styles.precioInputs}>
              <div className={styles.precioInputWrapper}>
                <span>Mín</span>
                <input
                  type="number"
                  value={inputMin}
                  onChange={handleInputMin}
                  className={styles.precioInput}
                  min={PRECIO_MIN}
                  max={PRECIO_MAX}
                />
              </div>
              <span className={styles.precioSeparador}>—</span>
              <div className={styles.precioInputWrapper}>
                <span>Máx</span>
                <input
                  type="number"
                  value={inputMax}
                  onChange={handleInputMax}
                  className={styles.precioInput}
                  min={PRECIO_MIN}
                  max={PRECIO_MAX}
                />
              </div>
            </div>
          </div>

          {/* Luz */}
          <div className={styles.filtroGrupo}>
            <h4 className={styles.filtroTitulo}>☀️ Luz</h4>
            {filtrosDisponibles.luz.map((valor) => (
              <label key={valor} className={styles.filtroLabel}>
                <input
                  type="checkbox"
                  checked={filtros.luz.includes(valor)}
                  onChange={() => toggleFiltro('luz', valor)}
                />
                {valor.charAt(0).toUpperCase() + valor.slice(1)}
              </label>
            ))}
          </div>

          {/* Riego */}
          <div className={styles.filtroGrupo}>
            <h4 className={styles.filtroTitulo}>💧 Riego</h4>
            {filtrosDisponibles.riego.map((valor) => (
              <label key={valor} className={styles.filtroLabel}>
                <input
                  type="checkbox"
                  checked={filtros.riego.includes(valor)}
                  onChange={() => toggleFiltro('riego', valor)}
                />
                {valor.charAt(0).toUpperCase() + valor.slice(1)}
              </label>
            ))}
          </div>

          {/* Nivel cuidado */}
          <div className={styles.filtroGrupo}>
            <h4 className={styles.filtroTitulo}>🧑‍🌾 Nivel de cuidado</h4>
            {filtrosDisponibles.nivel_cuidado.map((valor) => (
              <label key={valor} className={styles.filtroLabel}>
                <input
                  type="checkbox"
                  checked={filtros.nivel_cuidado.includes(valor)}
                  onChange={() => toggleFiltro('nivel_cuidado', valor)}
                />
                {valor.charAt(0).toUpperCase() + valor.slice(1)}
              </label>
            ))}
          </div>
        </aside>

        {/* ===== PRODUCTOS ===== */}
        <section className={styles.productos}>

          {/* Header con ordenador */}
          <div className={styles.productosHeader}>
            <p className={styles.totalProductos}>
              <strong>{productosFiltrados.length}</strong> productos encontrados
            </p>
            <div className={styles.ordenWrapper}>
              <label className={styles.ordenLabel}>Ordenar por:</label>
              <select
                className={styles.ordenSelect}
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
              >
                {opcionesOrden.map((op) => (
                  <option key={op.valor} value={op.valor}>{op.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {productosFiltrados.length === 0 ? (
            <div className={styles.sinResultados}>
              <p>😔 No encontramos productos con esos filtros</p>
              <button onClick={limpiarFiltros} className={styles.btnLimpiarGrande}>
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {productosFiltrados.map((producto) => (
                <ProductCard
                  key={producto.id}
                  nombre={producto.nombre}
                  precio={producto.precio}
                  imagen={producto.imagen}
                  stock={producto.stock}
                  nuevo={producto.nuevo}
                  onAgregarCarrito={() => alert('Agregar: ' + producto.nombre)}
                  onFavorito={() => alert('Favorito: ' + producto.nombre)}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  )
}

export default Tienda
