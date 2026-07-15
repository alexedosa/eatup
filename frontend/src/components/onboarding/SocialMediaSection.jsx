"use client"

import { Add, Trash } from 'iconsax-reactjs'
import CustomSelect from './CustomSelect'
import { getSocialPlatform, SOCIAL_PLATFORMS } from './socialPlatforms'

function createSocialEntry(platform = '', value = '') {
  return {
    id: `social-${Math.random().toString(36).slice(2, 9)}`,
    platform,
    value,
  }
}

export function createInitialSocialEntries() {
  return [createSocialEntry('', '')]
}

export default function SocialMediaSection({
  entries,
  onChange,
  onAdd,
  onRemove,
  error,
  disabled,
}) {
  const usedPlatforms = new Set(entries.map((entry) => entry.platform).filter(Boolean))

  const getAvailablePlatforms = (currentPlatform) =>
    SOCIAL_PLATFORMS.filter(
      (platform) => platform.value === currentPlatform || !usedPlatforms.has(platform.value)
    ).map((platform) => ({
      value: platform.value,
      label: platform.label,
      platform,
    }))

  return (
    <div className="space-y-4">
      {entries.map((entry, index) => {
        const platformMeta = getSocialPlatform(entry.platform)

        return (
          <div
            key={entry.id}
            className="grid grid-cols-1 gap-3 rounded-2xl border border-stone-100 bg-stone-50/80 p-3 dark:border-white/10 dark:bg-white/[0.03] sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)_auto] sm:items-center"
          >
            <CustomSelect
              value={entry.platform}
              options={getAvailablePlatforms(entry.platform)}
              onChange={(value) => onChange(entry.id, { ...entry, platform: value })}
              disabled={disabled}
              placeholder="Platform"
              renderOption={(option) => {
                const Icon = option.platform.Icon
                return (
                  <span className="flex items-center gap-2.5">
                    <Icon size="18" />
                    <span>{option.label}</span>
                  </span>
                )
              }}
              renderValue={(option) => {
                const Icon = option.platform.Icon
                return (
                  <span className="flex items-center gap-2.5">
                    <Icon size="18" />
                    <span>{option.label}</span>
                  </span>
                )
              }}
            />

            <input
              value={entry.value}
              onChange={(event) =>
                onChange(entry.id, { ...entry, value: event.target.value })
              }
              disabled={disabled || !entry.platform}
              placeholder={
                platformMeta
                  ? `e.g. ${platformMeta.value === 'whatsapp' ? '+234...' : '@handle'}`
                  : 'Handle or profile URL'
              }
              className="w-full rounded-2xl border border-stone-100 bg-white px-4 py-3 text-sm font-bold text-stone-900 outline-none transition-all placeholder:text-stone-300 focus:border-amber-300 focus:ring-4 focus:ring-amber-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-[#1a1c1e] dark:text-white dark:placeholder:text-white/25 dark:focus:border-amber-500/50"
            />

            <button
              type="button"
              onClick={() => onRemove(entry.id)}
              disabled={disabled || entries.length === 1}
              aria-label={`Remove social media row ${index + 1}`}
              className="flex h-11 w-full items-center justify-center rounded-2xl border border-stone-100 bg-white text-stone-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-[#1a1c1e] dark:hover:border-red-500/20 dark:hover:bg-red-500/10 dark:hover:text-red-300 sm:h-[46px] sm:w-11"
            >
              <Trash size="18" variant="Bold" />
            </button>
          </div>
        )
      })}

      <button
        type="button"
        onClick={onAdd}
        disabled={disabled || entries.length >= SOCIAL_PLATFORMS.length}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-stone-200 bg-stone-50 px-4 py-3 text-sm font-black text-stone-600 transition-all hover:border-stone-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-stone-300 dark:hover:border-white/20"
      >
        <Add size="16" variant="Bold" />
        Add Social Media
      </button>

      {error && (
        <p className="text-[11px] font-bold text-red-500 dark:text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export { createSocialEntry }
