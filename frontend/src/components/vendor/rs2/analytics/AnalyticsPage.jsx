// src/components/vendor/rs2/analytics/AnalyticsPage.jsx
'use client'

import { motion } from 'framer-motion'
import { ExportCurve } from 'iconsax-reactjs'
import { useAnalytics } from '@/hooks/useAnalytics'
import KPICard from './KPICard'
import RevenueChart from './RevenueChart'
import CategoryDonutChart from './CategoryDonutChart'
import TopItemsChart from './TopItemsChart'
import PeakHoursHeatmap from './PeakHoursHeatmap'
import ComparisonChart from './ComparisonChart'
import OrderFunnel from './OrderFunnel'
import InsightsPanel from './InsightsPanel'
import DateRangePicker from './DateRangePicker'
import AnalyticsEmptyState from './AnalyticsEmptyState'

const METRIC_CARDS = [
  { key: 'revenue', label: 'Total Revenue', type: 'currency' },
  { key: 'orders', label: 'Total Orders', type: 'integer' },
  { key: 'avgOrderValue', label: 'Average Order Value', type: 'currency' },
  { key: 'customers', label: 'Customers', type: 'integer' },
  { key: 'completionRate', label: 'Completion Rate', type: 'rate' },
  { key: 'cancellationRate', label: 'Cancellation Rate', type: 'rate' },
]

export default function AnalyticsPage() {
  const { data, isLoading, formatNaira, formatNumber, presets, dateRange, handlePresetChange } = useAnalytics()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-amber-500" />
      </div>
    )
  }

  if (!data) {
    return (
      <AnalyticsEmptyState
        title="No analytics available yet."
        message="Once orders start flowing, revenue, customer, and operational metrics will appear here."
      />
    )
  }

  const metrics = data.metrics || {}
  const dailyDataFormatted = (data.dailyRevenue || []).map((entry) => ({
    ...entry,
    date: entry.date
      ? new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' })
      : entry.day,
  }))
  const formatRate = (value) => `${Number(value || 0).toLocaleString('en-NG')}%`

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-6 md:flex-row md:items-center"
      >
        <div>
          <h1 className="font-display text-3xl font-black leading-none tracking-tighter text-stone-900 dark:text-white md:text-5xl">
            Business Analytics
          </h1>
          <p className="mt-2 text-sm font-medium text-stone-500 dark:text-stone-400 md:text-base">
            Detailed insights and performance metrics for your store
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DateRangePicker
            presets={presets}
            currentPreset={dateRange.preset}
            onPresetChange={handlePresetChange}
          />
          <button className="flex items-center gap-2 rounded-2xl bg-stone-900 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-black active:scale-95 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-100">
            <ExportCurve size="18" variant="Bold" />
            Export
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {METRIC_CARDS.map(({ key, label, type }) => {
          const metric = metrics[key] || {}
          return (
            <KPICard
              key={key}
              label={metric.label || label}
              value={metric.current || 0}
              previous={metric.previous || 0}
              change={metric.change || 0}
              trend={metric.trend || 'up'}
              formatValue={
                type === 'currency'
                  ? formatNaira
                  : type === 'rate'
                    ? formatRate
                    : formatNumber
              }
            />
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart data={dailyDataFormatted} />
        <ComparisonChart
          current={data.weeklyComparison?.current || []}
          previous={data.weeklyComparison?.previous || []}
          title="Week Over Week Comparison"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CategoryDonutChart data={data.categoryRevenue || []} />
        <TopItemsChart items={data.topItems || []} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PeakHoursHeatmap data={data.heatmapData || []} />
        <OrderFunnel data={data.funnel || { placed: 0, paid: 0, preparing: 0, completed: 0, cancelled: 0 }} />
      </div>

      <InsightsPanel insights={data.insights || []} />
    </div>
  )
}
