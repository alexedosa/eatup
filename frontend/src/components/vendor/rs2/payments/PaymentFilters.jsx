// src/components/vendor/rs2/payments/PaymentFilters.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchNormal1, FilterSearch, CloseCircle, Card, Bank, Wallet, MoneyChange } from 'iconsax-reactjs'

export default function PaymentFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  paymentMethodFilter,
  setPaymentMethodFilter,
  clearFilters,
  totalCount
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'refunded', label: 'Refunded' },
    { value: 'failed', label: 'Failed' }
  ]
  
  const methodOptions = [
    { value: 'all', label: 'All Methods', icon: <MoneyChange size="14" /> },
    { value: 'card', label: 'Card', icon: <Card size="14" /> },
    { value: 'transfer', label: 'Transfer', icon: <Bank size="14" /> },
    { value: 'wallet', label: 'Wallet', icon: <Wallet size="14" /> }
  ]
  
  const hasActiveFilters = searchQuery || statusFilter !== 'all' || paymentMethodFilter !== 'all'
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, customer, or email..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-medium"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
            <SearchNormal1 size="18" />
          </span>
        </div>
        
        {/* Filter Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`px-6 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center gap-2 transition-all duration-300 ${hasActiveFilters || isFilterOpen ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-white/10'}`}
        >
          <FilterSearch size="18" variant="Bold" />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          )}
        </button>
        
        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 transition-all"
            title="Clear all filters"
          >
            <CloseCircle size="20" variant="Bold" />
          </button>
        )}
      </div>
      
      {/* Filter Dropdown */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-[#242628] rounded-[2rem] border border-amber-100 dark:border-white/10 p-6 shadow-xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Status Filter */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4 px-1">Transaction Status</p>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setStatusFilter(opt.value)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${statusFilter === opt.value ? 'bg-amber-500 text-white' : 'bg-stone-50 dark:bg-white/5 text-stone-600 dark:text-stone-400 hover:bg-stone-100'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Payment Method Filter */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4 px-1">Payment Method</p>
                  <div className="flex flex-wrap gap-2">
                    {methodOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setPaymentMethodFilter(opt.value)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200 ${paymentMethodFilter === opt.value ? 'bg-amber-500 text-white' : 'bg-stone-50 dark:bg-white/5 text-stone-600 dark:text-stone-400 hover:bg-stone-100'}`}
                      >
                        {opt.icon}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Results count */}
      <div className="flex items-center justify-between px-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
          {totalCount} {totalCount === 1 ? 'transaction' : 'transactions'} found
        </p>
      </div>
    </div>
  )
}
