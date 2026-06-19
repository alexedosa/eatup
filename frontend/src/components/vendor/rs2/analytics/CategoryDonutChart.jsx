// src/components/vendor/rs2/analytics/CategoryDonutChart.jsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { formatNaira } from '@/lib/formatters'

export default function CategoryDonutChart({ data }) {
  const RADIAN = Math.PI / 180
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    
    return percent > 0.05 ? (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-[10px] font-black uppercase">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null
  }
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload
      return (
        <div className="bg-white/95 dark:bg-[#1a1c1e]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-stone-200 dark:border-white/10 p-3">
          <p className="text-[10px] font-black text-stone-800 dark:text-white uppercase tracking-widest">{item.name}</p>
          <p className="text-sm font-bold text-amber-500 mt-1">{formatNaira(item.revenue)}</p>
          <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium mt-0.5">{item.value}% of total</p>
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="bg-white dark:bg-[#1a1c1e] rounded-[2.5rem] p-6 md:p-8 border border-stone-200 dark:border-white/10 shadow-sm h-full">
      <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight mb-8">Revenue by Category</h3>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
              stroke="none"
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              layout="vertical"
              verticalAlign="middle"
              align="right"
              formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 ml-2">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
