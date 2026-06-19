import GlassCard from '../../shared/GlassCard'
import Skeleton from '../../shared/Skeleton'

const defaultStatus = {
  label: 'Unknown',
  color: 'text-stone-600',
  bg: 'bg-stone-100 dark:bg-white/10',
};

const statusConfig = {
  pending: { label: 'New', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  new: { label: 'New', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  preparing: { label: 'Preparing', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  delivering: { label: 'Delivering', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  delivered: { label: 'Delivered', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-500/10' },
  completed: { label: 'Completed', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-500/10' },
  cancelled: { label: 'Cancelled', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-500/10' },
};

function getStatusStyle(statusKey) {
  return statusConfig[statusKey?.toLowerCase?.()] ?? defaultStatus;
}

function formatOrderTime(order) {
  if (order.time) return order.time;
  if (!order.timestamp) return 'Recently';
  const diffMs = Date.now() - new Date(order.timestamp).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(order.timestamp).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
}

export default function RecentOrders({ onOrderClick, isLoading, orders = [] }) {

  
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
          orders && orders.length > 0 ? orders.map((order) => {
          const orderId = order.id || order._id;
          const status = getStatusStyle(order.status);
          const amount = order.amount ?? order.total ?? 0;
          const customerName = order.customer || 'Customer';

          return (
            <div
              key={orderId}
              onClick={() => onOrderClick?.(orderId)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50/50 dark:hover:bg-white/5 cursor-pointer transition-all duration-150"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-white/5 overflow-hidden flex-shrink-0 border border-stone-200 dark:border-white/10">
                  {order.customerImg ? (
                    <img 
                      src={order.customerImg} 
                      alt={customerName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-stone-400">
                      {customerName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-800 dark:text-white">{customerName}</p>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500">#{orderId} • {formatOrderTime(order)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-stone-700 dark:text-white">
                  {formatNaira(amount)}
                </span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                  {status.label}
                </span>
              </div>
            </div>
          )
        }) : (
          <div className="flex flex-col items-center justify-center h-48 text-stone-400">
            <span className="text-sm">No recent orders yet.</span>
          </div>
        )
      )}
      </div>
    </GlassCard>
  )
}
