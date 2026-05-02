// src/components/vendor/rs2/payments/TransactionDetailsModal.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Bank, Wallet, MoneySend, CloseCircle, Receipt2, User, Timer1, InfoCircle, Bag2 } from 'iconsax-reactjs'
import { formatDate } from '@/data/mockPayments'
import Image from 'next/image'

export default function TransactionDetailsModal({ isOpen, onClose, transaction, formatNaira }) {
  if (!transaction) return null
  
  const getPaymentIcon = (method) => {
    switch (method) {
      case 'card': return <Card size="20" variant="Bold" className="text-blue-500" />
      case 'transfer': return <Bank size="20" variant="Bold" className="text-amber-500" />
      case 'wallet': return <Wallet size="20" variant="Bold" className="text-emerald-500" />
      default: return <MoneySend size="20" variant="Bold" className="text-stone-400" />
    }
  }

  // Smart food image mapping
  const getFoodImage = (name) => {
    if (name.includes('Jollof')) return 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=100&h=100&fit=crop'
    if (name.includes('Suya')) return 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop'
    if (name.includes('Pasta')) return 'https://images.unsplash.com/photo-1645112481338-3560e7740212?w=100&h=100&fit=crop'
    if (name.includes('Soup')) return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=100&h=100&fit=crop'
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop'
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-stone-900/40 dark:bg-black/60 backdrop-blur-sm" 
            onClick={onClose} 
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[501] w-full max-w-lg bg-white dark:bg-[#1a1c1e] rounded-[2.5rem] shadow-2xl border border-stone-100 dark:border-white/10 overflow-hidden"
          >
            <div className="p-6 md:p-8 border-b border-stone-100 dark:border-white/5 bg-gradient-to-r from-amber-50/50 dark:from-amber-500/5 to-transparent flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-black text-stone-900 dark:text-white tracking-tight">Transaction Details</h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mt-1">{transaction.id}</p>
              </div>
              <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-white transition-colors">
                <CloseCircle size="24" variant="Bold" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Main Info */}
              <div className="flex flex-col items-center text-center py-4 bg-stone-50 dark:bg-white/5 rounded-3xl border border-stone-100 dark:border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">Total Payout Amount</p>
                <p className="text-4xl font-black text-amber-500">{formatNaira(transaction.amount)}</p>
                <div className={`mt-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${transaction.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                   {transaction.status}
                </div>
              </div>
              
              {/* Detailed Specs */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1 px-1">Customer</label>
                    <div className="flex items-center gap-2 text-stone-800 dark:text-white">
                      <User size="16" variant="Bold" className="text-stone-400" />
                      <span className="text-sm font-bold">{transaction.customer}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1 px-1">Payment Method</label>
                    <div className="flex items-center gap-2 text-stone-800 dark:text-white">
                      {getPaymentIcon(transaction.paymentMethod)}
                      <span className="text-sm font-bold uppercase tracking-tight">{transaction.paymentMethodDetails || transaction.paymentMethod}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 text-right">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1 px-1">Date & Time</label>
                    <div className="flex items-center justify-end gap-2 text-stone-800 dark:text-white">
                      <Timer1 size="16" variant="Bold" className="text-stone-400" />
                      <span className="text-sm font-bold">{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1 px-1">Settlement</label>
                    <div className="flex items-center justify-end gap-2">
                      <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg ${transaction.settlementStatus === 'settled' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600'}`}>
                        {transaction.settlementStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Content */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4 px-1 flex items-center gap-2">
                  <Bag2 size="14" variant="Bold" /> Order Summary
                </p>
                <div className="space-y-3">
                  {transaction.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-stone-50 dark:bg-white/5 rounded-2xl border border-stone-100 dark:border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20">
                          <Image src={getFoodImage(item.name)} alt={item.name} width={40} height={40} className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-stone-800 dark:text-white">{item.quantity}x {item.name}</p>
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{formatNaira(item.price)} each</p>
                        </div>
                      </div>
                      <p className="text-sm font-black text-stone-900 dark:text-white">{formatNaira(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Breakdown */}
              <div className="p-5 bg-stone-900 dark:bg-white rounded-3xl text-white dark:text-stone-900 shadow-xl">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10 dark:border-stone-200/50">
                  <span className="text-sm font-bold opacity-80 flex items-center gap-2">
                    <Receipt2 size="16" /> Subtotal
                  </span>
                  <span className="text-sm font-black">{formatNaira(transaction.amount)}</span>
                </div>
                <div className="space-y-3 opacity-80">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span>Platform Fee (3%)</span>
                    <span className="text-red-400 dark:text-red-600">-{formatNaira(transaction.fees?.platform || 0)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span>VAT & Taxes</span>
                    <span>{formatNaira(transaction.fees?.tax || 0)}</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/20 dark:border-stone-200 flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Net Payout</span>
                  <span className="text-2xl font-black">{formatNaira(transaction.amount - (transaction.fees?.platform || 0))}</span>
                </div>
              </div>
              
              {/* Errors/Refunds */}
              {(transaction.refundReason || transaction.failureReason) && (
                <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-2xl border border-red-100 dark:border-red-500/20 flex gap-3">
                  <InfoCircle size="20" variant="Bold" className="text-red-500 shrink-0" />
                  <div>
                    <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-1">
                      {transaction.status === 'refunded' ? 'Refund Processed' : 'Transaction Failed'}
                    </p>
                    <p className="text-sm font-bold text-red-700 dark:text-red-400">{transaction.refundReason || transaction.failureReason}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-stone-50 dark:bg-white/5 border-t border-stone-100 dark:border-white/5">
              <button
                onClick={onClose}
                className="w-full py-4 rounded-2xl font-bold bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-700 dark:text-white hover:bg-stone-50 transition-all"
              >
                Done
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
