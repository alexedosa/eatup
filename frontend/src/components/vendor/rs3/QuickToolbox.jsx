import { Box, WalletMoney, Star } from 'iconsax-reactjs'
import GlassCard from '../shared/GlassCard'

export default function QuickToolbox({ onMetricClick, dashboardData }) {
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const stats = dashboardData?.stats || {};
  
  const metricsArray = [
    {
      label: 'Orders Today',
      value: stats.totalOrders || 0,
      change: stats.orderGrowth || 0,
      changeType: (stats.orderGrowth || 0) >= 0 ? 'up' : 'down',
      icon: <Box variant="Outline" />,
      onClick: 'orders'
    },
    {
      label: 'Revenue This Week',
      value: stats.weeklyRevenue || 0,
      change: stats.revenueGrowth || 0,
      changeType: (stats.revenueGrowth || 0) >= 0 ? 'up' : 'down',
      icon: <WalletMoney variant="Outline" />,
      onClick: 'analytics',
      isCurrency: true
    },
    {
      label: 'Average Rating',
      value: stats.averageRating || 0,
      change: 0,
      changeType: 'neutral',
      icon: <Star variant="Bold" className="text-amber-400" />,
      onClick: 'reviews',
      totalReviews: stats.totalReviews || 0
    }
  ]
  
  const getChangeIcon = (changeType) => {
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
    if (metric.isCurrency) {
      return formatCurrency(metric.value)
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
                  <span>{getChangeIcon(metric.changeType)}</span>
                  <span>{Math.abs(metric.change)}%</span>
                  <span className="text-stone-400 dark:text-stone-500 text-[10px]">vs yesterday</span>
                </div>
              )}
              
              {/* Reviews count for rating */}
              {metric.totalReviews > 0 && (
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
