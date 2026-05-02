'use client'
import { useEffect } from 'react'

import { motion } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import { useOrders } from '@/context/OrderContext'
import OrderStatsCards from './OrderStatsCards'
import NewOrdersPanel from './NewOrdersPanel'
import InProgressPanel from './InProgressPanel'
import { Receipt1, Verify, Timer1, TickCircle, Filter, ExportCurve } from 'iconsax-reactjs'

export default function OrdersPage({ searchQuery = '' }) {
  const {
    orders,
    notification,
    acceptOrder,
    markReady,
    completeOrder
  } = useOrders()

  // Show toast for new orders
  useEffect(() => {
    if (notification) {
      toast.custom((t) => (
        <div className={`bg-amber-500 text-white rounded-xl shadow-lg p-4 flex items-center gap-3 transform transition-all duration-300 ${t.visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
          <div className="p-2 bg-white/20 rounded-lg">
            <Receipt1 size="24" variant="Bold" />
          </div>
          <div>
            <p className="font-semibold">New Order!</p>
            <p className="text-sm opacity-90">{notification.message}</p>
          </div>
        </div>
      ), { id: 'new-order-' + notification.id, duration: 4000 })
      
      // Play sound
      const audio = document.getElementById('orderSound')
      if (audio) {
        audio.play().catch(() => {})
      }
    }
  }, [notification])
  
  // Show success toast on accept
  const handleAccept = (orderId) => {
    acceptOrder(orderId)
    toast.success(`Order #${orderId} accepted!`, {
      icon: <Verify size="20" variant="Bold" color="white" />,
      style: { background: '#10b981', color: 'white', borderRadius: '12px' }
    })
  }
  
  const handleMarkReady = (orderId) => {
    markReady(orderId)
    toast.success(`Order #${orderId} is ready for delivery!`, {
      icon: <Timer1 size="20" variant="Bold" color="white" />,
      style: { background: '#3b82f6', color: 'white', borderRadius: '12px' }
    })
  }
  
  const handleComplete = (orderId) => {
    completeOrder(orderId)
    toast.success(`Order #${orderId} completed!`, {
      icon: <TickCircle size="20" variant="Bold" color="white" />,
      style: { background: '#8b5cf6', color: 'white', borderRadius: '12px' }
    })
  }
  
  const filterOrders = (orderList) => {
    if (!searchQuery) return orderList
    const query = searchQuery.toLowerCase()
    return orderList.filter(order => 
      order.customer.toLowerCase().includes(query) || 
      order.id.toLowerCase().includes(query)
    )
  }

  const filteredOrders = {
    new: filterOrders(orders.new),
    preparing: filterOrders(orders.preparing),
    delivering: filterOrders(orders.delivering),
    completed: filterOrders(orders.completed)
  }

  const counts = {
    new: filteredOrders.new.length,
    preparing: filteredOrders.preparing.length,
    delivering: filteredOrders.delivering.length,
    completed: filteredOrders.completed.length
  }
  
  return (
    <div className="w-full space-y-5 md:space-y-6 max-w-7xl mx-auto">
      <Toaster position="top-right" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-black text-stone-900 dark:text-white tracking-tight">Orders</h1>
          <p className="text-stone-500 dark:text-stone-400 text-[10px] md:text-sm mt-0.5 md:mt-1 font-medium">Manage incoming orders in real-time</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-white/10 transition-all shadow-sm">
            <Filter size="16" variant="Outline" />
            Filter
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-100 transition-all shadow-md">
            <ExportCurve size="16" variant="Outline" />
            Export
          </button>
        </div>
      </motion.div>
      
      {/* Stats Cards */}
      <OrderStatsCards counts={counts} />
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* New Orders Panel */}
        <NewOrdersPanel 
          orders={filteredOrders.new}
          onAccept={handleAccept}
        />
        
        {/* In Progress Panel */}
        <InProgressPanel 
          preparingOrders={filteredOrders.preparing}
          deliveringOrders={filteredOrders.delivering}
          onMarkReady={handleMarkReady}
          onComplete={handleComplete}
        />
      </div>
      
      {/* Sound effect for new order */}
      <audio id="orderSound" src="/sounds/ding.mp3" preload="auto" />
    </div>
  )
}
