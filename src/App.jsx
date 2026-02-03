import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Navbar from './Pages/Navbar'
import Transaction from './Pages/Transaction'
import Reports from './Pages/Reports'
import Profile from './Pages/Profile'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App