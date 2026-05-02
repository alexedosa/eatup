// src/hooks/useMenuManagement.js
import { useState, useCallback } from 'react'
import { MOCK_CATEGORIES, MOCK_MENU_ITEMS } from '@/data/mockMenu'

export function useMenuManagement() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES)
  const [menuItems, setMenuItems] = useState(MOCK_MENU_ITEMS)
  const [activeCategory, setActiveCategory] = useState('mains')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  // Add new item
  const addItem = useCallback((newItem) => {
    const itemWithId = {
      ...newItem,
      id: `item_${Date.now()}`,
      soldCount: 0,
      rating: 0
    }
    setMenuItems(prev => ({
      ...prev,
      [newItem.category]: [...(prev[newItem.category] || []), itemWithId]
    }))
    // Update category count
    setCategories(prev => prev.map(cat =>
      cat.id === newItem.category
        ? { ...cat, count: (cat.count || 0) + 1 }
        : cat
    ))
  }, [])

  // Edit item
  const editItem = useCallback((updatedItem) => {
    setMenuItems(prev => ({
      ...prev,
      [updatedItem.category]: prev[updatedItem.category].map(item =>
        item.id === updatedItem.id ? updatedItem : item
      )
    }))
  }, [])

  // Delete item
  const deleteItem = useCallback((itemId, categoryId) => {
    setMenuItems(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].filter(item => item.id !== itemId)
    }))
    setCategories(prev => prev.map(cat =>
      cat.id === categoryId
        ? { ...cat, count: Math.max(0, (cat.count || 0) - 1) }
        : cat
    ))
  }, [])

  // Toggle availability
  const toggleAvailability = useCallback((itemId, categoryId) => {
    setMenuItems(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].map(item =>
        item.id === itemId
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    }))
  }, [])

  // Add category
  const addCategory = useCallback((newCategory) => {
    const categoryWithId = {
      ...newCategory,
      id: newCategory.name.toLowerCase().replace(/\s+/g, '_'),
      count: 0
    }
    setCategories(prev => [...prev, categoryWithId])
    setMenuItems(prev => ({ ...prev, [categoryWithId.id]: [] }))
  }, [])

  // Delete category
  const deleteCategory = useCallback((categoryId) => {
    if (menuItems[categoryId]?.length > 0) {
      alert(`Cannot delete category with ${menuItems[categoryId].length} items. Move or delete items first.`)
      return
    }
    setCategories(prev => prev.filter(cat => cat.id !== categoryId))
    setMenuItems(prev => {
      const newItems = { ...prev }
      delete newItems[categoryId]
      return newItems
    })
    if (activeCategory === categoryId) {
      setActiveCategory(categories[0]?.id || '')
    }
  }, [menuItems, activeCategory, categories])

  // Filter items by search
  const getFilteredItems = useCallback(() => {
    const items = menuItems[activeCategory] || []
    if (!searchQuery) return items
    return items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [menuItems, activeCategory, searchQuery])

  return {
    categories,
    menuItems,
    activeCategory,
    setActiveCategory,
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    editingItem,
    setEditingItem,
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
    addCategory,
    deleteCategory,
    getFilteredItems
  }
}
