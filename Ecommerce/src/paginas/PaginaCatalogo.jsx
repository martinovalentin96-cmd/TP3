import { useState, useEffect } from 'react'
import axios from 'axios'
import TarjetaProducto from '../componentes/TarjetaProducto'
import BarraBusqueda from '../componentes/BarraBusqueda'
import FiltroCategorias from '../componentes/FiltroCategorias'

function PaginaCatalogo() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [orden, setOrden] = useState('')

  // Carga las categorías una sola vez al montar
  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then(res => setCategorias(res.data))
      .catch(() => setError('No se pudieron cargar las categorías'))
  }, [])

  // Cada vez que cambia la búsqueda, decide qué endpoint usar
  useEffect(() => {
    if (busqueda.trim().length > 0 && busqueda.trim().length < 3) return
    setCargando(true)
    setError(null)

    const url = busqueda.trim().length >= 3
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(busqueda.trim())}`
      : 'https://dummyjson.com/products?limit=100'

    axios.get(url)
      .then(res => setProductos(res.data.products))
      .catch(() => setError('No se pudieron cargar los productos'))
      .finally(() => setCargando(false))
  }, [busqueda])

  const productosFiltrados = productos
    .filter(producto => categoriaSeleccionada === '' || producto.category === categoriaSeleccionada)
    .sort((a, b) => {
      if (orden === 'asc') return a.price - b.price
      if (orden === 'desc') return b.price - a.price
      return 0
    })

  if (cargando) return <p>Cargando productos...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Catálogo de Productos</h1>
      <BarraBusqueda busqueda={busqueda} setBusqueda={setBusqueda} />
      <FiltroCategorias
        categorias={categorias}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
      />
      <select value={orden} onChange={e => setOrden(e.target.value)}>
        <option value="">Sin ordenamiento</option>
        <option value="asc">Precio: menor a mayor</option>
        <option value="desc">Precio: mayor a menor</option>
      </select>

      <h2>Productos</h2>
      {productosFiltrados.map(producto => (
        <TarjetaProducto key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default PaginaCatalogo