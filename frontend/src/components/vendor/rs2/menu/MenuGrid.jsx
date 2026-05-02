// src/components/vendor/rs2/menu/MenuGrid.jsx
import { motion, AnimatePresence } from 'framer-motion'
import MenuCard from './MenuCard'
import { ShoppingCart } from 'iconsax-reactjs'

export default function MenuGrid({ 
  items, 
  categoryColor, 
  onEdit, 
  onDelete, 
  onToggleAvailability,
  viewMode = 'grid'
}) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-white/40 dark:bg-white/5 rounded-[2.5rem] border border-stone-100 dark:border-white/10 border-dashed">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500">
            <ShoppingCart size="32" variant="Bulk" />
          </div>
        </div>
        <p className="text-stone-800 dark:text-white font-bold">No items in this category</p>
        <p className="text-sm text-stone-400 dark:text-stone-500 mt-1">Click "Add New Item" to get started</p>
      </div>
    )
  }
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  if (viewMode === 'list') {
    return (
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              categoryColor={categoryColor}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleAvailability={onToggleAvailability}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    )
  }
  
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            categoryColor={categoryColor}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleAvailability={onToggleAvailability}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
