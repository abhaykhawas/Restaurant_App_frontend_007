import { useState } from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import NonAuthNavbar from './Components/NonAuthNavbar/NonAuthNavbar'
import HomePage from './Pages/Home/HomePage'
import './App.css'

function App() {

  return (
    <div className="container">
      <BrowserRouter>
        <NonAuthNavbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/menu' element={<h1>This is the menu page</h1>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
