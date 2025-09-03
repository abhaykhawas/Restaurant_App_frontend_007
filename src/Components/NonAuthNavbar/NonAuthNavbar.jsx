import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './NonAuthNavbar.css'
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

function NonAuthNavbar() {

    const navigate = useNavigate()
    const location = useLocation()


    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user'))?.token
        if(token) {
            setIsAuth(true)
        }
    }, [location])


    function handleLogout() {
        localStorage.setItem('user', null)
        toast.error('Ops logged out !!')
        navigate('/login')
    }

    return (
        <nav>
            <div className="logo-nav-container">
                <h2>Foody Fingers</h2>
            </div>
            <div className="main-nav-container">
                {
                    !isAuth ? (
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
                    ) : (
                        <ul>
                            <li>
                                <Link to={'/protected-menu'}>Menu</Link>
                            </li>
                            <li>
                                <Link to={'/orders'}>Orders</Link>
                            </li>
                            <li>
                                <Link to={'/login'} onClick={handleLogout}>Logout</Link>
                            </li>
                        </ul>
                    )
                }
            </div>
        </nav>
    )
}

export default NonAuthNavbar