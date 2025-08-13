import { useState } from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import NonAuthNavbar from './Components/NonAuthNavbar/NonAuthNavbar'
import HomePage from './Pages/Home/HomePage'
import MenuPage from './Pages/Menu/MenuPage'
import LoginPage from './Pages/Login/LoginPage'
import SignupPage from './Pages/Signup/SignupPage'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectedMenu from './Pages/ProtectedMenu/ProtectedMenu'
import './App.css'

function App() {

  return (
    <div className="container">
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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
