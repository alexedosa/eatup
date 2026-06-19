"use client"
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LeftColumn from './LeftColumn'
import RightColumn from './RightColumn'
import { api } from '@/lib/api'
import ZenMode from '../zen/ZenMode'


export default function DashboardWrapper({ initialView = 'overview' }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeView, setActiveView] = useState(initialView)
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [isStoreOpen, setIsStoreOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [vendorData, setVendorData] = useState(null)
  const [dashboardData, setDashboardData] = useState({
    shops: [],
    products: []
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const profile = await api.vendor.getProfile()
        setVendorData(profile)

        // Fetch shops
        const myShops = await api.shops.getMy()
        let allProducts = []
        
        // Fetch products for the first shop if exists
        if (myShops && myShops.length > 0) {
           const productsRes = await api.products.listByShop(myShops[0]._id || myShops[0].id)
           allProducts = productsRes?.products || productsRes || []
        }

        // Fetch orders
        const ordersRes = await api.vendor.orders.list({ limit: 10 })
        
        // Fetch dashboard stats
        let stats = null
        try {
          stats = await api.vendor.dashboardStats()
        } catch (e) {
          console.warn("Dashboard stats not available yet")
        }

        setDashboardData({
          shops: myShops || [],
          products: allProducts,
          orders: ordersRes || [],
          stats: stats
        })

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])


  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  // Sync state with prop if prop changes (e.g. on navigation)
  useEffect(() => {
    setActiveView(initialView)
  }, [initialView])


  const handleStoreToggle = () => {
    setIsStoreOpen(!isStoreOpen)
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#1a1c1e] flex overflow-hidden relative">
      {/* ── Zen Mode — full-screen takeover ── */}
      <AnimatePresence>
        {isFocusMode && (
          <ZenMode
            onExit={() => setIsFocusMode(false)}
          />
        )}
      </AnimatePresence>

      {/* Overlay for RS2 — only visible when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-[150] bg-stone-900/20 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] animate-in fade-in"
          onClick={() => setIsExpanded(false)}
        />
      )}
      
      <LeftColumn 
        isExpanded={isExpanded}
        activeView={activeView}
        onViewChange={setActiveView}
        onToggleSidebar={() => setIsExpanded(!isExpanded)}
        isStoreOpen={isStoreOpen}
        onStoreToggle={handleStoreToggle}
      />
      <RightColumn 
        isExpanded={isExpanded}
        isFocusMode={isFocusMode}
        onFocusModeToggle={() => setIsFocusMode(!isFocusMode)}
        activeView={activeView}
        onViewChange={setActiveView}
        isStoreOpen={isStoreOpen}
        onStoreToggle={handleStoreToggle}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
        vendorData={vendorData}
        dashboardData={dashboardData}
      />

    </div>
  )
}
