"use client"

export default function FormSection({ title, description, children, className = '' }) {
  return (
    <section
      className={`space-y-5 rounded-[1.75rem] border border-stone-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1a1c1e] ${className}`}
    >
      {(title || description) && (
        <div className="space-y-1.5">
          {title && (
            <h3 className="font-display text-base font-black tracking-tight text-stone-950 dark:text-white">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm font-medium leading-6 text-stone-500 dark:text-stone-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  )
}
