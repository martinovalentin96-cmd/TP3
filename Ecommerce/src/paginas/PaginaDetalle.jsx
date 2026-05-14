import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ContextoCarrito } from '../App'

function PaginaDetalle() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [cantidad, setCantidad] = useState(1)
  const { agregarAlCarrito } = useContext(ContextoCarrito)

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => setProducto(res.data))
      .catch(() => setError('No se pudo cargar el producto'))
      .finally(() => setCargando(false))
  }, [id])

  if (cargando) return <p>Cargando producto...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <img src={producto.images[0]} alt={producto.title} width={300} />
      <h1>{producto.title}</h1>
      <p>{producto.description}</p>
      <p>Precio: ${producto.price}</p>
      <p>Rating: {producto.rating}</p>
      <input
        type="number"
        min={1}
        value={cantidad}
        onChange={e => setCantidad(e.target.value.replace(/[^0-9]/g, ''))}
        onKeyDown={e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()}
      />
      <button onClick={() => agregarAlCarrito(producto, Math.max(1, Number(cantidad)))}>Agregar al carrito</button>
    </div>
  )
}

export default PaginaDetalle