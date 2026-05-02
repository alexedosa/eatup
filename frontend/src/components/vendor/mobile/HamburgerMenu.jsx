// src/components/vendor/mobile/HamburgerMenu.jsx
import { useTheme } from '@/context/ThemeContext'

export default function HamburgerMenu({ onClick, isOpen = false }) {
  const { isDarkMode } = useTheme()
  
  // Icon color: black in dark mode, white in light mode as requested
  const iconColor = isDarkMode ? 'text-black' : 'text-white'
  // Button background: keep it light/amber to contrast with the page but also themed
  const buttonBg = isDarkMode ? 'bg-white shadow-xl' : 'bg-stone-900 shadow-md'

  return (
    <button
      onClick={onClick}
      className={`fixed top-4 left-4 z-[350] w-10 h-10 rounded-xl ${buttonBg} border border-amber-200/40 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 md:hidden`}
      aria-label="Open menu"
    >
      {isOpen ? (
        /* Close icon */
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" className={iconColor}>
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
        </svg>
      ) : (
        /* Hamburger icon */
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" className={iconColor}>
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
        </svg>
      )}
    </button>
  )
}
