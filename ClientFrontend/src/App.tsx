import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Client Portal</h1>
      <p>Welcome to the client frontend.</p>
    </div>
  )
}

function About() {
  return <div className="p-6">About page</div>
}

export function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 flex gap-4 border-b">
        <Link to="/" className="font-medium">Home</Link>
        <Link to="/about" className="font-medium">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
