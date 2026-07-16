"use client"

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { getStoredUser } from '@/lib/authService'
import {
  VENDOR_ACCESS_STATE,
  evaluateVendorDashboardAccess,
  mergeVendorAccessFields,
} from '@/lib/vendorAccessControl'
import OnboardingOverlay from '@/components/onboarding/OnboardingOverlay'
import VendorApprovalPending from './VendorApprovalPending'

function SessionLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-[#1a1c1e]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        <p className="text-stone-500 dark:text-stone-400 font-medium">Verifying session...</p>
      </div>
    </div>
  )
}

export default function VendorDashboardGate({ children }) {
  const router = useRouter()
  const [status, setStatus] = useState('loading')
  const [user, setUser] = useState(null)

  const resolveSession = useCallback(async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    const storedUser = getStoredUser()

    if (!token || !storedUser) {
      setStatus(VENDOR_ACCESS_STATE.LOGIN_REQUIRED)
      router.replace('/auth/login?role=vendor')
      return
    }

    try {
      const profile = await api.auth.getProfile()
      const resolvedUser = mergeVendorAccessFields(storedUser, profile)
      localStorage.setItem('user', JSON.stringify(resolvedUser))
      setUser(resolvedUser)
      setStatus(evaluateVendorDashboardAccess(resolvedUser))
    } catch (error) {
      console.error('Failed to resolve vendor session:', error)
      setStatus(VENDOR_ACCESS_STATE.LOGIN_REQUIRED)
      router.replace('/auth/login?role=vendor')
    }
  }, [router])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      resolveSession()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [resolveSession])

  const handleLogout = useCallback(async () => {
    await api.auth.logoutCurrentUser()
    router.replace('/auth/login?role=vendor')
  }, [router])

  const handleShopCreated = useCallback(async () => {
    let profile = null
    try {
      profile = await api.auth.getProfile()
    } catch (error) {
      console.warn('Shop was created, but vendor profile refresh failed:', error)
    }

    const refreshedUser = mergeVendorAccessFields(user, {
      ...(profile || {}),
      haveShop: typeof profile?.haveShop === 'boolean' ? profile.haveShop : true,
    })
    localStorage.setItem('user', JSON.stringify(refreshedUser))
    setUser(refreshedUser)
    setStatus(evaluateVendorDashboardAccess(refreshedUser))
  }, [user])

  if (status === 'loading' || status === VENDOR_ACCESS_STATE.LOGIN_REQUIRED) {
    return <SessionLoader />
  }

  if (status === VENDOR_ACCESS_STATE.APPROVAL_PENDING) {
    return <VendorApprovalPending user={user} onLogout={handleLogout} />
  }

  if (status === VENDOR_ACCESS_STATE.SHOP_REQUIRED) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-[#1a1c1e]">
        <OnboardingOverlay
          open
          mandatory
          initialScreen="form"
          userName={user?.firstName || user?.name || ''}
          onClose={() => {}}
          onCompleted={handleShopCreated}
        />
      </div>
    )
  }

  return children
}
