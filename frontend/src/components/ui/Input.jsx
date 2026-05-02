export default function Input({ label, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide">
          {label}
        </label>
      )}
      <input
        className={`w-full border border-surface-200 rounded-lg px-3 py-2.5 text-sm text-surface-800 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all ${className}`}
        {...props}
      />
    </div>
  );
}
