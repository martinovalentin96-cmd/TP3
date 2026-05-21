import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react'
import PaginaCatalogo from './paginas/PaginaCatalogo'
import PaginaDetalle from './paginas/PaginaDetalle'
import PaginaCarrito from './paginas/PaginaCarrito'
import BarraNavegacion from './componentes/BarraNavegacion'

export const ContextoCarrito = createContext()

function App() {

  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito')
    return guardado ? JSON.parse(guardado) : []
  })

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id)
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      }
      return [...prev, { ...producto, cantidad: cantidad }]
    })
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id))
  }

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad === '') {
      setCarrito(prev =>
        prev.map(item =>
          item.id === id ? { ...item, cantidad: '' } : item
        )
      )
      return
    }
    if (Number(cantidad) < 1) return
    setCarrito(prev =>
      prev.map(item =>
        item.id === id ? { ...item, cantidad: Number(cantidad) } : item
      )
    )
  }

  const finalizarCompra = () => {
    const sinStock = carrito.filter(item => item.cantidad > item.stock)
    if (sinStock.length > 0) {
      return `Sin stock suficiente: ${sinStock.map(i => i.title).join(', ')}`
    }
    setCarrito([])
    return 'ok'
  }

  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0)

  return (
    <ContextoCarrito.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, cambiarCantidad, finalizarCompra, total }}>
      <BrowserRouter>
        <BarraNavegacion />
        <Routes>
          <Route path="/" element={<PaginaCatalogo />} />
          <Route path="/producto/:id" element={<PaginaDetalle />} />
          <Route path="/carrito" element={<PaginaCarrito />} />
        </Routes>
      </BrowserRouter>
    </ContextoCarrito.Provider>
  )
}

export default App