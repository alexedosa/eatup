// src/components/vendor/rs2/menu/MenuPage.jsx
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import { SearchNormal1, Grid1, Task, Add } from 'iconsax-reactjs'
import { useMenuManagement } from '@/hooks/useMenuManagement'
import CategoryTabs from './CategoryTabs'
import MenuGrid from './MenuGrid'
import AddItemModal from './AddItemModal'
import CategoryManager from './CategoryManager'
import ConfirmationDialog from '@/components/shared/ConfirmationDialog'

export default function MenuPage({ searchQuery: globalSearchQuery }) {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    isAddModalOpen,
    setIsAddModalOpen,
    isCategoryManagerOpen,
    setIsCategoryManagerOpen,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    addItem,
    editItem,
    deleteItem,
    toggleAvailability,
    getFilteredItems,
    addCategory,
    deleteCategory,
    isLoading
  } = useMenuManagement()


  const [itemToDelete, setItemToDelete] = useState(null)

  // Sync global search from navbar
  useEffect(() => {
    if (globalSearchQuery !== undefined) {
      setSearchQuery(globalSearchQuery)
    }
  }, [globalSearchQuery, setSearchQuery])
  
  const activeCategoryData = categories.find(c => c.id === activeCategory)
  const filteredItems = getFilteredItems()
  
  const handleAddItem = (newItem) => {
    addItem(newItem)
    toast.success(`${newItem.name} added to menu!`, {
      icon: <Add size="20" variant="Bold" color="white" />,
      style: { background: '#f59e0b', color: 'white', borderRadius: '12px' }
    })
  }
  
  const handleDeleteItem = (itemId, categoryId) => {
    const item = filteredItems.find(i => i.id === itemId)
    setItemToDelete({ itemId, categoryId, name: item?.name })
  }

  const confirmDelete = () => {
    if (!itemToDelete) return
    deleteItem(itemToDelete.itemId, itemToDelete.categoryId)
    toast.success('Item removed from menu', { 
      icon: <Task size="20" variant="Bold" color="white" />,
      style: { background: '#ef4444', color: 'white', borderRadius: '12px' }
    })
    setItemToDelete(null)
  }
  
  const handleToggleAvailability = (itemId, categoryId) => {
    toggleAvailability(itemId, categoryId)
    toast.success('Item availability updated', {
      style: { background: '#10b981', color: 'white', borderRadius: '12px' }
    })
  }
  
  return (
    <div className="w-full space-y-10 max-w-7xl mx-auto pb-20">
      <Toaster position="top-right" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-1.5">
          <h1 className="text-3xl md:text-5xl font-display font-black text-stone-900 dark:text-white tracking-tighter leading-none">Menu Management</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm md:text-base font-medium tracking-tight">Add, edit, and organize your delicious dishes</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 md:flex-none">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items..."
              className="pl-10 pr-4 py-3 rounded-2xl text-sm bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 w-full md:w-64 transition-all text-stone-800 dark:text-white"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
              <SearchNormal1 size="18" variant="Outline" />
            </span>
          </div>
          
          {/* View Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-3 rounded-2xl text-stone-500 dark:text-stone-400 bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors shadow-sm"
          >
            {viewMode === 'grid' ? <Task size="20" variant="Bold" /> : <Grid1 size="20" variant="Bold" />}
          </button>
          
          {/* Add Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 rounded-2xl text-sm font-black uppercase tracking-widest bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xl shadow-stone-200 dark:shadow-none hover:bg-black dark:hover:bg-stone-100 transition-all duration-200 flex items-center gap-2"
          >
            <Add size="20" variant="Bold" /> Add Item
          </button>
        </div>
      </motion.div>
      
      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onOpenCategoryManager={() => setIsCategoryManagerOpen(true)}
      />
      
      {/* Items Count & Search Feedback */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} in {activeCategoryData?.name}
        </p>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-bold text-amber-500 hover:text-amber-600 uppercase tracking-wider"
          >
            Clear search
          </button>
        )}
      </div>
      
      {/* Menu Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      ) : (
        <MenuGrid
          items={filteredItems}
          categoryColor={activeCategoryData?.color}
          onEdit={(item) => {
            toast.info(`Editing ${item.name} coming soon`, {
              style: { borderRadius: '12px' }
            })
          }}
          onDelete={handleDeleteItem}
          onToggleAvailability={handleToggleAvailability}
          viewMode={viewMode}
        />
      )}

      
      {/* Modals */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        categories={categories}
        onAdd={handleAddItem}
      />
      
      <CategoryManager
        isOpen={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
        categories={categories}
        onAddCategory={addCategory}
        onDeleteCategory={deleteCategory}
      />

      <ConfirmationDialog
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Item?"
        message={`Are you sure you want to remove "${itemToDelete?.name}" from your menu? This action cannot be undone.`}
        confirmText="Yes, Delete"
        type="danger"
      />
    </div>
  )
}
