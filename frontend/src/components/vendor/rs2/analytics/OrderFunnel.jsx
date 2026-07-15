// src/components/vendor/rs2/analytics/OrderFunnel.jsx
import { formatNumber } from '@/lib/formatters'
import AnalyticsEmptyState from './AnalyticsEmptyState'

export default function OrderFunnel({ data = {} }) {
  const stages = [
    { key: 'placed', name: 'Placed', value: data.placed || 0, color: '#F59E0B' },
    { key: 'paid', name: 'Paid', value: data.paid || 0, color: '#F97316' },
    { key: 'preparing', name: 'Preparing', value: data.preparing || 0, color: '#FBBF24' },
    { key: 'completed', name: 'Completed', value: data.completed || 0, color: '#10B981' },
    { key: 'cancelled', name: 'Cancelled', value: data.cancelled || 0, color: '#EF4444' },
  ]

  const maxValue = Math.max(...stages.map((stage) => stage.value), 0)
  const hasData = maxValue > 0

  return (
    <div className="h-full rounded-[2.5rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a1c1e] md:p-8">
      <h3 className="mb-2 text-xl font-black tracking-tight text-stone-900 dark:text-white">
        Order Funnel
      </h3>
      <p className="mb-10 text-xs font-medium text-stone-500 dark:text-stone-400">
        Placed to paid, preparation, completion, and cancellation.
      </p>

      {!hasData ? (
        <AnalyticsEmptyState
          title="Orders will appear here."
          message="The funnel will populate when customers place orders."
        />
      ) : (
        <>
          <div className="space-y-8">
            {stages.map((stage, idx) => {
              const percentage = maxValue ? (stage.value / maxValue) * 100 : 0
              const previousValue = stages[idx - 1]?.value || 0
              const conversion = idx > 0 && previousValue > 0
                ? ((stage.value / previousValue) * 100).toFixed(1)
                : null

              return (
                <div key={stage.key} className="relative">
                  <div className="mb-2 flex items-end justify-between px-1 text-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
                      {stage.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-black text-stone-900 dark:text-white">
                        {formatNumber(stage.value)}
                      </span>
                      {conversion && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-black text-emerald-600">
                          {conversion}% conv.
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="relative h-4 overflow-hidden rounded-full bg-stone-100 dark:bg-white/5">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%`, backgroundColor: stage.color }}
                    />
                  </div>

                  {idx < stages.length - 1 && (
                    <div className="absolute -bottom-6 left-1/2 h-4 w-0.5 -translate-x-1/2 bg-stone-100 dark:bg-white/10" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-12 border-t border-stone-100 pt-6 dark:border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
                Completion Rate
              </span>
              <span className="text-xl font-black text-emerald-600">
                {data.placed ? ((data.completed / data.placed) * 100).toFixed(2) : '0.00'}%
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
