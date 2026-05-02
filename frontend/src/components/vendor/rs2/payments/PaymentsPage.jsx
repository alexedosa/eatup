// src/components/vendor/rs2/payments/PaymentsPage.jsx
'use client'

import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { ExportSquare, Receipt2, InfoCircle } from 'iconsax-reactjs'
import { usePaymentsManagement } from '@/hooks/usePaymentsManagement'
import PaymentStatsCards from './PaymentStatsCards'
import SettlementCard from './SettlementCard'
import PaymentFilters from './PaymentFilters'
import TransactionRow from './TransactionRow'
import TransactionDetailsModal from './TransactionDetailsModal'

export default function PaymentsPage() {
  const {
    stats,
    settlementInfo,
    transactions,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    paymentMethodFilter,
    setPaymentMethodFilter,
    selectedTransaction,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    isExporting,
    viewTransactionDetails,
    exportToCSV,
    clearFilters,
    formatNaira
  } = usePaymentsManagement()
  
  return (
    <div className="w-full space-y-8 max-w-7xl mx-auto pb-10">
      <Toaster position="top-right" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-black text-stone-900 dark:text-white tracking-tight">Financial Hub</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1 font-medium">Track your earnings and manage business settlements</p>
        </div>
        
        <button
          onClick={exportToCSV}
          disabled={isExporting}
          className="px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xl shadow-stone-200 dark:shadow-none hover:bg-black dark:hover:bg-stone-100 transition-all duration-200 flex items-center gap-2"
        >
          {isExporting ? (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="30 30"/>
            </svg>
          ) : (
            <ExportSquare size="20" variant="Bold" />
          )}
          {isExporting ? 'Exporting...' : 'Export History'}
        </button>
      </motion.div>
      
      {/* Settlement Card - Priority View */}
      <SettlementCard settlementInfo={settlementInfo} formatNaira={formatNaira} />

      {/* Stats Overview */}
      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-2 flex items-center gap-2">
          <Receipt2 size="14" variant="Bold" /> Performance Summary
        </p>
        <PaymentStatsCards stats={stats} formatNaira={formatNaira} />
      </div>
      
      {/* Transactions Section */}
      <div className="bg-white dark:bg-[#1a1c1e] rounded-[2.5rem] border border-stone-100 dark:border-white/10 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-stone-100 dark:border-white/5 bg-gradient-to-r from-amber-50/30 dark:from-amber-500/5 to-transparent flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Transaction History</h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-1">Detailed log of all incoming and outgoing payments</p>
          </div>
          <div className="hidden md:flex p-2 rounded-xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 text-stone-400">
            <InfoCircle size="20" />
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <PaymentFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            paymentMethodFilter={paymentMethodFilter}
            setPaymentMethodFilter={setPaymentMethodFilter}
            clearFilters={clearFilters}
            totalCount={transactions.length}
          />
        </div>
        
        {/* Transactions Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 dark:bg-white/5 border-y border-stone-100 dark:border-white/5">
                <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">Trx ID / Order</th>
                <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">Customer</th>
                <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">Method</th>
                <th className="py-4 px-4 text-right text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">Amount</th>
                <th className="py-4 px-4 text-center text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">Status</th>
                <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">Timestamp</th>
                <th className="py-4 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-20">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-3xl bg-stone-50 dark:bg-white/5 flex items-center justify-center text-stone-200 dark:text-stone-800 mb-4">
                        <Receipt2 size="32" variant="Bulk" />
                      </div>
                      <p className="font-bold text-stone-500 dark:text-stone-400">No transactions match your search</p>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mt-1 uppercase tracking-widest font-bold">Try adjusting your filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    onViewDetails={viewTransactionDetails}
                    formatNaira={formatNaira}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="p-6 bg-stone-50/50 dark:bg-white/5 border-t border-stone-100 dark:border-white/5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 hover:text-amber-600 transition-all flex items-center gap-2">
              View Analytics →
            </button>
          </div>
        </div>
      </div>
      
      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        transaction={selectedTransaction}
        formatNaira={formatNaira}
      />
    </div>
  )
}
