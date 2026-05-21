import { useState, useContext } from 'react'
import { ContextoCarrito } from '../App'
import ItemCarrito from '../componentes/ItemCarrito'

function PaginaCarrito() {
  const { carrito, total, finalizarCompra } = useContext(ContextoCarrito)
  const [mensaje, setMensaje] = useState(null)

  const handleFinalizarCompra = () => {
    const resultado = finalizarCompra()
    if (resultado === 'ok') {
      setMensaje({ tipo: 'exito', texto: '¡Compra realizada con éxito!' })
    } else {
      setMensaje({ tipo: 'error', texto: resultado })
    }
  }

  if (carrito.length === 0 && !mensaje) return <p>El carrito está vacío</p>

  return (
    <div>
      <h1>Carrito de Compras</h1>

      {mensaje && (
        <p>{mensaje.texto}</p>
      )}

      {carrito.map(item => (
        <ItemCarrito key={item.id} item={item} />
      ))}

      {carrito.length > 0 && (
        <>
          <h2>Total: ${total.toFixed(2)}</h2>
          <button onClick={handleFinalizarCompra}>Finalizar Compra</button>
        </>
      )}
    </div>
  )
}

export default PaginaCarrito
