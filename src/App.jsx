import { useState } from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import NonAuthNavbar from './Components/NonAuthNavbar/NonAuthNavbar'
import HomePage from './Pages/Home/HomePage'
import MenuPage from './Pages/Menu/MenuPage'
import LoginPage from './Pages/Login/LoginPage'
import SignupPage from './Pages/Signup/SignupPage'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectedMenu from './Pages/ProtectedMenu/ProtectedMenu'
import Orders from './Pages/Orders/Orders'
import './App.css'
import { ToastContainer } from 'react-toastify';
import AdminDashboard from './Pages/AdminDashboard/adminDashboard'

function App() {

  return (
    <div>
      <ToastContainer/>
      <BrowserRouter>
        <NonAuthNavbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/menu' element={<MenuPage/>} /> 
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/protected-menu' element={
            <ProtectedRoute>
              <ProtectedMenu/>
            </ProtectedRoute>
          }/>
          <Route path='/orders' element={
            <ProtectedRoute>
              <Orders/>
            </ProtectedRoute>
          }/>
          <Route path='/admin' element={
            <ProtectedRoute>
              <AdminDashboard/>
            </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
