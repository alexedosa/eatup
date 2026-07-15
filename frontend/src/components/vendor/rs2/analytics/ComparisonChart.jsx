// src/components/vendor/rs2/analytics/ComparisonChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatNaira } from '@/lib/formatters'
import AnalyticsEmptyState from './AnalyticsEmptyState'

function ComparisonTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#1a1c1e]/95">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
          {label}
        </p>
        <div className="mt-2 space-y-1">
          {payload.map((entry) => (
            <p key={entry.dataKey} className="flex justify-between gap-4 text-xs font-bold">
              <span className="text-stone-500 dark:text-stone-400">{entry.name}:</span>
              <span className={entry.dataKey === 'current' ? 'text-amber-500' : 'text-stone-500'}>
                {formatNaira(entry.value || 0)}
              </span>
            </p>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export default function ComparisonChart({ current = [], previous = [], title }) {
  const mergedData = current.map((item, idx) => ({
    day: item.day || item.date || `Day ${idx + 1}`,
    current: item.revenue || item.value || 0,
    previous: previous[idx]?.revenue || previous[idx]?.value || 0,
  }))
  const hasData = mergedData.length > 0

  return (
    <div className="h-full rounded-[2.5rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a1c1e] md:p-8">
      <h3 className="mb-8 text-xl font-black tracking-tight text-stone-900 dark:text-white">
        {title}
      </h3>

      {!hasData ? (
        <AnalyticsEmptyState
          title="No comparison data yet."
          message="Weekly comparison will appear after there is enough activity to compare periods."
        />
      ) : (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mergedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-stone-100 dark:text-white/5" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fontWeight: 700, fill: 'currentColor' }} axisLine={false} tickLine={false} className="text-stone-400 dark:text-stone-500" />
              <YAxis tickFormatter={(value) => `₦${Number(value || 0) / 1000}k`} tick={{ fontSize: 10, fontWeight: 700, fill: 'currentColor' }} axisLine={false} tickLine={false} className="text-stone-400 dark:text-stone-500" />
              <Tooltip content={<ComparisonTooltip />} cursor={{ fill: 'currentColor', className: 'text-stone-50 dark:text-white/5' }} />
              <Bar dataKey="current" name="Current" fill="#F59E0B" radius={[6, 6, 0, 0]} />
              <Bar dataKey="previous" name="Previous" fill="currentColor" className="text-stone-200 dark:text-white/10" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
