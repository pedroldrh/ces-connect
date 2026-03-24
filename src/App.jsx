import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './lib/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'

const Directory = lazy(() => import('./pages/Directory'))
const AddContact = lazy(() => import('./pages/AddContact'))
const ContactDetail = lazy(() => import('./pages/ContactDetail'))

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center min-h-screen text-text-muted">Loading...</div>
  if (!user) return <Navigate to="/login" />
  return children
}

function LazyFallback() {
  return <div className="flex items-center justify-center py-20 text-text-muted text-sm">Loading...</div>
}

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-text-muted">Loading...</div>
  }

  return (
    <Suspense fallback={<LazyFallback />}>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="directory" element={<Directory />} />
          <Route path="contact/:id" element={<ContactDetail />} />
          <Route path="add" element={<ProtectedRoute><AddContact /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Suspense>
  )
}
