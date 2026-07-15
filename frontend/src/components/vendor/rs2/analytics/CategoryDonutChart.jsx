// src/components/vendor/rs2/analytics/CategoryDonutChart.jsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { formatNaira } from '@/lib/formatters'
import AnalyticsEmptyState from './AnalyticsEmptyState'

const COLORS = ['#F59E0B', '#10B981', '#6366F1', '#EF4444', '#14B8A6', '#F97316']
const RADIAN = Math.PI / 180

function renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return percent > 0.05 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-[10px] font-black uppercase">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null
}

function CategoryTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const item = payload[0].payload
    return (
      <div className="rounded-2xl border border-stone-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#1a1c1e]/95">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-800 dark:text-white">
          {item.name}
        </p>
        <p className="mt-1 text-sm font-bold text-amber-500">
          {formatNaira(item.revenue || item.value || 0)}
        </p>
      </div>
    )
  }
  return null
}

export default function CategoryDonutChart({ data = [] }) {
  const chartData = data.map((item, index) => ({
    ...item,
    name: item.name || item.category || `Category ${index + 1}`,
    value: item.revenue || item.value || 0,
    color: item.color || COLORS[index % COLORS.length],
  })).filter((item) => item.value > 0)

  return (
    <div className="h-full rounded-[2.5rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a1c1e] md:p-8">
      <h3 className="mb-8 text-xl font-black tracking-tight text-stone-900 dark:text-white">
        Revenue by Category
      </h3>

      {chartData.length === 0 ? (
        <AnalyticsEmptyState
          title="No category revenue recorded."
          message="Category revenue will populate once menu items receive completed orders."
        />
      ) : (
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
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
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CategoryTooltip />} />
              <Legend
                iconType="circle"
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value) => (
                  <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
