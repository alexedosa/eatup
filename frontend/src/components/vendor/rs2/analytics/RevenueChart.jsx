// src/components/vendor/rs2/analytics/RevenueChart.jsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { formatNaira } from '@/lib/formatters'

export default function RevenueChart({ data }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-[#1a1c1e]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-stone-200 dark:border-white/10 p-3">
          <p className="text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">{label}</p>
          <p className="text-sm font-bold text-amber-500 mt-1">{formatNaira(payload[0].value)}</p>
          <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium mt-0.5">{payload[0].payload.orders} orders</p>
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="bg-white dark:bg-[#1a1c1e] rounded-[2.5rem] p-6 md:p-8 border border-stone-200 dark:border-white/10 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight">Revenue Trend</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-1">Last 7 days performance</p>
        </div>
      </div>
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
              className="text-stone-400 dark:text-stone-500 uppercase tracking-widest"
            />
            <YAxis 
              tickFormatter={(value) => `₦${value / 1000}k`} 
              tick={{ fontSize: 10, fontWeight: 700, fill: 'currentColor' }} 
              tickLine={false} 
              axisLine={false}
              className="text-stone-400 dark:text-stone-500"
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#F59E0B', strokeWidth: 1, strokeDasharray: '4 4' }} />
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
    </div>
  )
}
