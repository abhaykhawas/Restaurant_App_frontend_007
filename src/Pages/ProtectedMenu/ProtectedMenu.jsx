import React, {use, useEffect, useState} from 'react'
import './ProtectedMenu.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function ProtectedMenu() {
    const [menu, setMenu] = useState([])
    const [menuCounters, setMenuCounter] = useState([])
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchMenu = async () => {
            const res = await axios.get('http://localhost:8000/api/v1/menu/')
            console.log(res.data.message.length)
            setMenu(res.data.message)
            let counters = []
            for(let i = 0; i< res.data.message.length; i++){
                counters = [...counters, {counter: 0}]
            }
            setMenuCounter(counters)
        }

        fetchMenu()
    }, [])

    async function handleCheckout() {
        const checkoutItem = []
        menuCounters.forEach((e, i) => {
            if(e.counter > 0) {
                checkoutItem.push({"menuItem": menu[i]._id, "quantity": e.counter})
            }
        })

        if (checkoutItem.length == 0) {
            toast.warn('You have an empty cart!!!')
            return
        }
        const token = JSON.parse(localStorage.getItem('user')).token
        if(!token){
            navigate('/login')
        }

        try{
            const res = await axios.post('http://localhost:8000/api/v1/order/', 
                {
                    "items": checkoutItem,
                    "totalAmount" : total
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            toast.success('Oder Created successfully!!!')
            let counters = []
            for(let i = 0; i< menuCounters.length; i++){
                counters = [...counters, {counter: 0}]
            }
            setMenuCounter(counters)
            setTotal(0)
        }
        catch(err) {
            localStorage.setItem('user', null)
            toast.error('Ops logged out !!')
            navigate('/login')
            
        }


        

        

    }

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
                        {/* Make this visible only when available */}
                        {
                            e.available ?  
                            <div className="counter">
                                <button onClick={() => {
                                    var updated = []
                                    setMenuCounter(
                                        (prev) => {
                                            updated = prev.map((item, idx) => (
                                                idx == i && item.counter >0 ? { counter: item.counter-1 } : item
                                            ))
                                            
                                            // calculating total amount
                                            let newTotal = 0;
                                            for(let j = 0; j< updated.length; j++){
                                                newTotal += menu[j].price * updated[j].counter;
                                            }

                                            setTotal(newTotal)


                                            return updated
                                        }
                                    )
                                    
                                
                                }}>-</button>
                                <h3>{menuCounters[i].counter}</h3>
                                <button onClick={() => {
                                    var updated = []
                                    setMenuCounter(
                                        (prev) => {
                                            updated = prev.map((item, idx) => (
                                                idx == i ? { counter: item.counter+1 } : item
                                            ))
                                            
                                            // calculating total amount
                                            let newTotal = 0;
                                            for(let j = 0; j< updated.length; j++){
                                                newTotal += menu[j].price * updated[j].counter;
                                            }

                                            setTotal(newTotal)


                                            return updated
                                        }
                                    )
                                    
                                
                                }}>+</button>
                            </div> 
                            : 
                            null
                        }
                        {e.available ? 'Available': 'Out of stock'}
                    </div>
                </div>
            ))}
        </div>
        <div className="view-cart-container">
            <h2>View Cart</h2>
            <div className="cart-items-container">
                {
                    menuCounters.map((e, i) => (
                        e.counter > 0 ? (
                            <div className="cart-item" key={i}>
                                <h4>{menu[i].name}</h4>
                                <p>{menu[i].price * e.counter }</p>
                                <p>{e.counter}</p>
                            </div>
                        ) : null
                    ))
                }

                <h3>Total : {total}</h3>
                <button onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    </div>
    )
}

export default ProtectedMenu