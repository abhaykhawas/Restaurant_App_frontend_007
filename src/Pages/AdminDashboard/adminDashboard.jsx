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

    function extractMenuArray(payload) {
        let c = payload?.menu ?? payload?.menus ?? payload?.items ?? payload?.data ?? payload?.message ?? payload
        if (Array.isArray(c)) return c
        return []
    }

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
    fetchOrders()



    return (
    <div>adminDashboard</div>
    )
}

export default AdminDashboard