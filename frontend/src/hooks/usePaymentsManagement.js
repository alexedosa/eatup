// src/hooks/usePaymentsManagement.js
import { useState, useCallback, useEffect } from 'react'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'
import { formatNaira } from '@/lib/formatters'

export function usePaymentsManagement() {
  const [transactions, setTransactions] = useState([])
  const [stats, setStats] = useState(null)
  const [settlementInfo, setSettlementInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all')
  const [dateRange, setDateRange] = useState({ start: null, end: null })
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Fetch payments data
  useEffect(() => {
    async function fetchPaymentsData() {
      setIsLoading(true)
      try {
        const paymentsRes = await api.vendor.payments.list()

        const summary = paymentsRes?.summary || paymentsRes
        const transactions = paymentsRes?.transactions || (Array.isArray(paymentsRes) ? paymentsRes : [])

        setTransactions(transactions)

        setStats({
          availableBalance: summary?.availableBalance || 0,
          pendingSettlement: summary?.pendingSettlement || 0,
          totalProcessed: summary?.totalProcessed || 0,
          lastSettlementDate: summary?.lastSettlementDate || new Date().toISOString(),
        })
        setSettlementInfo({
          settlementCycle: summary?.schedule || 'Daily',
          nextPayoutDate: summary?.nextSettlement || new Date(Date.now() + 86400000).toISOString(),
          nextPayoutAmount: summary?.pendingSettlement || 0,
          pendingSettlement: summary?.pendingSettlement || 0,
          lastPayoutAmount: summary?.totalProcessed || 0,
          lastPayoutDate: summary?.lastSettlementDate || new Date().toISOString(),
          bankAccount: {
            bankName: summary?.bankName || 'N/A',
            accountName: summary?.accountName || 'N/A',
            accountNumber: summary?.accountNumber || '0000000000',
          },
        })
      } catch (error) {
        console.error("Failed to load payments data", error)
        toast.error("Failed to load payments data")
      } finally {
        setIsLoading(false)
      }
    }
    fetchPaymentsData()
  }, [])
  
  // Filter transactions
  const getFilteredTransactions = useCallback(() => {
    let filtered = [...transactions]
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(t => 
        t.id?.toLowerCase().includes(query) ||
        t.customer?.toLowerCase().includes(query) ||
        t.orderId?.toLowerCase().includes(query) ||
        t.customerEmail?.toLowerCase().includes(query)
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
    const total = filtered.reduce((sum, t) => sum + (t.amount || 0), 0)
    const completedCount = filtered.filter(t => t.status === 'completed').length
    const pendingAmount = filtered.filter(t => t.settlementStatus === 'pending')
      .reduce((sum, t) => sum + (t.amount || 0), 0)
    
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
    isLoading,
    stats: stats || { availableBalance: 0, pendingSettlement: 0, totalProcessed: 0, lastSettlementDate: new Date().toISOString() },
    settlementInfo: settlementInfo || {
      settlementCycle: 'Daily',
      nextPayoutDate: new Date(Date.now() + 86400000).toISOString(),
      nextPayoutAmount: 0,
      pendingSettlement: 0,
      lastPayoutAmount: 0,
      lastPayoutDate: new Date().toISOString(),
      bankAccount: { bankName: '—', accountName: '—', accountNumber: '0000000000' },
    },
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
    formatNaira
  }
}

