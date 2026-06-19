// src/components/vendor/rs2/analytics/AnalyticsPage.jsx
'use client'

import { motion } from 'framer-motion'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useState, useEffect } from 'react'
import KPICard from './KPICard'
import RevenueChart from './RevenueChart'
import CategoryDonutChart from './CategoryDonutChart'
import TopItemsChart from './TopItemsChart'
import PeakHoursHeatmap from './PeakHoursHeatmap'
import ComparisonChart from './ComparisonChart'
import OrderFunnel from './OrderFunnel'
import InsightsPanel from './InsightsPanel'
import DateRangePicker from './DateRangePicker'
import { ExportCurve } from 'iconsax-reactjs'

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false)
  const { data, isLoading, formatNaira, formatNumber, presets, dateRange, handlePresetChange } = useAnalytics()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading) return (
    <div className="flex justify-center items-center py-40">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>
  )
  
  if (!data) return <div className="p-8 text-stone-400">Failed to load analytics data.</div>
  
  const metrics = data.metrics || {}
  
  const dailyDataFormatted = (data.dailyRevenue || []).map(d => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })
  }))

  
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-black text-stone-900 dark:text-white tracking-tighter leading-none">Business Analytics</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm md:text-base font-medium mt-2">Detailed insights and performance metrics for your store</p>
        </div>
        
        <div className="flex items-center gap-3">
          <DateRangePicker 
            presets={presets} 
            currentPreset={dateRange.preset} 
            onPresetChange={handlePresetChange} 
          />
          <button className="flex items-center gap-2 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xl hover:bg-black dark:hover:bg-stone-100 transition-all active:scale-95">
            <ExportCurve size="18" variant="Bold" />
            Export
          </button>
        </div>
      </motion.div>
      
      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard
          label={metrics.revenue?.label || "Total Revenue"}
          value={metrics.revenue?.current || 0}
          previous={metrics.revenue?.previous || 0}
          change={metrics.revenue?.change || 0}
          trend={metrics.revenue?.trend || "up"}
          prefix="₦"
          formatValue={formatNaira}
        />
        <KPICard
          label={metrics.orders?.label || "Total Orders"}
          value={metrics.orders?.current || 0}
          previous={metrics.orders?.previous || 0}
          change={metrics.orders?.change || 0}
          trend={metrics.orders?.trend || "up"}
          formatValue={formatNumber}
        />
        <KPICard
          label={metrics.avgOrderValue?.label || "Avg Order Value"}
          value={metrics.avgOrderValue?.current || 0}
          previous={metrics.avgOrderValue?.previous || 0}
          change={metrics.avgOrderValue?.change || 0}
          trend={metrics.avgOrderValue?.trend || "up"}
          prefix="₦"
          formatValue={formatNaira}
        />
        <KPICard
          label={metrics.conversionRate?.label || "Conversion Rate"}
          value={metrics.conversionRate?.current || 0}
          previous={metrics.conversionRate?.previous || 0}
          change={metrics.conversionRate?.change || 0}
          trend={metrics.conversionRate?.trend || "up"}
          suffix="%"
        />
        <KPICard
          label={metrics.newCustomers?.label || "New Customers"}
          value={metrics.newCustomers?.current || 0}
          previous={metrics.newCustomers?.previous || 0}
          change={metrics.newCustomers?.change || 0}
          trend={metrics.newCustomers?.trend || "up"}
          formatValue={formatNumber}
        />
        <KPICard
          label={metrics.retentionRate?.label || "Retention Rate"}
          value={metrics.retentionRate?.current || 0}
          previous={metrics.retentionRate?.previous || 0}
          change={metrics.retentionRate?.change || 0}
          trend={metrics.retentionRate?.trend || "up"}
          suffix="%"
        />
      </div>
      
      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={dailyDataFormatted} />
        <ComparisonChart
          current={data.weeklyComparison?.current || []}
          previous={data.weeklyComparison?.previous || []}
          title="Week Over Week Comparison"
        />
      </div>
      
      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryDonutChart data={data.categoryRevenue || []} />
        <TopItemsChart items={data.topItems || []} />
      </div>
      
      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PeakHoursHeatmap data={data.heatmapData || []} />
        <OrderFunnel data={data.funnel || { views: 0, cart: 0, checkout: 0, completed: 0 }} />
      </div>
      
      {/* Insights Panel */}
      <InsightsPanel insights={data.insights || []} />
    </div>
  )
}

