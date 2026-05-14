import { useContext } from 'react'
import { ContextoCarrito } from '../App'

function ItemCarrito({ item }) {
  const { eliminarDelCarrito } = useContext(ContextoCarrito)

  return (
    <div>
      <img src={item.thumbnail} alt={item.title} width={100} />
      <p>{item.title}</p>
      <p>Cantidad: {item.cantidad}</p>
      <p>Subtotal: ${(item.price * item.cantidad).toFixed(2)}</p>
      <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
    </div>
  )
}

export default ItemCarrito