"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { DAYS } from '@/lib/profileUtils'
import { TIME_OPTIONS } from '@/lib/shopFormUtils'
import CustomSelect from './CustomSelect'

function DayToggle({ isOpen, onToggle, disabled }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={isOpen}
      className={`relative h-6 w-11 rounded-full transition-all duration-300 shadow-inner disabled:cursor-not-allowed disabled:opacity-60 ${
        isOpen ? 'bg-stone-900 dark:bg-white' : 'bg-stone-200 dark:bg-white/10'
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 dark:bg-stone-950 ${
          isOpen ? 'left-5' : 'left-0.5'
        }`}
      />
    </button>
  )
}

export default function BusinessHoursSection({ hours, onToggleDay, onUpdateDay, error, disabled }) {
  const timeOptions = TIME_OPTIONS.map((time) => ({ value: time, label: time }))

  return (
    <div className="space-y-3">
        {DAYS.map((day) => {
          const schedule = hours[day.id]
          const isOpen = schedule?.isOpen

          return (
            <div
              key={day.id}
              className="rounded-2xl border border-stone-100 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#1a1c1e]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-black text-stone-900 dark:text-white">{day.label}</p>
                  <p className="text-[11px] font-medium text-stone-400 dark:text-stone-500">
                    {isOpen ? 'Open' : 'Closed'}
                  </p>
                </div>
                <DayToggle
                  isOpen={isOpen}
                  onToggle={() => onToggleDay(day.id)}
                  disabled={disabled}
                />
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
                          Opening Time
                        </span>
                        <CustomSelect
                          value={schedule.open}
                          options={timeOptions}
                          onChange={(value) => onUpdateDay(day.id, 'open', value)}
                          disabled={disabled}
                          placeholder="09:00"
                        />
                      </label>
                      <label className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
                          Closing Time
                        </span>
                        <CustomSelect
                          value={schedule.close}
                          options={timeOptions}
                          onChange={(value) => onUpdateDay(day.id, 'close', value)}
                          disabled={disabled}
                          placeholder="21:00"
                        />
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      {error && (
        <p className="text-[11px] font-bold text-red-500 dark:text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
