// src/components/vendor/rs2/payments/PaymentStatsCards.jsx
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { Calendar, Chart, Graph, Timer1, ArrowUp, ArrowDown } from 'iconsax-reactjs'

export default function PaymentStatsCards({ stats, formatNaira }) {
  const cards = [
    { key: 'today', icon: <Calendar size="24" variant="Bold" />, label: stats.today.label, amount: stats.today.amount, change: stats.today.change, changeType: stats.today.changeType, subtext: `${stats.today.orderCount} orders`, color: 'amber' },
    { key: 'week', icon: <Chart size="24" variant="Bold" />, label: stats.week.label, amount: stats.week.amount, change: stats.week.change, changeType: stats.week.changeType, subtext: `${stats.week.orderCount} orders`, color: 'blue' },
    { key: 'month', icon: <Graph size="24" variant="Bold" />, label: stats.month.label, amount: stats.month.amount, change: stats.month.change, changeType: stats.month.changeType, subtext: `${stats.month.orderCount} orders`, color: 'green' },
    { key: 'pending', icon: <Timer1 size="24" variant="Bold" />, label: stats.pending.label, amount: stats.pending.amount, change: stats.pending.change, changeType: stats.pending.changeType, subtext: `${stats.pending.orderCount} pending`, color: 'purple' }
  ]
  
  const getChangeColor = (changeType) => {
    return changeType === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-500'
  }
  
  const getCardGradient = (key) => {
    const gradients = {
      today: 'from-amber-500 to-orange-500',
      week: 'from-blue-500 to-indigo-500',
      month: 'from-green-500 to-emerald-500',
      pending: 'from-purple-500 to-pink-500'
    }
    return gradients[key] || 'from-amber-500 to-orange-500'
  }
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map((card) => (
        <motion.div
          key={card.key}
          variants={item}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-white dark:bg-[#242628] rounded-2xl border border-stone-100 dark:border-white/10 shadow-sm overflow-hidden"
        >
          <div className={`h-1.5 bg-gradient-to-r ${getCardGradient(card.key)}`} />
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-xl bg-${card.color}-50 dark:bg-${card.color}-500/10 text-${card.color}-500`}>
                {card.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${getChangeColor(card.changeType)} ${card.changeType === 'up' ? 'bg-green-50 dark:bg-green-500/10' : 'bg-red-50 dark:bg-red-500/10'}`}>
                {card.changeType === 'up' ? <ArrowUp size="12" /> : <ArrowDown size="12" />}
                {Math.abs(card.change)}%
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white">
              <CountUp end={card.amount} duration={1.5} separator="," prefix="₦" />
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mt-1">{card.label}</p>
            <p className="text-[10px] text-stone-400 mt-2 font-medium">{card.subtext}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
