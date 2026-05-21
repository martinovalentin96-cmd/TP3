import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ContextoCarrito } from '../App'

function BarraNavegacion() {
  const { carrito } = useContext(ContextoCarrito)

  return (
    <nav>
      <Link to="/">S&V Store</Link>
      <Link to="/carrito">Carrito ({carrito.length})</Link>
    </nav>
  )
}

export default BarraNavegacion