import React from 'react'
import './LoginPage.css'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className='login-container'>
        <div className="login-form-container">
            <div>
                <label>Email</label>
                <input type="email" placeholder='Enter your email here'/>
            </div>

            <div>
                <label>Password</label>
                <input type="password" placeholder='Enter your password here' />
            </div>
            <br />
            <div className='login-btn-container'>
                <button>Login</button>
            </div>

            <div className='no-acc-container'>
                <h4>
                    Don't have an account ? <Link to={'/signup'}>Signup Now!</Link>
                </h4>
            </div>
        </div>
    </div>
  )
}

export default LoginPage