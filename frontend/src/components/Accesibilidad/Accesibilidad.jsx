import { useState, useEffect } from 'react'
import styles from './Accesibilidad.module.css'

const opcionesDaltonismo = [
  { valor: 'none', label: 'Normal' },
  { valor: 'protanopia', label: 'Protanopia (rojo)' },
  { valor: 'deuteranopia', label: 'Deuteranopia (verde)' },
  { valor: 'tritanopia', label: 'Tritanopia (azul)' },
]

function Accesibilidad() {
  const [abierto, setAbierto] = useState(false)
  const [config, setConfig] = useState({
    tamanoTexto: 100,
    altoContraste: false,
    modoOscuro: false,
    espaciadoTexto: false,
    daltonismo: 'none',
  })

  // Aplicar cambios al documento
  useEffect(() => {
    const root = document.documentElement

    // Tamaño de texto
    root.style.fontSize = config.tamanoTexto + '%'

    // Alto contraste
    if (config.altoContraste) {
      root.classList.add('alto-contraste')
    } else {
      root.classList.remove('alto-contraste')
    }

    // Modo oscuro
    if (config.modoOscuro) {
      root.classList.add('modo-oscuro')
    } else {
      root.classList.remove('modo-oscuro')
    }

    // Espaciado de texto
    if (config.espaciadoTexto) {
      root.classList.add('espaciado-texto')
    } else {
      root.classList.remove('espaciado-texto')
    }

    // Daltonismo
    root.setAttribute('data-daltonismo', config.daltonismo)

  }, [config])

  const cambiar = (clave, valor) => {
    setConfig((prev) => ({ ...prev, [clave]: valor }))
  }

  const resetear = () => {
    setConfig({
      tamanoTexto: 100,
      altoContraste: false,
      modoOscuro: false,
      espaciadoTexto: false,
      daltonismo: 'none',
    })
    document.documentElement.style.fontSize = '100%'
  }

  const leerPagina = () => {
    if ('speechSynthesis' in window) {
      const texto = document.body.innerText
      const utterance = new SpeechSynthesisUtterance(texto)
      utterance.lang = 'es-CO'
      utterance.rate = 0.9
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel()
      } else {
        window.speechSynthesis.speak(utterance)
      }
    } else {
      alert('Tu navegador no soporta la lectura de pantalla')
    }
  }

  return (
    <>
      {/* Filtros de daltonismo CSS */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/>
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/>
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/>
          </filter>
        </defs>
      </svg>

      {/* Botón flotante */}
      <button
        className={styles.btnFlotante}
        onClick={() => setAbierto(!abierto)}
        title="Opciones de accesibilidad"
        aria-label="Abrir menú de accesibilidad"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="4" r="2"/>
          <path d="M19 13h-6l-1-4H8l-1 4H1v2h5l1 4h2l1-4h4l1 4h2l1-4h5v-2z"/>
        </svg>
      </button>

      {/* Panel */}
      {abierto && (
        <div className={styles.panel} role="dialog" aria-label="Opciones de accesibilidad">

          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerTitulo}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="4" r="2"/>
                <path d="M19 13h-6l-1-4H8l-1 4H1v2h5l1 4h2l1-4h4l1 4h2l1-4h5v-2z"/>
              </svg>
              <div>
                <p className={styles.titulo}>Accesibilidad</p>
                <p className={styles.subtitulo}>Personaliza tu experiencia</p>
              </div>
            </div>
            <button className={styles.btnCerrar} onClick={() => setAbierto(false)}>✕</button>
          </div>

          {/* Opciones */}
          <div className={styles.opciones}>

            {/* Tamaño de texto */}
            <div className={styles.opcion}>
              <p className={styles.opcionLabel}>Tamaño de texto</p>
              <div className={styles.tamanoControles}>
                <button
                  className={styles.btnTamano}
                  onClick={() => cambiar('tamanoTexto', Math.max(80, config.tamanoTexto - 10))}
                >A−</button>
                <span className={styles.tamanoValor}>{config.tamanoTexto}%</span>
                <button
                  className={styles.btnTamano}
                  onClick={() => cambiar('tamanoTexto', Math.min(150, config.tamanoTexto + 10))}
                >A+</button>
              </div>
            </div>

            {/* Alto contraste */}
            <button
              className={styles.opcionBtn + ' ' + (config.altoContraste ? styles.opcionActiva : '')}
              onClick={() => cambiar('altoContraste', !config.altoContraste)}
            >
              <span className={styles.opcionIcono}>◑</span>
              <span>Alto contraste</span>
            </button>

            {/* Modo oscuro */}
            <button
              className={styles.opcionBtn + ' ' + (config.modoOscuro ? styles.opcionActiva : '')}
              onClick={() => cambiar('modoOscuro', !config.modoOscuro)}
            >
              <span className={styles.opcionIcono}>🌙</span>
              <span>Modo oscuro</span>
            </button>

            {/* Espaciado de texto */}
            <button
              className={styles.opcionBtn + ' ' + (config.espaciadoTexto ? styles.opcionActiva : '')}
              onClick={() => cambiar('espaciadoTexto', !config.espaciadoTexto)}
            >
              <span className={styles.opcionIcono}>A↕</span>
              <span>Espaciado texto</span>
            </button>

            {/* Daltonismo */}
            <div className={styles.opcion}>
              <p className={styles.opcionLabel}>Daltonismo</p>
              <select
                className={styles.selectDaltonismo}
                value={config.daltonismo}
                onChange={(e) => cambiar('daltonismo', e.target.value)}
              >
                {opcionesDaltonismo.map((op) => (
                  <option key={op.valor} value={op.valor}>{op.label}</option>
                ))}
              </select>
            </div>

            {/* Leer página */}
            <button className={styles.opcionBtn} onClick={leerPagina}>
              <span className={styles.opcionIcono}>🔊</span>
              <span>Leer página</span>
            </button>

          </div>

          {/* Restablecer */}
          <button className={styles.btnResetear} onClick={resetear}>
            ↺ Restablecer todo
          </button>

          {/* Atajo de teclado */}
          <p className={styles.atajo}>
            <kbd>Alt</kbd> + <kbd>A</kbd> para abrir
          </p>

        </div>
      )}
    </>
  )
}

export default Accesibilidad
