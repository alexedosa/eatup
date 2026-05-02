// src/data/mockAnalytics.js

export const MOCK_ANALYTICS = {
  // KPI Metrics
  metrics: {
    revenue: {
      current: 1335000,
      previous: 1258000,
      change: 6.2,
      trend: 'up',
      label: 'Total Revenue',
      prefix: '₦'
    },
    orders: {
      current: 187,
      previous: 173,
      change: 8.1,
      trend: 'up',
      label: 'Total Orders',
      prefix: ''
    },
    avgOrderValue: {
      current: 7137,
      previous: 7260,
      change: -1.7,
      trend: 'down',
      label: 'Avg Order Value',
      prefix: '₦'
    },
    conversionRate: {
      current: 68.5,
      previous: 71.2,
      change: -3.8,
      trend: 'down',
      label: 'Conversion Rate',
      suffix: '%'
    },
    newCustomers: {
      current: 89,
      previous: 76,
      change: 17.1,
      trend: 'up',
      label: 'New Customers',
      prefix: ''
    },
    retentionRate: {
      current: 45.2,
      previous: 42.8,
      change: 5.6,
      trend: 'up',
      label: 'Retention Rate',
      suffix: '%'
    }
  },
  
  // Daily Revenue (last 30 days)
  dailyRevenue: [
    { date: '2025-03-28', revenue: 142000, orders: 42 },
    { date: '2025-03-29', revenue: 186000, orders: 51 },
    { date: '2025-03-30', revenue: 114000, orders: 38 },
    { date: '2025-03-31', revenue: 228000, orders: 67 },
    { date: '2025-04-01', revenue: 246000, orders: 89 },
    { date: '2025-04-02', revenue: 259000, orders: 94 },
    { date: '2025-04-03', revenue: 160000, orders: 48 }
  ],
  
  // Weekly Revenue Comparison
  weeklyComparison: {
    current: [
      { day: 'Mon', revenue: 142000, orders: 42 },
      { day: 'Tue', revenue: 186000, orders: 51 },
      { day: 'Wed', revenue: 114000, orders: 38 },
      { day: 'Thu', revenue: 228000, orders: 67 },
      { day: 'Fri', revenue: 246000, orders: 89 },
      { day: 'Sat', revenue: 259000, orders: 94 },
      { day: 'Sun', revenue: 160000, orders: 48 }
    ],
    previous: [
      { day: 'Mon', revenue: 135000, orders: 40 },
      { day: 'Tue', revenue: 172000, orders: 48 },
      { day: 'Wed', revenue: 108000, orders: 35 },
      { day: 'Thu', revenue: 210000, orders: 62 },
      { day: 'Fri', revenue: 238000, orders: 85 },
      { day: 'Sat', revenue: 241000, orders: 90 },
      { day: 'Sun', revenue: 154000, orders: 45 }
    ]
  },
  
  // Category Revenue Split
  categoryRevenue: [
    { name: 'Mains', value: 45, revenue: 600750, color: '#F59E0B' },
    { name: 'Grill', value: 28, revenue: 373800, color: '#F97316' },
    { name: 'Sides', value: 12, revenue: 160200, color: '#10B981' },
    { name: 'Drinks', value: 10, revenue: 133500, color: '#3B82F6' },
    { name: 'Desserts', value: 5, revenue: 66750, color: '#8B5CF6' }
  ],
  
  // Top Selling Items
  topItems: [
    { name: 'Jollof Rice Special', orders: 148, revenue: 296000, trend: '+12%', category: 'Mains' },
    { name: 'Suya Platter', orders: 112, revenue: 392000, trend: '+8%', category: 'Grill' },
    { name: 'Pepper Soup', orders: 87, revenue: 130500, trend: '+5%', category: 'Soups' },
    { name: 'Fried Plantain', orders: 74, revenue: 74000, trend: '+3%', category: 'Sides' },
    { name: 'Chapman Drink', orders: 63, revenue: 63000, trend: '+15%', category: 'Drinks' },
    { name: 'Pasta Alfredo', orders: 56, revenue: 196000, trend: '-2%', category: 'Mains' },
    { name: 'Grilled Chicken', orders: 48, revenue: 182400, trend: '+4%', category: 'Grill' },
    { name: 'Garlic Bread', orders: 42, revenue: 25200, trend: '+1%', category: 'Sides' }
  ],
  
  // Peak Hours (Hourly order distribution)
  peakHours: [
    { hour: '10am', orders: 12, percentage: 3 },
    { hour: '11am', orders: 28, percentage: 7 },
    { hour: '12pm', orders: 52, percentage: 14 },
    { hour: '1pm', orders: 48, percentage: 13 },
    { hour: '2pm', orders: 35, percentage: 9 },
    { hour: '3pm', orders: 18, percentage: 5 },
    { hour: '4pm', orders: 22, percentage: 6 },
    { hour: '5pm', orders: 45, percentage: 12 },
    { hour: '6pm', orders: 68, percentage: 18 },
    { hour: '7pm', orders: 72, percentage: 19 },
    { hour: '8pm', orders: 38, percentage: 10 },
    { hour: '9pm', orders: 12, percentage: 3 }
  ],
  
  // Order Funnel
  funnel: {
    views: 12500,
    cart: 8900,
    checkout: 7200,
    completed: 6132
  },
  
  // Hourly Heatmap Data (Day x Hour)
  heatmapData: [
    { day: 'Mon', '10am': 8, '11am': 18, '12pm': 42, '1pm': 38, '2pm': 25, '3pm': 12, '4pm': 15, '5pm': 32, '6pm': 48, '7pm': 52, '8pm': 28 },
    { day: 'Tue', '10am': 10, '11am': 22, '12pm': 48, '1pm': 45, '2pm': 28, '3pm': 15, '4pm': 18, '5pm': 38, '6pm': 55, '7pm': 58, '8pm': 32 },
    { day: 'Wed', '10am': 6, '11am': 12, '12pm': 35, '1pm': 32, '2pm': 20, '3pm': 8, '4pm': 12, '5pm': 28, '6pm': 42, '7pm': 45, '8pm': 22 },
    { day: 'Thu', '10am': 12, '11am': 25, '12pm': 55, '1pm': 52, '2pm': 32, '3pm': 18, '4pm': 22, '5pm': 45, '6pm': 68, '7pm': 72, '8pm': 42 },
    { day: 'Fri', '10am': 15, '11am': 32, '12pm': 62, '1pm': 58, '2pm': 38, '3pm': 22, '4pm': 28, '5pm': 52, '6pm': 78, '7pm': 85, '8pm': 55 },
    { day: 'Sat', '10am': 18, '11am': 35, '12pm': 68, '1pm': 65, '2pm': 45, '3pm': 28, '4pm': 35, '5pm': 62, '6pm': 88, '7pm': 92, '8pm': 62 },
    { day: 'Sun', '10am': 5, '11am': 8, '12pm': 22, '1pm': 18, '2pm': 12, '3pm': 6, '4pm': 8, '5pm': 18, '6pm': 28, '7pm': 32, '8pm': 18 }
  ],
  
  // AI Insights
  insights: [
    {
      type: 'success',
      title: 'Revenue Growth',
      message: 'Revenue is up 6.2% this week compared to last week. Your Saturday peak hour (7-8 PM) generated the highest sales.',
      action: 'View Details'
    },
    {
      type: 'warning',
      title: 'Sunday Slowdown',
      message: 'Sunday sales are 40% below your weekly average. Consider running a special promotion or adjusting your hours.',
      action: 'Create Promotion'
    },
    {
      type: 'info',
      title: 'Jollof Rice is Thriving',
      message: 'Your Jollof Rice Special drives 35% of total revenue. Feature it prominently and consider a combo deal.',
      action: 'Edit Menu'
    },
    {
      type: 'success',
      title: 'Customer Growth',
      message: 'New customers are up 17% this week. Your retention rate is improving to 45.2%.',
      action: 'View Customers'
    }
  ]
}

export const formatNaira = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-NG').format(num)
}

export const formatCompactNumber = (num) => {
  return new Intl.NumberFormat('en-NG', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num)
}
