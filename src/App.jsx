import React, { useEffect, useState } from 'react'
import { apiGet, apiPost, apiPut, apiDelete } from './api'
import Header from './components/Header.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import BookForm from './components/BookForm.jsx'
import BookList from './components/BookList.jsx'

export default function App() {
  const [books, setBooks] = useState([])
  const [editing, setEditing] = useState(null)
  const [tab, setTab] = useState('books') // books | login | register
  const [me, setMe] = useState(() => {
    const token = localStorage.getItem('token')
    return token ? { token } : null
  })

  async function loadBooks() {
    const data = await apiGet('/api/books')
    setBooks(data)
  }

  useEffect(() => { loadBooks().catch(() => {}) }, [])

  function onLoggedIn(token) {
    localStorage.setItem('token', token)
    setMe({ token })
    setTab('books')
    loadBooks().catch(() => {})
  }

  async function createBook(payload) {
    const book = await apiPost('/api/books', payload)
    setBooks(prev => [book, ...prev])
  }

  async function updateBook(id, payload) {
    const updated = await apiPut('/api/books/' + id, payload)
    setBooks(prev => prev.map(b => b._id === id ? updated : b))
  }

  async function removeBook(id) {
    await apiDelete('/api/books/' + id)
    setBooks(prev => prev.filter(b => b._id !== id))
  }

  function logout() {
    localStorage.removeItem('token')
    setMe(null)
  }

  return (
    <div className="container">
      <Header tab={tab} setTab={setTab} me={me} onLogout={logout} />
      {tab === 'login' && <div className="card"><Login onLoggedIn={onLoggedIn} /></div>}
      {tab === 'register' && <div className="card"><Register onRegistered={() => setTab('login')} /></div>}
      {tab === 'books' && (
        <>
          <div className="card">
            <h1>Libros</h1>
            <small className="muted">Esta lista es pública. Crear, editar y eliminar requieren inicio de sesión.</small>
            {me && (
              <>
                <button 
                  onClick={() => setEditing({})} 
                  className="btn btn-primary"
                  style={{ float: 'right', margin: '1rem 0', padding: '0.5rem 1rem', fontSize: '1rem' }}
                >
                Crear libro
                </button>
                {editing !== null && (
                  <BookForm
                    initial={editing}
                    onSubmit={async (data) => {
                      if (editing._id) {
                        await updateBook(editing._id, data)
                      } else {
                        await createBook(data)
                      }
                      setEditing(null)
                    }}
                    onCancel={() => setEditing(null)}
                    canSubmit={!!me}
                    visible={editing !== null}
                  />
                )}
              </>
            )}
            <BookList books={books} onEdit={setEditing} onDelete={removeBook} canEdit={!!me} />
          </div>
        </>
      )}
    </div>
  )
}