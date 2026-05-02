"use client"
import { motion, AnimatePresence } from 'framer-motion'
import { Danger, InfoCircle } from 'iconsax-reactjs'

export default function ConfirmationDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "warning" 
}) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-[#1a1c1e] rounded-3xl shadow-2xl overflow-hidden border border-stone-200 dark:border-white/10"
          >
            <div className="p-8">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${type === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  {type === 'danger' ? <Danger variant="Bold" size="24" /> : <InfoCircle variant="Bold" size="24" />}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-stone-900 dark:text-white leading-tight">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 font-medium leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 transition-colors"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm()
                    onClose()
                  }}
                  className={`flex-1 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-white shadow-lg transition-transform active:scale-95 ${type === 'danger' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
