// src/components/vendor/rs2/profile/StoreHoursCard.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer1, Edit2, Information, TickCircle, CloseCircle } from 'iconsax-reactjs'
import { DAYS, formatTime } from '@/lib/profileUtils'

export default function StoreHoursCard({ hours, onUpdate, onToggleDay }) {
  const [editingDay, setEditingDay] = useState(null)
  const [editValues, setEditValues] = useState({ open: '', close: '' })
  
  const startEditing = (day) => {
    setEditingDay(day)
    setEditValues({
      open: hours[day].open,
      close: hours[day].close
    })
  }
  
  const saveHours = (day) => {
    onUpdate(day, 'open', editValues.open)
    onUpdate(day, 'close', editValues.close)
    setEditingDay(null)
  }
  
  const getStatusText = (day) => {
    const dayData = hours[day.id]
    if (!dayData.isOpen) return 'Closed'
    return `${formatTime(dayData.open)} - ${formatTime(dayData.close)}`
  }
  
  const getStatusColor = (day) => {
    const dayData = hours[day.id]
    if (!dayData.isOpen) return 'text-red-500'
    const now = new Date()
    const currentDay = DAYS[now.getDay() === 0 ? 6 : now.getDay() - 1]
    if (currentDay?.id === day.id) {
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      if (currentTime >= dayData.open && currentTime <= dayData.close) {
        return 'text-green-600 dark:text-green-400'
      }
    }
    return 'text-stone-500 dark:text-stone-400'
  }
  
  return (
    <div className="bg-white dark:bg-[#1a1c1e] rounded-[2rem] border border-stone-100 dark:border-white/10 shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-6 border-b border-stone-100 dark:border-white/5 bg-gradient-to-r from-amber-50/30 dark:from-amber-500/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
              <Timer1 size="20" variant="Bold" />
            </div>
            <div>
              <h2 className="font-display font-black text-stone-900 dark:text-white tracking-tight">Operating Hours</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mt-1">When your store is live</p>
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">Click to edit</div>
        </div>
      </div>
      
      <div className="divide-y divide-stone-50 dark:divide-white/5">
        {DAYS.map((day, idx) => (
          <motion.div
            key={day.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-5 hover:bg-stone-50/50 dark:hover:bg-white/5 transition-colors group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="w-24">
                  <span className="text-sm font-black text-stone-800 dark:text-white uppercase tracking-tight">{day.label}</span>
                </div>
                
                {/* Toggle Switch */}
                <button
                  onClick={() => onToggleDay(day.id)}
                  className={`
                    relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner
                    ${hours[day.id].isOpen ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}
                  `}
                >
                  <span className={`
                    absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md
                    ${hours[day.id].isOpen ? 'left-5.5' : 'left-0.5'}
                  `} />
                </button>
              </div>
                
              {editingDay === day.id ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-stone-50 dark:bg-white/5 p-1 rounded-xl border border-stone-100 dark:border-white/10">
                    <input
                      type="time"
                      value={editValues.open}
                      onChange={(e) => setEditValues({ ...editValues, open: e.target.value })}
                      className="px-2 py-1 rounded-lg bg-transparent text-xs font-bold text-stone-800 dark:text-white focus:outline-none"
                    />
                    <span className="text-stone-400 font-bold">to</span>
                    <input
                      type="time"
                      value={editValues.close}
                      onChange={(e) => setEditValues({ ...editValues, close: e.target.value })}
                      className="px-2 py-1 rounded-lg bg-transparent text-xs font-bold text-stone-800 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => saveHours(day.id)}
                      className="p-2 rounded-lg bg-amber-500 text-white shadow-md hover:bg-amber-600 transition-all"
                    >
                      <TickCircle size="16" variant="Bold" />
                    </button>
                    <button
                      onClick={() => setEditingDay(null)}
                      className="p-2 rounded-lg bg-stone-100 dark:bg-white/10 text-stone-400 hover:text-red-500 transition-all"
                    >
                      <CloseCircle size="16" variant="Bold" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`text-sm font-bold uppercase tracking-tight ${getStatusColor(day)}`}>
                      {getStatusText(day)}
                    </span>
                  </div>
                  {hours[day.id].isOpen && (
                    <button
                      onClick={() => startEditing(day.id)}
                      className="p-2 rounded-xl text-stone-300 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Edit2 size="16" variant="Bold" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 bg-amber-50/50 dark:bg-amber-500/5 border-t border-stone-50 dark:border-white/5 flex items-center gap-3">
        <Information size="16" className="text-amber-500" />
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">
          Special hours for holidays can be set in the Settings tab
        </p>
      </div>
    </div>
  )
}
