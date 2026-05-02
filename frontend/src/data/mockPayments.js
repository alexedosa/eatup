// src/data/mockPayments.js

export const PAYMENT_STATS = {
  today: {
    amount: 84500,
    change: 12,
    changeType: 'up',
    orderCount: 24,
    label: 'Today\'s Earnings'
  },
  week: {
    amount: 1335000,
    change: 6.2,
    changeType: 'up',
    orderCount: 187,
    label: 'This Week'
  },
  month: {
    amount: 5120000,
    change: 8.5,
    changeType: 'up',
    orderCount: 734,
    label: 'This Month'
  },
  pending: {
    amount: 12400,
    change: -5,
    changeType: 'down',
    orderCount: 3,
    label: 'Pending Settlements'
  }
}

export const RECENT_TRANSACTIONS = [
  {
    id: 'TRX0423',
    orderId: 'ORD0423',
    amount: 4800,
    customer: 'Adaeze Okafor',
    customerEmail: 'adaeze.o@email.com',
    paymentMethod: 'card',
    paymentMethodDetails: 'VISA **** 4242',
    status: 'completed',
    date: '2025-04-27T15:45:00',
    items: [
      { name: 'Jollof Rice Special', quantity: 2, price: 2400 }
    ],
    fees: {
      platform: 144,
      delivery: 0,
      tax: 0
    },
    settlementStatus: 'settled'
  },
  {
    id: 'TRX0422',
    orderId: 'ORD0422',
    amount: 2200,
    customer: 'Emeka Nwosu',
    customerEmail: 'emeka.n@email.com',
    paymentMethod: 'transfer',
    paymentMethodDetails: 'Bank Transfer',
    status: 'completed',
    date: '2025-04-27T14:30:00',
    items: [
      { name: 'Garlic Bread', quantity: 2, price: 1100 }
    ],
    fees: {
      platform: 66,
      delivery: 0,
      tax: 0
    },
    settlementStatus: 'settled'
  },
  {
    id: 'TRX0421',
    orderId: 'ORD0421',
    amount: 6500,
    customer: 'Fatima Bello',
    customerEmail: 'fatima.b@email.com',
    paymentMethod: 'card',
    paymentMethodDetails: 'Mastercard **** 1234',
    status: 'completed',
    date: '2025-04-27T13:15:00',
    items: [
      { name: 'Pepper Soup', quantity: 1, price: 4500 },
      { name: 'Fried Plantain', quantity: 2, price: 1000 }
    ],
    fees: {
      platform: 195,
      delivery: 0,
      tax: 0
    },
    settlementStatus: 'pending'
  },
  {
    id: 'TRX0420',
    orderId: 'ORD0420',
    amount: 7000,
    customer: 'Tunde Adeyemi',
    customerEmail: 'tunde.a@email.com',
    paymentMethod: 'card',
    paymentMethodDetails: 'VISA **** 9876',
    status: 'completed',
    date: '2025-04-27T12:00:00',
    items: [
      { name: 'Suya Platter', quantity: 2, price: 3500 }
    ],
    fees: {
      platform: 210,
      delivery: 0,
      tax: 0
    },
    settlementStatus: 'pending'
  },
  {
    id: 'TRX0419',
    orderId: 'ORD0419',
    amount: 2000,
    customer: 'Ngozi Eze',
    customerEmail: 'ngozi.e@email.com',
    paymentMethod: 'wallet',
    paymentMethodDetails: 'EatUp Wallet',
    status: 'completed',
    date: '2025-04-26T19:30:00',
    items: [
      { name: 'Jollof Rice Special', quantity: 1, price: 2000 }
    ],
    fees: {
      platform: 60,
      delivery: 0,
      tax: 0
    },
    settlementStatus: 'settled'
  },
  {
    id: 'TRX0418',
    orderId: 'ORD0418',
    amount: 3500,
    customer: 'Chidi Okonkwo',
    customerEmail: 'chidi.o@email.com',
    paymentMethod: 'card',
    paymentMethodDetails: 'VISA **** 5555',
    status: 'refunded',
    date: '2025-04-26T18:15:00',
    items: [
      { name: 'Pasta Alfredo', quantity: 1, price: 3500 }
    ],
    fees: {
      platform: 105,
      delivery: 0,
      tax: 0
    },
    refundReason: 'Customer cancelled order',
    settlementStatus: 'refunded'
  },
  {
    id: 'TRX0417',
    orderId: 'ORD0417',
    amount: 4500,
    customer: 'Amara Obi',
    customerEmail: 'amara.o@email.com',
    paymentMethod: 'transfer',
    paymentMethodDetails: 'Bank Transfer',
    status: 'completed',
    date: '2025-04-26T17:00:00',
    items: [
      { name: 'Pepper Soup', quantity: 1, price: 4500 }
    ],
    fees: {
      platform: 135,
      delivery: 0,
      tax: 0
    },
    settlementStatus: 'settled'
  },
  {
    id: 'TRX0416',
    orderId: 'ORD0416',
    amount: 8200,
    customer: 'Yusuf Ibrahim',
    customerEmail: 'yusuf.i@email.com',
    paymentMethod: 'card',
    paymentMethodDetails: 'Mastercard **** 3333',
    status: 'completed',
    date: '2025-04-26T15:45:00',
    items: [
      { name: 'Jollof Rice Special', quantity: 1, price: 2000 },
      { name: 'Suya Platter', quantity: 1, price: 3500 },
      { name: 'Chapman Drink', quantity: 2, price: 1200 }
    ],
    fees: {
      platform: 246,
      delivery: 0,
      tax: 0
    },
    settlementStatus: 'pending'
  },
  {
    id: 'TRX0415',
    orderId: 'ORD0415',
    amount: 3100,
    customer: 'Ifeanyi Okeke',
    customerEmail: 'ifeanyi.o@email.com',
    paymentMethod: 'wallet',
    paymentMethodDetails: 'EatUp Wallet',
    status: 'failed',
    date: '2025-04-26T14:20:00',
    items: [
      { name: 'White Pasta Alfredo', quantity: 1, price: 3100 }
    ],
    fees: {
      platform: 93,
      delivery: 0,
      tax: 0
    },
    failureReason: 'Insufficient funds',
    settlementStatus: 'failed'
  }
]

export const SETTLEMENT_INFO = {
  nextPayoutDate: '2025-05-01',
  nextPayoutAmount: 847200,
  pendingSettlement: 12400,
  lastPayoutDate: '2025-04-25',
  lastPayoutAmount: 765000,
  settlementCycle: 'Weekly (Every Thursday)',
  bankAccount: {
    bankName: 'First Bank of Nigeria',
    accountName: 'Flavor Haven Kitchen',
    accountNumber: '1234567890'
  }
}

// Removed emojis, will use Iconsax in components
export const PAYMENT_METHODS = {
  card: { label: 'Card', method: 'card' },
  transfer: { label: 'Transfer', method: 'transfer' },
  wallet: { label: 'Wallet', method: 'wallet' },
  cash: { label: 'Cash', method: 'cash' }
}

export const formatNaira = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-NG', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date)
}

export const getStatusColor = (status) => {
  const colors = {
    completed: 'text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400',
    pending: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400',
    refunded: 'text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400',
    failed: 'text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400',
    settled: 'text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400'
  }
  return colors[status] || 'text-stone-600 bg-stone-50 dark:bg-white/5 dark:text-stone-400'
}
