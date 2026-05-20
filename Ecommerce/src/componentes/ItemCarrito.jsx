import { useContext } from 'react'
import { ContextoCarrito } from '../App'

function ItemCarrito({ item }) {
  const { eliminarDelCarrito, cambiarCantidad } = useContext(ContextoCarrito)

  return (
    <div>
      <img src={item.thumbnail} alt={item.title} width={100} />
      <p>{item.title}</p>
      <input
        type="text"
        value={item.cantidad}
        onChange={e => cambiarCantidad(item.id, e.target.value.replace(/[^0-9]/g, ''))}
        onKeyDown={e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()}
      />
      <p>Subtotal: ${(item.price * item.cantidad).toFixed(2)}</p>
      <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
    </div>
  )
}


export default ItemCarrito