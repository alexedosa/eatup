import { Receipt1, Timer1, Truck, TickCircle } from 'iconsax-reactjs';

export const MOCK_ORDERS = {
  new: [
    {
      id: '0423',
      customer: 'Adaeze Okafor',
      phone: '+234 802 123 4567',
      items: [
        { name: 'Jollof Rice Special', quantity: 2, price: 2000 },
        { name: 'Suya Platter', quantity: 1, price: 3500 }
      ],
      total: 7500,
      time: 'Just now',
      timestamp: Date.now(),
      deliveryType: 'delivery',
      address: '12b Adeola Odeku, Victoria Island',
      specialInstructions: 'Extra spicy, please'
    },
    {
      id: '0422',
      customer: 'Emeka Nwosu',
      phone: '+234 803 456 7890',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 4800 },
        { name: 'Garlic Bread', quantity: 2, price: 800 },
        { name: 'Coke', quantity: 2, price: 400 }
      ],
      total: 6800,
      time: '3 min ago',
      timestamp: Date.now() - 180000,
      deliveryType: 'pickup',
      specialInstructions: ''
    },
    {
      id: '0421',
      customer: 'Fatima Bello',
      phone: '+234 805 789 0123',
      items: [
        { name: 'Pepper Soup', quantity: 1, price: 4500 },
        { name: 'Fried Plantain', quantity: 2, price: 1000 }
      ],
      total: 6500,
      time: '7 min ago',
      timestamp: Date.now() - 420000,
      deliveryType: 'delivery',
      address: '5 Allen Avenue, Ikeja',
      specialInstructions: 'Call on arrival'
    }
  ],
  preparing: [
    {
      id: '0420',
      customer: 'Tunde Adeyemi',
      items: [{ name: 'Suya Platter', quantity: 2, price: 3500 }],
      total: 7000,
      time: '15 min ago',
      timestamp: Date.now() - 900000,
      status: 'preparing',
      estimatedReady: '5 min'
    },
    {
      id: '0419',
      customer: 'Ngozi Eze',
      items: [{ name: 'Jollof Rice Special', quantity: 1, price: 2000 }],
      total: 2000,
      time: '22 min ago',
      timestamp: Date.now() - 1320000,
      status: 'cooking',
      estimatedReady: '10 min'
    }
  ],
  delivering: [
    {
      id: '0418',
      customer: 'Chidi Okonkwo',
      items: [{ name: 'Pasta Alfredo', quantity: 1, price: 3500 }],
      total: 3500,
      time: '35 min ago',
      driver: 'Michael',
      riderPhone: '+234 801 234 5678'
    }
  ],
  completed: [
    { id: '0417', customer: 'Amara Obi', total: 4500, time: '1 hour ago' },
    { id: '0416', customer: 'Yusuf Ibrahim', total: 8200, time: '2 hours ago' }
  ]
}

export const ORDER_STATUS_CONFIG = {
  new: { label: 'New Orders', color: 'amber', icon: Receipt1, bg: 'bg-amber-50', text: 'text-amber-600' },
  preparing: { label: 'Preparing', color: 'blue', icon: Timer1, bg: 'bg-blue-50', text: 'text-blue-600' },
  delivering: { label: 'Delivering', color: 'purple', icon: Truck, bg: 'bg-purple-50', text: 'text-purple-600' },
  completed: { label: 'Completed', color: 'green', icon: TickCircle, bg: 'bg-green-50', text: 'text-green-600' }
}
