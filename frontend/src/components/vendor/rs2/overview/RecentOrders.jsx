import { RECENT_ORDERS, statusConfig } from '@/data/vendorOverviewData'
import GlassCard from '../../shared/GlassCard'
import Skeleton from '../../shared/Skeleton'

export default function RecentOrders({ onOrderClick, isLoading }) {
  
  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount)
  }
  
  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-stone-700 dark:text-stone-400 uppercase tracking-wide">Recent Orders</p>
        <button 
          onClick={() => onOrderClick?.('view_all')}
          className="text-[10px] text-amber-500 hover:text-amber-600 transition-colors"
        >
          View All →
        </button>
      </div>
      
      <div className="space-y-2">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-xl">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="w-24 h-3" />
                  <Skeleton className="w-16 h-2" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-4" />
                <Skeleton className="w-16 h-4 rounded-full" />
              </div>
            </div>
          ))
        ) : (
          RECENT_ORDERS.map((order) => {
          const status = statusConfig[order.status]
          return (
            <div
              key={order.id}
              onClick={() => onOrderClick?.(order.id)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50/50 dark:hover:bg-white/5 cursor-pointer transition-all duration-150"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-white/5 overflow-hidden flex-shrink-0 border border-stone-200 dark:border-white/10">
                  {order.customerImg ? (
                    <img 
                      src={order.customerImg} 
                      alt={order.customer} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-stone-400">
                      {order.customer.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-800 dark:text-white">{order.customer}</p>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500">#{order.id} • {order.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-stone-700 dark:text-white">
                  {formatNaira(order.amount)}
                </span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                  {status.label}
                </span>
              </div>
            </div>
          )
        })
      )}
      </div>
    </GlassCard>
  )
}
