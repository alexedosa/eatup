import { Icons } from '@/data/vendorIcons'

export default function ExpandButton({ isExpanded, onClick }) {
  const Icon = isExpanded ? Icons.collapse : Icons.expand;
  
  return (
    <button
      onClick={onClick}
      className={`mt-4 w-full flex items-center gap-3 py-2.5 rounded-xl text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-500/10 transition-all duration-300 ${isExpanded ? 'justify-start px-4' : 'justify-center'}`}
    >
      <div className={`
        transition-all duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)]
      `}>
        <Icon className="w-5 h-5" />
      </div>
      
      {isExpanded && (
        <span className="text-sm font-medium animate-in slide-in-from-left-2 duration-300">
          Collapse
        </span>
      )}
    </button>
  )
}
