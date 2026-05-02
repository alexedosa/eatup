import { NAV_PRIMARY, NAV_SECONDARY } from "@/data/vendorNavItems";

export default function MobileBottomBar({ activeView, onViewChange }) {
  const allItems = [...NAV_PRIMARY, ...NAV_SECONDARY];
  const overviewItem = allItems.find(item => item.id === 'overview');
  const otherItems = allItems.filter(item => item.id !== 'overview').slice(0, 4);
  
  // Place overview in the middle (index 2)
  const bottomNavItems = [
    otherItems[0],
    otherItems[1],
    overviewItem,
    otherItems[2],
    otherItems[3]
  ].filter(Boolean);

  return (
    <nav 
      role="navigation"
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-[300] bg-white/95 dark:bg-[#1a1c1e]/95 backdrop-blur-md border-t border-amber-200/40 dark:border-white/10 shadow-lg px-2 py-2 flex items-center justify-around md:hidden mobile-bottom-safe"
    >
      {bottomNavItems.map((item) => {
        const isActive = activeView === item.id;
        const IconComponent = item.icon;
        const isMiddle = item.id === 'overview';

        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            aria-label={`Navigate to ${item.label}`}
            className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-2xl transition-all duration-300 ${isActive ? "text-amber-500" : "text-stone-400 hover:text-amber-400 dark:text-stone-500"} ${isMiddle ? "bg-amber-50/50 dark:bg-amber-500/10 scale-110 -translate-y-1 shadow-sm border border-amber-100/50 dark:border-amber-500/20" : ""}`}
          >
            <IconComponent className={`w-5 h-5 stroke-current ${isMiddle ? 'w-6 h-6' : ''}`} />
            <span className={`text-[9px] font-bold tracking-tight uppercase ${isMiddle ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400 dark:text-stone-500'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
