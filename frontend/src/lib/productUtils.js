import { extractPaginatedContent } from '@/lib/shopUtils'

export function slugifyCategory(name = '') {
  return name.toLowerCase().replace(/\s+/g, '_')
}

export function normalizeProductsList(response) {
  if (response?.products) {
    return extractPaginatedContent(response.products)
  }

  return extractPaginatedContent(response)
}

export function normalizeCategoryNames(response) {
  const list = extractPaginatedContent(response)

  return list
    .map((entry) => {
      if (typeof entry === 'string') return entry
      if (typeof entry === 'object' && entry?.name) return entry.name
      return null
    })
    .filter(Boolean)
}

export function getProductImageUrl(product) {
  return (
    product?.profilePicture ||
    product?.productPicture ||
    product?.image ||
    null
  )
}

export function formatProductForUi(product) {
  const image = getProductImageUrl(product)
  const categoryName =
    typeof product?.category === 'object'
      ? product.category?.name || 'Uncategorized'
      : product?.category || 'Uncategorized'

  return {
    ...product,
    id: product._id || product.id,
    category: categoryName,
    categoryId: slugifyCategory(categoryName),
    image,
    profilePicture: image,
    productPicture: image,
  }
}

export function buildCategoryOption(name) {
  return {
    id: slugifyCategory(name),
    name,
  }
}

export function buildProductCreatePayload({
  shopId,
  name,
  description,
  price,
  originalPrice,
  category,
  preparationTime,
  tags,
  isAvailable,
  isPopular,
  isNew,
  imageUrl,
}) {
  const payload = {
    shopId,
    name: name.trim(),
    description: description?.trim() || '',
    price: Number(price),
    category,
    preparationTime: Number(preparationTime) || 15,
    tags: Array.isArray(tags) ? tags : [],
    isAvailable: isAvailable ?? true,
    isPopular: isPopular ?? false,
    isNew: isNew ?? false,
  }

  if (originalPrice) {
    payload.originalPrice = Number(originalPrice)
  }

  if (imageUrl) {
    payload.profilePicture = imageUrl
    payload.productPicture = imageUrl
    payload.image = imageUrl
  }

  return payload
}
