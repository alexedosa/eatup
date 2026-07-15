// src/components/vendor/rs2/menu/AddItemModal.jsx
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Add, CloseCircle, Timer1, DollarCircle, Tag, MagicStar, Image as ImageIcon, Trash } from 'iconsax-reactjs'
import Image from 'next/image'
import CustomSelect from '@/components/onboarding/CustomSelect'

const DEFAULT_FORM = {
  name: '',
  description: '',
  price: '',
  originalPrice: '',
  category: '',
  preparationTime: 15,
  tags: '',
  isAvailable: true,
  isPopular: false,
  isNew: false,
  imageFile: null,
  imagePreview: null,
}

export default function AddItemModal({ isOpen, onClose, categories, onAdd }) {
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState(DEFAULT_FORM)
  const [newCategory, setNewCategory] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const categorySelectOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const typedCategory = newCategory.trim()
  const resolvedCategory = typedCategory || formData.category || categories[0]?.id || ''

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData((current) => ({
        ...current,
        imageFile: file,
        imagePreview: reader.result,
      }))
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setFormData((current) => ({
      ...current,
      imageFile: null,
      imagePreview: null,
    }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const resetForm = () => {
    setFormData({
      ...DEFAULT_FORM,
      category: categories[0]?.id || '',
    })
    setNewCategory('')
    setError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    if (!resolvedCategory) {
      setError('Please select a category.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await onAdd({
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price, 10),
        originalPrice: formData.originalPrice ? parseInt(formData.originalPrice, 10) : null,
        category: resolvedCategory,
        preparationTime: formData.preparationTime,
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        isAvailable: formData.isAvailable,
        isPopular: formData.isPopular,
        isNew: formData.isNew,
        imageFile: formData.imageFile,
      })
      resetForm()
    } catch (submitError) {
      setError(submitError.message || 'Unable to add this item.')
    } finally {
      setIsSubmitting(false)
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
            className="fixed inset-0 z-[500] bg-stone-900/40 backdrop-blur-sm dark:bg-black/60"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 z-[501] w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] border border-stone-100 bg-white shadow-2xl dark:border-white/10 dark:bg-[#1a1c1e]"
          >
            <div className="flex items-center justify-between border-b border-stone-100 bg-gradient-to-r from-amber-50/50 to-transparent p-6 dark:border-white/5 dark:from-amber-500/5 md:p-8">
              <div>
                <h2 className="font-display text-2xl font-black tracking-tight text-stone-900 dark:text-white">
                  Add New Item
                </h2>
                <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
                  Create a new dish for your menu
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-stone-400 transition-colors hover:text-stone-600 dark:hover:text-white"
              >
                <CloseCircle size="24" variant="Bold" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="custom-scrollbar max-h-[70vh] space-y-5 overflow-y-auto overflow-x-visible p-6 md:p-8"
            >
              <div className="mb-6">
                <label className="mb-2 block px-1 text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                  Item Image
                </label>
                <div
                  onClick={() => !formData.imagePreview && fileInputRef.current?.click()}
                  className={`relative flex h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed transition-all ${
                    formData.imagePreview
                      ? 'border-amber-500 bg-stone-50 dark:bg-white/5'
                      : 'border-stone-200 hover:border-amber-400 hover:bg-amber-50 dark:border-white/10 dark:hover:bg-white/5'
                  }`}
                >
                  {formData.imagePreview ? (
                    <>
                      <Image src={formData.imagePreview} alt="Preview" fill className="object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                            fileInputRef.current?.click()
                          }}
                          className="rounded-2xl bg-white/20 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/40"
                        >
                          <Add size="24" />
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                            removeImage()
                          }}
                          className="rounded-2xl bg-red-500/20 p-3 text-red-200 backdrop-blur-md transition-colors hover:bg-red-500/40"
                        >
                          <Trash size="24" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-400 dark:bg-white/10">
                        <ImageIcon size="28" variant="Bulk" />
                      </div>
                      <p className="text-xs font-bold text-stone-500 dark:text-stone-400">
                        Click to upload image
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-stone-400">
                        PNG, JPG up to 5MB
                      </p>
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

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block px-1 text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                      Item Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">
                        <Add size="18" />
                      </span>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                        className="w-full rounded-2xl border border-stone-100 bg-stone-50 py-3 pl-10 pr-4 text-stone-800 outline-none transition-all focus:border-amber-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-amber-500/50"
                        placeholder="e.g., Jollof Rice Special"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block px-1 text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                        Price (₦)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500">
                          <DollarCircle size="18" />
                        </span>
                        <input
                          type="number"
                          required
                          value={formData.price}
                          onChange={(event) => setFormData({ ...formData, price: event.target.value })}
                          className="w-full rounded-2xl border border-stone-100 bg-stone-50 py-3 pl-10 pr-4 text-sm font-bold text-stone-800 outline-none transition-all focus:border-amber-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-amber-500/50"
                          placeholder="2500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block px-1 text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                        Old Price (₦)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300">
                          <DollarCircle size="18" />
                        </span>
                        <input
                          type="number"
                          value={formData.originalPrice}
                          onChange={(event) => setFormData({ ...formData, originalPrice: event.target.value })}
                          className="w-full rounded-2xl border border-stone-100 bg-stone-50 py-3 pl-10 pr-4 text-sm text-stone-500 outline-none transition-all focus:border-amber-300 dark:border-white/10 dark:bg-white/5 dark:text-stone-400 dark:focus:border-amber-500/50"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative z-30">
                    <label className="mb-1.5 block px-1 text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                      Category
                    </label>
                    {categorySelectOptions.length > 0 ? (
                      <CustomSelect
                        value={formData.category || categories[0]?.id || ''}
                        options={categorySelectOptions}
                        onChange={(value) => {
                          setFormData({ ...formData, category: value })
                          setNewCategory('')
                        }}
                        placeholder="Select a category"
                        disabled={isSubmitting}
                        className="z-40"
                      />
                    ) : (
                      <p className="rounded-2xl border border-dashed border-stone-200 px-4 py-3 text-sm font-medium text-stone-500 dark:border-white/10 dark:text-stone-400">
                        Loading categories...
                      </p>
                    )}
                    <div className="my-3 flex items-center gap-3">
                      <span className="h-px flex-1 bg-stone-100 dark:bg-white/10" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                        or
                      </span>
                      <span className="h-px flex-1 bg-stone-100 dark:bg-white/10" />
                    </div>
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(event) => setNewCategory(event.target.value)}
                      className="w-full rounded-2xl border border-stone-100 bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-800 outline-none transition-all focus:border-amber-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-amber-500/50"
                      placeholder="Enter new category"
                      disabled={isSubmitting}
                    />
                    {typedCategory && (
                      <p className="mt-2 px-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        New category will be saved as {typedCategory}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block px-1 text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                      Prep Time (min)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500">
                        <Timer1 size="18" />
                      </span>
                      <input
                        type="number"
                        value={formData.preparationTime}
                        onChange={(event) =>
                          setFormData({ ...formData, preparationTime: parseInt(event.target.value, 10) || 0 })
                        }
                        className="w-full rounded-2xl border border-stone-100 bg-stone-50 py-3 pl-10 pr-4 text-stone-800 outline-none transition-all focus:border-amber-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-amber-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block px-1 text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                      Tags
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                        <Tag size="18" />
                      </span>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(event) => setFormData({ ...formData, tags: event.target.value })}
                        className="w-full rounded-2xl border border-stone-100 bg-stone-50 py-3 pl-10 pr-4 text-xs text-stone-800 outline-none transition-all focus:border-amber-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-amber-500/50"
                        placeholder="spicy, popular, vegan"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <label className="group flex cursor-pointer items-center gap-3">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${
                          formData.isPopular
                            ? 'border-amber-500 bg-amber-500'
                            : 'border-stone-300 group-hover:border-amber-300 dark:border-white/10'
                        }`}
                      >
                        {formData.isPopular && <MagicStar size="12" variant="Bold" className="text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.isPopular}
                        onChange={(event) => setFormData({ ...formData, isPopular: event.target.checked })}
                      />
                      <span className="text-xs font-bold text-stone-600 transition-colors group-hover:text-amber-500 dark:text-stone-400">
                        Mark as Popular
                      </span>
                    </label>

                    <label className="group flex cursor-pointer items-center gap-3">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${
                          formData.isNew
                            ? 'border-emerald-500 bg-emerald-500'
                            : 'border-stone-300 group-hover:border-emerald-300 dark:border-white/10'
                        }`}
                      >
                        {formData.isNew && <MagicStar size="12" variant="Bold" className="text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.isNew}
                        onChange={(event) => setFormData({ ...formData, isNew: event.target.checked })}
                      />
                      <span className="flex items-center gap-1.5 text-xs font-bold text-stone-600 transition-colors group-hover:text-emerald-500 dark:text-stone-400">
                        Mark as New <MagicStar size="14" variant="Bold" className="text-amber-400" />
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block px-1 text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                  className="w-full rounded-2xl border border-stone-100 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition-all focus:border-amber-300 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-amber-500/50"
                  placeholder="Describe the item ingredients, taste, etc..."
                />
              </div>

              {error && (
                <p className="text-sm font-bold text-red-500" role="alert">
                  {error}
                </p>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 rounded-2xl bg-stone-100 py-4 font-bold text-stone-600 transition-all hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white/5 dark:text-stone-400 dark:hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !resolvedCategory}
                  className="flex-1 rounded-2xl bg-stone-900 py-4 font-bold text-white shadow-xl shadow-stone-200 transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-stone-900 dark:shadow-none dark:hover:bg-stone-100"
                >
                  {isSubmitting ? 'Uploading...' : 'Add Item'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
