// src/hooks/useMenuManagement.js
import { useState, useCallback, useEffect } from 'react'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'

export function useMenuManagement() {
  const [categories, setCategories] = useState([])
  const [menuItems, setMenuItems] = useState({})
  const [activeCategory, setActiveCategory] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  
  const [shopId, setShopId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch shop, categories, and products on mount
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const shops = await api.shops.getMy()
        if (shops && shops.length > 0) {
          const currentShopId = shops[0].id || shops[0]._id
          setShopId(currentShopId)

          // Fetch products
          const productsRes = await api.products.listByShop(currentShopId)
          const rawProducts = productsRes?.products || productsRes || []

          // We'll dynamically generate categories based on the products or use API reference
          // For now, let's just group products by category string
          const groupedItems = {}
          const catsMap = {}

          rawProducts.forEach(prod => {
            const catName = typeof prod.category === 'object' ? (prod.category?.name || 'Uncategorized') : (prod.category || 'Uncategorized')
            const catId = catName.toLowerCase().replace(/\s+/g, '_')
            
            if (!groupedItems[catId]) {
              groupedItems[catId] = []
            }
            groupedItems[catId].push({
              ...prod,
              id: prod._id || prod.id,
            })

            if (!catsMap[catId]) {
              catsMap[catId] = { id: catId, name: catName, count: 0, color: 'amber' }
            }
            catsMap[catId].count++
          })

          const catsArray = Object.values(catsMap)
          if (catsArray.length > 0 && !activeCategory) {
            setActiveCategory(catsArray[0].id)
          }

          setCategories(catsArray)
          setMenuItems(groupedItems)
        }
      } catch (e) {
        console.error("Failed to load menu data:", e)
        toast.error("Failed to load menu")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Add new item
  const addItem = useCallback(async (newItem) => {
    if (!shopId) return toast.error("No shop available")
    const loadingToast = toast.loading("Adding product...")
    try {
      const createdProd = await api.products.create({ ...newItem, shopId })
      
      const catName = typeof createdProd.category === 'object' ? (createdProd.category?.name || 'Uncategorized') : (createdProd.category || 'Uncategorized')
      const catId = catName.toLowerCase().replace(/\s+/g, '_')
      const formattedItem = { ...createdProd, id: createdProd._id || createdProd.id }

      setMenuItems(prev => ({
        ...prev,
        [catId]: [...(prev[catId] || []), formattedItem]
      }))

      setCategories(prev => {
        const exists = prev.find(c => c.id === catId)
        if (exists) {
          return prev.map(cat => cat.id === catId ? { ...cat, count: (cat.count || 0) + 1 } : cat)
        }
        return [...prev, { id: catId, name: catName, count: 1, color: 'amber' }]
      })
      toast.success(`${newItem.name} added!`, { id: loadingToast })
      setIsAddModalOpen(false)
    } catch (error) {
      toast.error(error.message || "Failed to add product", { id: loadingToast })
    }
  }, [shopId])

  // Edit item
  const editItem = useCallback(async (updatedItem) => {
    const loadingToast = toast.loading("Updating product...")
    try {
      const res = await api.products.update(updatedItem.id, updatedItem)
      const catName = typeof res.category === 'object' ? (res.category?.name || 'Uncategorized') : (res.category || 'Uncategorized')
      const catId = catName.toLowerCase().replace(/\s+/g, '_')

      setMenuItems(prev => ({
        ...prev,
        [catId]: prev[catId]?.map(item => item.id === updatedItem.id ? { ...res, id: res._id || res.id } : item)
      }))
      toast.success("Product updated!", { id: loadingToast })
      setIsEditModalOpen(false)
    } catch (e) {
      toast.error("Failed to update product", { id: loadingToast })
    }
  }, [])

  // Delete item
  const deleteItem = useCallback(async (itemId, categoryId) => {
    const loadingToast = toast.loading("Deleting product...")
    try {
      await api.products.delete(itemId)
      setMenuItems(prev => ({
        ...prev,
        [categoryId]: prev[categoryId].filter(item => item.id !== itemId)
      }))
      setCategories(prev => prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, count: Math.max(0, (cat.count || 0) - 1) }
          : cat
      ))
      toast.success("Product deleted!", { id: loadingToast })
    } catch (e) {
      toast.error("Failed to delete product", { id: loadingToast })
    }
  }, [])

  // Toggle availability
  const toggleAvailability = useCallback(async (itemId, categoryId) => {
    const itemToToggle = menuItems[categoryId]?.find(i => i.id === itemId)
    if (!itemToToggle) return

    const newStatus = !itemToToggle.isAvailable
    try {
      // Assuming patch or update endpoint supports partial update
      await api.products.update(itemId, { isAvailable: newStatus })
      setMenuItems(prev => ({
        ...prev,
        [categoryId]: prev[categoryId].map(item =>
          item.id === itemId ? { ...item, isAvailable: newStatus } : item
        )
      }))
    } catch (e) {
      toast.error("Failed to update availability")
    }
  }, [menuItems])

  // Add category (Mock implementation for UI, backend usually creates categories via products or distinct endpoint)
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
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    getFilteredItems,
    isLoading
  }
}
