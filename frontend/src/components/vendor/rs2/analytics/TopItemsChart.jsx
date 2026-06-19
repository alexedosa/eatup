// src/components/vendor/rs2/analytics/TopItemsChart.jsx
import { formatNaira } from '@/lib/formatters'

export default function TopItemsChart({ items }) {
  const top5 = items.slice(0, 5)
  const maxOrders = Math.max(...top5.map(i => i.orders))
  
  return (
    <div className="bg-white dark:bg-[#1a1c1e] rounded-[2.5rem] p-6 md:p-8 border border-stone-200 dark:border-white/10 shadow-sm h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight">Top Selling Items</h3>
        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">Last 7 days</span>
      </div>
      <div className="space-y-6">
        {top5.map((item, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className={`
                  w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black
                  ${idx === 0 ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-stone-400'}
                `}>
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <span className="text-sm font-bold text-stone-800 dark:text-white block truncate">{item.name}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-black text-stone-900 dark:text-white">{formatNaira(item.revenue)}</span>
                <span className="text-[9px] font-bold text-emerald-500">{item.trend}</span>
              </div>
            </div>
            <div className="relative h-2 bg-stone-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700 ease-out group-hover:brightness-110"
                style={{ width: `${(item.orders / maxOrders) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-tight">{item.orders} orders</span>
              <span className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-tight">{Math.round((item.orders / maxOrders) * 100)}% of peak</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
