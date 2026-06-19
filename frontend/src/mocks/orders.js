const now = Date.now();

export const MOCK_ORDERS = [
  {
    id: 'ord_1001',
    _id: 'ord_1001',
    customer: 'Ada Okonkwo',
    customerPhone: '08031112222',
    total: 5500,
    status: 'pending',
    deliveryType: 'delivery',
    timestamp: new Date(now - 4 * 60000).toISOString(),
    address: '15 Ozumba Mbadiwe, VI, Lagos',
    notes: 'Extra pepper please',
    items: [
      { name: 'Jollof Rice', quantity: 2, price: 2500, notes: '' },
      { name: 'Plantain', quantity: 1, price: 500, notes: '' },
    ],
  },
  {
    id: 'ord_1002',
    _id: 'ord_1002',
    customer: 'Emeka Nwosu',
    customerPhone: '08033334444',
    total: 3200,
    status: 'preparing',
    deliveryType: 'pickup',
    timestamp: new Date(now - 12 * 60000).toISOString(),
    address: '',
    notes: '',
    items: [{ name: 'Suya Plate', quantity: 1, price: 3200, notes: 'Medium spice' }],
  },
  {
    id: 'ord_1003',
    _id: 'ord_1003',
    customer: 'Fatima Bello',
    customerPhone: '08035556666',
    total: 7800,
    status: 'delivering',
    deliveryType: 'delivery',
    timestamp: new Date(now - 25 * 60000).toISOString(),
    address: '3 Bourdillon Road, Ikoyi',
    notes: '',
    items: [
      { name: 'Party Jollof', quantity: 2, price: 3000, notes: '' },
      { name: 'Coleslaw', quantity: 2, price: 900, notes: '' },
    ],
  },
  {
    id: 'ord_1004',
    _id: 'ord_1004',
    customer: 'Tunde Adeyemi',
    customerPhone: '08037778888',
    total: 4500,
    status: 'completed',
    deliveryType: 'pickup',
    timestamp: new Date(now - 90 * 60000).toISOString(),
    address: '',
    notes: '',
    items: [{ name: 'Egusi & Pounded Yam', quantity: 1, price: 4500, notes: '' }],
  },
];

export const MOCK_DASHBOARD_STATS = {
  totalOrders: 128,
  cancelledOrders: 6,
  totalRevenue: 485000,
  pendingOrders: 2,
};
