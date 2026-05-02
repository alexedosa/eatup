// src/components/vendor/rs2/profile/BankDetailsCard.jsx
import { useState } from 'react'
import { Bank, Edit2, TickCircle, CloseCircle, LampOn } from 'iconsax-reactjs'

export default function BankDetailsCard({ bank, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...bank })
  
  const handleSave = () => {
    Object.keys(formData).forEach(key => {
      if (formData[key] !== bank[key]) {
        onUpdate(key, formData[key])
      }
    })
    setIsEditing(false)
  }
  
  return (
    <div className="bg-white dark:bg-[#1a1c1e] rounded-[2rem] border border-stone-100 dark:border-white/10 shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-6 border-b border-stone-100 dark:border-white/5 bg-gradient-to-r from-amber-50/30 dark:from-amber-500/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
              <Bank size="20" variant="Bold" />
            </div>
            <div>
              <h2 className="font-display font-black text-stone-900 dark:text-white tracking-tight">Bank Details</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mt-1">Payout destination</p>
            </div>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-xl bg-stone-50 dark:bg-white/5 text-stone-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all"
            >
              <Edit2 size="18" variant="Bold" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-xl bg-stone-50 dark:bg-white/5 text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
              >
                <CloseCircle size="20" variant="Bold" />
              </button>
              <button
                onClick={handleSave}
                className="p-2 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all"
              >
                <TickCircle size="20" variant="Bold" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Bank Name</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 transition-all text-stone-800 dark:text-white font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Account Name</label>
              <input
                type="text"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 transition-all text-stone-800 dark:text-white font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Account Number</label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 transition-all text-stone-800 dark:text-white font-bold"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-stone-50 dark:border-white/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">Bank Name</span>
              <span className="text-sm font-black text-stone-800 dark:text-white uppercase tracking-tight">{bank.bankName}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-stone-50 dark:border-white/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">Account Name</span>
              <span className="text-sm font-black text-stone-800 dark:text-white uppercase tracking-tight">{bank.accountName}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">Account Number</span>
              <span className="text-sm font-black text-amber-500 tracking-widest">{bank.accountNumber}</span>
            </div>
          </div>
        )}
        
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-500/5 rounded-2xl flex items-start gap-3 border border-amber-100 dark:border-amber-500/10">
          <LampOn size="18" className="text-amber-500 shrink-0" variant="Bulk" />
          <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400/80 leading-relaxed uppercase tracking-widest">
            Payouts are processed weekly on Thursdays. Bank details can only be updated once every 7 days for security.
          </p>
        </div>
      </div>
    </div>
  )
}
