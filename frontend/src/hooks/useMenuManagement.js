// src/hooks/useMenuManagement.js
import { useState, useCallback, useEffect, useMemo } from 'react'
import { api } from '@/lib/api'
import { uploadImageToCloudinary } from '@/lib/cloudinaryService'
import {
  buildCategoryOption,
  buildProductCreatePayload,
  formatProductForUi,
  normalizeCategoryNames,
  slugifyCategory,
} from '@/lib/productUtils'
import { normalizeShopsList } from '@/lib/shopUtils'
import toast from 'react-hot-toast'

const LOCAL_CATEGORY_STORAGE_KEY = 'eatup_vendor_menu_categories'

function readLocalCategoryNames() {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(localStorage.getItem(LOCAL_CATEGORY_STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed.filter(Boolean) : []
  } catch {
    return []
  }
}

function persistLocalCategoryName(name) {
  if (typeof window === 'undefined' || !name) return
  const current = readLocalCategoryNames()
  const exists = current.some((entry) => slugifyCategory(entry) === slugifyCategory(name))
  if (!exists) {
    localStorage.setItem(LOCAL_CATEGORY_STORAGE_KEY, JSON.stringify([...current, name]))
  }
}

function buildCategoriesFromProducts(products) {
  const groupedItems = {}
  const catsMap = {}

  products.forEach((product) => {
    const formatted = formatProductForUi(product)
    const catId = formatted.categoryId
    const catName = formatted.category

    if (!groupedItems[catId]) {
      groupedItems[catId] = []
    }
    groupedItems[catId].push(formatted)

    if (!catsMap[catId]) {
      catsMap[catId] = {
        id: catId,
        name: catName,
        count: 0,
        color: 'amber',
      }
    }
    catsMap[catId].count += 1
  })

  return {
    groupedItems,
    categories: Object.values(catsMap),
  }
}

function mergeCategoryOptions(referenceNames, tabCategories) {
  const merged = new Map()

  referenceNames.forEach((name) => {
    const option = buildCategoryOption(name)
    merged.set(option.id, option)
  })

  tabCategories.forEach((category) => {
    merged.set(category.id, {
      id: category.id,
      name: category.name,
    })
  })

  return Array.from(merged.values())
}

export function useMenuManagement() {
  const [categories, setCategories] = useState([])
  const [categoryOptions, setCategoryOptions] = useState([])
  const [menuItems, setMenuItems] = useState({})
  const [activeCategory, setActiveCategory] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  const [shopId, setShopId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const [shops, referenceCategories] = await Promise.all([
          api.shops.getMy(),
          api.reference.getVendorCategories().catch(() => []),
        ])

        const normalizedShops = normalizeShopsList(shops)
        const referenceNames = [
          ...normalizeCategoryNames(referenceCategories),
          ...readLocalCategoryNames(),
        ]
        const referenceOptions = referenceNames.map(buildCategoryOption)
        setCategoryOptions(referenceOptions)

        if (normalizedShops.length > 0) {
          const currentShopId = normalizedShops[0].id || normalizedShops[0]._id
          setShopId(currentShopId)

          const rawProducts = await api.products.listByShop(currentShopId)
          const { groupedItems, categories: productCategories } = buildCategoriesFromProducts(rawProducts)

          setCategories(productCategories)
          setMenuItems(groupedItems)
          setCategoryOptions(mergeCategoryOptions(referenceNames, productCategories))

          if (productCategories.length > 0) {
            setActiveCategory(productCategories[0].id)
          } else if (referenceOptions.length > 0) {
            setActiveCategory(referenceOptions[0].id)
          }
        }
      } catch (error) {
        console.error('Failed to load menu data:', error)
        toast.error('Failed to load menu')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const modalCategoryOptions = useMemo(
    () => (categoryOptions.length > 0 ? categoryOptions : categories),
    [categoryOptions, categories]
  )

  const addItem = useCallback(async (newItem) => {
    if (!shopId) return toast.error('No shop available')

    const loadingToast = toast.loading('Adding product...')
    try {
      let imageUrl = null

      if (newItem.imageFile) {
        imageUrl = await uploadImageToCloudinary(newItem.imageFile, 'product-images')
      }

      const categoryName =
        modalCategoryOptions.find((category) => category.id === newItem.category)?.name ||
        newItem.category

      const payload = buildProductCreatePayload({
        shopId,
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
        originalPrice: newItem.originalPrice,
        category: categoryName,
        preparationTime: newItem.preparationTime,
        tags: newItem.tags,
        isAvailable: newItem.isAvailable,
        isPopular: newItem.isPopular,
        isNew: newItem.isNew,
        imageUrl,
      })

      const createdProd = await api.products.create(payload)
      const formattedItem = formatProductForUi(createdProd)
      const catId = formattedItem.categoryId
      const catName = formattedItem.category

      setMenuItems((prev) => ({
        ...prev,
        [catId]: [...(prev[catId] || []), formattedItem],
      }))

      setCategories((prev) => {
        const exists = prev.find((category) => category.id === catId)
        if (exists) {
          return prev.map((category) =>
            category.id === catId
              ? { ...category, count: (category.count || 0) + 1 }
              : category
          )
        }
        return [...prev, { id: catId, name: catName, count: 1, color: 'amber' }]
      })

      setCategoryOptions((prev) => {
        if (prev.some((category) => category.id === catId)) return prev
        return [...prev, buildCategoryOption(catName)]
      })
      persistLocalCategoryName(catName)

      if (!activeCategory) {
        setActiveCategory(catId)
      }

      toast.success(`${newItem.name} added!`, { id: loadingToast })
      setIsAddModalOpen(false)
    } catch (error) {
      toast.error(error.message || 'Failed to add product', { id: loadingToast })
      throw error
    }
  }, [shopId, modalCategoryOptions, activeCategory])

  const editItem = useCallback(async (updatedItem) => {
    const loadingToast = toast.loading('Updating product...')
    try {
      const res = await api.products.update(updatedItem.id, updatedItem)
      const formattedItem = formatProductForUi(res)
      const catId = formattedItem.categoryId

      setMenuItems((prev) => ({
        ...prev,
        [catId]: prev[catId]?.map((item) =>
          item.id === updatedItem.id ? formattedItem : item
        ),
      }))
      toast.success('Product updated!', { id: loadingToast })
      setIsEditModalOpen(false)
    } catch {
      toast.error('Failed to update product', { id: loadingToast })
    }
  }, [])

  const deleteItem = useCallback(async (itemId, categoryId) => {
    const loadingToast = toast.loading('Deleting product...')
    try {
      await api.products.delete(itemId)
      setMenuItems((prev) => ({
        ...prev,
        [categoryId]: prev[categoryId].filter((item) => item.id !== itemId),
      }))
      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryId
            ? { ...category, count: Math.max(0, (category.count || 0) - 1) }
            : category
        )
      )
      toast.success('Product deleted!', { id: loadingToast })
    } catch {
      toast.error('Failed to delete product', { id: loadingToast })
    }
  }, [])

  const toggleAvailability = useCallback(async (itemId, categoryId) => {
    const itemToToggle = menuItems[categoryId]?.find((item) => item.id === itemId)
    if (!itemToToggle) return

    const newStatus = !itemToToggle.isAvailable
    setMenuItems((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId].map((item) =>
        item.id === itemId ? { ...item, isAvailable: newStatus } : item
      ),
    }))

    try {
      await api.vendor.menu.updateAvailability(itemId, newStatus)
    } catch {
      setMenuItems((prev) => ({
        ...prev,
        [categoryId]: prev[categoryId].map((item) =>
          item.id === itemId ? { ...item, isAvailable: !newStatus } : item
        ),
      }))
      toast.error('Failed to update availability')
    }
  }, [menuItems])

  const addCategory = useCallback((newCategory) => {
    const categoryWithId = {
      ...newCategory,
      id: slugifyCategory(newCategory.name),
      count: 0,
    }

    setCategories((prev) => [...prev, categoryWithId])
    setCategoryOptions((prev) => {
      if (prev.some((category) => category.id === categoryWithId.id)) return prev
      return [...prev, { id: categoryWithId.id, name: categoryWithId.name }]
    })
    setMenuItems((prev) => ({ ...prev, [categoryWithId.id]: [] }))
    persistLocalCategoryName(categoryWithId.name)
  }, [])

  const deleteCategory = useCallback((categoryId) => {
    if (menuItems[categoryId]?.length > 0) {
      alert(`Cannot delete category with ${menuItems[categoryId].length} items. Move or delete items first.`)
      return
    }

    setCategories((prev) => prev.filter((category) => category.id !== categoryId))
    setCategoryOptions((prev) => prev.filter((category) => category.id !== categoryId))
    setMenuItems((prev) => {
      const nextItems = { ...prev }
      delete nextItems[categoryId]
      return nextItems
    })

    if (activeCategory === categoryId) {
      setActiveCategory(categories[0]?.id || categoryOptions[0]?.id || '')
    }
  }, [menuItems, activeCategory, categories, categoryOptions])

  const getFilteredItems = useCallback(() => {
    const items = menuItems[activeCategory] || []
    if (!searchQuery) return items

    return items.filter((item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [menuItems, activeCategory, searchQuery])

  return {
    categories,
    categoryOptions: modalCategoryOptions,
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
    isLoading,
  }
}
