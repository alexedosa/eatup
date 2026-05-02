export default function Card({ title, children, className = "", ...props }) {
  return (
    <div className={`bg-white rounded-xl border border-surface-200 p-5 ${className}`} {...props}>
      {title && <h3 className="text-sm font-semibold text-surface-800 mb-3">{title}</h3>}
      {children}
    </div>
  );
}
