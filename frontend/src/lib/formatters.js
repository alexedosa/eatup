export const formatNaira = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount || 0)
}

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-NG').format(num || 0)
}

export const formatCompactNumber = (num) => {
  return new Intl.NumberFormat('en-NG', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num || 0)
}

export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-NG', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date)
}

export const getStatusColor = (status) => {
  const colors = {
    completed: 'text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400',
    pending: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400',
    refunded: 'text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400',
    failed: 'text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400',
    settled: 'text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400'
  }
  return colors[status] || 'text-stone-600 bg-stone-50 dark:bg-white/5 dark:text-stone-400'
}
