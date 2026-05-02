import { Icons } from './vendorIcons'
import { Add, Flash, ChartSquare } from 'iconsax-reactjs'

export const BRAND = {
  id: 'brand',
  icon: Icons.brand,
  label: 'EatUp',
  fullName: 'EatUp Vendor Hub',
  tooltip: 'Go to dashboard home'
}

export const NAV_PRIMARY = [
  { id: 'overview', icon: Icons.overview, label: 'Overview', view: 'overview', order: 1 },
  { id: 'orders', icon: Icons.orders, label: 'Orders', view: 'orders', order: 2 },
  { id: 'menu', icon: Icons.menu, label: 'Menu', view: 'menu', order: 3 },
]

export const NAV_SECONDARY = [
  { id: 'payments', icon: Icons.payments, label: 'Payments', view: 'payments', order: 4 },
  { id: 'analytics', icon: Icons.analytics, label: 'Analytics', view: 'analytics', order: 5 },
]

export const NAV_UTILITY = [
  { id: 'profile', icon: Icons.profile, label: 'Business Profile', view: 'profile', order: 6 },
  { id: 'settings', icon: Icons.settings, label: 'Settings', view: 'settings', order: 7 },
]

export const ALL_NAV_ITEMS = [...NAV_PRIMARY, ...NAV_SECONDARY, ...NAV_UTILITY]

export const UTILITY_BUTTONS = [
  { id: 'messages', icon: Icons.messages, label: 'Messages', badge: 3 }
]

export const QUICK_ACTIONS = [
  { id: 'add_item', label: 'Add Menu Item', icon: <Add size="16" variant="Bold" />, action: 'add_item' },
  { id: 'process_orders', label: 'Process Pending', icon: <Flash size="16" variant="Bold" />, action: 'process_orders' },
  { id: 'weekly_report', label: 'Weekly Report', icon: <ChartSquare size="16" variant="Bold" />, action: 'weekly_report' },
]

export const tipCard = {
  title: 'Tip of the day',
  content: 'Update your menu to highlight daily specials and boost sales.'
}
