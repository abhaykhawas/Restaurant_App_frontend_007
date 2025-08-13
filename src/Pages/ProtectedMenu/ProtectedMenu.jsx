import React, {use, useEffect, useState} from 'react'
import './ProtectedMenu.css'
import axios from 'axios'

function ProtectedMenu() {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        const fetchMenu = async () => {
            const res = await axios.get('http://localhost:8000/api/v1/menu/')
            console.log(res.data.message)
            setMenu(res.data.message)
        }

        fetchMenu()
    }, [])

    return (
    <div className='menu-container'>
        <div className="menu-card-container">
            {menu.map((e, i) => (
                <div className="menu-card" key={e._id}>
                    <div className="menu-card-left">
                        <h3>{e.name}</h3>
                        <br />
                        <p>{e.description}</p>
                        <br />
                        <p>{e.price}</p>
                    </div>
                    <div className="menu-card-right">
                        {e.available ? 'Available': 'Out of stock'}
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}

export default ProtectedMenu