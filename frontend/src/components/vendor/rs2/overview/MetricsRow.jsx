import { QUICK_METRICS } from '@/data/vendorOverviewData'
import GlassCard from '../../shared/GlassCard'
import Skeleton from '../../shared/Skeleton'

export default function MetricsRow({ onMetricClick, isLoading }) {
  
  const colorClasses = {
    amber: 'from-amber-100/50 to-amber-50/50 text-amber-600',
    blue: 'from-blue-100/50 to-blue-50/50 text-blue-600',
    red: 'from-red-100/50 to-red-50/50 text-red-500',
    green: 'from-green-100/50 to-green-50/50 text-green-600'
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {isLoading ? (
        [...Array(4)].map((_, i) => (
          <GlassCard key={i} className="h-[84px]">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-16 h-3" />
                <Skeleton className="w-10 h-5" />
              </div>
            </div>
          </GlassCard>
        ))
      ) : (
        QUICK_METRICS.map((metric) => (
        <GlassCard
          key={metric.id}
          onClick={() => onMetricClick?.(metric.id)}
          className="cursor-pointer hover:scale-[1.02] transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className={`
              w-10 h-10 rounded-xl
              bg-gradient-to-br ${colorClasses[metric.color]}
              flex items-center justify-center text-xl
            `}>
              {metric.isCurrency ? (
                <span className="text-green-600 font-black text-base leading-none">₦</span>
              ) : (
                metric.icon
              )}
            </div>
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400">{metric.label}</p>
              <p className="text-xl font-bold text-stone-800 dark:text-white">
                {metric.isCurrency ? `₦${metric.value}` : metric.value}
              </p>
              {metric.change !== '0' && (
                <span className={`
                  text-[10px] font-medium
                  ${metric.change.includes('+') ? 'text-green-600' : 'text-red-500'}
                `}>
                  {metric.change}
                </span>
              )}
            </div>
          </div>
        </GlassCard>
        ))
      )}
    </div>
  )
}
