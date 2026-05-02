'use client'
import { useRouter } from 'next/navigation'
import { ALL_NAV_ITEMS } from '@/data/vendorNavItems'
import SidebarItem from './SidebarItem'
import ExpandButton from './ExpandButton'
import ExpandedContent from './ExpandedContent'

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
      <div className="shrink-0 mt-auto pt-2">
        <ExpandButton isExpanded={isExpanded} onClick={onToggle} />
      </div>
    </div>
  )
}
