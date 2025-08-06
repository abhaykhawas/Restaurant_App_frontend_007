import { useState } from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Hello we are in home</h1>}/>
        <Route path='/menu' element={<h1>This is the menu page</h1>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
