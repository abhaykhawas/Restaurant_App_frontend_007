import React, {useState} from 'react'
import './LoginPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleClick(){
        console.log(email, password)
        const res = await axios.post('http://localhost:8000/api/v1/auth/login',{email, password})

        localStorage.setItem('user', JSON.stringify(res.data))
        if(res.data.role == 'ADMIN') {
            navigate('/admin')
        }
        else{
            navigate('/protected-menu')
        }
        toast.success('Logged in successfully !!!')
        
    }
    return (
    <div className='login-container'>
        <div className="login-form-container">
            <div>
                <label>Email</label>
                <input type="email" placeholder='Enter your email here' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div>
                <label>Password</label>
                <input type="password" placeholder='Enter your password here' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <br />
            <div className='login-btn-container'>
                <button onClick={handleClick}>Login</button>
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