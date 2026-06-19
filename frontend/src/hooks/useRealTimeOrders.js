import { useState, useEffect, useCallback } from 'react'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'

function canFetchVendorOrders() {
  if (typeof window === 'undefined') return false
  if (!localStorage.getItem('accessToken')) return false
  return window.location.pathname.startsWith('/vendor')
}

export function useRealTimeOrders() {
  const [orders, setOrders] = useState({
    new: [],
    preparing: [],
    delivering: [],
    completed: []
  })
  
  const [lastOrderTime, setLastOrderTime] = useState(Date.now())
  const [notification, setNotification] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchOrders = useCallback(async () => {
    if (!canFetchVendorOrders()) {
      setIsLoading(false)
      return
    }

    try {
      const res = await api.vendor.orders.list()
      const rawOrders = Array.isArray(res) ? res : res?.orders || []
      
      const grouped = {
        new: rawOrders.filter(o => o.status === 'pending' || o.status === 'new'),
        preparing: rawOrders.filter(o => o.status === 'preparing'),
        delivering: rawOrders.filter(o => o.status === 'delivering'),
        completed: rawOrders.filter(o => o.status === 'completed' || o.status === 'delivered' || o.status === 'cancelled')
      }
      setOrders(grouped)
    } catch (e) {
      console.error("Failed to fetch orders:", e)
      if (canFetchVendorOrders()) {
        toast.error("Failed to fetch real-time orders")
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])
  
  // Polling for new orders every 30 seconds, optimized for page visibility and network status
  useEffect(() => {
    let interval = null;

    const startPolling = () => {
      if (!canFetchVendorOrders()) return

      // Only poll if window is visible and internet is connected
      if (!interval && typeof document !== 'undefined' && document.visibilityState === 'visible' && navigator.onLine) {
        interval = setInterval(() => {
          if (navigator.onLine && canFetchVendorOrders()) {
            fetchOrders();
          }
        }, 30000);
      }
    };

    const stopPolling = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && navigator.onLine) {
        startPolling();
      } else {
        stopPolling();
      }
    };

    const handleOnline = () => {
      if (document.visibilityState === 'visible') {
        startPolling();
      }
    };

    const handleOffline = () => {
      stopPolling();
    };

    // Initial check
    if (typeof document !== 'undefined' && document.visibilityState === 'visible' && navigator.onLine) {
      startPolling();
    }

    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', startPolling);
      window.addEventListener('blur', stopPolling);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    }

    return () => {
      stopPolling();
      if (typeof document !== 'undefined' && typeof window !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('focus', startPolling);
        window.removeEventListener('blur', stopPolling);
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      }
    };
  }, [fetchOrders]);
  
  // Accept order: move from new to preparing
  const acceptOrder = useCallback(async (orderId) => {
    const loadingToast = toast.loading("Updating order...")
    try {
      await api.vendor.orders.updateStatus(orderId, 'preparing')
      setOrders(prev => {
        const orderToMove = prev.new.find(o => o.id === orderId || o._id === orderId)
        if (!orderToMove) return prev
        
        return {
          ...prev,
          new: prev.new.filter(o => o.id !== orderId && o._id !== orderId),
          preparing: [{ ...orderToMove, status: 'preparing' }, ...prev.preparing]
        }
      })
      toast.success("Order accepted", { id: loadingToast })
    } catch (e) {
      console.error("Failed to accept order:", e)
      toast.error("Failed to accept order", { id: loadingToast })
    }
  }, [])
  
  // Mark as ready: move from preparing to delivering
  const markReady = useCallback(async (orderId) => {
    const loadingToast = toast.loading("Updating order...")
    try {
      await api.vendor.orders.updateStatus(orderId, 'delivering')
      setOrders(prev => {
        const orderToMove = prev.preparing.find(o => o.id === orderId || o._id === orderId)
        if (!orderToMove) return prev
        
        return {
          ...prev,
          preparing: prev.preparing.filter(o => o.id !== orderId && o._id !== orderId),
          delivering: [{ ...orderToMove, status: 'delivering' }, ...prev.delivering]
        }
      })
      toast.success("Order marked ready", { id: loadingToast })
    } catch (e) {
      console.error("Failed to mark order as ready:", e)
      toast.error("Failed to mark order as ready", { id: loadingToast })
    }
  }, [])
  
  // Mark as delivered: move to completed
  const completeOrder = useCallback(async (orderId) => {
    const loadingToast = toast.loading("Updating order...")
    try {
      await api.vendor.orders.updateStatus(orderId, 'completed')
      setOrders(prev => {
        const orderToMove = prev.delivering.find(o => o.id === orderId || o._id === orderId)
        if (!orderToMove) return prev
        
        return {
          ...prev,
          delivering: prev.delivering.filter(o => o.id !== orderId && o._id !== orderId),
          completed: [{ ...orderToMove, status: 'completed' }, ...prev.completed]
        }
      })
      toast.success("Order completed", { id: loadingToast })
    } catch (e) {
      console.error("Failed to complete order:", e)
      toast.error("Failed to complete order", { id: loadingToast })
    }
  }, [])

  return {
    orders,
    notification,
    acceptOrder,
    markReady,
    completeOrder,
    lastOrderTime,
    isLoading
  }
}
