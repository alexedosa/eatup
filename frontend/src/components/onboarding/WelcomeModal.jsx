"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import logo from '@/assets/logo/logo.png'
import ProgressIndicator from './ProgressIndicator'

export default function WelcomeModal({ userName, onContinue }) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="space-y-8"
    >
      <div className="space-y-5 text-center">
        <motion.div
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-amber-50 to-orange-100 shadow-xl shadow-orange-500/10 ring-1 ring-orange-200/50 dark:from-white/10 dark:to-amber-500/10 dark:ring-white/10"
          animate={{ y: [0, -5, 0], rotate: [0, -1.5, 1.5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <Image
            src={logo}
            alt=""
            width={76}
            height={76}
            className="object-contain drop-shadow-sm"
            priority
          />
        </motion.div>

        <div className="space-y-3">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-amber-600 dark:text-amber-300">
            Welcome to EatUp
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-stone-950 dark:text-white sm:text-4xl">
            Welcome{userName ? `, ${userName}` : ''}!
          </h2>
          <p className="mx-auto max-w-[420px] text-sm font-medium leading-6 text-stone-500 dark:text-stone-400">
            Before you start managing products, customers, and orders, let&apos;s create your first shop.
            This only takes a minute.
          </p>
        </div>
      </div>

      <ProgressIndicator step={1} total={2} />

      <button
        type="button"
        onClick={onContinue}
        className="w-full rounded-2xl bg-stone-950 px-5 py-4 text-sm font-black text-white shadow-xl shadow-stone-950/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-800 focus:outline-none focus:ring-4 focus:ring-amber-500/20 active:translate-y-0 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-100"
      >
        Create My Shop
      </button>
    </motion.div>
  )
}
