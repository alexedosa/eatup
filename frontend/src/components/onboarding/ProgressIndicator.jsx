"use client"

import { motion } from 'framer-motion'

export default function ProgressIndicator({ step = 1, total = 2 }) {
  const progress = Math.min(Math.max(step / total, 0), 1) * 100

  return (
    <div className="space-y-2" aria-label={`Step ${step} of ${total}`}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-700 dark:text-stone-200">
          Step {step} of {total}
        </p>
        <p className="text-[11px] font-bold text-stone-400 dark:text-stone-500">
          {Math.round(progress)}%
        </p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-stone-100 dark:bg-white/10">
        <motion.div
          className="h-full rounded-full bg-stone-900 dark:bg-stone-100"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
