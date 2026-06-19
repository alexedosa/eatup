export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif_001',
    type: 'warning',
    title: 'New Order #1001',
    message: 'Ada Okonkwo placed an order for ₦5,500',
    read: false,
    createdAt: new Date(Date.now() - 4 * 60000).toISOString(),
  },
  {
    id: 'notif_002',
    type: 'info',
    title: 'Order Ready',
    message: 'Order #1002 is ready for pickup',
    read: false,
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    id: 'notif_003',
    type: 'success',
    title: 'Settlement Received',
    message: '₦42,500 settled to your GTBank account',
    read: true,
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
];
