import React from 'react'
import { Link } from 'react-router-dom';
import './NonAuthNavbar.css'

function NonAuthNavbar() {
  return (
    <nav>
        <div className="logo-nav-container">
            <h2>Foody Fingers</h2>
        </div>
        <div className="main-nav-container">
            <ul>
                <li>
                    <Link to={'/menu'}>Menu</Link>
                </li>
                <li>
                    <Link to={'/login'}>Login</Link>
                </li>
                <li>
                    <Link to={'/signup'}>Signup</Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default NonAuthNavbar