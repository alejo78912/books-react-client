const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function apiGet(path) {
  const res = await fetch(API_BASE + path, {
    headers: authHeaders()
  });
  return handle(res);
}

export async function apiPost(path, data) {
  const res = await fetch(API_BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data)
  });
  return handle(res);
}

export async function apiPut(path, data) {
  const res = await fetch(API_BASE + path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data)
  });
  return handle(res);
}

export async function apiDelete(path) {
  const res = await fetch(API_BASE + path, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return handle(res);
}

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: 'Bearer ' + token } : {};
}

async function handle(res) {
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : {}; } catch { json = { message: text }; }
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json;
}