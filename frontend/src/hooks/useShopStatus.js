"use client"

import { useCallback, useState } from 'react'
import { api, invalidateApiCache } from '@/lib/api'
import { hasValidShop, normalizeShopsList } from '@/lib/shopUtils'

export function useShopStatus() {
  const [shops, setShops] = useState([])
  const [isCheckingShop, setIsCheckingShop] = useState(false)
  const [shopStatusError, setShopStatusError] = useState('')

  const refreshShopStatus = useCallback(async ({ invalidate = false } = {}) => {
    setIsCheckingShop(true)
    setShopStatusError('')

    try {
      if (invalidate) {
        invalidateApiCache()
      }

      const myShops = await api.shops.getMy()
      const normalizedShops = normalizeShopsList(myShops)
      let resolvedShops = []

      setShops((current) => {
        if (normalizedShops.length > 0) {
          resolvedShops = normalizedShops
          return normalizedShops
        }

        if (hasValidShop(current)) {
          resolvedShops = current
          return current
        }

        resolvedShops = []
        return []
      })

      return resolvedShops
    } catch (error) {
      const message = error.message || 'Unable to check your shop status.'
      if (/shop/i.test(message) && /(not found|no shops?|empty)/i.test(message)) {
        setShops([])
        return []
      }

      setShopStatusError(message)
      throw error
    } finally {
      setIsCheckingShop(false)
    }
  }, [])

  const registerCreatedShop = useCallback((shop) => {
    if (!shop) return

    const normalizedShop = normalizeShopsList(shop)[0] || shop
    setShops((current) => {
      const shopId = normalizedShop._id || normalizedShop.id
      if (shopId) {
        const alreadyExists = current.some(
          (entry) => (entry._id || entry.id) === shopId
        )
        if (alreadyExists) return current
      }

      return [normalizedShop, ...current]
    })
  }, [])

  return {
    shops,
    hasShop: hasValidShop(shops),
    isCheckingShop,
    shopStatusError,
    setShops,
    registerCreatedShop,
    refreshShopStatus,
  }
}
