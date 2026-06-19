// src/hooks/useAnalytics.js
import { useState, useEffect, useCallback } from 'react'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'

export function useAnalytics() {
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
    preset: 'week'
  })
  
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const presets = [
    { id: 'today', label: 'Today', days: 1 },
    { id: 'week', label: 'This Week', days: 7 },
    { id: 'month', label: 'This Month', days: 30 },
    { id: 'custom', label: 'Custom', days: null }
  ]
  
  const handlePresetChange = (presetId) => {
    setDateRange({ ...dateRange, preset: presetId })
  }

  const auditPayload = (payload) => {
    if (process.env.NODE_ENV !== 'production') {
      const expectedKeys = [
        'metrics', 
        'dailyRevenue', 
        'weeklyComparison', 
        'categoryRevenue', 
        'topItems', 
        'heatmapData', 
        'funnel', 
        'insights'
      ];
      const missingKeys = expectedKeys.filter(key => !(key in payload));
      if (missingKeys.length > 0) {
        console.warn(
          `[Analytics Payload Audit] The backend payload is missing expected properties based on the EatupApi.json contract: ${missingKeys.join(', ')}. ` +
          `Components may fall back to default empty states.`
        );
      }
    }
  };

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true)
    try {
      const rangeMap = { today: '1d', week: '7d', month: '30d' }
      const range = rangeMap[dateRange.preset] || '7d'

      let stats = null
      try {
        stats = await api.vendor.analytics.overview(range)
      } catch {
        stats = await api.vendor.dashboardStats()
      }

      if (stats) {
        auditPayload(stats);
      }

      setData(stats)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
      toast.error("Failed to load analytics data")
    } finally {
      setIsLoading(false)
    }
  }, [dateRange])

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])
  
  return {
    data,
    isLoading,
    dateRange,
    setDateRange,
    presets,
    handlePresetChange,
    formatNaira: (amount) => new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount || 0),
    formatNumber: (num) => new Intl.NumberFormat('en-NG').format(num || 0),
    formatCompactNumber: (num) => new Intl.NumberFormat('en-NG', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(num || 0)
  }
}

