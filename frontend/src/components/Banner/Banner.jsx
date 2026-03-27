import { useState, useEffect } from 'react'
import styles from './Banner.module.css'
import Buscador from '../Buscador/Buscador'

const imagenesDemo = [
  {
    id: 1,
    url: '/banner/BANNER.jpg',
    descripcion: 'Plantas, Árboles y Flores',
    titulo: 'Plantas, Árboles',
    subtitulo: 'y Flores para tu hogar'
  },
  {
    id: 2,
    url: '/banner/evento1.webp',
    descripcion: 'World Environment Day',
    titulo: 'Celebramos el',
    subtitulo: 'Día Mundial del Medio Ambiente'
  },
  {
    id: 3,
    url: '/banner/evento2.webp',
    descripcion: "Let's Protect Our Planet",
    titulo: 'Protejamos',
    subtitulo: 'nuestro planeta juntos'
  },
]

function Banner() {
  const [actual, setActual] = useState(0)

  // Cambiar imagen automáticamente cada 4 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setActual((prev) => (prev + 1) % imagenesDemo.length)
    }, 4000)
    return () => clearInterval(intervalo)
  }, [])

  const irA = (index) => setActual(index)
  const anterior = () => setActual((prev) => (prev - 1 + imagenesDemo.length) % imagenesDemo.length)
  const siguiente = () => setActual((prev) => (prev + 1) % imagenesDemo.length)

  return (
    <div className={styles.banner}>

      {/* Imágenes */}
      {imagenesDemo.map((imagen, index) => (
  <div
    key={imagen.id}
    className={`${styles.slide} ${index === actual ? styles.activo : ''}`}
    style={{ backgroundImage: `url(${imagen.url})` }}
  >
    <div className={styles.overlay}>
      <a href="/tienda" className={styles.btnVerTienda}>
        Ver Tienda 🌿
      </a>
    </div>
  </div>
))}

      {/* Buscador flotante */}
     <Buscador flotante={true} menuHaciaAbajo={true} />

      {/* Botones anterior / siguiente */}
      <button className={`${styles.btnNav} ${styles.btnAnterior}`} onClick={anterior}>
        ‹
      </button>
      <button className={`${styles.btnNav} ${styles.btnSiguiente}`} onClick={siguiente}>
        ›
      </button>

      {/* Puntos indicadores */}
      <div className={styles.puntos}>
        {imagenesDemo.map((_, index) => (
          <button
            key={index}
            className={`${styles.punto} ${index === actual ? styles.puntoActivo : ''}`}
            onClick={() => irA(index)}
          />
        ))}
      </div>

    </div>
  )
}

export default Banner