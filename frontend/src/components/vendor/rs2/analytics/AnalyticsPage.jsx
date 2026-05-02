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
  const { data, formatNaira, formatNumber, presets, dateRange, handlePresetChange } = useAnalytics()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="p-8 text-stone-400">Loading Analytics...</div>
  
  const metrics = data.metrics
  
  const dailyDataFormatted = data.dailyRevenue.map(d => ({
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
          label={metrics.revenue.label}
          value={metrics.revenue.current}
          previous={metrics.revenue.previous}
          change={metrics.revenue.change}
          trend={metrics.revenue.trend}
          prefix="₦"
          formatValue={formatNaira}
        />
        <KPICard
          label={metrics.orders.label}
          value={metrics.orders.current}
          previous={metrics.orders.previous}
          change={metrics.orders.change}
          trend={metrics.orders.trend}
          formatValue={formatNumber}
        />
        <KPICard
          label={metrics.avgOrderValue.label}
          value={metrics.avgOrderValue.current}
          previous={metrics.avgOrderValue.previous}
          change={metrics.avgOrderValue.change}
          trend={metrics.avgOrderValue.trend}
          prefix="₦"
          formatValue={formatNaira}
        />
        <KPICard
          label={metrics.conversionRate.label}
          value={metrics.conversionRate.current}
          previous={metrics.conversionRate.previous}
          change={metrics.conversionRate.change}
          trend={metrics.conversionRate.trend}
          suffix="%"
        />
        <KPICard
          label={metrics.newCustomers.label}
          value={metrics.newCustomers.current}
          previous={metrics.newCustomers.previous}
          change={metrics.newCustomers.change}
          trend={metrics.newCustomers.trend}
          formatValue={formatNumber}
        />
        <KPICard
          label={metrics.retentionRate.label}
          value={metrics.retentionRate.current}
          previous={metrics.retentionRate.previous}
          change={metrics.retentionRate.change}
          trend={metrics.retentionRate.trend}
          suffix="%"
        />
      </div>
      
      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={dailyDataFormatted} />
        <ComparisonChart
          current={data.weeklyComparison.current}
          previous={data.weeklyComparison.previous}
          title="Week Over Week Comparison"
        />
      </div>
      
      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryDonutChart data={data.categoryRevenue} />
        <TopItemsChart items={data.topItems} />
      </div>
      
      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PeakHoursHeatmap data={data.heatmapData} />
        <OrderFunnel data={data.funnel} />
      </div>
      
      {/* Insights Panel */}
      <InsightsPanel insights={data.insights} />
    </div>
  )
}
