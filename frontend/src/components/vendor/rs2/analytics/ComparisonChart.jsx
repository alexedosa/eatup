// src/components/vendor/rs2/analytics/ComparisonChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { formatNaira } from '@/lib/formatters'

export default function ComparisonChart({ current, previous, title }) {
  const mergedData = current.map((item, idx) => ({
    day: item.day,
    current: item.revenue,
    previous: previous[idx]?.revenue || 0
  }))
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#1a1c1e]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-stone-200 dark:border-white/10 p-3">
          <p className="text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">{label}</p>
          <div className="mt-2 space-y-1">
            <p className="text-xs font-bold text-amber-500 flex justify-between gap-4">
              <span className="opacity-70">THIS WEEK:</span> 
              <span>{formatNaira(payload[0].value)}</span>
            </p>
            <p className="text-xs font-bold text-stone-500 flex justify-between gap-4">
              <span className="opacity-70">LAST WEEK:</span> 
              <span>{formatNaira(payload[1].value)}</span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="bg-white dark:bg-[#1a1c1e] rounded-[2.5rem] p-6 md:p-8 border border-stone-200 dark:border-white/10 shadow-sm h-full">
      <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight mb-8">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mergedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-stone-100 dark:text-white/5" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 10, fontWeight: 700, fill: 'currentColor' }} 
              axisLine={false}
              tickLine={false}
              className="text-stone-400 dark:text-stone-500 uppercase tracking-widest"
            />
            <YAxis 
              tickFormatter={(value) => `₦${value / 1000}k`} 
              tick={{ fontSize: 10, fontWeight: 700, fill: 'currentColor' }} 
              axisLine={false}
              tickLine={false}
              className="text-stone-400 dark:text-stone-500"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', className: 'text-stone-50 dark:text-white/5' }} />
            <Bar dataKey="current" name="This Week" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            <Bar dataKey="previous" name="Last Week" fill="currentColor" className="text-stone-200 dark:text-white/10" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
