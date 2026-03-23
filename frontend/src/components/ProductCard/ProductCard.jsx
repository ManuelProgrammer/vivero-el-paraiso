function ProductCard({ nombre, precio, imagen, stock, onAgregarCarrito, onFavorito }) {
  return (
    <div>
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p>${precio}</p>
      {stock === 0 && <p>Sin stock</p>}
      <button onClick={onFavorito}>❤️ Favorito</button>
      <button onClick={onAgregarCarrito}>Agregar al carrito</button>
    </div>
  )
}

export default ProductCard