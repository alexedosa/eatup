'use client'
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Notification, Sun1, Moon, Flash, LogoutCurve, ProfileCircle } from "iconsax-reactjs";
import { useTheme } from "@/context/ThemeContext";
import { api } from "@/lib/api";
import NotificationDropdown from "./NotificationDropdown";

export default function FloatingNavbar({
  onFocusModeToggle,
  isFocusMode = false,
  onSearch,
  isStoreOpen,
  onStoreToggle,
  vendorData,
  dashboardData
}) {
  const router = useRouter();
  const notificationButtonRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.vendor.notifications.list()
      .then((data) => setNotifications(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const handleMarkAllRead = useCallback(async () => {
    try {
      await api.vendor.notifications.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {
      // silent
    }
  }, []);

  const handleMarkRead = useCallback(async (notifId) => {
    try {
      await api.vendor.notifications.markRead(notifId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
      );
    } catch {
      // silent
    }
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const storeStatus = isStoreOpen
    ? { label: "Store Open", dot: "bg-emerald-500" }
    : { label: "Store Closed", dot: "bg-red-500" };

  const handleToggleStore = () => {
    if (onStoreToggle) {
      onStoreToggle();
    }
    
    // Play sound
    const soundPath = !isStoreOpen ? "/sounds/toggle-button-on.mp3" : "/sounds/toggle-button-off.mp3";
    const audio = new Audio(soundPath);
    audio.play().catch(() => {});
  };

  const handleLogout = useCallback(async () => {
    await api.auth.logoutCurrentUser();
    router.replace("/auth/login?role=vendor");
  }, [router]);

  const businessName = vendorData?.businessName || dashboardData?.shops?.[0]?.name || "Loading...";
  const profileLabel =
    vendorData?.firstName ||
    vendorData?.name ||
    vendorData?.email ||
    "Profile";

  return (
    <nav 
      role="navigation" 
      aria-label="Vendor Header"
      className="w-full bg-white/80 dark:bg-[#1a1c1e]/80 backdrop-blur-xl border border-stone-200 dark:border-white/10 shadow-md rounded-2xl px-5 py-3 flex items-center justify-between gap-4"
    >
      {/* LEFT */}
      <div className="flex min-w-0 items-center">
        <div className="flex flex-col">
          <h2 className="truncate text-base font-semibold text-stone-800 dark:text-white">
            {businessName}
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
            ref={notificationButtonRef}
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
                notifications={notifications}
                onMarkRead={handleMarkRead}
                onMarkAllRead={handleMarkAllRead}
                anchorRef={notificationButtonRef}
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

        {/* LOGOUT */}
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Logout"
          className="h-9 rounded-xl border border-red-200/70 bg-red-50 px-3 text-red-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-100 hover:text-red-700 active:scale-95 dark:border-red-500/15 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15"
        >
          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em]">
            <LogoutCurve size="17" variant="Bold" />
            Logout
          </span>
        </button>

        {/* PROFILE */}
        <button
          type="button"
          onClick={() => router.push("/vendor/dashboard/profile")}
          aria-label="Open profile"
          className="flex h-9 items-center gap-2 rounded-xl bg-stone-50 px-2.5 text-stone-600 transition-all duration-300 hover:bg-stone-100 hover:text-stone-900 dark:bg-white/5 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <ProfileCircle size="20" variant="Bold" className="text-amber-500" />
          <span className="hidden max-w-[90px] truncate text-xs font-bold lg:block">
            {profileLabel}
          </span>
        </button>
      </div>
    </nav>
  );
}
