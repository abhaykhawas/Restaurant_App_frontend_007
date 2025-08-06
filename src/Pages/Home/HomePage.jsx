import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  return (
    <div className='home-container'>
        <h2>Welcome to the world of best taste ever !!</h2>
        <button>
            <Link to={'/signup'}>Get Started</Link>
        </button>
    </div>
  )
}

export default HomePage