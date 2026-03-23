function CartItem({ nombre, precio, cantidad, imagen, onEliminar, onCambiarCantidad }) {
  return (
    <div>
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p>${precio}</p>
      <input
        type="number"
        value={cantidad}
        onChange={(e) => onCambiarCantidad(e.target.value)}
        min="1"
      />
      <p>Subtotal: ${precio * cantidad}</p>
      <button onClick={onEliminar}>Eliminar</button>
    </div>
  )
}

export default CartItem