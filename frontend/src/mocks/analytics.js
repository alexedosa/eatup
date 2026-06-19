export const MOCK_ANALYTICS = {
  metrics: {
    revenue: { label: 'Total Revenue', current: 485000, previous: 412000, change: 17.7, trend: 'up' },
    orders: { label: 'Total Orders', current: 128, previous: 109, change: 17.4, trend: 'up' },
    avgOrderValue: { label: 'Avg Order Value', current: 3789, previous: 3650, change: 3.8, trend: 'up' },
    customers: { label: 'Unique Customers', current: 94, previous: 81, change: 16.0, trend: 'up' },
    completionRate: { label: 'Completion Rate', current: 95.3, previous: 93.1, change: 2.2, trend: 'up' },
    cancellationRate: { label: 'Cancellation Rate', current: 4.7, previous: 6.9, change: -2.2, trend: 'down' },
  },
  dailyRevenue: [
    { date: '2026-06-07', revenue: 52000, orders: 14 },
    { date: '2026-06-08', revenue: 61000, orders: 17 },
    { date: '2026-06-09', revenue: 48000, orders: 13 },
    { date: '2026-06-10', revenue: 72000, orders: 20 },
    { date: '2026-06-11', revenue: 68000, orders: 19 },
    { date: '2026-06-12', revenue: 85000, orders: 23 },
    { date: '2026-06-13', revenue: 99000, orders: 22 },
  ],
  weeklyComparison: [
    { week: 'Week 1', revenue: 320000, orders: 86 },
    { week: 'Week 2', revenue: 412000, orders: 109 },
    { week: 'Week 3', revenue: 485000, orders: 128 },
  ],
  categoryRevenue: [
    { category: 'Jollof Rice', revenue: 185000, percentage: 38 },
    { category: 'Soups', revenue: 142000, percentage: 29 },
    { category: 'Grills', revenue: 98000, percentage: 20 },
    { category: 'Sides', revenue: 60000, percentage: 13 },
  ],
  topItems: [
    { name: 'Party Jollof Rice', orders: 45, revenue: 135000 },
    { name: 'Egusi Soup & Pounded Yam', orders: 32, revenue: 144000 },
    { name: 'Suya Plate', orders: 28, revenue: 89600 },
  ],
  heatmapData: [
    { day: 'Mon', hour: 12, value: 8 },
    { day: 'Mon', hour: 13, value: 12 },
    { day: 'Fri', hour: 19, value: 18 },
    { day: 'Sat', hour: 20, value: 22 },
  ],
  funnel: [
    { stage: 'Placed', count: 128 },
    { stage: 'Accepted', count: 122 },
    { stage: 'Preparing', count: 118 },
    { stage: 'Delivered', count: 112 },
  ],
  insights: [
    { type: 'info', message: 'Friday dinner rush drives 28% of weekly revenue.' },
    { type: 'success', message: 'Jollof Rice is your top seller — consider a combo deal.' },
  ],
};
