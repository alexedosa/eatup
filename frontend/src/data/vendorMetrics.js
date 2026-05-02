import { Box, WalletMoney, Star } from 'iconsax-reactjs'

export const METRICS = {
  ordersToday: {
    value: 147,
    change: +18,
    changeType: 'up',
    label: 'Orders Today',
    icon: <Box variant="Outline" />,
    onClick: 'orders'
  },
  revenueWeek: {
    value: 1335000,
    change: +6.2,
    changeType: 'up',
    label: 'Revenue This Week',
    icon: <WalletMoney variant="Outline" />,
    onClick: 'analytics'
  },
  rating: {
    value: 4.8,
    change: 0,
    changeType: 'neutral',
    label: 'Average Rating',
    icon: <Star variant="Bold" className="text-amber-400" />,
    suffix: '',
    totalReviews: 1204,
    onClick: 'reviews'
  }
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
