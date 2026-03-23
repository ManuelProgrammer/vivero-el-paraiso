function Buscador({ onBuscar }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Busca productos y mucho más..."
        onChange={(e) => onBuscar(e.target.value)}
      />
      <button>Buscar</button>
    </div>
  )
}

export default Buscador