import GlassCard from '../../shared/GlassCard'
import Image from 'next/image'

export default function PopularItems({ onItemClick, dashboardData }) {
  
  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const productsList = dashboardData?.products?.slice(0, 5) || [];
  const popularStats = dashboardData?.stats?.popularItems || [];

  // Smart food image mapping
  const getFoodImage = (name) => {
    if (name.includes('Jollof')) return 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=100&h=100&fit=crop'
    if (name.includes('Suya')) return 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop'
    if (name.includes('Pasta')) return 'https://images.unsplash.com/photo-1645112481338-3560e7740212?w=100&h=100&fit=crop'
    if (name.includes('Soup')) return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=100&h=100&fit=crop'
    if (name.includes('Plantain')) return 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop'
    if (name.includes('Chapman')) return 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100&h=100&fit=crop'
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop'
  }
  
  // Max orders for progress bar - either from stats or a default

  const maxOrders = popularStats.length > 0 ? popularStats[0].orders : 100

  
  return (
    <GlassCard className="col-span-1 md:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-stone-700 dark:text-stone-400 uppercase tracking-wide">Popular Items</p>
        <button 
          onClick={() => onItemClick?.('view_all')}
          className="text-[10px] text-amber-500 hover:text-amber-600 transition-colors"
        >
          Manage Menu →
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 dark:border-white/5">
              <th className="text-left py-2 text-[10px] font-semibold text-stone-400 uppercase tracking-wider w-12">#</th>
              <th className="text-left py-2 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Item</th>
              <th className="text-left py-2 text-[10px] font-semibold text-stone-400 uppercase tracking-wider hidden md:table-cell">Category</th>
              <th className="text-right py-2 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Orders</th>
              <th className="text-right py-2 text-[10px] font-semibold text-stone-400 uppercase tracking-wider hidden lg:table-cell">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {productsList.length > 0 ? productsList.map((item, index) => {
              const rank = index + 1;
              const orderPercent = 0; // No order data available
              return (
                <tr 
                  key={item._id || item.id || rank}
                  onClick={() => onItemClick?.(item.name)}
                  className="border-b border-stone-50 dark:border-white/5 cursor-pointer hover:bg-amber-50/30 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="py-2.5">
                    <span className={`
                      w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold
                      ${rank === 1 ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400' : 'bg-stone-100 dark:bg-white/10 text-stone-500 dark:text-stone-400'}
                    `}>
                      {rank}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 relative">
                        {item.images && item.images.length > 0 ? (
                            <Image 
                            src={item.images[0]} 
                            alt={item.name} 
                            fill
                            className="object-cover"
                          />
                        ) : (
                            <Image 
                            src={getFoodImage(item.name)} 
                            alt={item.name} 
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <span className="font-medium text-stone-800 dark:text-white">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-stone-500 dark:text-stone-400 text-xs hidden md:table-cell">{item.category?.name || item.category || 'Uncategorized'}</td>
                  <td className="py-2.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {(() => {
                        const stats = popularStats.find(s => s.productId === (item._id || item.id));
                        const orders = stats?.orders || 0;
                        const percent = maxOrders > 0 ? (orders / maxOrders) * 100 : 0;
                        return (
                          <>
                            <span className="text-sm font-semibold text-stone-700 dark:text-white">{orders}</span>
                            <div className="w-16 bg-stone-100 dark:bg-white/10 rounded-full h-1.5 hidden sm:block">
                              <div 
                                className="bg-amber-400 rounded-full h-1.5 transition-all duration-500"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </>
                        )
                      })()}
                    </div>

                  </td>
                  <td className="py-2.5 text-right text-stone-600 dark:text-stone-300 font-medium hidden lg:table-cell">
                    {formatNaira(item.price || 0)}
                  </td>
                </tr>
              )
            }) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-stone-500 dark:text-stone-400">
                  No products found. Start by adding some to your menu!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  )
}
