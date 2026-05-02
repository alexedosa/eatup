import { QUICK_ACTIONS, tipCard } from '@/data/vendorNavItems'

export default function ExpandedContent() {
  return (
    <div className="mt-6 pt-4 border-t border-amber-200/40">
      {/* Quick Actions */}
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 px-1">
          Quick Actions
        </p>
        <div className="flex flex-col gap-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              onClick={() => {}}
              className="
                w-full text-left px-3 py-2 rounded-lg
                text-sm font-medium text-stone-600 dark:text-stone-300
                hover:bg-amber-50 dark:hover:bg-white/5 hover:text-amber-600 dark:hover:text-amber-400
                transition-all duration-150
                flex items-center gap-2
              "
            >
              <span className="text-base">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
