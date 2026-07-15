// src/components/vendor/rs2/analytics/RevenueChart.jsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatNaira } from '@/lib/formatters'
import AnalyticsEmptyState from './AnalyticsEmptyState'

function RevenueTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const item = payload[0].payload
    return (
      <div className="rounded-2xl border border-stone-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#1a1c1e]/95">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
          {label}
        </p>
        <p className="mt-1 text-sm font-bold text-amber-500">
          {formatNaira(item.revenue || 0)}
        </p>
        <p className="mt-0.5 text-[10px] font-medium text-stone-500 dark:text-stone-400">
          {item.orders || 0} orders
        </p>
      </div>
    )
  }
  return null
}

export default function RevenueChart({ data }) {
  const hasData = Array.isArray(data) && data.length > 0

  return (
    <div className="rounded-[2.5rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a1c1e] md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black tracking-tight text-stone-900 dark:text-white">
            Daily Revenue
          </h3>
          <p className="mt-1 text-xs font-medium text-stone-500 dark:text-stone-400">
            Revenue and order volume by day
          </p>
        </div>
      </div>

      {!hasData ? (
        <AnalyticsEmptyState
          title="No analytics available yet."
          message="Daily revenue will appear here once orders are completed."
        />
      ) : (
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-stone-100 dark:text-white/5" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fontWeight: 700, fill: 'currentColor' }}
                tickLine={false}
                axisLine={false}
                className="text-stone-400 dark:text-stone-500"
              />
              <YAxis
                tickFormatter={(value) => `₦${Number(value || 0) / 1000}k`}
                tick={{ fontSize: 10, fontWeight: 700, fill: 'currentColor' }}
                tickLine={false}
                axisLine={false}
                className="text-stone-400 dark:text-stone-500"
              />
              <Tooltip content={<RevenueTooltip />} cursor={{ stroke: '#F59E0B', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#F59E0B"
                strokeWidth={3}
                fill="url(#revenueGradient)"
                activeDot={{ r: 6, fill: '#F59E0B', strokeWidth: 2, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
