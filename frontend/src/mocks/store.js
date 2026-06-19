import { clone } from './utils';
import { MOCK_ORDERS, MOCK_DASHBOARD_STATS } from './orders';
import { MOCK_MENU_ITEMS } from './menu';
import { MOCK_SHOP, MOCK_VENDOR_ME } from './shops';
import { MOCK_NOTIFICATIONS } from './notifications';
import { MOCK_ONBOARDING } from './auth';

/** Mutable in-memory store for mock CRUD operations */
export const mockStore = {
  orders: clone(MOCK_ORDERS),
  menuItems: clone(MOCK_MENU_ITEMS),
  shop: clone(MOCK_SHOP),
  vendorMe: clone(MOCK_VENDOR_ME),
  notifications: clone(MOCK_NOTIFICATIONS),
  onboarding: clone(MOCK_ONBOARDING),
  dashboardStats: clone(MOCK_DASHBOARD_STATS),
};

export const resetMockStore = () => {
  mockStore.orders = clone(MOCK_ORDERS);
  mockStore.menuItems = clone(MOCK_MENU_ITEMS);
  mockStore.shop = clone(MOCK_SHOP);
  mockStore.vendorMe = clone(MOCK_VENDOR_ME);
  mockStore.notifications = clone(MOCK_NOTIFICATIONS);
  mockStore.onboarding = clone(MOCK_ONBOARDING);
  mockStore.dashboardStats = clone(MOCK_DASHBOARD_STATS);
};
