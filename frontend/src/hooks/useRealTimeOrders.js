import { useState, useEffect, useCallback } from 'react'
import { MOCK_ORDERS } from '@/data/mockOrders'

export function useRealTimeOrders() {
  const [orders, setOrders] = useState({
    new: [...MOCK_ORDERS.new],
    preparing: [...MOCK_ORDERS.preparing],
    delivering: [...MOCK_ORDERS.delivering],
    completed: [...MOCK_ORDERS.completed]
  })
  
  const [lastOrderTime, setLastOrderTime] = useState(Date.now())
  const [notification, setNotification] = useState(null)
  
  // Simulate new order arriving
  const addNewOrder = useCallback(() => {
    const newOrderId = Math.floor(Math.random() * 9000) + 4300
    const customers = ['Oluwaseun Adebayo', 'Ifeanyi Okeke', 'Aisha Mohammed', 'Victor Eze', 'Grace Okoro']
    const items = [
      { name: 'Jollof Rice Special', price: 2000 },
      { name: 'Suya Platter', price: 3500 },
      { name: 'Pepper Soup', price: 4500 },
      { name: 'Margherita Pizza', price: 4800 }
    ]
    const randomItems = [items[Math.floor(Math.random() * items.length)]]
    
    const newOrder = {
      id: newOrderId.toString(),
      customer: customers[Math.floor(Math.random() * customers.length)],
      phone: `+234 80${Math.floor(Math.random() * 90000000) + 10000000}`,
      items: [{ ...randomItems[0], quantity: Math.floor(Math.random() * 3) + 1 }],
      total: randomItems[0].price * (Math.floor(Math.random() * 3) + 1),
      time: 'Just now',
      timestamp: Date.now(),
      deliveryType: Math.random() > 0.5 ? 'delivery' : 'pickup',
      specialInstructions: Math.random() > 0.8 ? 'Extra spicy' : ''
    }
    
    // Play notification sound
    const audio = new Audio('/sounds/ding.mp3')
    audio.play().catch(() => {})
    
    // Show visual notification
    setNotification({
      id: newOrder.id,
      message: `New order #${newOrder.id} from ${newOrder.customer}`,
      timestamp: Date.now()
    })
    
    setTimeout(() => setNotification(null), 5000)
    
    setOrders(prev => ({
      ...prev,
      new: [newOrder, ...prev.new]
    }))
    
    setLastOrderTime(Date.now())
  }, [])
  
  // Simulate random new orders
  useEffect(() => {
    const interval = setInterval(() => {
      // Random new order every 15-30 seconds
      if (Math.random() > 0.7) {
        addNewOrder()
      }
    }, 20000)
    
    return () => clearInterval(interval)
  }, [addNewOrder])
  
  // Accept order: move from new to preparing
  const acceptOrder = useCallback((orderId) => {
    setOrders(prev => {
      const orderToMove = prev.new.find(o => o.id === orderId)
      if (!orderToMove) return prev
      
      return {
        ...prev,
        new: prev.new.filter(o => o.id !== orderId),
        preparing: [{ ...orderToMove, status: 'preparing', estimatedReady: '15 min' }, ...prev.preparing]
      }
    })
  }, [])
  
  // Mark as ready: move from preparing to delivering
  const markReady = useCallback((orderId) => {
    setOrders(prev => {
      const orderToMove = prev.preparing.find(o => o.id === orderId)
      if (!orderToMove) return prev
      
      return {
        ...prev,
        preparing: prev.preparing.filter(o => o.id !== orderId),
        delivering: [{ ...orderToMove, driver: 'Assigning driver...' }, ...prev.delivering]
      }
    })
  }, [])
  
  // Mark as delivered: move to completed
  const completeOrder = useCallback((orderId) => {
    setOrders(prev => {
      const orderToMove = prev.delivering.find(o => o.id === orderId)
      if (!orderToMove) return prev
      
      return {
        ...prev,
        delivering: prev.delivering.filter(o => o.id !== orderId),
        completed: [{ ...orderToMove, completedAt: new Date().toLocaleTimeString() }, ...prev.completed]
      }
    })
  }, [])
  
  return {
    orders,
    notification,
    acceptOrder,
    markReady,
    completeOrder,
    lastOrderTime
  }
}
