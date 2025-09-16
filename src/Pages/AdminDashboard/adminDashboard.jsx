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
            await axios.put(`http://localhost:8000/api/v1/order/${orderId}`, payload, { headers: { Authorization : `Bearer ${token}` } })
            await fetchOrders()
        }
        catch(err){
            console.log("Failed to update orders", err)
        }
        finally{
            setUpdatingOrderId(null)
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
                        
                    </section>
                    <section className='bg-white shadow rounded-md p-4'></section>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard