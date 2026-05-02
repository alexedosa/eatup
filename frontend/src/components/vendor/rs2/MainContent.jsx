import MetricsRow from './overview/MetricsRow'
import RevenueChart from './overview/RevenueChart'
import RecentOrders from './overview/RecentOrders'
import PopularItems from './overview/PopularItems'
import MenuPage from './menu/MenuPage'
import OrdersPage from './orders/OrdersPage'
import PaymentsPage from './payments/PaymentsPage'
import ProfilePage from './profile/ProfilePage'
import SettingsPage from './settings/SettingsPage'
import AnalyticsPage from './analytics/AnalyticsPage'

export default function MainContent({ activeView, onViewChange, searchQuery, isLoading }) {
  
  // Overview Dashboard (default view)
  if (activeView === 'overview') {
    return (
      <div className="flex flex-col gap-6">
        {/* Dashboard Header with Date Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-stone-800 dark:text-white">Overview</h1>
            <p className="text-sm text-stone-500 dark:text-stone-400">Welcome back! Here's what's happening today.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-stone-200/60 dark:border-white/10 p-1 rounded-xl shadow-sm self-start md:self-auto">
            {['Today', '7 Days', '30 Days'].map((period) => (
              <button 
                key={period}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${period === 'Today' ? 'bg-white dark:bg-white/10 text-amber-600 shadow-sm' : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-white/5'}`}
              >
                {period}
              </button>
            ))}
            <button className="px-3 py-1.5 text-stone-400 hover:text-stone-600 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>
              </svg>
            </button>
          </div>
        </div>

        <MetricsRow onMetricClick={(id) => {}} isLoading={isLoading} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <RecentOrders onOrderClick={(id) => {}} isLoading={isLoading} />
        </div>
        
        <PopularItems onItemClick={(item) => {}} />
      </div>
    )
  }
  
  // Orders View
  if (activeView === 'orders') {
    return <OrdersPage searchQuery={searchQuery} />
  }
  
  // Menu View
  if (activeView === 'menu') {
    return <MenuPage searchQuery={searchQuery} />
  }
  
  // Analytics View
  if (activeView === 'analytics') {
    return <AnalyticsPage />
  }
  
  // Payments View
  if (activeView === 'payments') {
    return <PaymentsPage />
  }
  
  // Profile View
  if (activeView === 'profile') {
    return <ProfilePage />
  }
  
  // Settings View
  if (activeView === 'settings') {
    return <SettingsPage />
  }
  
  // Fallback
  return (
    <div className="bg-white/80 dark:bg-[#242628] backdrop-blur-xl rounded-2xl p-6 border border-amber-200/40 dark:border-white/10">
      <p className="text-stone-500 dark:text-stone-400">Select a view from the sidebar</p>
    </div>
  )
}
