function FiltroProductos({ onFiltrar }) {
  return (
    <div>
      <h3>Filtrar por</h3>

      <div>
        <h4>☀️ Luz</h4>
        <label><input type="checkbox" value="sol" onChange={(e) => onFiltrar("luz", e.target.value)} /> Sol</label>
        <label><input type="checkbox" value="sombra" onChange={(e) => onFiltrar("luz", e.target.value)} /> Sombra</label>
        <label><input type="checkbox" value="semisombra" onChange={(e) => onFiltrar("luz", e.target.value)} /> Semisombra</label>
      </div>

      <div>
        <h4>💧 Riego</h4>
        <label><input type="checkbox" value="bajo" onChange={(e) => onFiltrar("riego", e.target.value)} /> Bajo</label>
        <label><input type="checkbox" value="medio" onChange={(e) => onFiltrar("riego", e.target.value)} /> Medio</label>
        <label><input type="checkbox" value="alto" onChange={(e) => onFiltrar("riego", e.target.value)} /> Alto</label>
      </div>

      <div>
        <h4>🌡️ Clima</h4>
        <label><input type="checkbox" value="cálido" onChange={(e) => onFiltrar("clima", e.target.value)} /> Cálido</label>
        <label><input type="checkbox" value="templado" onChange={(e) => onFiltrar("clima", e.target.value)} /> Templado</label>
        <label><input type="checkbox" value="frío" onChange={(e) => onFiltrar("clima", e.target.value)} /> Frío</label>
      </div>

      <div>
        <h4>🏡 Ubicación</h4>
        <label><input type="checkbox" value="interior" onChange={(e) => onFiltrar("ubicacion", e.target.value)} /> Interior</label>
        <label><input type="checkbox" value="exterior" onChange={(e) => onFiltrar("ubicacion", e.target.value)} /> Exterior</label>
      </div>

      <div>
        <h4>🐾 Toxicidad</h4>
        <label><input type="checkbox" value="tóxica" onChange={(e) => onFiltrar("toxicidad", e.target.value)} /> Tóxica</label>
        <label><input type="checkbox" value="no tóxica" onChange={(e) => onFiltrar("toxicidad", e.target.value)} /> No tóxica</label>
      </div>

      <div>
        <h4>🧑‍🌾 Nivel de cuidado</h4>
        <label><input type="checkbox" value="fácil" onChange={(e) => onFiltrar("cuidado", e.target.value)} /> Fácil</label>
        <label><input type="checkbox" value="intermedio" onChange={(e) => onFiltrar("cuidado", e.target.value)} /> Intermedio</label>
        <label><input type="checkbox" value="difícil" onChange={(e) => onFiltrar("cuidado", e.target.value)} /> Difícil</label>
      </div>
    </div>
  )
}

export default FiltroProductos