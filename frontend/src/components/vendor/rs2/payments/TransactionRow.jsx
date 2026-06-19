// src/components/vendor/rs2/payments/TransactionRow.jsx
import { motion } from 'framer-motion'
import { Card, Bank, Wallet, MoneySend, ArrowRight2 } from 'iconsax-reactjs'
import { getStatusColor, formatDate } from '@/lib/formatters'

export default function TransactionRow({ transaction, onViewDetails, formatNaira }) {
  const statusColor = getStatusColor(transaction.status)
  
  const getPaymentIcon = (method) => {
    switch (method) {
      case 'card': return <Card size="18" variant="Bold" className="text-blue-500" />
      case 'transfer': return <Bank size="18" variant="Bold" className="text-amber-500" />
      case 'wallet': return <Wallet size="18" variant="Bold" className="text-emerald-500" />
      default: return <MoneySend size="18" variant="Bold" className="text-stone-400" />
    }
  }
  
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ backgroundColor: 'rgba(245, 158, 11, 0.05)' }}
      className="border-b border-stone-50 dark:border-white/5 transition-colors cursor-pointer group"
      onClick={() => onViewDetails(transaction)}
    >
      <td className="py-4 px-4">
        <div>
          <p className="font-mono text-[11px] font-bold text-stone-900 dark:text-white uppercase tracking-wider">{transaction.id}</p>
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">{transaction.orderId}</p>
        </div>
      </td>
      
      <td className="py-4 px-4">
        <div>
          <p className="text-sm font-black text-stone-800 dark:text-white">{transaction.customer}</p>
          <p className="text-xs font-medium text-stone-400 dark:text-stone-500">{transaction.customerEmail}</p>
        </div>
      </td>
      
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-stone-100 dark:bg-white/5">
            {getPaymentIcon(transaction.paymentMethod)}
          </div>
          <span className="text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-tight">
            {transaction.paymentMethodDetails || transaction.paymentMethod}
          </span>
        </div>
      </td>
      
      <td className="py-4 px-4 text-right">
        <p className="font-black text-stone-900 dark:text-white">{formatNaira(transaction.amount)}</p>
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">
          Fee: {formatNaira(transaction.fees?.platform || 0)}
        </p>
      </td>
      
      <td className="py-4 px-4 text-center">
        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${statusColor}`}>
          {transaction.status}
        </span>
      </td>
      
      <td className="py-4 px-4 text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-tight">
        {formatDate(transaction.date)}
      </td>
      
      <td className="py-4 px-4 text-right">
        <div className="p-2 rounded-xl text-stone-300 group-hover:text-amber-500 group-hover:bg-amber-50 dark:group-hover:bg-amber-500/10 transition-all">
          <ArrowRight2 size="18" variant="Bold" />
        </div>
      </td>
    </motion.tr>
  )
}
