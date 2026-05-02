'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, Toaster } from 'react-hot-toast'
import { useOrders } from '@/context/OrderContext'
import {
  Flash, Receipt1, Timer1, Truck, Verify, TickCircle,
  Call, NoteText, Bag2, MagicStar, ArrowDown2, CloseCircle
} from 'iconsax-reactjs'
import Image from 'next/image'
import OrderTimer from '../rs2/orders/OrderTimer'
import { useTheme } from '@/context/ThemeContext'

// ─── Stat Pill ────────────────────────────────────────────────────
function StatPill({ label, value, color = 'text-white' }) {
  return (
    <div className="flex flex-col items-center px-3 md:px-5 border-r border-stone-200/10 dark:border-white/10 last:border-0">
      <span className="text-lg md:text-2xl font-black tabular-nums {color}">{value}</span>
      <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.18em] text-stone-400 dark:text-white/30 mt-0.5">{label}</span>
    </div>
  )
}

// ─── Zen Order Card ───────────────────────────────────────────────
function ZenOrderCard({ order, type, onAccept, onMarkReady, onComplete, isDarkMode }) {
  const [expanded, setExpanded] = useState(false)
  const [accepting, setAccepting] = useState(false)

  const formatNaira = (amount) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)

  const getFoodImage = (name) => {
    if (name.includes('Jollof')) return 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=80&h=80&fit=crop'
    if (name.includes('Suya')) return 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=80&h=80&fit=crop'
    if (name.includes('Pasta')) return 'https://images.unsplash.com/photo-1645112481338-3560e7740212?w=80&h=80&fit=crop'
    if (name.includes('Soup')) return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=80&h=80&fit=crop'
    if (name.includes('Pizza')) return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=80&h=80&fit=crop'
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop'
  }

  const typeStyles = {
    new: { ring: 'border-amber-500/40', badge: 'bg-amber-500/20 text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
    preparing: { ring: 'border-emerald-500/30', badge: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
    delivering: { ring: 'border-indigo-500/30', badge: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400', dot: 'bg-indigo-500' },
  }
  const s = typeStyles[type]

  const handleAccept = async () => {
    setAccepting(true)
    await new Promise(r => setTimeout(r, 400))
    onAccept(order.id)
    setAccepting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className={`bg-white/40 dark:bg-white/5 border ${s.ring} rounded-2xl overflow-hidden hover:bg-white/60 dark:hover:bg-white/[0.07] transition-colors duration-200 shadow-sm`}
    >
      {/* Card Header */}
      <div className="p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-2 h-2 rounded-full ${s.dot} animate-pulse`} />
            </div>
            <div>
              <p className="text-stone-900 dark:text-white font-bold text-sm">{order.customer}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <OrderTimer timestamp={order.timestamp} />
                <span className="text-stone-300 dark:text-white/20">·</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${s.badge}`}>
                  {order.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-black text-stone-900 dark:text-white">{formatNaira(order.total)}</span>
            <ArrowDown2
              size="16"
              className={`text-stone-400 dark:text-white/30 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-stone-100 dark:border-white/5"
          >
            <div className="p-4 space-y-4">
              {/* Items */}
              <div className="space-y-2.5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0 border border-stone-100 dark:border-white/10">
                        <Image src={getFoodImage(item.name)} alt={item.name} width={32} height={32} className="object-cover" />
                      </div>
                      <p className="text-sm text-stone-700 dark:text-white/80">
                        <span className="text-amber-500 dark:text-amber-400 font-bold">{item.quantity}×</span>{' '}{item.name}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-stone-400 dark:text-white/50">{formatNaira(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Notes */}
              {order.specialInstructions && (
                <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-xl px-3 py-2 flex items-start gap-2">
                  <NoteText size="14" variant="Bold" className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 dark:text-amber-300/80 italic">{order.specialInstructions}</p>
                </div>
              )}

              {/* Phone */}
              {order.phone && (
                <div className="flex items-center gap-2 text-xs text-stone-400 dark:text-white/40">
                  <Call size="13" variant="Bold" />
                  <span>{order.phone}</span>
                </div>
              )}

              {/* Action */}
              <div className="pt-1">
                {type === 'new' && (
                  <button
                    onClick={handleAccept}
                    disabled={accepting}
                    className="w-full py-3 rounded-xl font-black text-sm bg-stone-900 dark:bg-amber-500 hover:bg-stone-800 dark:hover:bg-amber-400 text-white dark:text-black transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 shadow-md"
                  >
                    {accepting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black rounded-full animate-spin" />
                    ) : (
                      <><Verify size="18" variant="Bold" /> Accept Order</>
                    )}
                  </button>
                )}
                {type === 'preparing' && (
                  <button
                    onClick={() => onMarkReady(order.id)}
                    className="w-full py-3 rounded-xl font-black text-sm bg-emerald-50 dark:bg-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 transition-all duration-200 shadow-sm"
                  >
                    Mark as Ready
                  </button>
                )}
                {type === 'delivering' && (
                  <button
                    onClick={() => onComplete(order.id)}
                    className="w-full py-3 rounded-xl font-black text-sm bg-indigo-50 dark:bg-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 transition-all duration-200 shadow-sm"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Column ───────────────────────────────────────────────────────
function ZenColumn({ title, subtitle, iconColor, count, children, isDarkMode }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4 px-1 shrink-0">
        <div className={`w-1 h-6 rounded-full ${iconColor}`} />
        <div>
          <p className="text-stone-900 dark:text-white font-bold text-sm">{title}</p>
          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-white/30 font-bold">{subtitle}</p>
        </div>
        {count > 0 && (
          <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full bg-stone-100 dark:bg-white/10 text-stone-500 dark:text-white/60`}>
            {count}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar pb-20 lg:pb-0">
        {children}
      </div>
    </div>
  )
}

// ─── Main Zen Mode ────────────────────────────────────────────────
export default function ZenMode({ onExit, businessName = 'EatUp Kitchen' }) {
  const { orders, notification, acceptOrder, markReady, completeOrder } = useOrders()
  const { isDarkMode } = useTheme()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (notification) {
      toast.custom((t) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`bg-amber-500 text-black rounded-2xl shadow-2xl shadow-amber-500/30 px-5 py-4 flex items-center gap-3 mx-4`}
        >
          <Receipt1 size="22" variant="Bold" />
          <div>
            <p className="font-black text-sm">New Order Incoming</p>
            <p className="text-xs opacity-70">{notification.message}</p>
          </div>
        </motion.div>
      ), { id: 'zen-order-' + notification.id, duration: 5000 })
    }
  }, [notification])

  const handleAccept = (id) => {
    acceptOrder(id)
    toast.success('Order accepted', { 
      style: { 
        background: isDarkMode ? '#1a1c1e' : '#ffffff', 
        color: isDarkMode ? '#fff' : '#1a1c1e', 
        borderRadius: '12px', 
        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        fontWeight: 'bold',
        fontSize: '12px'
      } 
    })
  }
  const handleMarkReady = (id) => {
    markReady(id)
    toast.success('Ready for delivery', { 
      style: { 
        background: isDarkMode ? '#1a1c1e' : '#ffffff', 
        color: isDarkMode ? '#fff' : '#1a1c1e', 
        borderRadius: '12px', 
        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        fontWeight: 'bold',
        fontSize: '12px'
      } 
    })
  }
  const handleComplete = (id) => {
    completeOrder(id)
    toast.success('Order completed', { 
      style: { 
        background: isDarkMode ? '#1a1c1e' : '#ffffff', 
        color: isDarkMode ? '#fff' : '#1a1c1e', 
        borderRadius: '12px', 
        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        fontWeight: 'bold',
        fontSize: '12px'
      } 
    })
  }

  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed inset-0 z-[500] ${isDarkMode ? 'bg-[#0c0c0e]' : 'bg-[#f8f9fa]'} flex flex-col`}
      style={{ fontFamily: 'var(--font-inter)' }}
    >
      <Toaster position="top-center" />
      <audio id="zenOrderSound" src="/sounds/ding.mp3" preload="auto" />

      {/* Ambient background grain */}
      <div className={`absolute inset-0 ${isDarkMode ? 'opacity-[0.03]' : 'opacity-[0.015]'} pointer-events-none`}
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
      />

      {/* Subtle amber glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center top, rgba(245,158,11,${isDarkMode ? '0.06' : '0.04'}) 0%, transparent 70%)` }}
      />

      {/* ── Top Bar ────────────────────────────────── */}
      <div className={`sticky top-0 z-10 shrink-0 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8 py-4 sm:py-5 border-b ${isDarkMode ? 'bg-[#0c0c0e]/80 border-white/5' : 'bg-white/80 border-stone-200'} backdrop-blur-xl gap-4 sm:gap-0`}>
        {/* Left: Identity */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <Flash size="16" variant="Bold" className="text-amber-500" />
          </div>
          <div>
            <p className={`font-bold text-sm leading-none ${isDarkMode ? 'text-white' : 'text-stone-900'}`}>{businessName}</p>
            <p className={`text-[10px] uppercase tracking-widest ${isDarkMode ? 'text-white/30' : 'text-stone-400'} font-bold mt-0.5`}>Zen Mode · Service</p>
          </div>
          
          <div className="ml-auto sm:hidden">
            <p className={`font-black ${isDarkMode ? 'text-white/20' : 'text-stone-200'} text-lg tabular-nums tracking-tight`}>{timeStr}</p>
          </div>
        </div>

        {/* Center: Live stats (Hidden on mobile) */}
        <div className="hidden sm:flex items-center">
          <StatPill label="Incoming" value={orders.new.length} color="text-amber-500" />
          <StatPill label="Cooking" value={orders.preparing.length} color="text-emerald-500" />
          <StatPill label="Out" value={orders.delivering.length} color="text-indigo-500" />
        </div>

        {/* Right: Clock + Exit */}
        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
          <p className={`hidden sm:block font-black ${isDarkMode ? 'text-white/20' : 'text-stone-200'} text-xl tabular-nums tracking-tight`}>{timeStr}</p>
          <button
            onClick={onExit}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl transition-all text-[11px] font-bold uppercase tracking-widest ${isDarkMode ? 'bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10' : 'bg-stone-100 border border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-200'}`}
          >
            <CloseCircle size="16" />
            Exit Zen Mode
          </button>
        </div>
      </div>

      {/* ── Main Grid ──────────────────────────────── */}
      <div className={`flex-1 flex lg:grid lg:grid-cols-3 gap-px ${isDarkMode ? 'bg-white/5' : 'bg-stone-200'} overflow-x-auto lg:overflow-hidden snap-x snap-mandatory scroll-smooth custom-scrollbar`}>
        {/* Col 1: Incoming */}
        <div className={`w-[92vw] lg:w-full shrink-0 snap-center ${isDarkMode ? 'bg-[#0c0c0e]' : 'bg-white'} p-6 flex flex-col min-h-0`}>
          <ZenColumn
            title="Incoming"
            subtitle={`${orders.new.length} awaiting`}
            iconColor="bg-amber-500"
            count={orders.new.length}
            isDarkMode={isDarkMode}
          >
            <AnimatePresence mode="popLayout">
              {orders.new.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 lg:h-48 gap-3"
                >
                  <MagicStar size="36" variant="Bold" className="text-stone-200 dark:text-white/10" />
                  <p className="text-stone-400 dark:text-white/20 text-xs font-bold uppercase tracking-widest">All clear</p>
                </motion.div>
              ) : (
                orders.new.map(order => (
                  <ZenOrderCard key={order.id} order={order} type="new" onAccept={handleAccept} isDarkMode={isDarkMode} />
                ))
              )}
            </AnimatePresence>
          </ZenColumn>
        </div>

        {/* Col 2: Kitchen */}
        <div className={`w-[92vw] lg:w-full shrink-0 snap-center ${isDarkMode ? 'bg-[#0d0e10]' : 'bg-[#fafafa]'} p-6 flex flex-col min-h-0 border-x lg:border-y-0 ${isDarkMode ? 'border-white/5' : 'border-stone-200'}`}>
          <ZenColumn
            title="In The Kitchen"
            subtitle={`${orders.preparing.length} cooking`}
            iconColor="bg-emerald-500"
            count={orders.preparing.length}
            isDarkMode={isDarkMode}
          >
            <AnimatePresence mode="popLayout">
              {orders.preparing.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 lg:h-48 gap-3"
                >
                  <p className="text-stone-400 dark:text-white/20 text-xs font-bold uppercase tracking-widest">Kitchen clear</p>
                </motion.div>
              ) : (
                orders.preparing.map(order => (
                  <ZenOrderCard key={order.id} order={order} type="preparing" onMarkReady={handleMarkReady} isDarkMode={isDarkMode} />
                ))
              )}
            </AnimatePresence>
          </ZenColumn>
        </div>

        {/* Col 3: Out for Delivery */}
        <div className={`w-[92vw] lg:w-full shrink-0 snap-center ${isDarkMode ? 'bg-[#0c0c0e]' : 'bg-white'} p-6 flex flex-col min-h-0`}>
          <ZenColumn
            title="Out for Delivery"
            subtitle={`${orders.delivering.length} on the road`}
            iconColor="bg-indigo-500"
            count={orders.delivering.length}
            isDarkMode={isDarkMode}
          >
            <AnimatePresence mode="popLayout">
              {orders.delivering.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 lg:h-48 gap-3"
                >
                  <p className="text-stone-400 dark:text-white/20 text-xs font-bold uppercase tracking-widest">No active deliveries</p>
                </motion.div>
              ) : (
                orders.delivering.map(order => (
                  <ZenOrderCard key={order.id} order={order} type="delivering" onComplete={handleComplete} isDarkMode={isDarkMode} />
                ))
              )}
            </AnimatePresence>
          </ZenColumn>
        </div>
      </div>

      {/* ── Bottom Status Bar ──────────────────────── */}
      <div className={`shrink-0 px-8 py-3 border-t ${isDarkMode ? 'border-white/5' : 'border-stone-200'} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className={`text-[10px] ${isDarkMode ? 'text-white/25' : 'text-stone-400'} font-bold uppercase tracking-widest`}>Live — Auto-refresh active</span>
        </div>
        <p className={`text-[10px] ${isDarkMode ? 'text-white/15' : 'text-stone-300'} font-bold uppercase tracking-widest`}>
          {orders.completed.length} orders completed today
        </p>
      </div>
    </motion.div>
  )
}
