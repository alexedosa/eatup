import { METRICS, formatCurrency } from '@/data/vendorMetrics'
import GlassCard from '../shared/GlassCard'

export default function QuickToolbox({ onMetricClick }) {
  
  const metricsArray = [
    METRICS.ordersToday,
    METRICS.revenueWeek,
    METRICS.rating
  ]
  
  const getChangeIcon = (changeType, change) => {
    if (changeType === 'up') return '↑'
    if (changeType === 'down') return '↓'
    return '•'
  }
  
  const getChangeColor = (changeType) => {
    if (changeType === 'up') return 'text-green-600 dark:text-green-400'
    if (changeType === 'down') return 'text-red-500 dark:text-red-400'
    return 'text-stone-400 dark:text-stone-500'
  }
  
  const formatValue = (metric) => {
    if (metric.label === 'Revenue This Week') {
      return formatCurrency(metric.value)
    }
    if (metric.label === 'Average Rating') {
      return `${metric.value} ${metric.suffix}`
    }
    return metric.value.toLocaleString()
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      {metricsArray.map((metric, index) => (
        <GlassCard
          key={index}
          onClick={() => onMetricClick?.(metric.onClick)}
          className="cursor-pointer hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1">
                {metric.label}
              </p>
              <p className="text-2xl font-display font-bold text-stone-800 dark:text-white">
                {formatValue(metric)}
              </p>
              
              {/* Change indicator */}
              {metric.change !== 0 && (
                <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${getChangeColor(metric.changeType)}`}>
                  <span>{getChangeIcon(metric.changeType, metric.change)}</span>
                  <span>{Math.abs(metric.change)}%</span>
                  <span className="text-stone-400 dark:text-stone-500 text-[10px]">vs yesterday</span>
                </div>
              )}
              
              {/* Reviews count for rating */}
              {metric.totalReviews && (
                <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1">
                  From {metric.totalReviews.toLocaleString()} reviews
                </p>
              )}
            </div>
            
            <div className="text-3xl opacity-60">
              {metric.icon}
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  )
}
