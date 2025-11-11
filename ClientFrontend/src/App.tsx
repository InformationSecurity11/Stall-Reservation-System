import React from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Stall Reservation System</h1>
      <p className="mb-4">Welcome to the client portal.</p>
      <div className="space-x-4">
        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <p>This is the client-facing portal for stall reservations.</p>
    </div>
  )
}

function Navigation() {
  const location = useLocation()
  const hideNav = ['/login', '/signup'].includes(location.pathname)
  
  if (hideNav) return null
  
  return (
    <nav className="p-4 flex gap-4 border-b bg-white shadow-sm">
      <Link to="/" className="font-medium hover:text-blue-600">Home</Link>
      <Link to="/about" className="font-medium hover:text-blue-600">About</Link>
      <div className="ml-auto space-x-4">
        <Link to="/login" className="font-medium hover:text-blue-600">Login</Link>
        <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">Sign Up</Link>
      </div>
    </nav>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
