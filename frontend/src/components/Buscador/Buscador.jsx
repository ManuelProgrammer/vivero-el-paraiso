import { useState } from 'react'
import styles from './Buscador.module.css'

const categorias = [
  { nombre: 'Plantas', icono: '🌱' },
  { nombre: 'Arboles', icono: '🌳' },
  { nombre: 'Flores', icono: '🌸' },
  { nombre: 'Herramientas', icono: '🛠️' },
  { nombre: 'Abonos', icono: '🌿' },
  { nombre: 'Fertilizantes', icono: '💧' },
]

function Buscador({ flotante = false }) {
  const [menuCategorias, setMenuCategorias] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')

  const handleBuscar = () => {
    if (busqueda.trim()) {
      window.location.href = '/tienda?buscar=' + busqueda + '&categoria=' + categoriaSeleccionada
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleBuscar()
  }

  return (
    <div className={styles.buscador + ' ' + (flotante ? styles.flotante : styles.normal)}>

      <div className={styles.categoriasWrapper}>
        <button
          className={styles.btnCategorias}
          onClick={() => setMenuCategorias(!menuCategorias)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          Categorias
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {menuCategorias && (
          <div className={styles.menuCategorias + ' ' + styles.menuAbajo}>
            {categorias.map(function(cat) {
              return (
                <a
                  key={cat.nombre}
                  href={'/tienda?categoria=' + cat.nombre.toLowerCase()}
                  className={styles.categoriaItem}
                  onClick={() => setMenuCategorias(false)}
                >
                  <span>{cat.icono}</span>
                  <span>{cat.nombre}</span>
                </a>
              )
            })}
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="Busca plantas, herramientas, abonos y mas..."
        className={styles.input}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <select
        className={styles.select}
        value={categoriaSeleccionada}
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
      >
        <option value="">Todas las categorias</option>
        {categorias.map(function(cat) {
          return (
            <option key={cat.nombre} value={cat.nombre.toLowerCase()}>
              {cat.icono} {cat.nombre}
            </option>
          )
        })}
      </select>

      <button className={styles.btnBuscar} onClick={handleBuscar}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        Buscar
      </button>

    </div>
  )
}

export default Buscador
