'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import { useRealTimeOrders } from '@/hooks/useRealTimeOrders'
import OrderStatsCards from '@/components/vendor/rs2/orders/OrderStatsCards'
import NewOrdersPanel from '@/components/vendor/rs2/orders/NewOrdersPanel'
import InProgressPanel from '@/components/vendor/rs2/orders/InProgressPanel'
import { Receipt1, Verify, Timer1, TickCircle, Filter, ExportCurve } from 'iconsax-reactjs'

export default function OrdersPage() {
  const {
    orders,
    notification,
    acceptOrder,
    markReady,
    completeOrder
  } = useRealTimeOrders()
  
  // Show toast for new orders
  if (notification && typeof window !== 'undefined') {
    toast.custom((t) => (
      <div className={`
        bg-amber-500 text-white rounded-xl shadow-lg p-4
        flex items-center gap-3
        transform transition-all duration-300
        ${t.visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
      `}>
        <div className="p-2 bg-white/20 rounded-lg">
          <Receipt1 size="24" variant="Bold" />
        </div>
        <div>
          <p className="font-semibold">New Order!</p>
          <p className="text-sm opacity-90">{notification.message}</p>
        </div>
      </div>
    ), { id: 'new-order-' + notification.id, duration: 4000 })
  }
  
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
  
  const counts = {
    new: orders.new.length,
    preparing: orders.preparing.length,
    delivering: orders.delivering.length,
    completed: orders.completed.length
  }
  
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <Toaster position="top-right" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-stone-800">Orders</h1>
          <p className="text-stone-500 text-sm mt-1">Manage incoming orders in real-time</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 transition-all shadow-sm">
            <Filter size="18" variant="Outline" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-all shadow-md">
            <ExportCurve size="18" variant="Outline" />
            Export
          </button>
        </div>
      </motion.div>
      
      {/* Stats Cards */}
      <OrderStatsCards counts={counts} />
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Orders Panel */}
        <NewOrdersPanel 
          orders={orders.new}
          onAccept={handleAccept}
        />
        
        {/* In Progress Panel */}
        <InProgressPanel 
          preparingOrders={orders.preparing}
          deliveringOrders={orders.delivering}
          onMarkReady={handleMarkReady}
          onComplete={handleComplete}
        />
      </div>
      
      {/* Sound effect for new order */}
      <audio id="orderSound" src="/sound/ding.mp3" preload="auto" />
    </div>
  )
}