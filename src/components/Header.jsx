import React from 'react'

export default function Header({ tab, setTab, me, onLogout }) {
  return (
    <div className="header">
      <div>
        <strong>Books UI</strong> &nbsp; <small className="muted">React + Vite</small>
      </div>
      <div className="row" style={{justifyContent:'flex-end'}}>
        <button className={"btn ghost"} onClick={() => setTab('books')}>Books</button>
        {!me && <button className={"btn ghost"} onClick={() => setTab('login')}>Login</button>}
        {!me && <button className={"btn ghost"} onClick={() => setTab('register')}>Register</button>}
        {me && <button className={"btn"} onClick={onLogout}>Logout</button>}
      </div>
    </div>
  )
}