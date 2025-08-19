import React, { useState } from 'react'

const initialState = { title: '', author: '', year: new Date().getFullYear(), status: 'disponible' }

export default function BookForm({ initial, onSubmit, onCancel, canSubmit, visible }) {
  const [form, setForm] = useState(initial ? {
    title: initial.title,
    author: initial.author,
    year: initial.year,
    status: initial.status
  } : initialState)

  function update(k, v) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  function submit(e) {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit?.({ ...form, year: Number(form.year) })
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', minWidth: '400px' }}>
        <form onSubmit={submit}>
          <div className="row">
            <div><label>Titulo</label><input className="input" value={form.title} onChange={e => update('title', e.target.value)} placeholder="Titulo" required/></div>
            <div><label>Autor</label><input className="input" value={form.author} onChange={e => update('author', e.target.value)} placeholder="Autor" required/></div>
          </div>
          <div className="row">
            <div><label>Año</label><input type="number" className="input" value={form.year} onChange={e => update('year', e.target.value)} min="0" placeholder="Año" required/></div>
            <div><label>Estado</label>
              <select className="input" value={form.status} onChange={e => update('status', e.target.value)}>
                <option value="disponible">disponible</option>
                <option value="reservado">reservado</option>
              </select>
            </div>
          </div>
          <div className="row" style={{justifyContent:'flex-end'}}>
            {onCancel && <button type="button" onClick={onCancel} className="btn ghost">Cancel</button>}
            <button className="btn" disabled={!canSubmit}>{initial ? 'Save changes' : 'Create book'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}