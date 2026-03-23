function Banner({ imagenes }) {
  return (
    <div>
      {imagenes.map((imagen, index) => (
        <img key={index} src={imagen.url} alt={imagen.descripcion} />
      ))}
    </div>
  )
}

export default Banner