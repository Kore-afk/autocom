import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Marketplace from './components/Marketplace'
import Perfil from './components/Perfil'
import Notificaciones from './components/Notificaciones'
import TalleresCercanos from './components/TalleresCercanos'
import Mensajes from './components/Mensajes'
import Navbar from './components/Navbar'
import Nosotros from './components/Nosotros'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/marketplace"
            element={isLoggedIn ? <Marketplace /> : <Navigate to="/login" />}
          />
          <Route
            path="/perfil"
            element={isLoggedIn ? <Perfil /> : <Navigate to="/login" />}
          />
          <Route
            path="/notificaciones"
            element={isLoggedIn ? <Notificaciones /> : <Navigate to="/login" />}
          />
          <Route
            path="/talleres-cercanos"
            element={isLoggedIn ? <TalleresCercanos /> : <Navigate to="/login" />}
          />
          <Route
            path="/mensajes"
            element={isLoggedIn ? <Mensajes /> : <Navigate to="/login" />}
          />
          <Route
            path="/Nosotros"
            element={isLoggedIn ? <Nosotros /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App