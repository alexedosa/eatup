import { motion, AnimatePresence } from 'framer-motion'
import OrderCard from './OrderCard'
import { Timer1, Truck } from 'iconsax-reactjs'

export default function InProgressPanel({ preparingOrders, deliveringOrders, onMarkReady, onComplete }) {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Preparing Section */}
      <div className="bg-white/40 dark:bg-[#242628]/40 backdrop-blur-md rounded-2xl md:rounded-[2.5rem] border border-stone-200/60 dark:border-white/10 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md">
        <div className="p-5 md:p-6 border-b border-stone-100 dark:border-white/5 bg-white/30 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-white/5 border border-stone-100 dark:border-white/10 flex items-center justify-center text-emerald-500 shadow-sm">
              <Timer1 size="20" variant="Bold" />
            </div>
            <div>
              <h3 className="font-bold text-stone-800 dark:text-white text-base md:text-lg tracking-tight">Preparing</h3>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-[0.15em]">{preparingOrders.length} currently cooking</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 md:p-6 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {preparingOrders.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-stone-300 text-xs font-bold uppercase tracking-widest">Kitchen is clear</p>
              </div>
            ) : (
              preparingOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  type="preparing"
                  onMarkReady={onMarkReady}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Delivering Section */}
      <div className="bg-white/40 dark:bg-[#242628]/40 backdrop-blur-md rounded-2xl md:rounded-[2.5rem] border border-stone-200/60 dark:border-white/10 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md">
        <div className="p-5 md:p-6 border-b border-stone-100 dark:border-white/5 bg-white/30 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-white/5 border border-stone-100 dark:border-white/10 flex items-center justify-center text-indigo-500 shadow-sm">
              <Truck size="20" variant="Bold" />
            </div>
            <div>
              <h3 className="font-bold text-stone-800 dark:text-white text-base md:text-lg tracking-tight">Delivering</h3>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-[0.15em]">{deliveringOrders.length} out for delivery</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 md:p-6 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {deliveringOrders.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-stone-400 text-xs font-medium italic">No active deliveries</p>
              </div>
            ) : (
              deliveringOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  type="delivering"
                  onComplete={onComplete}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
