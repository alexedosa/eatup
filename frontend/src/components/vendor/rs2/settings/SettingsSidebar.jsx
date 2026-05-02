// src/components/vendor/rs2/settings/SettingsSidebar.jsx
import { motion } from 'framer-motion'
import { Setting2, Receipt1, Truck, Notification, People, Lock, Element3, WalletMoney } from 'iconsax-reactjs'

const categories = [
  { id: 'general', label: 'General', icon: <Setting2 size="20" variant="Bold" /> },
  { id: 'orders', label: 'Orders', icon: <Receipt1 size="20" variant="Bold" /> },
  { id: 'delivery', label: 'Delivery', icon: <Truck size="20" variant="Bold" /> },
  { id: 'notifications', label: 'Notifications', icon: <Notification size="20" variant="Bold" /> },
  { id: 'team', label: 'Team', icon: <People size="20" variant="Bold" /> },
  { id: 'security', label: 'Security', icon: <Lock size="20" variant="Bold" /> },
  { id: 'integrations', label: 'Integrations', icon: <Element3 size="20" variant="Bold" /> },
  { id: 'billing', label: 'Billing', icon: <WalletMoney size="20" variant="Bold" /> }
]

export default function SettingsSidebar({ activeCategory, onCategoryChange }) {
  return (
    <div className="bg-white dark:bg-[#1a1c1e] backdrop-blur-xl rounded-[2rem] border border-stone-100 dark:border-white/10 overflow-hidden sticky top-8 shadow-sm transition-all duration-300 max-h-[calc(100vh-100px)] flex flex-col">
      <div className="p-6 border-b border-stone-100 dark:border-white/5 bg-gradient-to-r from-amber-50/30 dark:from-amber-500/5 to-transparent shrink-0">
        <h2 className="font-display font-black text-stone-900 dark:text-white tracking-tight">Settings</h2>
        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mt-1">Manage your preferences</p>
      </div>
      
      <div className="p-3 space-y-1 overflow-y-auto custom-scrollbar flex-1">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ x: 4 }}
            onClick={() => onCategoryChange(category.id)}
            className={`
              w-full flex items-center gap-4 px-4 py-3 rounded-2xl
              transition-all duration-300 text-left group
              ${activeCategory === category.id
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-white/5'
              }
            `}
          >
            <span className={`transition-transform duration-300 group-hover:scale-110 ${activeCategory === category.id ? 'text-white' : 'text-amber-500'}`}>
              {category.icon}
            </span>
            <span className="text-sm font-black tracking-tight">{category.label}</span>
            {activeCategory === category.id && (
              <motion.div 
                layoutId="active-indicator"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" 
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
