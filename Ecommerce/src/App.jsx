import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PaginaCatalogo from './paginas/PaginaCatalogo'
import PaginaDetalle from './paginas/PaginaDetalle'
import PaginaCarrito from './paginas/PaginaCarrito'
import BarraNavegacion from './componentes/BarraNavegacion'

function App() {
  return (
    <BrowserRouter>
      <BarraNavegacion />
      <Routes>
        <Route path="/" element={<PaginaCatalogo />} />
        <Route path="/producto/:id" element={<PaginaDetalle />} />
        <Route path="/carrito" element={<PaginaCarrito />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
