import NetworkTracker from '@/components/NetworkTracker';
import MockViewBadge from '@/components/MockViewBadge';
import { OrderProvider } from '@/context/OrderContext';

export default function Layout({ children }) {
  return (
    <OrderProvider>
      <NetworkTracker />
      <MockViewBadge />
      {children}
    </OrderProvider>
  );
}
