import NetworkTracker from '@/components/NetworkTracker';
import VendorDashboardGate from '@/components/vendor/shared/VendorDashboardGate';
import { OrderProvider } from '@/context/OrderContext';

export default function Layout({ children }) {
  return (
    <OrderProvider>
      <NetworkTracker />
      <VendorDashboardGate>{children}</VendorDashboardGate>
    </OrderProvider>
  );
}
