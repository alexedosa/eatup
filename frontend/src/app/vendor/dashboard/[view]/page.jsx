import DashboardWrapper from '@/components/vendor/layout/DashboardWrapper'

export default async function DynamicVendorPage({ params }) {
  const { view } = await params
  // Map URL segments to internal view IDs if they differ
  const viewMap = {
    'order': 'orders',
    'menu': 'menu',
    'analytics': 'analytics',
    'payments': 'payments',
    'profile': 'profile',
    'settings': 'settings'
  }
  
  const activeView = viewMap[view] || view
  
  return <DashboardWrapper initialView={activeView} />
}

export async function generateStaticParams() {
  return [
    { view: 'order' },
    { view: 'menu' },
    { view: 'analytics' },
    { view: 'payments' },
    { view: 'profile' },
    { view: 'settings' }
  ]
}
