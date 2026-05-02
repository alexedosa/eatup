"use client";

import { useState } from "react";
import { 
  StatusUp, 
  Wallet3, 
  TickCircle, 
  Star1, 
  Notification, 
  Map, 
  Box, 
  Timer1,
  Location,
  User,
  ArrowRight2,
  DirectUp
} from "iconsax-reactjs";

export default function RiderDashboard() {
  const [isActive, setIsActive] = useState(true);

  const stats = [
    { label: "Today's Earnings", value: "₦12,450", icon: Wallet3, color: "#FF6B2C" },
    { label: "Completed", value: "18", icon: TickCircle, color: "#2E7D32" },
    { label: "Rating", value: "4.9", icon: Star1, color: "#FFB01F" },
  ];

  const activeOrder = {
    id: "#ORD-9821",
    restaurant: "The Place, Ikeja",
    customer: "Sarah Johnson",
    distance: "2.4 km",
    timeRemaining: "12 mins",
    status: "Pick-up",
    address: "45 Toyin Street, Ikeja"
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-stone-900 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200/60 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <User size="22" variant="Bold" className="text-amber-600" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">Welcome, Rider</h1>
            <p className="text-[10px] text-stone-400 font-medium uppercase tracking-widest">ID: #RDR-7721</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'}`} />
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-tighter">
              {isActive ? 'Active' : 'Offline'}
            </span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`relative w-8 h-4 rounded-full transition-all duration-300 ${isActive ? 'bg-emerald-500' : 'bg-stone-300'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-all duration-300 ${isActive ? 'translate-x-4' : ''}`} />
            </button>
          </div>
          <button className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-500 relative">
            <Notification size="20" variant="Linear" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </header>

      <main className="p-6 max-w-lg mx-auto space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-[2rem] border border-stone-200/60 shadow-sm flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: `${stat.color}15`, color: stat.color }}>
                <stat.icon size="20" variant="Bold" />
              </div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tight">{stat.label}</p>
              <p className="text-sm font-black text-stone-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Active Order Card */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-stone-400 flex items-center gap-2">
              <Timer1 size="16" variant="Bold" className="text-amber-500" />
              Active Delivery
            </h2>
            <span className="text-[10px] font-bold bg-amber-500/10 text-amber-600 px-2 py-1 rounded-full border border-amber-500/20">
              Pick-up Phase
            </span>
          </div>

          <div className="bg-stone-900 rounded-[2.5rem] p-6 text-white shadow-xl shadow-stone-200 relative overflow-hidden">
            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black leading-tight">{activeOrder.restaurant}</h3>
                  <p className="text-xs text-stone-400 font-medium">Order {activeOrder.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-amber-400 text-lg font-black">{activeOrder.timeRemaining}</p>
                  <p className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">Left</p>
                </div>
              </div>

              <div className="h-px bg-white/10 w-full" />

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
                    <div className="w-0.5 h-8 bg-dashed border-l border-dashed border-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                  </div>
                  <div className="flex-1 space-y-6">
                    <div>
                      <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest leading-none mb-1">Pick-up</p>
                      <p className="text-xs font-semibold">{activeOrder.restaurant}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest leading-none mb-1">Drop-off</p>
                      <p className="text-xs font-semibold">{activeOrder.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-white text-stone-900 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-stone-100 transition-all active:scale-95 shadow-lg shadow-white/5">
                Confirm Pick-up
                <ArrowRight2 size="18" variant="Bold" />
              </button>
            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-4">
          <button className="bg-white p-5 rounded-[2rem] border border-stone-200/60 shadow-sm flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <Map size="24" variant="Bold" />
            </div>
            <div className="text-left">
              <p className="text-sm font-black text-stone-900">Map View</p>
              <p className="text-[10px] text-stone-400 font-medium">Find hotspots</p>
            </div>
          </button>
          
          <button className="bg-white p-5 rounded-[2rem] border border-stone-200/60 shadow-sm flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all">
              <Wallet3 size="24" variant="Bold" />
            </div>
            <div className="text-left">
              <p className="text-sm font-black text-stone-900">Earnings</p>
              <p className="text-[10px] text-stone-400 font-medium">Payout details</p>
            </div>
          </button>
        </section>

        {/* Recent Activity */}
        <section className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-stone-400">Recent Deliveries</h2>
            <button className="text-[11px] font-bold text-amber-600 hover:underline">View All</button>
          </div>

          <div className="space-y-3">
            {[1, 2].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-3xl border border-stone-200/60 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Box size="24" variant="Bold" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900">Chicken Republic</p>
                    <p className="text-[10px] text-stone-400 font-medium">Completed • 2:45 PM</p>
                  </div>
                </div>
                <p className="text-sm font-black text-emerald-600">+₦850</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Nav Bar (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-stone-200/60 px-8 py-4 flex items-center justify-between">
        <button className="text-amber-600 flex flex-col items-center gap-1">
          <StatusUp size="24" variant="Bold" />
          <span className="text-[9px] font-bold uppercase tracking-tight">Dashboard</span>
        </button>
        <button className="text-stone-400 flex flex-col items-center gap-1 hover:text-amber-500 transition-all">
          <Box size="24" variant="Linear" />
          <span className="text-[9px] font-bold uppercase tracking-tight">Tasks</span>
        </button>
        <div className="relative -top-8">
          <button className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-amber-500/20 border-4 border-white active:scale-95 transition-all">
            <DirectUp size="28" variant="Bold" />
          </button>
        </div>
        <button className="text-stone-400 flex flex-col items-center gap-1 hover:text-amber-500 transition-all">
          <Wallet3 size="24" variant="Linear" />
          <span className="text-[9px] font-bold uppercase tracking-tight">Wallet</span>
        </button>
        <button className="text-stone-400 flex flex-col items-center gap-1 hover:text-amber-500 transition-all">
          <User size="24" variant="Linear" />
          <span className="text-[9px] font-bold uppercase tracking-tight">Profile</span>
        </button>
      </nav>
    </div>
  );
}
