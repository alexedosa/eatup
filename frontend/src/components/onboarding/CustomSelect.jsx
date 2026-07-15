"use client"

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown2 } from 'iconsax-reactjs'

export default function CustomSelect({
  value,
  options,
  onChange,
  placeholder = 'Select',
  disabled = false,
  renderOption,
  renderValue,
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selected = options.find((option) => option.value === value)

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-stone-100 bg-stone-50 px-4 py-3 text-left text-sm font-bold text-stone-900 transition-all hover:border-stone-200 focus:outline-none focus:ring-4 focus:ring-amber-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20"
      >
        <span className="min-w-0 truncate">
          {selected
            ? renderValue
              ? renderValue(selected)
              : selected.label
            : placeholder}
        </span>
        <ArrowDown2
          size="16"
          className={`shrink-0 text-stone-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 right-0 z-20 mt-2 max-h-56 overflow-y-auto rounded-2xl border border-stone-100 bg-white p-2 shadow-xl shadow-stone-900/10 dark:border-white/10 dark:bg-[#1f2124]"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-colors ${
                  option.value === value
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950'
                    : 'text-stone-700 hover:bg-stone-50 dark:text-stone-200 dark:hover:bg-white/5'
                }`}
              >
                {renderOption ? renderOption(option) : option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
