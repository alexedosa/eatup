"use client"
import { motion } from 'framer-motion'
import { TickCircle, Timer1, Danger, InfoCircle } from 'iconsax-reactjs'

export default function NotificationDropdown({ isOpen, onClose, notifications = [] }) {
  if (!isOpen) return null

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <TickCircle variant="Bold" size="18" className="text-emerald-500" />
      case 'warning': return <Timer1 variant="Bold" size="18" className="text-amber-500" />
      case 'error': return <Danger variant="Bold" size="18" className="text-red-500" />
      default: return <InfoCircle variant="Bold" size="18" className="text-blue-500" />
    }
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-80 md:w-96 z-[300]">
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        className="bg-white/95 dark:bg-[#1a1c1e]/95 backdrop-blur-xl border border-stone-200 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="p-4 border-b border-stone-100 dark:border-white/5 flex items-center justify-between">
          <h3 className="font-bold text-stone-900 dark:text-white text-sm uppercase tracking-wider">Notifications</h3>
          <span className="text-[10px] font-black bg-amber-500 text-white px-2 py-0.5 rounded-full">
            {notifications.filter(n => !n.read).length} NEW
          </span>
        </div>

        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-stone-400 text-xs font-medium">All caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100 dark:divide-white/5">
              {notifications.map((notif) => (
                <div 
                  key={notif.id}
                  className={`p-4 flex gap-3 hover:bg-stone-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${!notif.read ? 'bg-amber-50/30 dark:bg-amber-500/5' : ''}`}
                >
                  <div className="shrink-0 mt-0.5">
                    {getIcon(notif.type || 'info')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-stone-800 dark:text-white truncate">{notif.title || 'Notification'}</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5">{notif.text || notif.message}</p>
                    <p className="text-[9px] text-stone-400 dark:text-stone-500 font-bold uppercase mt-1.5">{notif.time || 'Recently'}</p>
                  </div>
                  {!notif.read && (
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="w-full p-3 text-[10px] font-black uppercase tracking-[0.15em] text-amber-500 hover:bg-amber-50 dark:hover:bg-white/5 transition-colors border-t border-stone-100 dark:border-white/5">
          Mark all as read
        </button>
      </motion.div>
      
      {/* Invisible overlay to close on click outside */}
      <div 
        className="fixed inset-0 z-[-1]" 
        onClick={onClose}
      />
    </div>
  )
}
