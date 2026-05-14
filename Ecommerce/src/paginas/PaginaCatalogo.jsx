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

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then(res => setProductos(res.data.products))
      .catch(() => setError('No se pudieron cargar los productos'))
      .finally(() => setCargando(false))

    axios.get('https://dummyjson.com/products/categories')
      .then(res => setCategorias(res.data))
      .catch(() => setError('No se pudieron cargar las categorías'))
      .finally(() => setCargando(false))
  }, [])

  const productosFiltrados = productos
    .filter(producto => producto.title.toLowerCase().includes(busqueda.toLowerCase()))
    .filter(producto => categoriaSeleccionada === '' || producto.category === categoriaSeleccionada)

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

      <h2>Productos</h2>
      {productosFiltrados.map(producto => (
        <TarjetaProducto key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default PaginaCatalogo