"use client"
import { createContext, useContext } from 'react'
import { useRealTimeOrders } from '@/hooks/useRealTimeOrders'

const OrderContext = createContext()

export function OrderProvider({ children }) {
  const orderData = useRealTimeOrders()

  return (
    <OrderContext.Provider value={orderData}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}
