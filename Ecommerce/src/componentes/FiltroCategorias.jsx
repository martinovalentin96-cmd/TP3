function FiltroCategorias({ categorias, categoriaSeleccionada, setCategoriaSeleccionada }) {
  return (
    <select
      value={categoriaSeleccionada}
      onChange={e => setCategoriaSeleccionada(e.target.value)}
    >
      <option value="">Todas las categorías</option>
      {categorias.map(categoria => (
        <option key={categoria.slug} value={categoria.slug}>
          {categoria.name}
        </option>
      ))}
    </select>
  )
}

export default FiltroCategorias