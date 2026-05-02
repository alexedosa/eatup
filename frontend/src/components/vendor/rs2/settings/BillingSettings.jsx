// src/components/vendor/rs2/settings/BillingSettings.jsx
import { WalletMoney, Card, DocumentText, TickCircle, LampOn } from 'iconsax-reactjs'
import Image from 'next/image'

export default function BillingSettings({ settings }) {
  const { billing } = settings
  
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <WalletMoney size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Subscription & Billing</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Manage your plan and invoices</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Plan */}
          <div className="p-8 rounded-[2.5rem] bg-stone-900 text-white shadow-2xl shadow-stone-900/20 relative overflow-hidden group">
            <div className="absolute inset-0 z-0">
               <Image 
                 src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000" 
                 alt="Premium Background" 
                 fill
                 className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-900/90 to-amber-900/50" />
            </div>
            
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-[9px] font-black uppercase tracking-widest text-white mb-4 inline-block">Current Plan</span>
              <h4 className="text-3xl font-display font-black tracking-tight mb-2">{billing.planDetails.name}</h4>
              <p className="text-stone-400 text-sm mb-8 font-medium">Next billing on <span className="text-white font-black">{billing.nextBillingDate}</span></p>
              
              <div className="space-y-3 mb-8">
                {billing.planDetails.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <TickCircle size="16" className="text-amber-500" variant="Bold" />
                    <span className="text-xs font-bold text-stone-300 uppercase tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full py-4 rounded-2xl bg-white text-stone-900 text-xs font-black uppercase tracking-[0.2em] hover:bg-amber-400 transition-all">Upgrade Plan</button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-[2rem] bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white dark:bg-stone-900 shadow-sm text-amber-500">
                    <Card size="20" variant="Bold" />
                  </div>
                  <span className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-tight">Payment Method</span>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">Edit</button>
              </div>
              
              <div className="flex items-center gap-4 bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-100 dark:border-white/10 shadow-sm">
                <div className="w-10 h-7 rounded-md bg-stone-800 flex items-center justify-center">
                  <span className="text-[8px] font-black text-white italic">VISA</span>
                </div>
                <div>
                  <p className="text-xs font-black text-stone-900 dark:text-white tracking-tight">•••• •••• •••• {billing.paymentMethod.last4}</p>
                  <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Expires {billing.paymentMethod.expiryDate}</p>
                </div>
              </div>
            </div>

            {/* Invoices */}
            <div className="p-6 rounded-[2rem] bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white dark:bg-stone-900 shadow-sm text-amber-500">
                  <DocumentText size="20" variant="Bold" />
                </div>
                <span className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-tight">Recent Invoices</span>
              </div>
              
              <div className="space-y-2">
                {billing.invoices.map(invoice => (
                  <div key={invoice.id} className="flex items-center justify-between py-2 border-b border-stone-100 dark:border-white/5 last:border-0">
                    <div>
                      <p className="text-xs font-black text-stone-800 dark:text-white uppercase tracking-tight">{invoice.id}</p>
                      <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">{invoice.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-stone-800 dark:text-white uppercase tracking-tight">₦{invoice.amount.toLocaleString()}</p>
                      <button className="text-[9px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-500/5 rounded-2xl flex items-start gap-3 border border-amber-100 dark:border-amber-500/10">
        <LampOn size="18" className="text-amber-500 shrink-0" variant="Bulk" />
        <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400/80 leading-relaxed uppercase tracking-widest">
          Pricing includes all taxes and transaction fees. You can cancel your premium subscription at any time without penalty.
        </p>
      </div>
    </div>
  )
}
