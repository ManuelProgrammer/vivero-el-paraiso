import { useState } from 'react'
import styles from './ProductCard.module.css'

function ProductCard({ nombre, precio, imagen, stock, nuevo, onAgregarCarrito, onFavorito }) {
  const [favorito, setFavorito] = useState(false)

  const handleFavorito = () => {
    setFavorito(!favorito)
    onFavorito()
  }

  const formatPrecio = (val) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(val)

  return (
    <div className={styles.tarjeta}>

      {/* Imagen con badges */}
      <div className={styles.imagenWrapper}>
        <img src={imagen} alt={nombre} className={styles.imagen} />

        {/* Badges */}
        <div className={styles.badges}>
          {stock === 0 && (
            <span className={styles.badgeAgotado}>Agotado</span>
          )}
          {nuevo && stock > 0 && (
            <span className={styles.badgeNuevo}>Nuevo</span>
          )}
          {stock > 0 && stock <= 5 && (
            <span className={styles.badgePocasUnidades}>¡Últimas {stock}!</span>
          )}
        </div>

        {/* Botón favorito */}
        <button
          className={styles.btnFavorito + ' ' + (favorito ? styles.favoritoActivo : '')}
          onClick={handleFavorito}
          title={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={favorito ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Overlay con botón ver más */}
        <div className={styles.overlay}>
          <a href={'/producto/1'} className={styles.btnVerMas}>
            Ver detalle
          </a>
        </div>
      </div>

      {/* Info del producto */}
      <div className={styles.info}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.precio}>{formatPrecio(precio)}</p>

        <button
          className={styles.btnCarrito + ' ' + (stock === 0 ? styles.btnCarritoDeshabilitado : '')}
          onClick={onAgregarCarrito}
          disabled={stock === 0}
        >
          {stock === 0 ? 'Sin stock' : '🛒 Agregar al carrito'}
        </button>
      </div>

    </div>
  )
}

export default ProductCard
