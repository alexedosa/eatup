import { TruckFast, Danger, ClipboardText, Wallet2 } from 'iconsax-reactjs'

export const QUICK_METRICS = [
  { id: 'total_sales', label: 'Total Sales', value: '1.2M', change: '+18.4%', isCurrency: true, icon: <Wallet2 variant="Outline" />, color: 'green' },
  { id: 'pending_delivery', label: 'Pending Delivery', value: 8, change: '-3%', icon: <TruckFast variant="Outline" />, color: 'blue' },
  { id: 'total_orders', label: 'Total Orders', value: 142, change: '+24', icon: <ClipboardText variant="Outline" />, color: 'amber' },
  { id: 'cancelled_orders', label: 'Cancelled Orders', value: 3, change: '-1', icon: <Danger variant="Outline" />, color: 'red' }
]

export const WEEKLY_REVENUE = [
  { day: 'Mon', revenue: 142000, orders: 42 },
  { day: 'Tue', revenue: 186000, orders: 51 },
  { day: 'Wed', revenue: 114000, orders: 38 },
  { day: 'Thu', revenue: 228000, orders: 67 },
  { day: 'Fri', revenue: 246000, orders: 89 },
  { day: 'Sat', revenue: 259000, orders: 94 },
  { day: 'Sun', revenue: 160000, orders: 48 }
]

export const RECENT_ORDERS = [
  { id: '0421', customer: 'Adaeze Okafor', customerImg: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=100&h=100', amount: 4800, status: 'preparing', time: '5 min ago' },
  { id: '0420', customer: 'Emeka Nwosu', customerImg: 'https://images.unsplash.com/photo-1506272517162-30103f44620c?auto=format&fit=crop&q=80&w=100&h=100', amount: 2200, status: 'delivering', time: '12 min ago' },
  { id: '0419', customer: 'Fatima Bello', customerImg: 'https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?auto=format&fit=crop&q=80&w=100&h=100', amount: 6500, status: 'completed', time: '28 min ago' },
  { id: '0418', customer: 'Tunde Adeyemi', customerImg: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=100&h=100', amount: 3100, status: 'completed', time: '45 min ago' },
  { id: '0417', customer: 'Ngozi Eze', customerImg: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?auto=format&fit=crop&q=80&w=100&h=100', amount: 1900, status: 'cancelled', time: '1 hour ago' }
]

export const POPULAR_ITEMS = [
  { rank: 1, name: 'Jollof Rice Special', category: 'Mains', orders: 148, revenue: 296000 },
  { rank: 2, name: 'Suya Platter', category: 'Grill', orders: 112, revenue: 392000 },
  { rank: 3, name: 'Pepper Soup', category: 'Soups', orders: 87, revenue: 130500 },
  { rank: 4, name: 'Fried Plantain', category: 'Sides', orders: 74, revenue: 74000 },
  { rank: 5, name: 'Chapman Drink', category: 'Drinks', orders: 63, revenue: 63000 }
]

export const statusConfig = {
  preparing: { label: 'Preparing', color: 'text-amber-600', bg: 'bg-amber-50' },
  delivering: { label: 'Delivering', color: 'text-blue-600', bg: 'bg-blue-50' },
  completed: { label: 'Completed', color: 'text-green-600', bg: 'bg-green-50' },
  cancelled: { label: 'Cancelled', color: 'text-red-600', bg: 'bg-red-50' }
}
