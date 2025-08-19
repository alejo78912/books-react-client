import React, { useState } from 'react'
import { apiPost } from '../api'

export default function Register({ onRegistered }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError(''); setOk('')
    setLoading(true)
    try {
      await apiPost('/api/auth/register', { email, password })
      setOk('User registered. You can now log in.')
      onRegistered?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h2>Registrar nueva cuenta</h2>
      <form onSubmit={submit}>
      <div className="row">
        <div>
          <label>Email</label>
          <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane.doe@example.com" />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} placeholder="Elige una contraseña segura" />
        </div>
      </div>
      {error && <p style={{color:'#b91c1c'}}>{error}</p>}
      {ok && <p style={{color:'#065f46'}}>{ok}</p>}
      <div style={{marginTop:12}}>
        <button className="btn" disabled={loading}>{loading ? 'Creando...' : 'Registrar'}</button>
      </div>
    </form>
    </>
  )
}