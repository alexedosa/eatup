'use client'
import { useRouter } from 'next/navigation'
import { LogoutCurve } from 'iconsax-reactjs'
import { ALL_NAV_ITEMS } from '@/data/vendorNavItems'
import SidebarItem from './SidebarItem'
import ExpandButton from './ExpandButton'
import ExpandedContent from './ExpandedContent'
import { api } from '@/lib/api'

export default function FloatingSidebar({ 
  isExpanded, 
  activeView, 
  onViewChange, 
  onToggle 
}) {
  const router = useRouter()

  const handleNavClick = (itemId) => {
    onViewChange(itemId)
    if (itemId === 'overview') {
      router.push('/vendor/dashboard')
    } else if (itemId === 'orders') {
      router.push('/vendor/dashboard/order')
    } else {
      router.push(`/vendor/dashboard/${itemId}`)
    }
  }

  const handleLogout = async () => {
    await api.auth.logoutCurrentUser()
    router.replace('/auth/login?role=vendor')
  }

  return (
    <div className={`bg-gradient-to-br from-white/95 to-amber-50/95 dark:from-[#242628] dark:to-[#1a1c1e] backdrop-blur-md rounded-3xl border border-amber-200/40 dark:border-white/10 shadow-2xl flex flex-col max-h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-all duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] ${isExpanded ? 'p-4 w-80' : 'py-4 px-2 w-20'}`}>
      {/* Navigation Items */}
      <div className="flex flex-col gap-2 shrink-0">
        {ALL_NAV_ITEMS.map((item, index) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeView === item.id}
            isExpanded={isExpanded}
            index={index}
            onClick={() => handleNavClick(item.id)}
          />
        ))}
      </div>

      {/* Expanded Content */}
      {isExpanded && <div className="shrink-0"><ExpandedContent /></div>}

      {/* Expand/Collapse Button */}
      <div className="shrink-0 mt-auto flex flex-col gap-2 pt-4">
        <button
          type="button"
          onClick={handleLogout}
          className={`group relative flex w-full items-center gap-3 rounded-xl border border-red-200/60 bg-red-50/80 text-red-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-100 hover:text-red-700 hover:shadow-lg hover:shadow-red-500/10 dark:border-red-500/15 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15 ${isExpanded ? 'px-3 py-2.5' : 'justify-center py-2.5'}`}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm dark:bg-red-500/10 dark:text-red-300">
            <LogoutCurve size="20" variant="Bold" />
          </span>
          {isExpanded && (
            <span className="text-sm font-black">
              Logout
            </span>
          )}
          {!isExpanded && (
            <div className="absolute left-full ml-3 whitespace-nowrap rounded-lg bg-stone-800 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-200 pointer-events-none invisible group-hover:visible group-hover:opacity-100">
              Logout
            </div>
          )}
        </button>
        <ExpandButton isExpanded={isExpanded} onClick={onToggle} />
      </div>
    </div>
  )
}
