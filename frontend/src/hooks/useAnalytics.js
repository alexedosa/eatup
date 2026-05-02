// src/hooks/useAnalytics.js
import { useState, useMemo } from 'react'
import { MOCK_ANALYTICS } from '@/data/mockAnalytics'

export function useAnalytics() {
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
    preset: 'week'
  })
  const [data] = useState(MOCK_ANALYTICS)
  
  const presets = [
    { id: 'today', label: 'Today', days: 1 },
    { id: 'week', label: 'This Week', days: 7 },
    { id: 'month', label: 'This Month', days: 30 },
    { id: 'custom', label: 'Custom', days: null }
  ]
  
  const handlePresetChange = (presetId) => {
    setDateRange({ ...dateRange, preset: presetId })
  }
  
  return {
    data,
    dateRange,
    setDateRange,
    presets,
    handlePresetChange,
    formatNaira: (amount) => new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount),
    formatNumber: (num) => new Intl.NumberFormat('en-NG').format(num)
  }
}
