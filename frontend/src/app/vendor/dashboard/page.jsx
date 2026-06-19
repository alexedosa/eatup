import DashboardWrapper from '@/components/vendor/layout/DashboardWrapper'
import AuthGuard from '@/components/auth/AuthGuard'

export default function VendorDashboardPage() {
  return (
    <AuthGuard requiredRole="vendor">
      <DashboardWrapper />
    </AuthGuard>
  )
}