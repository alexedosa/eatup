// src/components/vendor/ls2/SidebarItem.jsx
import IconPlate from '../shared/IconPlate'
import { useTheme } from '@/context/ThemeContext'

export default function SidebarItem({ 
  icon: IconComponent,
  label,
  isActive = false,
  isExpanded = false,
  index = 0,
  onClick,
  className = ''
}) {
  const { isDarkMode } = useTheme()
  const staggerDelay = `${index * 60}ms`
  
  // User wants black icons in dark mode to stand out on the amber iconplate
  const iconColor = isDarkMode ? 'text-black' : (isActive ? 'text-black' : 'text-stone-600')
  
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-3 w-full rounded-xl transition-all duration-200 hover:bg-amber-50/80 dark:hover:bg-white/5 ${isExpanded ? 'px-3 py-2' : 'justify-center py-2'} ${className}`}
    >
      {/* Blob Icon */}
      <IconPlate isActive={isActive} size="sm">
        <IconComponent className={`w-5 h-5 stroke-[2.5] ${iconColor}`} />
      </IconPlate>
      
      {/* Label — appears to the RIGHT */}
      {isExpanded && (
        <span 
          className={`text-sm font-bold whitespace-nowrap transition-all duration-400 ease-[cubic-bezier(0.34,1.2,0.64,1)] ${isActive ? 'text-black dark:text-white' : 'text-stone-700 dark:text-stone-300'}`}
          style={{ 
            transitionDelay: staggerDelay,
            opacity: 0,
            transform: 'translateX(-8px)',
            animation: `slideInLabel 0.35s ease-out ${staggerDelay} forwards`
          }}
        >
          {label}
        </span>
      )}
      
      {/* Tooltip for collapsed state */}
      {!isExpanded && (
        <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-stone-800 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none shadow-lg">
          {label}
        </div>
      )}
    </button>
  )
}
