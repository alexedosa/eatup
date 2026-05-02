export default function GlassCard({ children, className = '', onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white/80 dark:bg-[#242628]/80 backdrop-blur-xl border border-amber-200/40 dark:border-white/10 shadow-sm rounded-2xl p-5 ${className}`}
    >
      {children}
    </div>
  );
}
