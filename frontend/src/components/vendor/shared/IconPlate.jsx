// src/components/vendor/shared/IconPlate.jsx
export default function IconPlate({ children, isActive = false, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  }
  
  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 96 96" fill="none" className="absolute inset-0">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#D97706" floodOpacity="0.3"/>
          </filter>
          <radialGradient id="highlight" cx="30%" cy="25%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.95"/>
          </radialGradient>
        </defs>
        
        {/* Back blob - deeper, richer color */}
        <path d="M50 10C66 10 84 20 88 36C92 52 80 74 60 84C40 94 20 90 12 74C4 58 8 36 20 22C32 10 38 10 50 10Z" fill={isActive ? '#EA580C' : '#F59E0B'} opacity={isActive ? '0.9' : '0.7'}/>
        
        {/* Front blob - less transparent, more solid */}
        <g filter="url(#shadow)">
          <path d="M48 8C64 8 82 18 86 34C90 50 78 72 60 82C42 92 22 88 14 72C6 56 10 34 22 20C34 8 38 8 48 8Z" fill="url(#highlight)"/>
        </g>
      </svg>
      
      <div className="relative z-10 flex items-center justify-center text-xl">
        {children}
      </div>
    </div>
  )
}
