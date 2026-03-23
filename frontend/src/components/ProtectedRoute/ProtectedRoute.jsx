function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <p>Debes iniciar sesión para ver esta página.</p>
  }

  return children
}

export default ProtectedRoute