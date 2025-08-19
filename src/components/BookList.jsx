import React from 'react'

export default function BookList({ books, onEdit, onDelete, canEdit }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Autor</th>
          <th>Año</th>
          <th>Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {books.map(b => (
          <tr key={b._id}>
            <td>{b.title}</td>
            <td>{b.author}</td>
            <td>{b.year}</td>
            <td><span className="badge">{b.status}</span></td>
            <td style={{textAlign:'right'}}>
              {canEdit && (
                <>
                  <button className="btn secondary" onClick={() => onEdit(b)}>Edit</button>{' '}
                  <button className="btn ghost" onClick={() => onDelete(b._id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}