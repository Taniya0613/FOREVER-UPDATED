export const isAuthError = (message) => {
  if (!message) return false
  const msg = message.toLowerCase()
  return (
    msg.includes('login again') ||
    msg.includes('invalid signature') ||
    msg.includes('session expired') ||
    msg.includes('not authorized')
  )
}

export const handleAuthError = (message, setToken) => {
  if (isAuthError(message)) {
    localStorage.removeItem('token')
    setToken('')
    return true
  }
  return false
}
