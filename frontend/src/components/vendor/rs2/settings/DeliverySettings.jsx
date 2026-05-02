// src/components/vendor/rs2/settings/DeliverySettings.jsx
import { Truck, Map, Timer1, LampOn } from 'iconsax-reactjs'

export default function DeliverySettings({ settings, onUpdate }) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <Truck size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Delivery Configuration</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Manage fees and service radius</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center justify-between p-5 rounded-[2rem] bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 cursor-pointer hover:border-amber-200/50 transition-all duration-300">
            <span className="text-sm font-black text-stone-800 dark:text-white tracking-tight uppercase">Enable Delivery</span>
            <button
              onClick={() => onUpdate('isDeliveryEnabled', !settings.delivery.isDeliveryEnabled)}
              className={`relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner ${settings.delivery.isDeliveryEnabled ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}`}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md ${settings.delivery.isDeliveryEnabled ? 'left-5.5' : 'left-0.5'}`} />
            </button>
          </label>
          
          <label className="flex items-center justify-between p-5 rounded-[2rem] bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 cursor-pointer hover:border-amber-200/50 transition-all duration-300">
            <span className="text-sm font-black text-stone-800 dark:text-white tracking-tight uppercase">Enable Pickup</span>
            <button
              onClick={() => onUpdate('isPickupEnabled', !settings.delivery.isPickupEnabled)}
              className={`relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner ${settings.delivery.isPickupEnabled ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}`}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md ${settings.delivery.isPickupEnabled ? 'left-5.5' : 'left-0.5'}`} />
            </button>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Service Radius</label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={settings.delivery.deliveryRadius}
                onChange={(e) => onUpdate('deliveryRadius', parseInt(e.target.value))}
                className="w-32 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-black"
              />
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">km from store</span>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Base Delivery Fee</label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={settings.delivery.baseDeliveryFee}
                onChange={(e) => onUpdate('baseDeliveryFee', parseInt(e.target.value))}
                className="w-32 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-black"
              />
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">NGN</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-stone-100 dark:border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xl">
            <Timer1 size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Lead Times</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Estimate delivery windows</p>
          </div>
        </div>
        
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Avg Delivery Time</label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={settings.delivery.estimatedDeliveryTime}
              onChange={(e) => onUpdate('estimatedDeliveryTime', parseInt(e.target.value))}
              className="w-32 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-black"
            />
            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">minutes</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-500/5 rounded-2xl flex items-start gap-3 border border-amber-100 dark:border-amber-500/10">
        <LampOn size="18" className="text-amber-500 shrink-0" variant="Bulk" />
        <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400/80 leading-relaxed uppercase tracking-widest">
          Free delivery is automatically applied to orders above ₦{settings.delivery.freeDeliveryThreshold.toLocaleString()}.
        </p>
      </div>
    </div>
  )
}
