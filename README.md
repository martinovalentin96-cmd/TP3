# ◈ S&V STORE
### Trabajo Práctico N°3 · Desarrollo de Software · UTN

---

## Tecnologías utilizadas

| Herramienta | Uso |
|---|---|
| React 19 | Librería de UI |
| Vite | Bundler y servidor de desarrollo |
| React Router DOM | Navegación entre páginas |
| Axios | Peticiones HTTP a la API |
| DummyJSON API | Fuente de datos de productos |
| CSS (App.css) | Estilos globales estilo cybertruck |

---

## Funcionalidades

- **Catálogo** con búsqueda por nombre, filtro por categoría y ordenamiento por precio
- **Detalle de producto** con imagen, descripción, rating y stock disponible
- **Carrito de compras** con cantidad editable por ítem y eliminación
- **Finalizar compra** con validación de stock y mensaje de error detallado
- **Notificaciones globales** al agregar productos al carrito
- **Persistencia** del carrito con `localStorage`

---

## Estructura del proyecto

```
src/
├── App.jsx              # Contexto global, rutas, sistema de notificaciones
├── App.css              # Todos los estilos (dark theme / cybertruck)
├── paginas/
│   ├── PaginaCatalogo.jsx
│   ├── PaginaDetalle.jsx
│   └── PaginaCarrito.jsx
└── componentes/
    ├── BarraNavegacion.jsx
    ├── TarjetaProducto.jsx
    ├── ItemCarrito.jsx
    ├── BarraBusqueda.jsx
    └── FiltroCategorias.jsx
```

---

## Endpoints de la API utilizados

```
GET https://dummyjson.com/products?limit=100     → listado de productos
GET https://dummyjson.com/products/categories    → categorías disponibles
GET https://dummyjson.com/products/:id           → detalle de un producto
```

---

## Deploy

🌐 **[https://tp-3-eta.vercel.app/](https://tp-3-eta.vercel.app/)**

El proyecto está desplegado en Vercel. El archivo `vercel.json` redirige todas las rutas a `index.html` para que React Router funcione correctamente.

## Cómo correr el proyecto localmente

```bash
npm install
npm run dev
```

Luego abrir [http://localhost:5173](http://localhost:5173)

---

## Power Ups implementados

- **Power Up 1 — localStorage:** el carrito persiste al recargar la página
- **Power Up 2 — Ordenamiento:** ordenamiento por precio ascendente y descendente
- **Power Up 3 — Finalizar compra:** validación de stock al confirmar, con mensaje detallado de error por producto

---

*Desarrollado por Samir Quevedo y Valentín Martino · UTN · 2025*
