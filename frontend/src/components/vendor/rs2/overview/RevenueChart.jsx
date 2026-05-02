import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

import { WEEKLY_REVENUE } from "@/data/vendorOverviewData";
import GlassCard from "../../shared/GlassCard";
import { useTheme } from "@/context/ThemeContext";

export default function RevenueChart() {
  const { isDarkMode } = useTheme();
  
  const formatNaira = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalRevenue = WEEKLY_REVENUE.reduce((sum, d) => sum + d.revenue, 0);

  // Recharts expects "dataKey"
  const chartData = WEEKLY_REVENUE.map((item) => ({
    day: item.day,
    revenue: item.revenue,
  }));

  return (
    <GlassCard className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide font-medium">
            Revenue Trend
          </p>
          <p className="text-2xl font-bold text-stone-800 dark:text-white">
            {formatNaira(totalRevenue)}
          </p>
        </div>

        <select className="text-xs text-stone-500 dark:text-stone-300 bg-stone-100 dark:bg-white/5 border-none outline-none px-3 py-1.5 rounded-full cursor-pointer hover:bg-stone-200 dark:hover:bg-white/10 transition-colors font-medium">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>

      {/* BAR CHART - Flex-1 to take up all available space */}
      <div className="flex-1 w-full min-h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData}
            margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />

            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 11, fill: isDarkMode ? "#9ca3af" : "#78716c", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />

            <YAxis
              tick={{ fontSize: 10, fill: isDarkMode ? "#6b7280" : "#a8a29e" }}
              tickFormatter={(value) => `₦${value / 1000}k`}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.02)' }}
              formatter={(value) => formatNaira(value)}
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                fontSize: "13px",
                padding: "12px",
              }}
            />

            <Bar 
              dataKey="revenue" 
              radius={[6, 6, 0, 0]}
              barSize={32}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 5 ? '#ff6b2c' : '#0a753c'} 
                  fillOpacity={index === 5 ? 1 : 0.7}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-stone-100 dark:border-white/5">
        <p className="text-[11px] text-stone-400 dark:text-stone-500 font-medium">
          Peak revenue tracking • Weekly performance
        </p>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-[10px] text-stone-500 dark:text-stone-400 font-bold uppercase">On Track</span>
        </div>
      </div>
    </GlassCard>
  );
}
