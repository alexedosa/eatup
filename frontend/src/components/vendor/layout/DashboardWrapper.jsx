"use client"
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LeftColumn from './LeftColumn'
import RightColumn from './RightColumn'
import { api } from '@/lib/api'
import ZenMode from '../zen/ZenMode'
import OnboardingOverlay from '@/components/onboarding/OnboardingOverlay'
import { useShopStatus } from '@/hooks/useShopStatus'


export default function DashboardWrapper({ initialView = 'overview' }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeView, setActiveView] = useState(initialView)
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [isStoreOpen, setIsStoreOpen] = useState(true)
  const [isTogglingStore, setIsTogglingStore] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [vendorData, setVendorData] = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isOnboardingDismissed, setIsOnboardingDismissed] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    shops: [],
    products: []
  })
  const { hasShop, refreshShopStatus, registerCreatedShop, shopStatusError } = useShopStatus()

  const needsShopSetup = !hasShop && !isLoading && !shopStatusError

  const fetchDashboardData = useCallback(async ({ invalidate = false } = {}) => {
    try {
      const profile = await api.vendor.getProfile()
      setVendorData(profile)

      // Fetch shops
      const myShops = await refreshShopStatus({ invalidate })
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

      // Sync store open status from first shop
      if (myShops && myShops.length > 0) {
        setIsStoreOpen(myShops[0].isOpen ?? true)
      }

    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [refreshShopStatus])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchDashboardData()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [fetchDashboardData])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') return
      refreshShopStatus({ invalidate: true }).catch(() => {})
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [refreshShopStatus])

  useEffect(() => {
    if (isLoading || hasShop || showOnboarding || shopStatusError || isOnboardingDismissed) return undefined

    const timer = window.setTimeout(() => {
      setShowOnboarding(true)
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [hasShop, isLoading, isOnboardingDismissed, shopStatusError, showOnboarding])


  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  // Sync state with prop if prop changes (e.g. on navigation)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveView(initialView)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [initialView])


  const handleStoreToggle = async () => {
    const newState = !isStoreOpen
    setIsStoreOpen(newState)
    const shopId = dashboardData.shops?.[0]?._id || dashboardData.shops?.[0]?.id
    if (!shopId || isTogglingStore) return
    setIsTogglingStore(true)
    try {
      await api.vendor.updateShopStatus(shopId, newState)
    } catch (err) {
      // Revert on failure
      setIsStoreOpen(!newState)
      console.error('Failed to update store status:', err)
    } finally {
      setIsTogglingStore(false)
    }
  }

  const handleOnboardingCompleted = async (createdShop) => {
    registerCreatedShop(createdShop)
    setShowOnboarding(false)

    try {
      await fetchDashboardData({ invalidate: true })
    } catch (error) {
      console.error('Failed to refresh dashboard after shop creation:', error)
    }
  }

  const handleCloseOnboarding = () => {
    if (hasShop) return
    setShowOnboarding(false)
    setIsOnboardingDismissed(true)
  }

  const handleReopenOnboarding = () => {
    if (hasShop || isLoading || shopStatusError) return
    setIsOnboardingDismissed(false)
    setShowOnboarding(true)
  }

  const userName =
    vendorData?.firstName ||
    vendorData?.name ||
    vendorData?.businessName ||
    vendorData?.ownerName ||
    ''

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
        showShopSetupNudge={needsShopSetup && !showOnboarding}
        onShopSetupNudgeClick={handleReopenOnboarding}
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

      <OnboardingOverlay
        open={showOnboarding && needsShopSetup}
        userName={userName}
        onClose={handleCloseOnboarding}
        onCompleted={handleOnboardingCompleted}
      />

    </div>
  )
}
