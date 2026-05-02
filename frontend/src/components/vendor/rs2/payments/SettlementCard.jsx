// src/components/vendor/rs2/payments/SettlementCard.jsx
import { motion } from 'framer-motion'
import { WalletMoney, Bank, Information } from 'iconsax-reactjs'

export default function SettlementCard({ settlementInfo, formatNaira }) {
  const getDaysUntil = (dateString) => {
    const today = new Date()
    const payoutDate = new Date(dateString)
    const diffTime = payoutDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays < 0) return 'Overdue'
    if (diffDays === 0) return 'Tomorrow'
    return `${diffDays} days remaining`
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/5 dark:to-orange-500/5 rounded-3xl border border-amber-100 dark:border-amber-500/20 p-6 shadow-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <WalletMoney size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-white">Next Settlement</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
                Cycle: {settlementInfo.settlementCycle}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-white/5 border border-amber-100 dark:border-white/10">
          <Information size="16" className="text-amber-500" />
          <span className="text-xs font-bold text-stone-600 dark:text-stone-300">Automatic payouts enabled</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5">Next Payout Date</p>
          <p className="text-sm font-black text-stone-900 dark:text-white">
            {new Date(settlementInfo.nextPayoutDate).toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-[10px] font-bold text-amber-500 mt-1 uppercase tracking-wider">
            {getDaysUntil(settlementInfo.nextPayoutDate)}
          </p>
        </div>
        
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5">Estimated Amount</p>
          <p className="text-2xl font-black text-amber-500">
            {formatNaira(settlementInfo.nextPayoutAmount)}
          </p>
        </div>
        
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5">Pending Balance</p>
          <p className="text-sm font-black text-stone-900 dark:text-white">
            {formatNaira(settlementInfo.pendingSettlement)}
          </p>
        </div>
        
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5">Last Payout</p>
          <p className="text-sm font-black text-stone-900 dark:text-white">
            {formatNaira(settlementInfo.lastPayoutAmount)}
          </p>
          <p className="text-[10px] font-bold text-stone-400 dark:text-stone-500 mt-1 uppercase tracking-wider">
            {new Date(settlementInfo.lastPayoutDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-amber-100/50 dark:border-white/5">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-stone-400">
            <Bank size="14" variant="Bold" className="text-stone-400" />
            <span className="font-bold">{settlementInfo.bankAccount.bankName}</span>
          </div>
          <span className="text-stone-300 dark:text-stone-700 font-bold">•</span>
          <span className="font-bold text-stone-500 dark:text-stone-400">{settlementInfo.bankAccount.accountName}</span>
          <span className="text-stone-300 dark:text-stone-700 font-bold">•</span>
          <span className="font-mono font-bold text-stone-500 dark:text-stone-400 tracking-wider">****{settlementInfo.bankAccount.accountNumber.slice(-4)}</span>
        </div>
      </div>
    </motion.div>
  )
}
