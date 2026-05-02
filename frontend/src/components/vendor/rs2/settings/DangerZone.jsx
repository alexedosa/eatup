// src/components/vendor/rs2/settings/DangerZone.jsx
import { useState } from 'react'
import { Danger, Trash, CloseCircle, Refresh } from 'iconsax-reactjs'

export default function DangerZone({ onResetSettings }) {
  const [confirmText, setConfirmText] = useState('')
  
  const handleReset = () => {
    if (confirmText === 'RESET') {
      onResetSettings()
      setConfirmText('')
    }
  }
  
  return (
    <div className="border-2 border-red-200 dark:border-red-500/20 rounded-[2.5rem] overflow-hidden transition-all duration-300">
      <div className="p-6 bg-red-50 dark:bg-red-500/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-red-500 text-white shadow-lg shadow-red-500/20">
            <Danger size="20" variant="Bold" />
          </div>
          <h3 className="text-xl font-display font-black text-red-700 dark:text-red-500 tracking-tight">Danger Zone</h3>
        </div>
        <p className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest px-11">Irreversible actions — proceed with absolute caution</p>
      </div>
      
      <div className="p-8 space-y-8 bg-white dark:bg-[#1a1c1e]">
        {/* Reset Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-display font-black text-stone-900 dark:text-white tracking-tight">Reset All Configuration</h4>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Restore all preferences to factory defaults</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder='Type "RESET" to confirm'
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full sm:flex-1 px-5 py-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-red-100 dark:border-red-500/10 focus:outline-none focus:border-red-500 transition-all text-sm font-black uppercase tracking-widest text-red-600 dark:text-red-400 placeholder:text-stone-300 dark:placeholder:text-stone-700"
            />
            <button
              onClick={handleReset}
              disabled={confirmText !== 'RESET'}
              className={`
                w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2
                ${confirmText === 'RESET' 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600' 
                  : 'bg-stone-100 dark:bg-white/5 text-stone-400 cursor-not-allowed'}
              `}
            >
              <Refresh size="18" variant="Bold" />
              Reset All
            </button>
          </div>
        </div>
        
        {/* Deactivate Store */}
        <div className="pt-8 border-t border-red-50 dark:border-red-500/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-display font-black text-stone-900 dark:text-white tracking-tight">Deactivate Store</h4>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Temporarily disable your storefront</p>
            </div>
            <button
              onClick={() => confirm('Deactivate your store? You can reactivate anytime.')}
              className="px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/5 transition-all flex items-center gap-2"
            >
              <CloseCircle size="18" variant="Bold" />
              Go Offline
            </button>
          </div>
        </div>
        
        {/* Delete Account */}
        <div className="pt-8 border-t border-red-50 dark:border-red-500/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-display font-black text-red-700 dark:text-red-500 tracking-tight">Erase Business Account</h4>
              <p className="text-[10px] font-bold text-red-500/60 dark:text-red-400/40 uppercase tracking-widest mt-1">Permanently delete all data and assets</p>
            </div>
            <button
              onClick={() => confirm('Are you absolutely sure? This action cannot be undone.')}
              className="px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all flex items-center gap-2"
            >
              <Trash size="18" variant="Bold" />
              Delete Permanently
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
