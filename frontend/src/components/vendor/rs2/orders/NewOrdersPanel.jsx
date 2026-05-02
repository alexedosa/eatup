'use client'
import { motion, AnimatePresence } from "framer-motion";
import OrderCard from "./OrderCard";
import { Receipt1, MagicStar, Refresh } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmationDialog from "@/components/shared/ConfirmationDialog";

export default function NewOrdersPanel({ orders, onAccept }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [confirmingOrder, setConfirmingOrder] = useState(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Orders updated", {
        id: 'refresh-orders',
        style: { borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }
      });
    }, 1000);
  };
  return (
    <div className="bg-white/40 dark:bg-[#242628]/40 backdrop-blur-md rounded-2xl md:rounded-[2.5rem] border border-stone-200/60 dark:border-white/10 shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-md">
      <div className="p-5 md:p-6 border-b border-stone-100 dark:border-white/5 bg-white/30 dark:bg-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-white/5 border border-stone-100 dark:border-white/10 flex items-center justify-center text-amber-500 shadow-sm">
              <Receipt1 size="20" variant="Bold" />
            </div>
            <div>
              <h3 className="font-bold text-stone-800 dark:text-white text-base md:text-lg tracking-tight">New Orders</h3>
              {orders.length > 0 && (
                <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-[0.15em]">{orders.length} orders pending</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-stone-100 dark:border-white/10 text-stone-400 hover:text-amber-500 hover:border-amber-100 transition-all shadow-sm group active:scale-95 disabled:opacity-50"
              title="Refresh Orders"
            >
              <Refresh 
                size="18" 
                variant="Outline" 
                className={`${isRefreshing ? 'animate-spin text-amber-500' : 'group-hover:rotate-180'} transition-all duration-500`} 
              />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="flex justify-center mb-3">
                <div className="p-4 bg-amber-50 dark:bg-amber-500/10 rounded-full">
                  <MagicStar
                    size="48"
                    variant="Bold"
                    className="text-amber-400 animate-pulse"
                  />
                </div>
              </div>
              <p className="text-stone-500 dark:text-stone-400 font-medium">No new orders</p>
              <p className="text-sm text-stone-400 dark:text-stone-500">Waiting for customers...</p>
            </motion.div>
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                type="new"
                onAccept={onAccept}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
