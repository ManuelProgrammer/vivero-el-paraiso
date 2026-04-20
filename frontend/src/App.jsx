import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Home from './pages/Home/Home'
import Tienda from './pages/Tienda/Tienda'
import Producto from './pages/Producto/Producto'
import Carrito from './pages/Carrito/Carrito'
import Favoritos from './pages/Favoritos/Favoritos'
import Login from './pages/Login/Login'
import Perfil from './pages/Perfil/Perfil'
import Blog from './pages/Blog/Blog'
import Soporte from './pages/Soporte/Soporte'
import Admin from './pages/Admin/Admin'
import Accesibilidad from './components/Accesibilidad/Accesibilidad'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function Layout() {
  const location = useLocation()
  const esAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      {!esAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!esAdmin && <Footer />}
      <Accesibilidad />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App