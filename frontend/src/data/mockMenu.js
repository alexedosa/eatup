// src/data/mockMenu.js

export const MOCK_CATEGORIES = [
  { id: 'mains', name: 'Mains', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=200&h=200&fit=crop', color: 'amber', count: 8 },
  { id: 'grill', name: 'Grill', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop', color: 'orange', count: 6 },
  { id: 'soups', name: 'Soups', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=200&fit=crop', color: 'red', count: 4 },
  { id: 'sides', name: 'Sides', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop', color: 'yellow', count: 5 },
  { id: 'drinks', name: 'Drinks', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&h=200&fit=crop', color: 'blue', count: 7 },
  { id: 'desserts', name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop', color: 'pink', count: 3 }
]

export const MOCK_MENU_ITEMS = {
  mains: [
    {
      id: 'item_001',
      name: 'Jollof Rice Special',
      description: 'Authentic Nigerian jollof rice with chicken, plantains, and coleslaw. Cooked to perfection with our secret spice blend.',
      price: 2500,
      originalPrice: null,
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&h=400&fit=crop',
      isAvailable: true,
      isPopular: true,
      isNew: false,
      preparationTime: 15,
      tags: ['spicy', 'popular', 'gluten-free'],
      soldCount: 148,
      rating: 4.8
    },
    {
      id: 'item_002',
      name: 'White Pasta Alfredo',
      description: 'Creamy alfredo sauce with parmesan cheese, garlic, and herbs. Served with garlic bread.',
      price: 3500,
      originalPrice: 4200,
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1645112481338-3560e7740212?w=600&h=400&fit=crop',
      isAvailable: true,
      isPopular: true,
      isNew: false,
      preparationTime: 12,
      tags: ['vegetarian'],
      soldCount: 87,
      rating: 4.6
    },
    {
      id: 'item_003',
      name: 'Bang Bang Shrimp Pasta',
      description: 'Spicy creamy shrimp pasta with bell peppers and green onions. A customer favorite!',
      price: 4800,
      originalPrice: null,
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=600&h=400&fit=crop',
      isAvailable: true,
      isPopular: false,
      isNew: true,
      preparationTime: 18,
      tags: ['spicy', 'seafood'],
      soldCount: 42,
      rating: 4.9
    },
    {
      id: 'item_004',
      name: 'Vegetable Stir Fry',
      description: 'Fresh mixed vegetables stir-fried in house special sauce. Served with steamed rice.',
      price: 2200,
      originalPrice: null,
      category: 'mains',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop',
      isAvailable: true,
      isPopular: false,
      isNew: false,
      preparationTime: 10,
      tags: ['vegan', 'healthy'],
      soldCount: 56,
      rating: 4.5
    }
  ],
  grill: [
    {
      id: 'item_005',
      name: 'Suya Platter',
      description: 'Spicy grilled beef suya with onions, tomatoes, and extra yaji spice. Serves 2-3.',
      price: 5500,
      originalPrice: 6500,
      category: 'grill',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
      isAvailable: true,
      isPopular: true,
      isNew: false,
      preparationTime: 20,
      tags: ['spicy', 'popular', 'shareable'],
      soldCount: 112,
      rating: 4.9
    },
    {
      id: 'item_006',
      name: 'Grilled Chicken',
      description: 'Half chicken grilled to perfection with our signature marinade. Served with grilled vegetables.',
      price: 3800,
      originalPrice: null,
      category: 'grill',
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop',
      isAvailable: true,
      isPopular: false,
      isNew: false,
      preparationTime: 25,
      tags: ['grilled'],
      soldCount: 67,
      rating: 4.7
    },
    {
      id: 'item_007',
      name: 'Fish Suya',
      description: 'Whole tilapia fish grilled with suya spices and served with onions and tomatoes.',
      price: 4500,
      originalPrice: null,
      category: 'grill',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=400&fit=crop',
      isAvailable: false,
      isPopular: false,
      isNew: false,
      preparationTime: 20,
      tags: ['seafood', 'spicy'],
      soldCount: 34,
      rating: 4.8
    }
  ],
  soups: [
    {
      id: 'item_008',
      name: 'Pepper Soup',
      description: 'Spicy traditional pepper soup with assorted meat. Perfect for cold days!',
      price: 3500,
      originalPrice: null,
      category: 'soups',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
      isAvailable: true,
      isPopular: true,
      isNew: false,
      preparationTime: 15,
      tags: ['spicy', 'popular'],
      soldCount: 94,
      rating: 4.8
    },
    {
      id: 'item_009',
      name: 'Egusi Soup',
      description: 'Thick melon seed soup with assorted meat and vegetables. Served with pounded yam.',
      price: 4000,
      originalPrice: null,
      category: 'soups',
      image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=400&fit=crop',
      isAvailable: true,
      isPopular: false,
      isNew: false,
      preparationTime: 20,
      tags: ['traditional'],
      soldCount: 56,
      rating: 4.7
    }
  ],
  sides: [
    {
      id: 'item_010',
      name: 'Fried Plantain (Dodo)',
      description: 'Sweet fried plantains, golden brown and crispy on the outside, soft inside.',
      price: 800,
      originalPrice: 1000,
      category: 'sides',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
      isAvailable: true,
      isPopular: true,
      isNew: false,
      preparationTime: 5,
      tags: ['vegetarian', 'popular'],
      soldCount: 203,
      rating: 4.9
    },
    {
      id: 'item_011',
      name: 'Garlic Bread',
      description: 'Toasted french bread with garlic butter and parsley.',
      price: 600,
      originalPrice: null,
      category: 'sides',
      image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=600&h=400&fit=crop',
      isAvailable: true,
      isPopular: false,
      isNew: false,
      preparationTime: 3,
      tags: ['vegetarian'],
      soldCount: 87,
      rating: 4.6
    }
  ],
  drinks: [
    {
      id: 'item_012',
      name: 'Chapman Drink',
      description: 'Refreshing non-alcoholic cocktail with grenadine, sprite, and fresh fruits.',
      price: 1200,
      originalPrice: 1500,
      category: 'drinks',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&h=400&fit=crop',
      isAvailable: true,
      isPopular: true,
      isNew: false,
      preparationTime: 3,
      tags: ['cold', 'popular'],
      soldCount: 156,
      rating: 4.8
    },
    {
      id: 'item_013',
      name: 'Zobo Drink',
      description: 'Traditional hibiscus drink with ginger and pineapple flavors.',
      price: 600,
      originalPrice: null,
      category: 'drinks',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=400&fit=crop',
      isAvailable: true,
      isPopular: false,
      isNew: false,
      preparationTime: 2,
      tags: ['cold', 'traditional'],
      soldCount: 89,
      rating: 4.7
    }
  ],
  desserts: [
    {
      id: 'item_014',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a gooey molten center. Served with vanilla ice cream.',
      price: 1800,
      originalPrice: null,
      category: 'desserts',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop',
      isAvailable: true,
      isPopular: true,
      isNew: false,
      preparationTime: 10,
      tags: ['sweet', 'popular'],
      soldCount: 67,
      rating: 4.9
    }
  ]
}
