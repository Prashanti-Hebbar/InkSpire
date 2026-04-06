import React from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import UserRoute from './Modules/User/URoutes/UserRoute'
import AdminRoute from './Modules/Admin/ARoutes/AdminRoute'
import Login from './Modules/User/UComponents/Login'
import Register from './Modules/User/UComponents/Register'
import AdminLogin from './Modules/Admin/AComponents/AdminLogin'



export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* ✅ ADMIN LOGIN (PUBLIC) */}
          <Route path='/admin/login' element={<AdminLogin />} />
          {/* ✅ ADMIN PROTECTED */}
          <Route path="/admin/*" element={<AdminRoute />} />
           {/* USER */}
          <Route path="/user/*" element={<UserRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/user" replace />} />
          <Route path="*" element={<Navigate to="/user" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
