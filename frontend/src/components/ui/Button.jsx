export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer";
  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 active:scale-[0.98]",
    secondary: "bg-surface-100 text-surface-700 hover:bg-surface-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "text-surface-600 hover:bg-surface-100",
  };

  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
