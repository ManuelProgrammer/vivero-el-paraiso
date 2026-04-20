import { useState, useEffect } from 'react'
import styles from './AdminSeccion.module.css'

const camposConfig = [
  { clave: 'telefono', label: '📞 Teléfono', placeholder: '314 596 4947' },
  { clave: 'celular', label: '📱 Celular', placeholder: '300 312 3507' },
  { clave: 'email', label: '✉️ Email de contacto', placeholder: 'contacto@viveroelparaiso.com' },
  { clave: 'direccion', label: '📍 Dirección', placeholder: 'Valledupar, Cesar, Colombia' },
  { clave: 'horario', label: '🕐 Horario de atención', placeholder: 'Lunes a Viernes 8am - 5pm' },
  { clave: 'whatsapp', label: '💬 WhatsApp (sin + ni espacios)', placeholder: '573145964947' },
  { clave: 'envios', label: '🚚 Texto de envíos', placeholder: 'Envíos a todo Colombia' },
]

function AdminConfiguracion({ API }) {
  const [config, setConfig] = useState({})
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const token = localStorage.getItem('accessToken')

  useEffect(() => { cargarConfig() }, [])

  const cargarConfig = async () => {
    setCargando(true)
    try {
      const res = await fetch(API + '/configuracion')
      const data = await res.json()
      // Convertir objeto a valores simples
      const valores = {}
      Object.keys(data).forEach((clave) => {
        valores[clave] = data[clave].valor || ''
      })
      setConfig(valores)
    } catch (err) {
      console.error(err)
    }
    setCargando(false)
  }

  const handleChange = (clave, valor) => {
    setConfig((prev) => ({ ...prev, [clave]: valor }))
  }

  const guardarTodo = async () => {
    setGuardando(true)
    setMensaje('')
    try {
      const promesas = Object.keys(config).map((clave) =>
        fetch(API + '/configuracion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
          body: JSON.stringify({ clave, valor: config[clave] }),
        })
      )
      await Promise.all(promesas)
      setMensaje('✅ Configuración guardada exitosamente')
    } catch (err) {
      setMensaje('❌ Error al guardar la configuración')
    }
    setGuardando(false)
  }

  if (cargando) return <div className={styles.cargando}>Cargando configuración...</div>

  return (
    <div className={styles.seccion}>
      <div className={styles.configCard}>
        <h3 className={styles.configTitulo}>⚙️ Información del sitio</h3>
        <p className={styles.configSubtitulo}>
          Estos datos aparecerán en el footer, header y página de soporte del sitio.
        </p>

        <div className={styles.configGrid}>
          {camposConfig.map((campo) => (
            <div key={campo.clave} className={styles.campoGrupo}>
              <label>{campo.label}</label>
              <input
                type="text"
                value={config[campo.clave] || ''}
                onChange={(e) => handleChange(campo.clave, e.target.value)}
                placeholder={campo.placeholder}
              />
            </div>
          ))}
        </div>

        {mensaje && (
          <div className={mensaje.startsWith('✅') ? styles.mensajeExito : styles.mensajeError}>
            {mensaje}
          </div>
        )}

        <button
          className={styles.btnGuardarConfig}
          onClick={guardarTodo}
          disabled={guardando}
        >
          {guardando ? '⏳ Guardando...' : '💾 Guardar configuración'}
        </button>
      </div>
    </div>
  )
}

export default AdminConfiguracion
