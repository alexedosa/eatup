// src/components/vendor/rs2/analytics/PeakHoursHeatmap.jsx
import { formatNumber } from "@/lib/formatters";

export default function PeakHoursHeatmap({ data }) {
  const hours = [
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getIntensity = (value) => {
    if (value >= 70) return "bg-amber-600 text-white";
    if (value >= 50) return "bg-amber-500/80 text-white";
    if (value >= 30) return "bg-amber-400/60 text-stone-900";
    if (value >= 15)
      return "bg-amber-200/40 text-stone-700 dark:text-stone-300";
    return "bg-stone-50 dark:bg-white/5 text-stone-400 dark:text-stone-600";
  };

  return (
    <div className="bg-white dark:bg-[#1a1c1e] rounded-[2.5rem] p-6 md:p-8 border border-stone-200 dark:border-white/10 shadow-sm overflow-hidden">
      <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight mb-2">
        Peak Hours Heatmap
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mb-8">
        Orders by hour and day, darker indicates higher volume.
      </p>

      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <table className="w-full min-w-[600px] text-center border-separate border-spacing-1.5">
          <thead>
            <tr>
              <th className="py-2 text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest w-12"></th>
              {hours.map((hour) => (
                <th
                  key={hour}
                  className="py-2 text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest whitespace-nowrap"
                >
                  {hour}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td className="py-1 text-[10px] font-black text-stone-600 dark:text-stone-400 uppercase tracking-widest text-left">
                  {day}
                </td>
                {hours.map((hour) => {
                  const value = data.find((d) => d.day === day)?.[hour] || 0;
                  return (
                    <td key={hour} className="p-0">
                      <div
                        className={`
                        w-full aspect-[4/3] rounded-lg flex items-center justify-center text-[9px] font-black
                        transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default
                        ${getIntensity(value)}
                      `}
                      >
                        {value > 0 ? value : "-"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-stone-100 dark:border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-stone-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10"></div>
          <span>Quiet</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-amber-200/40"></div>
          <span>Light</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-amber-400/60"></div>
          <span>Busy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-amber-600"></div>
          <span>Peak</span>
        </div>
      </div>
    </div>
  );
}
