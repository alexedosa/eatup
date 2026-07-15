// src/components/vendor/rs2/analytics/KPICard.jsx
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

export default function KPICard({ label, value, change = 0, trend = 'up', prefix = '', suffix = '', formatValue }) {
  const isUp = trend === 'up'
  const changeColor = isUp ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
  const changeIcon = isUp ? '↑' : '↓'
  const renderValue = (num) => {
    if (formatValue) return formatValue(num)
    return `${prefix}${new Intl.NumberFormat('en-NG').format(num || 0)}${suffix}`
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex min-h-[150px] flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1a1c1e]"
    >
      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
        {label}
      </p>
      <p className="mt-3 text-2xl font-black tracking-tight text-stone-900 dark:text-white">
        <CountUp end={Number(value) || 0} duration={1.2} formattingFn={renderValue} />
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={`text-xs font-bold ${changeColor}`}>
          {changeIcon} {Math.abs(Number(change) || 0)}%
        </span>
        <span className="text-[10px] font-medium text-stone-400 dark:text-stone-500">
          vs last period
        </span>
      </div>
    </motion.div>
  )
}
