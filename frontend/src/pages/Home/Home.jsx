import Banner from '../../components/Banner/Banner'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'

const categorias = [
  { nombre: 'Plantas', icono: '🌱', ruta: '/tienda?categoria=plantas', descripcion: 'Interior y exterior' },
  { nombre: 'Árboles', icono: '🌳', ruta: '/tienda?categoria=arboles', descripcion: 'Ornamentales y frutales' },
  { nombre: 'Flores', icono: '🌸', ruta: '/tienda?categoria=flores', descripcion: 'Naturales y decorativas' },
  { nombre: 'Herramientas', icono: '🛠️', ruta: '/tienda?categoria=herramientas', descripcion: 'Para tu jardín' },
  { nombre: 'Abonos', icono: '🌿', ruta: '/tienda?categoria=abonos', descripcion: 'Nutrición para tus plantas' },
  { nombre: 'Fertilizantes', icono: '💧', ruta: '/tienda?categoria=fertilizantes', descripcion: 'Crecimiento saludable' },
]

const porQueElegirnos = [
  { icono: '🚚', titulo: 'Envíos a todo Colombia', descripcion: 'Llevamos tus plantas directo a tu puerta en 1 a 5 días hábiles.' },
  { icono: '🌱', titulo: 'Plantas de calidad', descripcion: 'Todas nuestras plantas son cultivadas con amor y cuidado experto.' },
  { icono: '💚', titulo: 'Garantía de satisfacción', descripcion: 'Si tu planta no llega en perfectas condiciones, te la reponemos.' },
  { icono: '🧑‍🌾', titulo: 'Asesoría gratuita', descripcion: 'Nuestros expertos te guían para cuidar tus plantas correctamente.' },
]

function Home() {
  return (
    <main className={styles.main}>

      {/* ===== BANNER ===== */}
      <Banner />

      {/* ===== CATEGORÍAS ===== */}
      <section className={styles.seccion}>
        <div className={styles.contenedor}>
          <h2 className={styles.titulo}>Nuestras Categorías</h2>
          <p className={styles.subtitulo}>Encuentra todo lo que necesitas para tu jardín</p>
          <div className={styles.gridCategorias}>
            {categorias.map((cat) => (
              <Link to={cat.ruta} key={cat.nombre} className={styles.tarjetaCategoria}>
                <span className={styles.categoriaIcono}>{cat.icono}</span>
                <h3 className={styles.categoriaNombre}>{cat.nombre}</h3>
                <p className={styles.categoriaDescripcion}>{cat.descripcion}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POR QUÉ ELEGIRNOS ===== */}
      <section className={styles.seccionVerde}>
        <div className={styles.contenedor}>
          <h2 className={styles.tituloBlanco}>¿Por qué elegirnos?</h2>
          <p className={styles.subtituloBlanco}>Tu satisfacción es nuestra prioridad</p>
          <div className={styles.gridBeneficios}>
            {porQueElegirnos.map((item) => (
              <div key={item.titulo} className={styles.tarjetaBeneficio}>
                <span className={styles.beneficioIcono}>{item.icono}</span>
                <h3 className={styles.beneficioTitulo}>{item.titulo}</h3>
                <p className={styles.beneficioDescripcion}>{item.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LLAMADO A LA ACCIÓN ===== */}
      <section className={styles.cta}>
        <div className={styles.contenedor}>
          <h2 className={styles.ctaTitulo}>¿Listo para transformar tu espacio? 🌿</h2>
          <p className={styles.ctaDescripcion}>
            Explora nuestra tienda y encuentra la planta perfecta para ti
          </p>
          <div className={styles.ctaBotones}>
            <Link to="/tienda" className={styles.btnPrimario}>
              Ver Tienda
            </Link>
            <Link to="/registro" className={styles.btnSecundario}>
              Crear Cuenta Gratis
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home