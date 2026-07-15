// src/components/vendor/rs2/analytics/InsightsPanel.jsx
import { motion } from 'framer-motion'
import { LampOn, Danger, TickCircle, InfoCircle } from 'iconsax-reactjs'
import AnalyticsEmptyState from './AnalyticsEmptyState'

export default function InsightsPanel({ insights = [] }) {
  const getInsightStyle = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-50/50 dark:bg-emerald-500/5',
          border: 'border-emerald-100 dark:border-emerald-500/10',
          icon: <TickCircle variant="Bold" className="text-emerald-500" />,
          title: 'text-emerald-900 dark:text-emerald-400',
        }
      case 'warning':
        return {
          bg: 'bg-amber-50/50 dark:bg-amber-500/5',
          border: 'border-amber-100 dark:border-amber-500/10',
          icon: <Danger variant="Bold" className="text-amber-500" />,
          title: 'text-amber-900 dark:text-amber-400',
        }
      case 'danger':
        return {
          bg: 'bg-red-50/50 dark:bg-red-500/5',
          border: 'border-red-100 dark:border-red-500/10',
          icon: <Danger variant="Bold" className="text-red-500" />,
          title: 'text-red-900 dark:text-red-400',
        }
      case 'info':
      default:
        return {
          bg: 'bg-blue-50/50 dark:bg-blue-500/5',
          border: 'border-blue-100 dark:border-blue-500/10',
          icon: <InfoCircle variant="Bold" className="text-blue-500" />,
          title: 'text-blue-900 dark:text-blue-400',
        }
    }
  }

  return (
    <div className="rounded-[2.5rem] border border-amber-200/40 bg-gradient-to-br from-amber-50/30 to-orange-50/30 p-6 shadow-sm dark:border-white/10 dark:from-white/5 dark:to-white/[0.02] md:p-10">
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
          <LampOn variant="Bold" size="24" />
        </div>
        <div>
          <h3 className="text-2xl font-black tracking-tight text-stone-900 dark:text-white">
            Business Insights
          </h3>
          <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
            Alerts and recommendations based on your recent data
          </p>
        </div>
      </div>

      {insights.length === 0 ? (
        <AnalyticsEmptyState
          title="No customer activity."
          message="Insights will appear once the dashboard has enough activity to analyze."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {insights.map((insight, idx) => {
            const style = getInsightStyle(insight.type)
            const title = insight.title || insight.type || 'Insight'
            const message = insight.message || insight.text || 'No orders yet for this period.'

            return (
              <motion.div
                key={`${title}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-[2rem] border p-6 transition-all duration-300 hover:shadow-xl ${style.bg} ${style.border}`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 shrink-0">{style.icon}</div>
                  <div className="min-w-0 flex-1">
                    <h4 className={`text-base font-black capitalize tracking-tight ${style.title}`}>
                      {title}
                    </h4>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-stone-500 dark:text-stone-400">
                      {message}
                    </p>
                    {insight.action && (
                      <button className="group mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-500 hover:text-amber-600">
                        {insight.action}
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
