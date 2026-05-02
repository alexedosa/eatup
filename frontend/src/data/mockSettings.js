// src/data/mockSettings.js

export const MOCK_SETTINGS = {
  // General Settings
  general: {
    storeLanguage: 'en',
    storeTimezone: 'Africa/Lagos',
    storeCurrency: 'NGN',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    lowStockThreshold: 10,
    autoBackup: true,
    darkMode: false,
    compactView: false
  },
  
  // Order Settings
  orders: {
    autoAcceptOrders: false,
    maxPendingOrders: 20,
    orderTimeoutMinutes: 15,
    requireCustomerConfirmation: true,
    allowOrderCancellation: true,
    cancellationWindow: 5,
    printOrdersAutomatically: true,
    showOrderTimer: true,
    enableOrderNotes: true,
    defaultPreparationTime: 20
  },
  
  // Delivery Settings
  delivery: {
    isDeliveryEnabled: true,
    isPickupEnabled: true,
    deliveryRadius: 10,
    baseDeliveryFee: 500,
    freeDeliveryThreshold: 10000,
    estimatedDeliveryTime: 30,
    peakHourSurcharge: 200,
    peakHourStart: '18:00',
    peakHourEnd: '21:00',
    enableScheduledOrders: true,
    scheduleLeadTime: 60,
    maxScheduleDays: 7
  },
  
  // Notification Settings
  notifications: {
    email: {
      newOrder: true,
      orderCancelled: true,
      orderReady: true,
      dailySummary: true,
      weeklyReport: true,
      lowStockAlert: true,
      paymentReceived: true,
      newReview: true
    },
    push: {
      newOrder: true,
      orderCancelled: true,
      orderReady: true,
      lowStockAlert: true
    },
    sound: {
      newOrder: true,
      orderCancelled: false,
      orderReady: true
    }
  },
  
  // Team Settings
  team: [
    {
      id: 'staff_001',
      name: 'Michael Adebayo',
      email: 'michael@flavorhaven.ng',
      role: 'admin',
      avatar: null,
      permissions: ['all'],
      addedAt: '2025-01-15',
      isActive: true
    },
    {
      id: 'staff_002',
      name: 'Sarah Okafor',
      email: 'sarah@flavorhaven.ng',
      role: 'manager',
      avatar: null,
      permissions: ['orders', 'menu', 'inventory'],
      addedAt: '2025-02-20',
      isActive: true
    },
    {
      id: 'staff_003',
      name: 'Chidi Eze',
      email: 'chidi@flavorhaven.ng',
      role: 'staff',
      avatar: null,
      permissions: ['orders'],
      addedAt: '2025-03-10',
      isActive: true
    }
  ],
  
  // Security Settings
  security: {
    twoFactorEnabled: false,
    sessionTimeout: 60,
    loginAlerts: true,
    ipWhitelist: [],
    allowedIPs: [],
    lastPasswordChange: '2025-03-15',
    requireStrongPassword: true
  },
  
  // Integration Settings
  integrations: {
    printServer: {
      enabled: false,
      ipAddress: '',
      port: 9100
    },
    posSystem: {
      enabled: false,
      provider: '',
      apiKey: ''
    },
    accountingSoftware: {
      enabled: false,
      provider: '',
      syncEnabled: false
    }
  },
  
  // Billing
  billing: {
    plan: 'premium',
    planDetails: {
      name: 'Premium Vendor',
      price: 25000,
      interval: 'monthly',
      features: ['Unlimited orders', 'Priority support', 'Analytics dashboard', 'API access']
    },
    subscriptionStatus: 'active',
    nextBillingDate: '2025-06-01',
    paymentMethod: {
      type: 'card',
      last4: '4242',
      expiryDate: '12/2026'
    },
    invoices: [
      { id: 'INV-001', date: '2025-05-01', amount: 25000, status: 'paid', downloadUrl: '#' },
      { id: 'INV-002', date: '2025-04-01', amount: 25000, status: 'paid', downloadUrl: '#' },
      { id: 'INV-003', date: '2025-03-01', amount: 25000, status: 'paid', downloadUrl: '#' }
    ]
  }
}

export const TIMEZONES = [
  { value: 'Africa/Lagos', label: 'West Africa Time (WAT) — Lagos' },
  { value: 'Africa/Cairo', label: 'Eastern European Time (EET) — Cairo' },
  { value: 'Africa/Johannesburg', label: 'South Africa Standard Time — Johannesburg' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT) — London' }
]

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'ar', label: 'العربية' },
  { value: 'sw', label: 'Kiswahili' }
]

export const ROLES = [
  { value: 'admin', label: 'Administrator', permissions: 'Full access to all features' },
  { value: 'manager', label: 'Manager', permissions: 'Orders, Menu, Inventory, Reports' },
  { value: 'staff', label: 'Staff', permissions: 'Orders only' },
  { value: 'viewer', label: 'Viewer', permissions: 'Read-only access' }
]

export const PERMISSIONS_LIST = [
  { id: 'orders', label: 'Manage Orders' },
  { id: 'menu', label: 'Edit Menu' },
  { id: 'inventory', label: 'Manage Inventory' },
  { id: 'reports', label: 'View Reports' },
  { id: 'team', label: 'Manage Team' },
  { id: 'settings', label: 'Change Settings' },
  { id: 'billing', label: 'View Billing' }
]
