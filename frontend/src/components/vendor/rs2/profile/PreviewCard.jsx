// src/components/vendor/rs2/profile/PreviewCard.jsx
import { formatTime } from "@/lib/profileUtils";
import { Timer1, Star1, Location, Shop } from "iconsax-reactjs";
import Image from "next/image";

export default function PreviewCard({ profile, isOpenNow }) {
  const getTodayHours = () => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const today = days[new Date().getDay()];
    const todayHours = profile.hours[today];
    if (!todayHours.isOpen) return "Closed today";
    return `${formatTime(todayHours.open)} - ${formatTime(todayHours.close)}`;
  };

  return (
    <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl shadow-amber-500/10">
      {/* Background Image/Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src={profile.storeImage}
          alt={profile.storeName}
          fill
          className="object-cover opacity-25 dark:opacity-0 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-lightgreen-500 to-darkgreen-600 opacity-90 mix-blend-multiply dark:mix-blend-overlay" />
      </div>

      <div className="relative z-10 p-8 text-white">
        <div className="flex items-center gap-4 mb-8">
          {/* <div className="w-16 h-16 rounded-[1.5rem] bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-inner overflow-hidden">
            {profile.storeImage ? (
              <Image
                src={profile.storeImage}
                alt="logo"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            ) : (
              <Shop size="32" variant="Bold" />
            )}
          </div> */}
          <div className="min-w-0">
            <h3 className="font-display font-black text-2xl tracking-tight leading-none truncate">
              {profile.storeName}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-black uppercase tracking-widest border border-white/10">
                Restaurant
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-black uppercase tracking-widest border border-white/10">
                Fast Food
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
              <Timer1 size="18" variant="Bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-none mb-1">
                Today's Hours
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-tight">
                  {getTodayHours()}
                </span>
                {isOpenNow && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-[8px] font-black uppercase tracking-widest animate-pulse">
                    Open Now
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
              <Star1 size="18" variant="Bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-none mb-1">
                Store Rating
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-tight">
                  {profile.stats.averageRating} ★
                </span>
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
                  ({profile.stats.totalOrders}+ orders)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
              <Location size="18" variant="Bold" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-none mb-1">
                Main Branch
              </span>
              <span className="text-sm font-black tracking-tight">
                {profile.address.city}, {profile.address.state}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-white/50 text-[9px] font-black uppercase tracking-widest mb-1">
                Total Orders
              </p>
              <p className="font-black text-sm tracking-tight">
                {profile.stats.totalOrders.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-white/50 text-[9px] font-black uppercase tracking-widest mb-1">
                Avg Response
              </p>
              <p className="font-black text-sm tracking-tight">
                {profile.stats.averageResponseTime}m
              </p>
            </div>
            <div>
              <p className="text-white/50 text-[9px] font-black uppercase tracking-widest mb-1">
                Reliability
              </p>
              <p className="font-black text-sm tracking-tight">
                {profile.stats.responseRate}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
