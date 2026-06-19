import { motion } from 'framer-motion'
import { Receipt1, Timer1, Truck, TickCircle } from 'iconsax-reactjs';

const ORDER_STATUS_CONFIG = {
  new: { label: 'New Orders', color: 'amber', icon: Receipt1, bg: 'bg-amber-50', text: 'text-amber-600' },
  preparing: { label: 'Preparing', color: 'blue', icon: Timer1, bg: 'bg-blue-50', text: 'text-blue-600' },
  delivering: { label: 'Delivering', color: 'purple', icon: Truck, bg: 'bg-purple-50', text: 'text-purple-600' },
  completed: { label: 'Completed', color: 'green', icon: TickCircle, bg: 'bg-green-50', text: 'text-green-600' }
}

export default function OrderStatsCards({ counts }) {

  const stats = [
    { key: 'new', ...ORDER_STATUS_CONFIG.new, count: counts.new },
    { key: 'preparing', ...ORDER_STATUS_CONFIG.preparing, count: counts.preparing },
    { key: 'delivering', ...ORDER_STATUS_CONFIG.delivering, count: counts.delivering },
    { key: 'completed', ...ORDER_STATUS_CONFIG.completed, count: counts.completed }
  ]
  
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
  
  const getColorClasses = (color) => {
    const colors = {
      amber: 'text-amber-500',
      blue: 'text-sky-500',
      purple: 'text-indigo-500',
      green: 'text-emerald-500'
    }
    return colors[color]
  }
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.key}
            variants={item}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="
              relative overflow-hidden
              bg-white/40 dark:bg-[#242628]/40 backdrop-blur-md
              rounded-3xl p-4 md:p-5
              border border-stone-200/60 dark:border-white/10
              shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
              hover:shadow-lg hover:bg-white/60 dark:hover:bg-white/5
              transition-all duration-300
              cursor-pointer
            "
          >
            {/* Subtle mesh-like background hint */}
            <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-[0.03] bg-current ${getColorClasses(stat.color)}`} />
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`
                p-2 rounded-xl
                bg-white dark:bg-white/5 border border-stone-100 dark:border-white/10 shadow-sm
                ${getColorClasses(stat.color)}
              `}>
                <Icon size="20" variant="Bold" />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] text-stone-400 dark:text-stone-500">
                {stat.label}
              </span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <p className="text-3xl md:text-4xl font-black text-stone-800 dark:text-white tracking-tight">
                {stat.count}
              </p>
              <div className={`w-1.5 h-1.5 rounded-full ${stat.key === 'new' && stat.count > 0 ? 'animate-pulse bg-amber-500' : 'opacity-0'}`} />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  )
}
