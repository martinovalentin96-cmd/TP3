function BarraBusqueda({ busqueda, setBusqueda }) {
  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      value={busqueda}
      onChange={e => setBusqueda(e.target.value)}
    />
  )
}

export default BarraBusqueda