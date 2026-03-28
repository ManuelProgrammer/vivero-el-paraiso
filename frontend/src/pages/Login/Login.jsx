import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import styles from './Login.module.css'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  // Si la URL es /registro, abrir el tab de registro automáticamente
  const [tabActiva, setTabActiva] = useState(
    location.pathname === '/registro' ? 'registro' : 'login'
  )

  // Estados Login
  const [loginData, setLoginData] = useState({ email: '', contrasena: '' })
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginCargando, setLoginCargando] = useState(false)

  // Estados Registro
  const [registroData, setRegistroData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha_nacimiento: '',
    contrasena: '',
    confirmar_contrasena: '',
  })
  const [mostrarPasswordReg, setMostrarPasswordReg] = useState(false)
  const [registroError, setRegistroError] = useState('')
  const [registroCargando, setRegistroCargando] = useState(false)

  // ===== LOGIN =====
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
    setLoginError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!loginData.email || !loginData.contrasena) {
      setLoginError('Por favor completa todos los campos')
      return
    }
    setLoginCargando(true)
    try {
      const response = await fetch('http://localhost/vivero-el-paraiso/backend/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', ...loginData }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('usuario', JSON.stringify(data.usuario))
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        if (data.usuario.rol === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      } else {
        setLoginError(data.error || 'Credenciales incorrectas')
      }
    } catch (err) {
      setLoginError('Error de conexión con el servidor')
    }
    setLoginCargando(false)
  }

  // ===== REGISTRO =====
  const handleRegistroChange = (e) => {
    setRegistroData({ ...registroData, [e.target.name]: e.target.value })
    setRegistroError('')
  }

  const handleRegistro = async (e) => {
    e.preventDefault()
    if (!registroData.nombre || !registroData.email || !registroData.contrasena) {
      setRegistroError('Por favor completa todos los campos obligatorios')
      return
    }
    if (registroData.contrasena !== registroData.confirmar_contrasena) {
      setRegistroError('Las contraseñas no coinciden')
      return
    }
    if (registroData.contrasena.length < 6) {
      setRegistroError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    setRegistroCargando(true)
    try {
      const response = await fetch('http://localhost/vivero-el-paraiso/backend/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'registro', ...registroData }),
      })
      const data = await response.json()
      if (response.ok) {
        setTabActiva('login')
        setLoginError('')
        alert('¡Cuenta creada exitosamente! Ya puedes iniciar sesión.')
      } else {
        setRegistroError(data.error || 'Error al crear la cuenta')
      }
    } catch (err) {
      setRegistroError('Error de conexión con el servidor')
    }
    setRegistroCargando(false)
  }

  return (
    <div className={styles.pagina}>

      {/* Fondo con imagen y overlay */}
      <div className={styles.fondo}>
        <div className={styles.overlay}></div>
      </div>

      {/* Tarjeta del formulario */}
      <div className={styles.tarjeta}>

        {/* Logo */}
        <div className={styles.logoWrapper}>
          <img src="/logo_solo.png" alt="Vivero El Paraíso" className={styles.logo} />
          <div>
            <p className={styles.logoNombre}>El Paraíso</p>
            <p className={styles.logoSlogan}>Tu Vivero Favorito</p>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={styles.tab + ' ' + (tabActiva === 'login' ? styles.tabActivo : '')}
            onClick={() => setTabActiva('login')}
          >
            Iniciar Sesión
          </button>
          <button
            className={styles.tab + ' ' + (tabActiva === 'registro' ? styles.tabActivo : '')}
            onClick={() => setTabActiva('registro')}
          >
            Registrarse
          </button>
        </div>

        {/* ===== FORMULARIO LOGIN ===== */}
        {tabActiva === 'login' && (
          <form className={styles.form} onSubmit={handleLogin}>

            <div className={styles.campo}>
              <label className={styles.label}>Correo electrónico</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcono} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="tucorreo@email.com"
                  className={styles.input}
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
              </div>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Contraseña</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcono} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  name="contrasena"
                  placeholder="Tu contraseña"
                  className={styles.input}
                  value={loginData.contrasena}
                  onChange={handleLoginChange}
                />
                <button
                  type="button"
                  className={styles.btnMostrar}
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                >
                  {mostrarPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {loginError && (
              <div className={styles.error}>{loginError}</div>
            )}

            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={loginCargando}
            >
              {loginCargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>

            <p className={styles.linkTexto}>
              ¿Olvidaste tu contraseña?{' '}
              <span className={styles.link} onClick={() => alert('Próximamente')}>
                Restablecer
              </span>
            </p>

          </form>
        )}

        {/* ===== FORMULARIO REGISTRO ===== */}
        {tabActiva === 'registro' && (
          <form className={styles.form} onSubmit={handleRegistro}>

            <div className={styles.campo}>
              <label className={styles.label}>Nombre completo *</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcono} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre completo"
                  className={styles.input}
                  value={registroData.nombre}
                  onChange={handleRegistroChange}
                />
              </div>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Correo electrónico *</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcono} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="tucorreo@email.com"
                  className={styles.input}
                  value={registroData.email}
                  onChange={handleRegistroChange}
                />
              </div>
            </div>

            <div className={styles.camposDobles}>
              <div className={styles.campo}>
                <label className={styles.label}>Teléfono</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcono} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="3001234567"
                    className={styles.input}
                    value={registroData.telefono}
                    onChange={handleRegistroChange}
                  />
                </div>
              </div>

              <div className={styles.campo}>
                <label className={styles.label}>Fecha de nacimiento</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcono} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <input
                    type="date"
                    name="fecha_nacimiento"
                    className={styles.input}
                    value={registroData.fecha_nacimiento}
                    onChange={handleRegistroChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Contraseña *</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcono} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type={mostrarPasswordReg ? 'text' : 'password'}
                  name="contrasena"
                  placeholder="Mínimo 6 caracteres"
                  className={styles.input}
                  value={registroData.contrasena}
                  onChange={handleRegistroChange}
                />
                <button
                  type="button"
                  className={styles.btnMostrar}
                  onClick={() => setMostrarPasswordReg(!mostrarPasswordReg)}
                >
                  {mostrarPasswordReg ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Confirmar contraseña *</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcono} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type="password"
                  name="confirmar_contrasena"
                  placeholder="Repite tu contraseña"
                  className={styles.input}
                  value={registroData.confirmar_contrasena}
                  onChange={handleRegistroChange}
                />
              </div>
            </div>

            {registroError && (
              <div className={styles.error}>{registroError}</div>
            )}

            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={registroCargando}
            >
              {registroCargando ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>

            <p className={styles.linkTexto}>
              Al registrarte aceptas nuestros{' '}
              <span className={styles.link}>términos y condiciones</span>
            </p>

          </form>
        )}

        {/* Footer */}
        <p className={styles.footer}>
          <Link to="/">← Regresar a la tienda</Link>
        </p>

      </div>
    </div>
  )
}

export default Login
