// src/components/vendor/rs2/menu/AddItemModal.jsx
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Add, CloseCircle, Timer1, DollarCircle, Tag, MagicStar, Image as ImageIcon, Trash } from 'iconsax-reactjs'
import Image from 'next/image'

export default function AddItemModal({ isOpen, onClose, categories, onAdd }) {
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: categories[0]?.id || '',
    preparationTime: 15,
    tags: '',
    isAvailable: true,
    isPopular: false,
    isNew: false,
    image: null,
    imagePreview: null
  })
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData({
      ...formData,
      image: null,
      imagePreview: null
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      ...formData,
      price: parseInt(formData.price),
      originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : null,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      // If no image uploaded, use a default placeholder
      image: formData.imagePreview || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop'
    })
    onClose()
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: categories[0]?.id || '',
      preparationTime: 15,
      tags: '',
      isAvailable: true,
      isPopular: false,
      isNew: false,
      image: null,
      imagePreview: null
    })
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[501] w-full max-w-xl bg-white dark:bg-[#1a1c1e] rounded-[2.5rem] shadow-2xl border border-stone-100 dark:border-white/10 overflow-hidden"
          >
            <div className="p-6 md:p-8 border-b border-stone-100 dark:border-white/5 bg-gradient-to-r from-amber-50/50 dark:from-amber-500/5 to-transparent flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-black text-stone-900 dark:text-white tracking-tight">Add New Item</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">Create a new dish for your menu</p>
              </div>
              <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-white transition-colors">
                <CloseCircle size="24" variant="Bold" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Image Upload Area */}
              <div className="mb-6">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2 px-1">Item Image</label>
                <div 
                  onClick={() => !formData.imagePreview && fileInputRef.current?.click()}
                  className={`
                    relative w-full h-40 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden
                    ${formData.imagePreview 
                      ? 'border-amber-500 bg-stone-50 dark:bg-white/5' 
                      : 'border-stone-200 dark:border-white/10 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-white/5'}
                  `}
                >
                  {formData.imagePreview ? (
                    <>
                      <Image src={formData.imagePreview} alt="Preview" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                          className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/40 transition-colors"
                        >
                          <Add size="24" />
                        </button>
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); removeImage(); }}
                          className="p-3 bg-red-500/20 backdrop-blur-md rounded-2xl text-red-200 hover:bg-red-500/40 transition-colors"
                        >
                          <Trash size="24" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-white/10 flex items-center justify-center text-stone-400 mb-2">
                        <ImageIcon size="28" variant="Bulk" />
                      </div>
                      <p className="text-xs font-bold text-stone-500 dark:text-stone-400">Click to upload image</p>
                      <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">PNG, JPG up to 5MB</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden" 
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side: Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5 px-1">Item Name</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500"><Add size="18" /></span>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:border-amber-300 dark:focus:border-amber-500/50 outline-none transition-all text-stone-800 dark:text-white"
                        placeholder="e.g., Jollof Rice Special"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5 px-1">Price (₦)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"><DollarCircle size="18" /></span>
                        <input
                          type="number"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:border-amber-300 dark:focus:border-amber-500/50 outline-none transition-all text-stone-800 dark:text-white font-bold text-sm"
                          placeholder="2500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5 px-1">Old Price (₦)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300"><DollarCircle size="18" /></span>
                        <input
                          type="number"
                          value={formData.originalPrice}
                          onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:border-amber-300 dark:focus:border-amber-500/50 outline-none transition-all text-stone-500 dark:text-stone-400 text-sm"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5 px-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:border-amber-300 dark:focus:border-amber-500/50 outline-none transition-all text-stone-800 dark:text-white"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id} className="dark:bg-[#1a1c1e]">{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right side: Meta Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5 px-1">Prep Time (min)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500"><Timer1 size="18" /></span>
                      <input
                        type="number"
                        value={formData.preparationTime}
                        onChange={(e) => setFormData({ ...formData, preparationTime: parseInt(e.target.value) })}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:border-amber-300 dark:focus:border-amber-500/50 outline-none transition-all text-stone-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5 px-1">Tags</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"><Tag size="18" /></span>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:border-amber-300 dark:focus:border-amber-500/50 outline-none transition-all text-stone-800 dark:text-white text-xs"
                        placeholder="spicy, popular, vegan"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${formData.isPopular ? 'bg-amber-500 border-amber-500' : 'border-stone-300 dark:border-white/10 group-hover:border-amber-300'}`}>
                        {formData.isPopular && <MagicStar size="12" variant="Bold" className="text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={formData.isPopular} onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })} />
                      <span className="text-xs font-bold text-stone-600 dark:text-stone-400 group-hover:text-amber-500 transition-colors">Mark as Popular</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${formData.isNew ? 'bg-emerald-500 border-emerald-500' : 'border-stone-300 dark:border-white/10 group-hover:border-emerald-300'}`}>
                        {formData.isNew && <MagicStar size="12" variant="Bold" className="text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={formData.isNew} onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })} />
                      <span className="text-xs font-bold text-stone-600 dark:text-stone-400 group-hover:text-emerald-500 transition-colors flex items-center gap-1.5">
                        Mark as New <MagicStar size="14" variant="Bold" className="text-amber-400" />
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5 px-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:border-amber-300 dark:focus:border-amber-500/50 outline-none transition-all text-stone-800 dark:text-white text-sm"
                  placeholder="Describe the item ingredients, taste, etc..."
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 rounded-2xl font-bold bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-2xl font-bold bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xl shadow-stone-200 dark:shadow-none hover:bg-black dark:hover:bg-stone-100 transition-all"
                >
                  Add Item
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
