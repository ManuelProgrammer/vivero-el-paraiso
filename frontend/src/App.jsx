import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Tienda from './pages/Tienda/Tienda'
import Producto from './pages/Producto/Producto'
import Carrito from './pages/Carrito/Carrito'
import Favoritos from './pages/Favoritos/Favoritos'
import Login from './pages/Login/Login'
import Registro from './pages/Registro/Registro'
import Perfil from './pages/Perfil/Perfil'
import Blog from './pages/Blog/Blog'
import Soporte from './pages/Soporte/Soporte'
import Admin from './pages/Admin/Admin'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App