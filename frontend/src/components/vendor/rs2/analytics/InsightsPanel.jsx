// src/components/vendor/rs2/analytics/InsightsPanel.jsx
import { motion } from 'framer-motion'
import { LampOn, Danger, TickCircle, InfoCircle } from 'iconsax-reactjs'

export default function InsightsPanel({ insights }) {
  const getInsightStyle = (type) => {
    switch (type) {
      case 'success':
        return { 
          bg: 'bg-emerald-50/50 dark:bg-emerald-500/5', 
          border: 'border-emerald-100 dark:border-emerald-500/10', 
          icon: <TickCircle variant="Bold" className="text-emerald-500" />,
          title: 'text-emerald-900 dark:text-emerald-400'
        }
      case 'warning':
        return { 
          bg: 'bg-amber-50/50 dark:bg-amber-500/5', 
          border: 'border-amber-100 dark:border-amber-500/10', 
          icon: <Danger variant="Bold" className="text-amber-500" />,
          title: 'text-amber-900 dark:text-amber-400'
        }
      case 'info':
        return { 
          bg: 'bg-blue-50/50 dark:bg-blue-500/5', 
          border: 'border-blue-100 dark:border-blue-500/10', 
          icon: <InfoCircle variant="Bold" className="text-blue-500" />,
          title: 'text-blue-900 dark:text-blue-400'
        }
      default:
        return { 
          bg: 'bg-stone-50/50 dark:bg-white/5', 
          border: 'border-stone-100 dark:border-white/10', 
          icon: <LampOn variant="Bold" className="text-stone-500" />,
          title: 'text-stone-900 dark:text-white'
        }
    }
  }
  
  return (
    <div className="bg-gradient-to-br from-amber-50/30 to-orange-50/30 dark:from-white/5 dark:to-white/[0.02] rounded-[2.5rem] p-6 md:p-10 border border-amber-200/40 dark:border-white/10 shadow-sm">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
          <LampOn variant="Bold" size="24" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">AI Business Insights</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Smart analysis based on your recent data</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, idx) => {
          const style = getInsightStyle(insight.type)
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-[2rem] border ${style.bg} ${style.border} group hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1">
                  {style.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`text-base font-black ${style.title} tracking-tight`}>{insight.title}</h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400 font-medium leading-relaxed mt-2">{insight.message}</p>
                  <button className="text-xs font-black uppercase tracking-widest text-amber-500 mt-4 hover:text-amber-600 flex items-center gap-2 group">
                    {insight.action}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
