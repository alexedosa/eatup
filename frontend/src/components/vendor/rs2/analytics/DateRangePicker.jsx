// src/components/vendor/rs2/analytics/DateRangePicker.jsx
'use client'

import { useState } from 'react'
import { Calendar, ArrowDown2 } from 'iconsax-reactjs'

export default function DateRangePicker({ presets, onPresetChange, currentPreset }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-2xl shadow-sm text-xs font-black uppercase tracking-widest text-stone-600 dark:text-stone-300 hover:border-amber-300 transition-all"
      >
        <Calendar size="16" variant="Bold" className="text-amber-500" />
        <span>{presets.find(p => p.id === currentPreset)?.label || 'Select Range'}</span>
        <ArrowDown2 size="14" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#1a1c1e] border border-stone-200 dark:border-white/10 rounded-2xl shadow-2xl z-[400] overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="p-2 space-y-1">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  onPresetChange(preset.id)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${currentPreset === preset.id ? 'bg-amber-500 text-white' : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-white/5'}`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
