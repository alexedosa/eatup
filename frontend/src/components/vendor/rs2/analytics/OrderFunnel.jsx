// src/components/vendor/rs2/analytics/OrderFunnel.jsx
import { formatNumber } from '@/data/mockAnalytics'

export default function OrderFunnel({ data }) {
  const stages = [
    { name: 'Store Views', value: data.views, color: '#F59E0B' },
    { name: 'Added to Cart', value: data.cart, color: '#F97316' },
    { name: 'Reached Checkout', value: data.checkout, color: '#FBBF24' },
    { name: 'Order Completed', value: data.completed, color: '#10B981' }
  ]
  
  const maxValue = Math.max(...stages.map(s => s.value))
  
  return (
    <div className="bg-white dark:bg-[#1a1c1e] rounded-[2.5rem] p-6 md:p-8 border border-stone-200 dark:border-white/10 shadow-sm h-full">
      <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight mb-2">Order Funnel</h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mb-10">Customer journey from first view to completion</p>
      
      <div className="space-y-8">
        {stages.map((stage, idx) => {
          const percentage = (stage.value / maxValue) * 100
          const conversion = idx > 0 ? ((stage.value / stages[idx - 1].value) * 100).toFixed(1) : null
          
          return (
            <div key={idx} className="relative">
              <div className="flex justify-between items-end text-sm mb-2 px-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">{stage.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-base font-black text-stone-900 dark:text-white">{formatNumber(stage.value)}</span>
                  {conversion && (
                    <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full">
                      {conversion}% conv.
                    </span>
                  )}
                </div>
              </div>
              <div className="relative h-4 bg-stone-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%`, backgroundColor: stage.color }}
                />
              </div>
              
              {idx < stages.length - 1 && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-stone-100 dark:bg-white/10" />
              )}
            </div>
          )
        })}
      </div>
      
      <div className="mt-12 pt-6 border-t border-stone-100 dark:border-white/5">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">Overall Conversion</span>
          <span className="text-xl font-black text-emerald-600">
            {((data.completed / data.views) * 100).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  )
}
