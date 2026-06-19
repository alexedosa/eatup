import { useState } from 'react'
import { Notification, Sun1, Moon, Flash } from 'iconsax-reactjs'
import { useTheme } from '@/context/ThemeContext'

export default function MobileNavbar({ 
  isStoreOpen, 
  onStoreToggle, 
  onFocusModeToggle, 
  isFocusMode,
  vendorData,
  dashboardData
}) {
  const [showNotifications, setShowNotifications] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()
  
  const notifications = dashboardData?.orders?.slice(0, 5).map((order, idx) => ({
    id: order._id || order.id || idx,
    title: `Order ${order.orderNumber || order.id}`,
    message: `Order status is ${order.status}`,
    time: "Recently",
    read: order.status !== 'PENDING'
  })) || [];

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleToggleStore = () => {
    if (onStoreToggle) {
      onStoreToggle();
    }
    
    // Play sound
    const soundPath = !isStoreOpen ? "/sounds/toggle-button-on.mp3" : "/sounds/toggle-button-off.mp3";
    const audio = new Audio(soundPath);
    audio.play().catch(() => {});
  }

  const businessName = vendorData?.businessName || dashboardData?.shops?.[0]?.name || "EatUp";

  return (
    <nav 
      role="navigation"
      aria-label="Mobile Navigation"
      className="sticky top-0 z-[200] w-full bg-white/90 dark:bg-[#1a1c1e]/90 backdrop-blur-xl border-b border-stone-200/60 dark:border-white/10 px-4 py-3 flex items-center justify-between gap-3 shadow-sm md:hidden"
    >
      {/* LEFT — Brand + status */}
      <div className="flex items-center gap-2 pl-12">
        <div className="w-8 h-8 relative flex-shrink-0">
          <img 
            src="/assets/logo/logo.png" 
            alt="Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-stone-900 dark:text-white text-sm leading-none tracking-tight">
            {businessName}
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isStoreOpen ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">
              {isStoreOpen ? 'Store Open' : 'Store Closed'}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT — controls */}
      <div className="flex items-center gap-3">
        {/* Store toggle switch */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleToggleStore}
            aria-label={isStoreOpen ? "Close store" : "Open store"}
            className={`relative w-11 h-6 rounded-full transition-all duration-300 ease-in-out ${isStoreOpen ? "bg-emerald-500 shadow-inner" : "bg-stone-300"}`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-sm ${isStoreOpen ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((p) => !p)}
            aria-label="Toggle notifications"
            className="w-9 h-9 rounded-xl bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-500 dark:text-stone-400 transition-all duration-200"
          >
            <Notification variant="Linear" size="18" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[9px] rounded-full flex items-center justify-center font-black">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Simple Dropdown for mobile */}
          {showNotifications && (
            <div className="absolute top-12 right-0 w-64 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-100 dark:border-white/10 z-[300] overflow-hidden">
              <div className="p-3 border-b border-stone-50 dark:border-white/5 bg-stone-50/50 dark:bg-white/5">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Recent Notifications</p>
              </div>
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} className="p-3 border-b border-stone-50 dark:border-white/5 last:border-0">
                  <p className="text-xs font-semibold text-stone-800 dark:text-stone-100">{n.title}</p>
                  <p className="text-[10px] text-stone-400 mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Zen Mode (Lightning) */}
        <button
          onClick={onFocusModeToggle}
          title="Zen Mode"
          className={`
            w-9 h-9 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 active:scale-95
            ${isFocusMode
              ? 'bg-amber-500 text-white shadow-amber-400/40'
              : 'bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-amber-500'}
          `}
        >
          <Flash variant={isFocusMode ? 'Bold' : 'Linear'} size="18" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl bg-stone-900 dark:bg-stone-800 text-white flex items-center justify-center shadow-sm transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-700 hover:scale-110 active:scale-95"
        >
          {isDarkMode ? (
            <Sun1 variant="Bold" size="18" className="text-white" />
          ) : (
            <Moon variant="Bold" size="18" className="text-white" />
          )}
        </button>
      </div>
    </nav>
  )
}
