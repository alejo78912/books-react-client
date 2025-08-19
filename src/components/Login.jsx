import React, { useState } from 'react'
import { apiPost } from '../api'

export default function Login({ onLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token } = await apiPost('/api/auth/login', { email, password })
      onLoggedIn(token)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h2>Ingresa con tú cuenta</h2>
      <form onSubmit={submit}>
        <div className="row">
          <div>
            <label>Email</label>
            <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane.doe@example.com" />
          </div>
          <div>
            <label>Contraseña</label>
            <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
        </div>
        {error && <p style={{color:'#b91c1c'}}>{error}</p>}
        <div style={{marginTop:12}}>
          <button className="btn" disabled={loading}>{loading ? 'Iniciando sesión…' : 'Iniciar sesión'}</button>
        </div>
      </form>
    </>
  )
}