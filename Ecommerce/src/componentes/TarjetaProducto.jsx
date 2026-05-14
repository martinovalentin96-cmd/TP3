import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextoCarrito } from '../App'

function TarjetaProducto({ producto }) {
  const { agregarAlCarrito } = useContext(ContextoCarrito)
  const [cantidad, setCantidad] = useState(1)

  return (
    <div>
      <img src={producto.thumbnail} alt={producto.title} width={200} />
      <h3>{producto.title}</h3>
      <p>${producto.price}</p>
      <input
        type="number"
        min={1}
        value={cantidad}
        onChange={e => setCantidad(e.target.value.replace(/[^0-9]/g, ''))}
        onKeyDown={e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()}
      />
      <Link to={`/producto/${producto.id}`}>Ver detalle</Link>
      <button onClick={() => agregarAlCarrito(producto, Math.max(1, Number(cantidad)))}>Agregar al carrito</button>
    </div>
  )
}

export default TarjetaProducto