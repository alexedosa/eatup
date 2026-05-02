// src/components/vendor/rs2/menu/CategoryTabs.jsx
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Setting4 } from 'iconsax-reactjs'

export default function CategoryTabs({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  onOpenCategoryManager 
}) {
  const getColorClasses = (color, isActive) => {
    const colors = {
      amber: isActive ? 'bg-amber-500 text-white' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/20',
      orange: isActive ? 'bg-orange-500 text-white' : 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-500/20',
      red: isActive ? 'bg-red-500 text-white' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20',
      yellow: isActive ? 'bg-yellow-500 text-white' : 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-500/20',
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20',
      pink: isActive ? 'bg-pink-500 text-white' : 'bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-500/20',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/20',
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-500/20'
    }
    return colors[color] || colors.amber
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${getColorClasses(category.color, activeCategory === category.id)} ${activeCategory === category.id ? 'shadow-md shadow-amber-500/20' : ''}`}
            >
              {category.image && (
                <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 border border-white/20">
                  <Image 
                    src={category.image} 
                    alt={category.name} 
                    width={24} 
                    height={24} 
                    className="object-cover"
                  />
                </div>
              )}
              <span>{category.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeCategory === category.id ? 'bg-white/20' : 'bg-black/5 dark:bg-white/10'}`}>
                {category.count}
              </span>
            </motion.button>
          ))}
        </div>
        
        <button
          onClick={onOpenCategoryManager}
          className="p-2.5 rounded-xl text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-white/5 transition-all duration-200"
        >
          <Setting4 size="20" variant="Outline" />
        </button>
      </div>
    </div>
  )
}
