export function setToken (token) {
  window.localStorage.setItem('token', token)
}

export function getToken () {
  const token = window.localStorage.getItem('token')
  if (!token || token === 'null' || token === 'undefined') {
    return null
  }
  return token
}

export function removeToken () {
  window.localStorage.removeItem('token')
}
