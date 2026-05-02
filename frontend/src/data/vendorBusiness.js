export const BUSINESS = {
  id: 'eatup_vendor_001',
  name: 'Flavor Haven Kitchen',
  shortName: 'Flavor Haven',
  logo: null, // or logo component
  status: 'open', // 'open', 'closed', 'busy'
  rating: 4.8,
  totalReviews: 1204,
  currency: '₦',
  timezone: 'Africa/Lagos'
}

export const NOTIFICATIONS = [
  { id: 1, type: 'order', message: 'New order #0421', time: '2 min ago', read: false },
  { id: 2, type: 'alert', message: 'Low stock: Suya Platter', time: '15 min ago', read: false },
  { id: 3, type: 'report', message: 'Weekly report ready', time: '1 hour ago', read: true }
]

export const QUICK_SEARCH_SUGGESTIONS = [
  'Order #0421',
  'Suya Platter',
  'Jollof Rice',
  'Customer: Adaeze'
]
