import NetworkTracker from '@/components/NetworkTracker';
import { OrderProvider } from '@/context/OrderContext';

export default function Layout({ children }) {
  return (
    <OrderProvider>
      <NetworkTracker />
      {children}
    </OrderProvider>
  );
}
