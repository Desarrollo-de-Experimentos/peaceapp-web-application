import { useState } from 'react'
import { AuthProvider } from './auth/AuthContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
  )
}

export default App
