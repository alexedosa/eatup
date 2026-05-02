// src/components/vendor/rs2/menu/MenuCard.jsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { Timer1, MagicStar, ShoppingCart, Edit2, Trash, Eye, EyeSlash, Copy } from 'iconsax-reactjs'

export default function MenuCard({ item, categoryColor, onEdit, onDelete, onToggleAvailability }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount)
  }
  
  const getColorClasses = (color) => {
    const colors = {
      amber: 'border-amber-200 dark:border-amber-500/20 bg-amber-50/30 dark:bg-amber-500/5',
      orange: 'border-orange-200 dark:border-orange-500/20 bg-orange-50/30 dark:bg-orange-500/5',
      red: 'border-red-200 dark:border-red-500/20 bg-red-50/30 dark:bg-red-500/5',
      yellow: 'border-yellow-200 dark:border-yellow-500/20 bg-yellow-50/30 dark:bg-yellow-500/5',
      blue: 'border-blue-200 dark:border-blue-500/20 bg-blue-50/30 dark:bg-blue-500/5',
      pink: 'border-pink-200 dark:border-pink-500/20 bg-pink-50/30 dark:bg-pink-500/5'
    }
    return colors[color] || colors.amber
  }
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-[#242628] rounded-2xl border-2 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden ${getColorClasses(categoryColor)} ${!item.isAvailable ? 'opacity-60' : ''}`}
    >
      <div className="p-4" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start gap-4">
          {/* Item Image */}
          <div className="w-20 h-20 rounded-2xl flex-shrink-0 overflow-hidden bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 relative">
            {item.image ? (
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400">
                <ShoppingCart size="32" variant="Bulk" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-stone-800 dark:text-white text-base truncate tracking-tight leading-snug">{item.name}</h3>
                  {item.isPopular && (
                    <span className="text-[9px] bg-amber-500 text-white font-black px-2 py-0.5 rounded-full flex items-center gap-1 tracking-widest">
                      <MagicStar size="10" variant="Bold" /> POPULAR
                    </span>
                  )}
                  {item.isNew && (
                    <span className="text-[9px] bg-emerald-500 text-white font-black px-2 py-0.5 rounded-full tracking-widest">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2.5 line-clamp-2 leading-relaxed tracking-wide font-medium">
                  {item.description}
                </p>
              </div>
              
              <div className="text-right shrink-0">
                <p className="font-black text-stone-900 dark:text-white text-lg">{formatNaira(item.price)}</p>
                {item.originalPrice && (
                  <p className="text-[10px] text-stone-400 line-through font-bold">
                    {formatNaira(item.originalPrice)}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-5 mt-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-stone-400 dark:text-stone-500">
              <span className="flex items-center gap-2">
                <Timer1 size="14" variant="Bold" className="text-amber-500" />
                {item.preparationTime} min
              </span>
              <span className="flex items-center gap-2">
                <MagicStar size="14" variant="Bold" className="text-amber-400" />
                {item.rating}
              </span>
              <span className="flex items-center gap-2">
                <ShoppingCart size="14" variant="Bold" className="text-indigo-500" />
                {item.soldCount} sold
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded Actions */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-stone-100 dark:border-white/5 p-4 bg-stone-50/50 dark:bg-white/5"
        >
          <div className="flex flex-wrap gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(item)
              }}
              className="flex-1 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Edit2 size="16" variant="Bold" /> Edit
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleAvailability(item.id, item.category)
              }}
              className={`flex-1 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${item.isAvailable ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-100' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100'}`}
            >
              {item.isAvailable ? <EyeSlash size="16" variant="Bold" /> : <Eye size="16" variant="Bold" />}
              {item.isAvailable ? 'Disable' : 'Enable'}
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(item.id, item.category)
              }}
              className="flex-1 px-4 py-2 rounded-xl text-xs font-bold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 transition-all flex items-center justify-center gap-2"
            >
              <Trash size="16" variant="Bold" /> Delete
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {item.tags?.map((tag, idx) => (
                <span key={idx} className="text-[9px] font-black uppercase tracking-widest bg-stone-100 dark:bg-white/10 text-stone-500 dark:text-stone-400 px-2.5 py-1 rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>
            
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-xl text-stone-400 hover:text-amber-500 transition-colors"
              title="Duplicate Item"
            >
              <Copy size="18" variant="Bold" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
