"use client"

import { motion } from 'framer-motion'
import { TickCircle } from 'iconsax-reactjs'

export default function SuccessState() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="relative overflow-hidden py-6 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-x-0 top-2 flex justify-center gap-3 opacity-70">
        {[0, 1, 2, 3, 4].map((item) => (
          <motion.span
            key={item}
            className="h-2 w-2 rounded-full bg-amber-400"
            initial={{ y: 10, opacity: 0, scale: 0.6 }}
            animate={{ y: [-2, -28, -18], opacity: [0, 1, 0], scale: [0.7, 1, 0.8] }}
            transition={{ delay: item * 0.06, duration: 0.9, ease: 'easeOut' }}
          />
        ))}
      </div>

      <motion.div
        className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-200/70 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.08, 1] }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <TickCircle size="54" variant="Bold" />
      </motion.div>

      <div className="space-y-3">
        <h2 className="font-display text-3xl font-black tracking-tight text-stone-950 dark:text-white">
          Your shop has been created!
        </h2>
        <p className="mx-auto max-w-sm text-sm font-medium leading-6 text-stone-500 dark:text-stone-400">
          Everything is ready. Preparing your dashboard...
        </p>
      </div>

      <div className="mx-auto mt-8 h-1.5 w-28 overflow-hidden rounded-full bg-stone-100 dark:bg-white/10">
        <motion.div
          className="h-full rounded-full bg-emerald-500"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
