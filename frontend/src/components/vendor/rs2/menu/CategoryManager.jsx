// src/components/vendor/rs2/menu/CategoryManager.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CloseCircle, Add, Trash, RecordCircle } from 'iconsax-reactjs'
import Image from 'next/image'

export default function CategoryManager({ isOpen, onClose, categories, onAddCategory, onDeleteCategory }) {
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryColor, setNewCategoryColor] = useState('amber')
  const [newCategoryImage, setNewCategoryImage] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop')
  
  const colorOptions = [
    { name: 'amber', bg: 'bg-amber-500' },
    { name: 'orange', bg: 'bg-orange-500' },
    { name: 'red', bg: 'bg-red-500' },
    { name: 'yellow', bg: 'bg-yellow-500' },
    { name: 'blue', bg: 'bg-blue-500' },
    { name: 'pink', bg: 'bg-pink-500' },
    { name: 'green', bg: 'bg-green-500' },
    { name: 'purple', bg: 'bg-purple-500' }
  ]
  
  const foodImageOptions = [
    'https://images.unsplash.com/photo-1639024471283-03518883512d?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=100&h=100&fit=crop'
  ]
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (newCategoryName.trim()) {
      onAddCategory({
        name: newCategoryName,
        image: newCategoryImage,
        color: newCategoryColor
      })
      setNewCategoryName('')
      setNewCategoryColor('amber')
    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-stone-900/40 dark:bg-black/60 backdrop-blur-sm" 
            onClick={onClose} 
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[501] w-full max-lg bg-white dark:bg-[#1a1c1e] rounded-[2.5rem] shadow-2xl border border-stone-100 dark:border-white/10 overflow-hidden"
          >
            <div className="p-6 md:p-8 border-b border-stone-100 dark:border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-display font-black text-stone-900 dark:text-white tracking-tight">Manage Categories</h2>
              <button onClick={onClose} className="text-stone-400 hover:text-stone-600 dark:hover:text-white transition-colors">
                <CloseCircle size="24" variant="Bold" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Existing Categories */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4 px-1">Current Categories</p>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center justify-between p-3 bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20">
                          {cat.image ? (
                            <Image src={cat.image} alt={cat.name} width={40} height={40} className="object-cover" />
                          ) : (
                            <div className="w-full h-full bg-stone-200 dark:bg-white/10 flex items-center justify-center">
                              <RecordCircle size="20" className="text-stone-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-stone-800 dark:text-white block">{cat.name}</span>
                          <span className="text-[10px] text-stone-400 font-medium uppercase tracking-widest">{cat.count} items</span>
                        </div>
                      </div>
                      {cat.id !== 'mains' && (
                        <button
                          onClick={() => onDeleteCategory(cat.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <Trash size="18" variant="Bold" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Add New Category */}
              <div className="pt-8 border-t border-stone-100 dark:border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4 px-1">Add New Category</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5 px-1">Category Name</label>
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="e.g. Breakfast, Platters..."
                      className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:border-amber-300 dark:focus:border-amber-500/50 outline-none transition-all text-stone-800 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3 px-1">Select Theme Color</p>
                    <div className="flex flex-wrap gap-3">
                      {colorOptions.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => setNewCategoryColor(color.name)}
                          className={`w-8 h-8 rounded-full ${color.bg} shadow-sm transition-all duration-200 ${newCategoryColor === color.name ? 'scale-125 ring-2 ring-offset-2 ring-stone-400 dark:ring-white dark:ring-offset-[#1a1c1e]' : 'opacity-60 hover:opacity-100'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3 px-1">Choose Header Image</p>
                    <div className="flex flex-wrap gap-3">
                      {foodImageOptions.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setNewCategoryImage(img)}
                          className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all ${newCategoryImage === img ? 'border-amber-500 scale-110 shadow-lg shadow-amber-500/20' : 'border-transparent opacity-40 hover:opacity-100'}`}
                        >
                          <img src={img} alt="Option" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-black dark:hover:bg-stone-100 shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Add size="20" variant="Bold" /> Add Category
                  </button>
                </form>
              </div>
            </div>
            
            <div className="p-6 bg-stone-50 dark:bg-white/5 border-t border-stone-100 dark:border-white/5">
              <button
                onClick={onClose}
                className="w-full py-4 rounded-2xl font-bold bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-700 dark:text-white"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
