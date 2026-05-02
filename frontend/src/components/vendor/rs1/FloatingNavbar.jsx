'use client'
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BUSINESS, NOTIFICATIONS } from "@/data/vendorBusiness";
import { Icons } from "@/data/vendorIcons";
import { Notification, Sun1, Moon, Flash } from "iconsax-reactjs";
import { useTheme } from "@/context/ThemeContext";
import NotificationDropdown from "./NotificationDropdown";

export default function FloatingNavbar({
  onFocusModeToggle,
  isFocusMode = false,
  onSearch,
  isStoreOpen,
  onStoreToggle
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  const storeStatus = isStoreOpen
    ? { label: "Store Open", dot: "bg-emerald-500" }
    : { label: "Store Closed", dot: "bg-red-500" };

  const handleToggleStore = () => {
    const newState = !isStoreOpen;
    if (onStoreToggle) {
      onStoreToggle();
    }
    
    // Play sound
    const soundPath = newState ? "/sounds/toggle-button-on.mp3" : "/sounds/toggle-button-off.mp3";
    const audio = new Audio(soundPath);
    audio.play().catch(() => {});
  };

  return (
    <nav 
      role="navigation" 
      aria-label="Vendor Header"
      className="w-full bg-white/80 dark:bg-[#1a1c1e]/80 backdrop-blur-xl border border-stone-200 dark:border-white/10 shadow-md rounded-2xl px-5 py-3 flex items-center justify-between gap-4"
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-stone-900 dark:bg-white text-amber-50 dark:text-stone-900 flex items-center justify-center shadow-sm">
          <Icons.brand variant="Bold" className="w-5 h-5" />
        </div>

        <div className="flex flex-col">
          <h2 className="font-semibold text-stone-800 dark:text-white text-base">
            {BUSINESS.name}
          </h2>

          <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400">
            <span
              className={`w-1.5 h-1.5 rounded-full ${storeStatus.dot} animate-pulse`}
            />
            <span className="text-xs">{storeStatus.label}</span>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex-1 max-w-md">
        <input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            onSearch?.(e.target.value);
          }}
          placeholder="Search orders, menu items..."
          className="w-full px-4 py-2.5 bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-amber-400 transition-all text-stone-800 dark:text-white"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* STORE TOGGLE SWITCH */}
        <div className="flex items-center gap-2 px-2">
          <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
            {isStoreOpen ? "Open" : "Closed"}
          </span>
          <button
            onClick={handleToggleStore}
            aria-label={isStoreOpen ? "Close Store" : "Open Store"}
            className={`relative w-11 h-6 rounded-full transition-all duration-300 ease-in-out ${isStoreOpen ? "bg-emerald-500 shadow-inner" : "bg-stone-300"}`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-sm ${isStoreOpen ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>

        {/* NOTIFICATIONS */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View Notifications"
            aria-expanded={showNotifications}
            className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-amber-50 dark:hover:bg-white/5 transition"
          >
            <Notification variant="Linear" size="20" />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[9px] rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <NotificationDropdown 
                isOpen={showNotifications} 
                onClose={() => setShowNotifications(false)} 
              />
            )}
          </AnimatePresence>
        </div>

        {/* FOCUS MODE (Subtle Zen Toggle) */}
        <button
          onClick={onFocusModeToggle}
          aria-label={isFocusMode ? "Exit Zen Mode" : "Enter Zen Mode"}
          className={`
            h-10 px-4 rounded-xl flex items-center gap-2.5 transition-all duration-300
            ${isFocusMode 
              ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-lg' 
              : 'bg-stone-50 dark:bg-white/5 text-stone-500 dark:text-stone-400 border border-stone-100 dark:border-white/10'}
          `}
        >
          <Flash variant={isFocusMode ? "Bold" : "Linear"} size="18" className={isFocusMode ? (isDarkMode ? 'text-stone-900' : 'text-white') : 'text-amber-500'} />
          <span className="text-[10px] font-black uppercase tracking-[0.15em]">
            {isFocusMode ? "Zen Mode" : "Focus"}
          </span>
        </button>

        {/* DARK/LIGHT TOGGLE */}
        <button
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
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
  );
}
