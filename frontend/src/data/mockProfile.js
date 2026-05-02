// src/data/mockProfile.js

export const MOCK_PROFILE = {
  // Basic Info
  storeId: 'SV_001',
  storeName: 'Flavor Haven Kitchen',
  storeEmail: 'hello@flavorhaven.ng',
  storePhone: '+234 802 123 4567',
  alternatePhone: '+234 803 456 7890',
  website: 'www.flavorhaven.ng',
  storeImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=400&fit=crop',
  
  // Description
  description: `Flavor Haven Kitchen brings authentic Nigerian cuisine with a modern twist. From our signature Jollof Rice to mouthwatering Suya Platter, every dish is crafted with love and the finest local ingredients.`,
  
  // Location
  address: {
    street: '12b Adeola Odeku Street',
    city: 'Victoria Island',
    state: 'Lagos',
    country: 'Nigeria',
    postalCode: '101241',
    coordinates: {
      lat: 6.4287,
      lng: 3.4215
    }
  },
  
  // Operating Hours
  hours: {
    monday: { open: '10:00', close: '22:00', isOpen: true },
    tuesday: { open: '10:00', close: '22:00', isOpen: true },
    wednesday: { open: '10:00', close: '22:00', isOpen: true },
    thursday: { open: '10:00', close: '22:00', isOpen: true },
    friday: { open: '10:00', close: '00:00', isOpen: true },
    saturday: { open: '11:00', close: '00:00', isOpen: true },
    sunday: { open: '12:00', close: '20:00', isOpen: true }
  },
  
  // Special Hours (holidays, events)
  specialHours: [
    { date: '2025-12-25', label: 'Christmas Day', isClosed: true },
    { date: '2025-01-01', label: "New Year's Day", isClosed: true }
  ],
  
  // Social Media
  social: {
    instagram: '@flavorhaven',
    facebook: 'flavorhaven',
    twitter: '@flavorhaven',
    tiktok: '@flavorhaven'
  },
  
  // Bank Details
  bank: {
    bankName: 'First Bank of Nigeria',
    accountName: 'Flavor Haven Kitchen',
    accountNumber: '1234567890',
    sortCode: '011234567'
  },
  
  // Settings
  settings: {
    orderPreparationTime: 20,
    maxOrderDistance: 10,
    minOrderAmount: 1000,
    deliveryFee: 500,
    isAcceptingOrders: true,
    isDeliveryEnabled: true,
    isPickupEnabled: true,
    autoAcceptOrders: false
  },
  
  // Statistics
  stats: {
    totalOrders: 1234,
    totalRevenue: 2845000,
    averageRating: 4.8,
    responseRate: 98,
    averageResponseTime: 3.2
  }
}

export const DAYS = [
  { id: 'monday', label: 'Monday', shortLabel: 'Mon' },
  { id: 'tuesday', label: 'Tuesday', shortLabel: 'Tue' },
  { id: 'wednesday', label: 'Wednesday', shortLabel: 'Wed' },
  { id: 'thursday', label: 'Thursday', shortLabel: 'Thu' },
  { id: 'friday', label: 'Friday', shortLabel: 'Fri' },
  { id: 'saturday', label: 'Saturday', shortLabel: 'Sat' },
  { id: 'sunday', label: 'Sunday', shortLabel: 'Sun' }
]

export const formatTime = (time) => {
  if (!time) return '--:--'
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const formattedHour = hour % 12 || 12
  return `${formattedHour}:${minutes} ${ampm}`
}

export const formatPhoneNumber = (phone) => {
  return phone.replace(/[\s-]/g, '')
}

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validatePhone = (phone) => {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)
}
