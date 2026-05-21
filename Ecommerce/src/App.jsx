import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react'
import './App.css'
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

  const [notificacion, setNotificacion] = useState(null)

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  const mostrarNotificacion = (texto, tipo) => {
    setNotificacion({ texto, tipo })
    setTimeout(() => setNotificacion(null), 3000)
  }

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
    mostrarNotificacion(`${producto.title} agregado al carrito`, 'exito')
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id))
  }

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad === '') {
      setCarrito(prev => prev.map(item => item.id === id ? { ...item, cantidad: '' } : item))
      return
    }
    if (Number(cantidad) < 1) return
    setCarrito(prev => prev.map(item => item.id === id ? { ...item, cantidad: Number(cantidad) } : item))
  }

  const finalizarCompra = () => {
    const sinStock = carrito.filter(item => item.cantidad > item.stock)
    if (sinStock.length > 0) {
      const detalle = sinStock
        .map(i => `${i.title} (pedís ${i.cantidad}, stock: ${i.stock})`)
        .join(', ')
      return `Sin stock suficiente — ${detalle}`
    }
    setCarrito([])
    return 'ok'
  }

  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0)

  return (
    <ContextoCarrito.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, cambiarCantidad, finalizarCompra, total }}>
      <BrowserRouter>
        {notificacion && (
          <div className={`notificacion notificacion-${notificacion.tipo}`}>
            {notificacion.texto}
          </div>
        )}
        <BarraNavegacion />
        <Routes>
          <Route path="/"             element={<div id="catalogo"><PaginaCatalogo /></div>} />
          <Route path="/producto/:id" element={<div id="detalle"><PaginaDetalle /></div>} />
          <Route path="/carrito"      element={<div id="carrito"><PaginaCarrito /></div>} />
        </Routes>
      </BrowserRouter>
    </ContextoCarrito.Provider>
  )
}

export default App
