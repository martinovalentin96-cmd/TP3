import { useState, useEffect } from 'react'
import axios from 'axios'

function PaginaCatalogo() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=10')
      .then(res => setProductos(res.data.products))
      .catch(() => setError('No se pudieron cargar los productos'))

    axios.get('https://dummyjson.com/products/categories')
      .then(res => setCategorias(res.data))
      .catch(() => setError('No se pudieron cargar las categorías'))
      .finally(() => setCargando(false))
  }, [])

  if (cargando) return <p>Cargando productos...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Catálogo de Productos</h1>

      <h2>Categorías</h2>
      {categorias.map(categoria => (
        <span key={categoria.slug}> | {categoria.name}</span>
      ))}

      <h2>Productos</h2>
      {productos.map(producto => (
        <p key={producto.id}>{producto.title} - ${producto.price}</p>
      ))}
    </div>
  )
}

export default PaginaCatalogo