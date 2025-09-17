import React, {useState, useEffect} from 'react'
import axios from 'axios'

function AdminDashboard() {
    const [orders, setOrders] = useState([])
    const [loadingOrders, setLoadingOrders] = useState(false)
    const [updatingOrderId, setUpdatingOrderId] = useState(null)

    const [menuItems, setMenuItems] = useState([])
    const [loadingMenu, setLoadingMenu] = useState(false)
    const [savingingMenu, setSavingMenu] = useState(false)

    const [newDish, setNewDish] = useState({ name: "", price: "", description: "", available: true })

    const [token, setToken] = useState('')

    const orderStatuses = ["Pending", "Accepted", "Rejected", "Delivered", "Transit", "Refund"]

    // function extractMenuArray(payload) {
    //     let c = payload?.menu ?? payload?.menus ?? payload?.items ?? payload?.data ?? payload?.message ?? payload
    //     if (Array.isArray(c)) return c
    //     return []
    // }

    useEffect(() => {
        const stored_token = JSON.parse(localStorage.getItem('user'))?.token || ""
        setToken(stored_token)
    }, [])

    async function fetchOrders() {
        try{
            setLoadingOrders(true)
            const res = await axios.get('http://localhost:8000/api/v1/order/admin/all', { headers : { Authorization: `Bearer ${token}` } })
            setOrders(res.data?.orders || [])
        }
        catch(err) {
            console.log("Failed to fetch orders", err)
        }
        finally{
            setLoadingOrders(false)
        }
    }

    async function fetchMenu() {
        try{
            setLoadingMenu(true)
            const res = await axios.get('http://localhost:8000/api/v1/menu')
            console.log("Checking menu", res.data.message)
            setMenuItems(res.data?.message || [])
        }
        catch(error){
            console.log("Failed to fetch Menus", error)
        }
        finally {
            setLoadingMenu(false)
        }
    }


    async function handleOrderStatus(orderId, payload) {
        try{
            setUpdatingOrderId(orderId)
            await axios.put(`http://localhost:8000/api/v1/order/admin/${orderId}`, payload, { headers: { Authorization : `Bearer ${token}` } })
            await fetchOrders()
        }
        catch(err){
            console.log("Failed to update orders", err)
        }
        finally{
            setUpdatingOrderId(null)
        }
    }

    async function toggleAvaiable(id, updates) {
        try{
            setSavingMenu(true)
            await axios.put(`http://localhost:8000/api/v1/menu/${id}`, updates, { headers: { Authorization : `Bearer ${token}` } })
            await fetchMenu()
        }
        catch(err){
            console.log("Failed to update dish", err)
        }
        finally{
            setSavingMenu(false)

        }
    }


    async function handleCreateDish(e) {
        e.preventDefault()       
        try{
            setSavingMenu(true)
            const body = {
                name : newDish.name,
                price : newDish.price,
                description: newDish.description,
                available: Boolean(newDish.available)
            }
            await axios.post(`http://localhost:8000/api/v1/menu`, body, { headers: { Authorization: `Bearer ${token}` } })
            setNewDish({ name: "", price: "", description: "", available: true })
            await fetchMenu()
        }
        catch(err) {
            console.log("Something went wrong", err)
        }
        finally{
            setSavingMenu(false)
        }
    }


    async function handleDeleteDish(id) {
        try{
            setSavingMenu(true)
            await axios.delete(`http://localhost:8000/api/v1/menu/${id}`, { headers : {Authorization: `Bearer ${token}`} })
            await fetchMenu()
        }
        catch(err){
            console.log("Failed to delete dish", err)
        }
        finally{
            setSavingMenu(false)
        }
    }


    useEffect(() => {
        
        if(token) {
            fetchOrders()
            fetchMenu()
        }
    }, [token])





    return (
        <div className='min-h-screen bg-gray-300'>
            <div className='mx-auto px-4 py-4'>
                <h1 className='text-2xl font-semibold text-gray-800'>ADMIN DASHBOARD</h1>
                <p className='text-sm text-gray-500 mt-1'>Manage all orders and Menu</p>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
                    <section className='bg-white shadow rounded-md p-4'>
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='text-lg'>Orders</h2>
                            <button className='px-3 py-1.5 text-sm rounded-md bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50' onClick={fetchOrders} disabled={loadingOrders}>{loadingOrders ? 'Refreshing...' : 'Refresh'}</button>
                        </div>
                        <table className='min-w-full text-sm'>
                            <thead className='bg-gray-100 text-gray-700'>
                                <tr>
                                    <th className='text-left px-3 py-2'>Order</th>
                                    <th className='text-left px-3 py-2'>Customer</th>
                                    <th className='text-left px-3 py-2'>Items</th>
                                    <th className='text-left px-3 py-2'>Total</th>
                                    <th className='text-left px-3 py-2'>Status</th>
                                    <th className='text-left px-3 py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(o => (
                                        <tr className='border-b last:border-b-0'>
                                            <td className='px-3 py-2 font-medium text-gray-900'>{o._id.slice(-6)}</td>
                                            <td className='px-3 py-2 font-medium text-gray-900'>{o.customer?.name}</td>
                                            <td className='px-3 py-2 font-medium text-gray-900'>
                                                {o.items.map((it, idx) => (
                                                    <span>{it.quantity} X {it.menuItem.name}</span>
                                                )) }
                                            </td>
                                            <td className='px-3 py-2 font-medium text-gray-900'>{o.totalAmount}</td>
                                            <td className='px-2 py-2 font-medium text-gray-900'>
                                                <select 
                                                    value={o.status} 
                                                    onChange={e => handleOrderStatus(o._id, {status: e.target.value})}
                                                >
                                                    {
                                                        orderStatuses.map((s) => (
                                                            <option key={s} value={s}>{s}</option>
                                                        ))
                                                    }
                                                </select>
                                        
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </section>
                    <section className='bg-white shadow rounded-md p-4'>
                        <div className='flex items-center justify-between mb-4'>
                            <h2>Menu</h2>
                            <button onClick={fetchMenu} className='px-3 py-1.5 text-sm rounded-md bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50' disabled={loadingMenu}>{loadingMenu ? 'Refreshing' : 'Refresh'}</button>
                        </div>

                        <form onSubmit={handleCreateDish} className='grid grid-cols-1 md:grid-cols-5 gap-2 mb-4'>
                            <input className='border rounded px-3 py-2 md:col-span-1' type="text" placeholder='Name...' value={newDish.name} onChange={(e) => setNewDish({...newDish, name: e.target.value})}/>
                            <input className='border rounded px-3 py-2 md:col-span-1' type="text" placeholder='Price' value={newDish.price} onChange={(e) => setNewDish({...newDish, price: e.target.value})}/>
                            <input className='border rounded px-3 py-2 md:col-span-2' type="text" placeholder='Description' value={newDish.description} onChange={(e) => setNewDish({...newDish, description: e.target.value})}/>
                            <label>
                                <input type="checkbox" checked={newDish.available} onChange={(e) => setNewDish({...newDish, available: e.target.checked})}/>
                                <span>Avaialbe</span>
                            </label>
                            <button className='md:col-span-1 px-3 py-2 rounded bg-green-600 hover:bg-green-500 disabled: opacity-50' type='submit' disabled={savingingMenu}>ADD</button>
                        </form>

                        <div className=''>
                            {
                                menuItems?.map(m => (
                                    <div key={m._id} className='py-3 flex flex-col md:flex-row md:justify-between gap-3'>
                                        <div>
                                            <div className='font-medium text-gray-900'>{m.name}</div>
                                            <div className='text-sm text-gray-600'>{m.price}</div>
                                            <div className='text-sm text-gray-500'>{m.description}</div>
                                            <div>{m.available ? 'Avaiable': 'Unavaiable'}</div>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <button onClick={() => toggleAvaiable(m._id, {available: !m.available})} className='px-3 py-1.5 rounded bg-blue-500 '>Toggle Avaialble</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard