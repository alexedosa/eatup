// src/components/vendor/rs2/analytics/KPICard.jsx
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

export default function KPICard({ label, value, previous, change, trend, prefix = '', suffix = '', formatValue }) {
  const changeColor = trend === 'up' ? 'text-green-600' : 'text-red-500'
  const changeIcon = trend === 'up' ? '↑' : '↓'
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-[#1a1c1e] rounded-2xl p-5 border border-stone-200 dark:border-white/10 shadow-sm"
    >
      <p className="text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-bold text-stone-900 dark:text-white mt-2">
        <CountUp end={value} duration={1.5} separator="," prefix={prefix} suffix={suffix} />
      </p>
      <div className="flex items-center gap-2 mt-2">
        <span className={`text-xs font-bold ${changeColor}`}>
          {changeIcon} {Math.abs(change)}%
        </span>
        <span className="text-[10px] text-stone-400 dark:text-stone-500 font-medium">vs last period</span>
      </div>
    </motion.div>
  )
}
