// src/hooks/usePaymentsManagement.js
import { useState, useCallback } from 'react'
import { PAYMENT_STATS, RECENT_TRANSACTIONS, SETTLEMENT_INFO } from '@/data/mockPayments'

export function usePaymentsManagement() {
  const [transactions, setTransactions] = useState(RECENT_TRANSACTIONS)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all')
  const [dateRange, setDateRange] = useState({ start: null, end: null })
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  
  // Filter transactions
  const getFilteredTransactions = useCallback(() => {
    let filtered = [...transactions]
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(t => 
        t.id.toLowerCase().includes(query) ||
        t.customer.toLowerCase().includes(query) ||
        t.orderId.toLowerCase().includes(query) ||
        t.customerEmail.toLowerCase().includes(query)
      )
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter)
    }
    
    // Payment method filter
    if (paymentMethodFilter !== 'all') {
      filtered = filtered.filter(t => t.paymentMethod === paymentMethodFilter)
    }
    
    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(dateRange.start))
    }
    if (dateRange.end) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(dateRange.end))
    }
    
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [transactions, searchQuery, statusFilter, paymentMethodFilter, dateRange])
  
  // Calculate totals from filtered transactions
  const calculateTotals = useCallback(() => {
    const filtered = getFilteredTransactions()
    const total = filtered.reduce((sum, t) => sum + t.amount, 0)
    const completedCount = filtered.filter(t => t.status === 'completed').length
    const pendingAmount = filtered.filter(t => t.settlementStatus === 'pending')
      .reduce((sum, t) => sum + t.amount, 0)
    
    return { total, completedCount, pendingAmount }
  }, [getFilteredTransactions])
  
  // Export to CSV
  const exportToCSV = useCallback(async () => {
    setIsExporting(true)
    const filtered = getFilteredTransactions()
    
    const headers = ['Transaction ID', 'Order ID', 'Customer', 'Amount', 'Payment Method', 'Status', 'Date', 'Settlement Status']
    const rows = filtered.map(t => [
      t.id,
      t.orderId,
      t.customer,
      t.amount,
      t.paymentMethod,
      t.status,
      new Date(t.date).toLocaleString(),
      t.settlementStatus
    ])
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    
    setTimeout(() => setIsExporting(false), 500)
  }, [getFilteredTransactions])
  
  // View transaction details
  const viewTransactionDetails = useCallback((transaction) => {
    setSelectedTransaction(transaction)
    setIsDetailsModalOpen(true)
  }, [])
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setStatusFilter('all')
    setPaymentMethodFilter('all')
    setDateRange({ start: null, end: null })
  }, [])
  
  const filteredTransactions = getFilteredTransactions()
  const totals = calculateTotals()
  
  return {
    stats: PAYMENT_STATS,
    settlementInfo: SETTLEMENT_INFO,
    transactions: filteredTransactions,
    allTransactions: transactions,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    paymentMethodFilter,
    setPaymentMethodFilter,
    dateRange,
    setDateRange,
    selectedTransaction,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    isExporting,
    viewTransactionDetails,
    exportToCSV,
    clearFilters,
    totals,
    formatNaira: (amount) => new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount)
  }
}
