import { useEffect } from 'react'
import { ALL_NAV_ITEMS } from '@/data/vendorNavItems'

export default function MobileDrawer({ isOpen, onClose, activeView, onViewChange }) {
  // Manage body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('drawer-open')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.classList.remove('drawer-open')
      document.body.style.overflow = ''
    }
    return () => {
      document.body.classList.remove('drawer-open')
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  // Group items matching sidebar sections
  const primaryItems = ALL_NAV_ITEMS.slice(0, 3)   // Overview, Orders, Menu
  const secondaryItems = ALL_NAV_ITEMS.slice(3, 5) // Payments, Analytics
  const utilityItems = ALL_NAV_ITEMS.slice(5, 7)   // Profile, Settings

  const NavItem = ({ item }) => {
    const isActive = activeView === item.id
    const IconComponent = item.icon

    return (
      <button
        onClick={() => {
          onViewChange(item.id)
          onClose()
        }}
        className={`flex items-center gap-3 w-full rounded-xl px-3 py-2.5 transition-all duration-200 ${isActive ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-500' : 'text-stone-500 hover:bg-stone-50 dark:hover:bg-white/5 hover:text-amber-400'}`}
      >
        <IconComponent className="w-5 h-5 stroke-[2] shrink-0" />
        <span className={`text-sm font-medium ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-stone-700 dark:text-stone-300'}`}>
          {item.label}
        </span>
        {isActive && (
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
        )}
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[400] bg-black/50 backdrop-blur-sm transition-all duration-300 md:hidden"
        />
      )}

      {/* Drawer Panel — same gradient + border as FloatingSidebar */}
      <div className={`fixed top-0 left-0 bottom-0 z-[401] w-72 bg-gradient-to-br from-white/95 to-amber-50/95 dark:from-[#242628] dark:to-[#1a1c1e] dark:border-white/10 backdrop-blur-md shadow-2xl border-r border-amber-200/40 transition-transform duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)] flex flex-col md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Header */}
        <div className="pt-16 pb-6 px-6 border-b border-amber-200/40 dark:border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 relative shrink-0">
              <img 
                src="/assets/logo/logo.png" 
                alt="EatUp Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h2 className="font-display font-black text-stone-900 dark:text-white text-xl tracking-tight leading-none">EatUp Hub</h2>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 font-bold uppercase tracking-widest mt-1.5">Vendor Dashboard</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto py-6 px-3">

          {/* Primary Section */}
          <div className="mb-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 px-3 mb-2">
              Main Operations
            </p>
            <div className="flex flex-col gap-1">
              {primaryItems.map((item, i) => (
                <NavItem key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Secondary Section */}
          <div className="mb-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 px-3 mb-2">
              Business Hub
            </p>
            <div className="flex flex-col gap-1">
              {secondaryItems.map((item, i) => (
                <NavItem key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Utility Section */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 px-3 mb-2">
              Account Control
            </p>
            <div className="flex flex-col gap-1">
              {utilityItems.map((item, i) => (
                <NavItem key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer — logout */}
        <div className="p-6 border-t border-amber-200/40 dark:border-white/10">
          <button className="w-full py-3.5 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </>
  )
}
