export default function AttachedLabel({ 
  children,           // label text
  position = 'bottom', // 'bottom', 'right', 'top'
  isVisible = true,
  className = ''
}) {
  
  const positionClasses = {
    bottom: '-bottom-2 left-1/2 -translate-x-1/2',
    right: 'top-1/2 -right-2 -translate-y-1/2',
    top: '-top-2 left-1/2 -translate-x-1/2'
  }
  
  if (!isVisible) return null
  
  return (
    <div 
      className={`
        absolute ${positionClasses[position]}
        px-3 py-1.5
        rounded-full
        text-[11px] font-medium
        whitespace-nowrap
        bg-amber-100/90 backdrop-blur-sm
        border border-amber-200/50
        text-amber-700
        shadow-sm
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </div>
  )
}
