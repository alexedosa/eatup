'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, memo } from 'react'
import Image from 'next/image'
import OrderTimer from './OrderTimer'
import ConfirmationDialog from '@/components/shared/ConfirmationDialog'
import { Truck, Box, NoteText, Call, ArrowDown2, Verify, Bag2 } from 'iconsax-reactjs'

function OrderCard({ order, type, onAccept, onMarkReady, onComplete }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAccepting, setIsAccepting] = useState(false)
  const [showConfirmAccept, setShowConfirmAccept] = useState(false)
  
  const formatNaira = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Smart food image mapping
  const getFoodImage = (name) => {
    if (name.includes('Jollof')) return 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=100&h=100&fit=crop'
    if (name.includes('Suya')) return 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop'
    if (name.includes('Pasta')) return 'https://images.unsplash.com/photo-1645112481338-3560e7740212?w=100&h=100&fit=crop'
    if (name.includes('Soup')) return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=100&h=100&fit=crop'
    if (name.includes('Pizza')) return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop'
    if (name.includes('Bread')) return 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=100&h=100&fit=crop'
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop'
  }
  
  const handleAccept = async () => {
    setIsAccepting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    onAccept(order.id)
    setIsAccepting(false)
  }
  
  const handleConfirmAccept = () => {
    handleAccept()
    setShowConfirmAccept(false)
  }
  
  const cardVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 20, scale: 0.95 }
  }
  
  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.005, transition: { duration: 0.2 } }}
      className={`bg-white dark:bg-[#242628] rounded-2xl border border-stone-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}
    >
      {/* Card Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3 md:p-4 cursor-pointer hover:bg-stone-50/50 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Order Number with badge */}
            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center ${type === 'new' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400' : ''} ${type === 'preparing' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400' : ''} ${type === 'delivering' ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400' : ''}`}>
              <span className="font-bold text-xs md:text-sm">#{order.id.slice(-3)}</span>
            </div>
            
            <div className="min-w-0">
              <h4 className="font-bold text-stone-800 dark:text-white text-sm md:text-base truncate">{order.customer}</h4>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] md:text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                <OrderTimer timestamp={order.timestamp} />
                <span className="text-stone-300">•</span>
                {order.deliveryType === 'delivery' ? (
                  <span className="flex items-center gap-1 font-medium text-indigo-600">
                    <Truck size="12" variant="Bold" />
                    Delivery
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-medium text-amber-600">
                    <Box size="12" variant="Bold" />
                    Pickup
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 shrink-0 ml-2">
            <span className="font-black text-stone-800 dark:text-white text-sm md:text-base">{formatNaira(order.total)}</span>
            <ArrowDown2 
              size="18"
              className={`transform transition-transform duration-300 text-stone-400 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </div>
      
      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-stone-100 dark:border-white/5 bg-stone-50/30 dark:bg-white/5"
          >
            <div className="p-4 space-y-4">
              {/* Items List */}
              <div className="bg-white dark:bg-[#1a1c1e] rounded-2xl p-4 border border-stone-100 dark:border-white/5 shadow-sm">
                <p className="text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Bag2 size="14" variant="Bold" /> Order Content
                </p>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 shrink-0">
                          <Image 
                            src={getFoodImage(item.name)} 
                            alt={item.name} 
                            width={40} 
                            height={40} 
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-stone-800 dark:text-white truncate">
                            <span className="text-amber-500">{item.quantity}x</span> {item.name}
                          </p>
                          <p className="text-[10px] text-stone-400 font-medium">{formatNaira(item.price)} each</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-stone-800 dark:text-white">
                        {formatNaira(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Delivery Address (if delivery) */}
                {order.address && (
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">Delivery To</p>
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-medium">{order.address}</p>
                  </div>
                )}
                
                {/* Customer Contact */}
                {order.phone && (
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">Contact Customer</p>
                    <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300 font-bold">
                      <Call size="16" variant="Bold" className="text-amber-500" />
                      <span>{order.phone}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Special Instructions */}
              {order.specialInstructions && (
                <div className="bg-amber-50 dark:bg-amber-500/10 rounded-xl p-3 border border-amber-100 dark:border-white/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <NoteText size="16" variant="Bold" className="text-amber-600 dark:text-amber-400" />
                    <p className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">Note from Customer</p>
                  </div>
                  <p className="text-sm text-stone-600 dark:text-stone-400 font-medium italic">{order.specialInstructions}</p>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="pt-2">
                {type === 'new' && (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowConfirmAccept(true)}
                    disabled={isAccepting}
                    className={`w-full py-4 rounded-2xl font-bold bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-lg hover:bg-stone-800 dark:hover:bg-stone-100 active:bg-black transition-all duration-200 flex items-center justify-center gap-2 ${isAccepting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isAccepting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-stone-900/30 dark:border-t-stone-900 rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <Verify size="20" variant="Bold" />
                        <span>Accept & Print Receipt</span>
                      </>
                    )}
                  </motion.button>
                )}
                
                {type === 'preparing' && (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onMarkReady(order.id)}
                    className="w-full py-4 rounded-2xl font-bold bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-all duration-200"
                  >
                    Mark as Ready
                  </motion.button>
                )}
                
                {type === 'delivering' && (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onComplete(order.id)}
                    className="w-full py-4 rounded-2xl font-bold bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all duration-200"
                  >
                    Mark as Delivered
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmAccept}
        onClose={() => setShowConfirmAccept(false)}
        onConfirm={handleConfirmAccept}
        title="Accept Order?"
        message={`Are you sure you want to accept order #${order.id} from ${order.customer}? This will move it to the kitchen and notify the customer.`}
        confirmText="Yes, Accept"
        type="warning"
      />
    </motion.div>
  )
}

export default memo(OrderCard)
