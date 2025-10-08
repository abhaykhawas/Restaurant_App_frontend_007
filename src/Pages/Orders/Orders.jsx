import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './Orders.css'

function Orders() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function fetchOrders() {
            const token = JSON.parse(localStorage.getItem('user')).token
            if(!token){
                navigate('/login')
            }
            try{
                const res = await axios.get('https://restaurant-app-backend-007.vercel.app/api/v1/order/', {
                    headers: {
                        'Content-Type': 'application/JSON',
                        'Authorization': `Bearer ${token}`
                    }
                })

                setOrders(res.data.message)

                
            }
            catch(error) {
                localStorage.setItem('user', null)
                toast.error('Ops logged out !!')
                navigate('/login')
            }
        }
        fetchOrders()
    }, [])

    async function handleTrack(id) {
        try{
            const token = JSON.parse(localStorage.getItem('user')).token
            if(!token){
                navigate('/login')
            }
            const res = await axios.get(`https://restaurant-app-backend-007.vercel.app/api/v1/order/${id}/track`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            toast.info(res.data.status)
            const temp_orders = orders.map((e,i) => {
                if(e._id == id) {
                    orders[i].status = res.data.status
                }
                return e
            })

            setOrders(temp_orders)
            
        }
        catch(err) {
            localStorage.setItem('user', null)
            toast.error('Ops logged out !!')
            navigate('/login')
        }
    }

    return (
    <div>
        {
            orders.map((e, i) => (
                <div key={i} className='order-card'>
                    <div className="left-order-container">
                        <h4>{e._id}</h4>
                        <div className='all-menu-container'>
                            {e.items.map((item,idx) => (
                                <div key={`${i}${idx}`} className='menu-item-container'>
                                    <p>{item.menuItem.name}</p>
                                    <p>{item.menuItem.price}</p>
                                    <p>{item.quantity}</p>
                                </div>
                            ))}
                       </div>
                        <h5>Total : {e.totalAmount}</h5>
                    </div>
                    <div className='right-order-container'>
                        <p>To Connect please call 00000</p>
                        <div>
                            <button onClick={() => handleTrack(e._id)}>TRACK</button>
                            <p style={{background: e.status == 'Delivered' ? 'green' : (e.status == 'Rejected' ? 'red': 'yellow')}}>{e.status}</p>
                        </div>
                    </div>
                </div>

            ))
        }
    </div>
    )
}

export default Orders