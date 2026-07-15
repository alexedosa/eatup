"use client"

import { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { api, invalidateApiCache } from '@/lib/api'

export function useCreateShop() {
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState('')

  const isCreatingRef = useRef(false)

  const createShop = useCallback(async (payload) => {
    if (isCreatingRef.current) return null

    isCreatingRef.current = true
    setIsCreating(true)
    setCreateError('')

    try {
      const shop = await api.shops.create(payload)
      invalidateApiCache()
      toast.success('Shop created successfully')
      return shop
    } catch (error) {
      const message = error.message || 'Unable to create your shop. Please try again.'
      setCreateError(message)
      toast.error(message)
      throw error
    } finally {
      isCreatingRef.current = false
      setIsCreating(false)
    }
  }, [])

  return {
    createShop,
    isCreating,
    createError,
    setCreateError,
  }
}
