"use client";

import { useEffect, useState } from "react";
import { useVendorData } from "@/hooks/useVendorData";
import { getStoredUser } from "@/lib/authService";
import { api } from "@/lib/api";

function getDisplayName(user, vendorInfo) {
  if (user?.firstName || user?.lastName) {
    return [user.firstName, user.lastName].filter(Boolean).join(" ");
  }
  return user?.name || user?.businessName || vendorInfo.name || "Vendor";
}

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function Navbar({ onMenuToggle }) {
  const vendorInfo = useVendorData();
  const [user, setUser] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  useEffect(() => {
    api.vendor.notifications
      .list()
      .then((data) => setNotifications(Array.isArray(data) ? data.slice(0, 3) : []))
      .catch(() => setNotifications([]));
  }, []);

  const displayName = getDisplayName(user, vendorInfo);
  const displayEmail = user?.email || "";
  const initials = getInitials(displayName);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 bg-white border-b border-surface-100 flex items-center px-4 lg:px-6 gap-4 shrink-0 sticky top-0 z-10">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg hover:bg-surface-100 text-surface-500 transition-colors"
        aria-label="Open menu"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Store name */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-7 h-7 rounded-md bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-bold shrink-0">
          {vendorInfo.logo}
        </div>
        <div className="min-w-0 hidden sm:block">
          <p className="text-sm font-semibold text-surface-800 truncate leading-tight">
            {vendorInfo.name}
          </p>
          <p className="text-xs text-surface-400 truncate leading-tight">
            {vendorInfo.location}
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Online/Offline toggle */}
      <div className="flex items-center gap-2 border border-surface-200 rounded-lg px-3 py-1.5 bg-surface-50">
        <span
          className={`w-2 h-2 rounded-full transition-colors ${isOnline ? "bg-green-500" : "bg-surface-400"}`}
        />
        <span className="text-xs font-medium text-surface-600 hidden sm:inline">
          {isOnline ? "Online" : "Offline"}
        </span>
        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`
            relative w-8 h-4 rounded-full transition-colors duration-200
            ${isOnline ? "bg-green-500" : "bg-surface-300"}
          `}
          aria-label="Toggle store status"
        >
          <span
            className={`
              absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-200
              ${isOnline ? "translate-x-4" : "translate-x-0.5"}
            `}
          />
        </button>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => {
            setShowNotifs(!showNotifs);
            setShowProfile(false);
          }}
          className="relative p-2 rounded-lg hover:bg-surface-100 text-surface-500 transition-colors"
          aria-label="Notifications"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-brand-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifs && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-surface-200 shadow-card-hover overflow-hidden z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-surface-100">
              <p className="text-sm font-semibold text-surface-800">
                Notifications
              </p>
              <button className="text-xs text-brand-500 hover:text-brand-600 font-medium">
                Mark all read
              </button>
            </div>
            <div className="divide-y divide-surface-50">
              {notifications.length === 0 ? (
                <div className="px-4 py-6 text-center text-xs text-surface-400">
                  No notifications yet
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 flex items-start gap-3 hover:bg-surface-50 transition-colors cursor-pointer ${n.read ? "opacity-60" : ""}`}
                  >
                    <span
                      className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${!n.read ? "bg-brand-500" : "bg-surface-200"}`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-surface-700">{n.title || n.text || n.message}</p>
                      <p className="text-xs text-surface-400 mt-0.5">{n.time || "Recently"}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="px-4 py-3 border-t border-surface-100">
              <button className="text-xs text-surface-400 hover:text-surface-600 transition-colors w-full text-center">
                View all notifications
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setShowProfile(!showProfile);
            setShowNotifs(false);
          }}
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-100 transition-colors"
          aria-label="Profile menu"
        >
          <div className="w-8 h-8 rounded-full bg-surface-200 flex items-center justify-center text-xs font-bold text-surface-600">
            {initials}
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-surface-400 hidden sm:block"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {showProfile && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-surface-200 shadow-card-hover overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-surface-100">
              <p className="text-sm font-semibold text-surface-800">
                {displayName}
              </p>
              {displayEmail ? (
                <p className="text-xs text-surface-400">{displayEmail}</p>
              ) : null}
            </div>
            {[
              { label: "Business Profile", icon: "🏠" },
              { label: "Account Settings", icon: "⚙️" },
              { label: "Help & Support", icon: "💬" },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-surface-600 hover:bg-surface-50 transition-colors text-left"
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
            <div className="border-t border-surface-100">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
