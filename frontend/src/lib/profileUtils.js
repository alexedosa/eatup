// src/lib/profileUtils.js

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
  if (!phone) return ''
  return phone.replace(/[\s-]/g, '')
}

export const validateEmail = (email) => {
  if (!email) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validatePhone = (phone) => {
  if (!phone) return false
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)
}

export const INITIAL_PROFILE_STATE = {
  storeId: '',
  storeName: '',
  storeEmail: '',
  storePhone: '',
  alternatePhone: '',
  website: '',
  storeImage: '',
  description: '',
  address: {
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    coordinates: { lat: 0, lng: 0 }
  },
  hours: {
    monday: { open: '08:00', close: '20:00', isOpen: false },
    tuesday: { open: '08:00', close: '20:00', isOpen: false },
    wednesday: { open: '08:00', close: '20:00', isOpen: false },
    thursday: { open: '08:00', close: '20:00', isOpen: false },
    friday: { open: '08:00', close: '20:00', isOpen: false },
    saturday: { open: '08:00', close: '20:00', isOpen: false },
    sunday: { open: '08:00', close: '20:00', isOpen: false }
  },
  specialHours: [],
  social: {
    instagram: '',
    facebook: '',
    twitter: '',
    tiktok: ''
  },
  bank: {
    bankName: '',
    accountName: '',
    accountNumber: '',
    sortCode: ''
  },
  settings: {
    orderPreparationTime: 20,
    maxOrderDistance: 10,
    minOrderAmount: 1000,
    deliveryFee: 500,
    isAcceptingOrders: false,
    isDeliveryEnabled: false,
    isPickupEnabled: false,
    autoAcceptOrders: false
  },
  stats: {
    totalOrders: 0,
    totalRevenue: 0,
    averageRating: 0,
    responseRate: 0,
    averageResponseTime: 0
  }
}
