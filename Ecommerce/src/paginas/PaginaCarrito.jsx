import { useContext } from 'react'
import { ContextoCarrito } from '../App'
import ItemCarrito from '../componentes/ItemCarrito'

function PaginaCarrito() {
  const { carrito, total } = useContext(ContextoCarrito)

  if (carrito.length === 0) return <p>El carrito está vacío</p>

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {carrito.map(item => (
        <ItemCarrito key={item.id} item={item} />
      ))}
      <h2>Total: ${total.toFixed(2)}</h2>
    </div>
  )
}

export default PaginaCarrito
