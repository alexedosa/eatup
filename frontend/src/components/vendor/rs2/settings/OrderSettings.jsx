// src/components/vendor/rs2/settings/OrderSettings.jsx
import { Receipt1, User, DirectboxReceive, LampOn } from 'iconsax-reactjs'

export default function OrderSettings({ settings, onUpdate }) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <Receipt1 size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Order Management</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Configure how you handle incoming orders</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Auto Accept Orders */}
          <label className="flex items-center justify-between p-5 rounded-[2rem] bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 cursor-pointer hover:border-amber-200/50 transition-all duration-300">
            <div>
              <span className="text-sm font-black text-stone-800 dark:text-white tracking-tight">Auto-Accept Orders</span>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Accept new orders without manual confirmation</p>
            </div>
            <button
              onClick={() => onUpdate('autoAcceptOrders', !settings.orders.autoAcceptOrders)}
              className={`
                relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner
                ${settings.orders.autoAcceptOrders ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}
              `}
            >
              <span className={`
                absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md
                ${settings.orders.autoAcceptOrders ? 'left-5.5' : 'left-0.5'}
              `} />
            </button>
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Max Pending Orders */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Max Pending Orders</label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={settings.orders.maxPendingOrders}
                  onChange={(e) => onUpdate('maxPendingOrders', parseInt(e.target.value))}
                  className="w-32 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-black"
                />
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">limit</span>
              </div>
            </div>
            
            {/* Order Timeout */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Auto-Cancel Timeout</label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={settings.orders.orderTimeoutMinutes}
                  onChange={(e) => onUpdate('orderTimeoutMinutes', parseInt(e.target.value))}
                  className="w-32 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-black"
                />
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Customer Options */}
      <div className="pt-8 border-t border-stone-100 dark:border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xl">
            <User size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Customer Experience</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Control customer interactions with orders</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between p-5 rounded-[2rem] bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 cursor-pointer hover:border-amber-200/50 transition-all duration-300">
            <div>
              <span className="text-sm font-black text-stone-800 dark:text-white tracking-tight">Allow Order Cancellation</span>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Let customers cancel orders before preparation</p>
            </div>
            <button
              onClick={() => onUpdate('allowOrderCancellation', !settings.orders.allowOrderCancellation)}
              className={`
                relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner
                ${settings.orders.allowOrderCancellation ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}
              `}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md ${settings.orders.allowOrderCancellation ? 'left-5.5' : 'left-0.5'}`} />
            </button>
          </label>
          
          {settings.orders.allowOrderCancellation && (
            <div className="p-5 rounded-[2rem] bg-amber-50/50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 px-1">Cancellation Window</label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={settings.orders.cancellationWindow}
                    onChange={(e) => onUpdate('cancellationWindow', parseInt(e.target.value))}
                    className="w-32 px-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-500/20 focus:outline-none focus:border-amber-500 transition-all text-stone-800 dark:text-white font-black"
                  />
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">minutes after order</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Kitchen Display */}
      <div className="pt-8 border-t border-stone-100 dark:border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-orange-500 text-white shadow-xl shadow-orange-500/20">
            <DirectboxReceive size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Kitchen Operations</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Back-of-house workflow settings</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center justify-between p-5 rounded-[2rem] bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 cursor-pointer hover:border-amber-200/50 transition-all duration-300">
            <span className="text-sm font-black text-stone-800 dark:text-white tracking-tight">Auto-Print Orders</span>
            <button
              onClick={() => onUpdate('printOrdersAutomatically', !settings.orders.printOrdersAutomatically)}
              className={`relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner ${settings.orders.printOrdersAutomatically ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}`}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md ${settings.orders.printOrdersAutomatically ? 'left-5.5' : 'left-0.5'}`} />
            </button>
          </label>
          
          <label className="flex items-center justify-between p-5 rounded-[2rem] bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 cursor-pointer hover:border-amber-200/50 transition-all duration-300">
            <span className="text-sm font-black text-stone-800 dark:text-white tracking-tight">Show Order Timer</span>
            <button
              onClick={() => onUpdate('showOrderTimer', !settings.orders.showOrderTimer)}
              className={`relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner ${settings.orders.showOrderTimer ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}`}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md ${settings.orders.showOrderTimer ? 'left-5.5' : 'left-0.5'}`} />
            </button>
          </label>
        </div>
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-500/5 rounded-2xl flex items-start gap-3 border border-amber-100 dark:border-amber-500/10">
        <LampOn size="18" className="text-amber-500 shrink-0" variant="Bulk" />
        <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400/80 leading-relaxed uppercase tracking-widest">
          High volume mode is automatically enabled when you have more than 10 pending orders.
        </p>
      </div>
    </div>
  )
}
