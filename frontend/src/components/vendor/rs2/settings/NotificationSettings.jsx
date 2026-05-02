// src/components/vendor/rs2/settings/NotificationSettings.jsx
import { Sms, Mobile, VolumeHigh, LampOn } from 'iconsax-reactjs'

export default function NotificationSettings({ settings, onToggleEmail, onTogglePush, onToggleSound }) {
  const emailNotifications = [
    { key: 'newOrder', label: 'New Order', description: 'Get email when a new order arrives' },
    { key: 'orderCancelled', label: 'Order Cancelled', description: 'Get email when an order is cancelled' },
    { key: 'orderReady', label: 'Order Ready', description: 'Get email when order is ready for pickup' },
    { key: 'dailySummary', label: 'Daily Summary', description: 'Receive daily performance summary' },
    { key: 'weeklyReport', label: 'Weekly Report', description: 'Receive weekly analytics report' },
    { key: 'lowStockAlert', label: 'Low Stock Alert', description: 'Get notified when items run low' },
    { key: 'paymentReceived', label: 'Payment Received', description: 'Get email for successful payments' },
    { key: 'newReview', label: 'New Review', description: 'Get notified when customer leaves a review' }
  ]
  
  const pushNotifications = [
    { key: 'newOrder', label: 'New Order', description: 'Push notification for new orders' },
    { key: 'orderCancelled', label: 'Order Cancelled', description: 'Push for cancelled orders' },
    { key: 'orderReady', label: 'Order Ready', description: 'Push when order is ready' },
    { key: 'lowStockAlert', label: 'Low Stock Alert', description: 'Push for low inventory' }
  ]
  
  const soundNotifications = [
    { key: 'newOrder', label: 'New Order Sound', description: 'Play sound when new order arrives' },
    { key: 'orderCancelled', label: 'Cancellation Sound', description: 'Play sound for cancellations' },
    { key: 'orderReady', label: 'Ready Sound', description: 'Play sound when order is ready' }
  ]
  
  return (
    <div className="space-y-10">
      {/* Email Notifications */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <Sms size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Email Notifications</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Configure your inbox preferences</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emailNotifications.map(notif => (
            <label key={notif.key} className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 cursor-pointer hover:border-amber-200/50 transition-all duration-300">
              <div className="min-w-0 pr-4">
                <span className="text-sm font-black text-stone-800 dark:text-white tracking-tight block truncate">{notif.label}</span>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5 truncate">{notif.description}</p>
              </div>
              <button
                onClick={() => onToggleEmail(notif.key)}
                className={`
                  shrink-0 relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner
                  ${settings.notifications.email[notif.key] ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}
                `}
              >
                <span className={`
                  absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md
                  ${settings.notifications.email[notif.key] ? 'left-5.5' : 'left-0.5'}
                `} />
              </button>
            </label>
          ))}
        </div>
      </div>
      
      {/* Push Notifications */}
      <div className="pt-8 border-t border-stone-100 dark:border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xl">
            <Mobile size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Push Notifications</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Stay updated on your mobile device</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pushNotifications.map(notif => (
            <label key={notif.key} className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 cursor-pointer hover:border-amber-200/50 transition-all duration-300">
              <div>
                <span className="text-sm font-black text-stone-800 dark:text-white tracking-tight">{notif.label}</span>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">{notif.description}</p>
              </div>
              <button
                onClick={() => onTogglePush(notif.key)}
                className={`
                  relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner
                  ${settings.notifications.push[notif.key] ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}
                `}
              >
                <span className={`
                  absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md
                  ${settings.notifications.push[notif.key] ? 'left-5.5' : 'left-0.5'}
                `} />
              </button>
            </label>
          ))}
        </div>
      </div>
      
      {/* Sound Notifications */}
      <div className="pt-8 border-t border-stone-100 dark:border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-orange-500 text-white shadow-xl shadow-orange-500/20">
            <VolumeHigh size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Sound Alerts</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Audio cues for critical events</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {soundNotifications.map(notif => (
            <label key={notif.key} className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 cursor-pointer hover:border-amber-200/50 transition-all duration-300">
              <div>
                <span className="text-sm font-black text-stone-800 dark:text-white tracking-tight">{notif.label}</span>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">{notif.description}</p>
              </div>
              <button
                onClick={() => onToggleSound(notif.key)}
                className={`
                  relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner
                  ${settings.notifications.sound[notif.key] ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}
                `}
              >
                <span className={`
                  absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md
                  ${settings.notifications.sound[notif.key] ? 'left-5.5' : 'left-0.5'}
                `} />
              </button>
            </label>
          ))}
        </div>
      </div>
      
      {/* Test Notification Button */}
      <div className="pt-4 flex justify-center">
        <button
          onClick={() => alert('🔔 Test notification sent to your device')}
          className="px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-amber-50 dark:bg-amber-500/10 text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-500/20 border border-amber-100 dark:border-amber-500/20 transition-all"
        >
          Send Test Notification
        </button>
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-500/5 rounded-2xl flex items-start gap-3 border border-amber-100 dark:border-amber-500/10">
        <LampOn size="18" className="text-amber-500 shrink-0" variant="Bulk" />
        <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400/80 leading-relaxed uppercase tracking-widest">
          Notification preferences are unique to each team member. System alerts cannot be disabled.
        </p>
      </div>
    </div>
  )
}
