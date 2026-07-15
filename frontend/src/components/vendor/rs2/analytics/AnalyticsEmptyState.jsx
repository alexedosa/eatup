import { ChartSquare } from 'iconsax-reactjs'

export default function AnalyticsEmptyState({ title = 'No analytics available yet.', message }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-stone-200 bg-stone-50/60 px-6 py-10 text-center dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-amber-500 shadow-sm dark:bg-white/10">
        <ChartSquare size="24" variant="Bold" />
      </div>
      <p className="text-sm font-black text-stone-800 dark:text-white">{title}</p>
      {message && (
        <p className="mt-2 max-w-xs text-xs font-medium leading-5 text-stone-500 dark:text-stone-400">
          {message}
        </p>
      )}
    </div>
  )
}
