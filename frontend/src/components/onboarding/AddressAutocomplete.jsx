"use client"

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Location, SearchNormal1 } from 'iconsax-reactjs'
import { searchAddressSuggestions } from '@/lib/locationService'

function FieldError({ children }) {
  if (!children) return null

  return (
    <p className="text-[11px] font-bold text-red-500 dark:text-red-300" role="alert">
      {children}
    </p>
  )
}

export default function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  error,
  disabled,
  placeholder = '12 Allen Avenue, Ikeja, Lagos',
}) {
  const [draft, setDraft] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [searchError, setSearchError] = useState('')
  const containerRef = useRef(null)
  const requestRef = useRef(0)

  const query = isFocused ? draft : value
  const shouldSearch = isOpen && query.trim().length >= 3
  const visibleSuggestions = shouldSearch ? suggestions : []

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!shouldSearch) {
      return undefined
    }

    const requestId = ++requestRef.current
    const timer = window.setTimeout(async () => {
      setIsSearching(true)
      setSearchError('')

      try {
        const results = await searchAddressSuggestions(query, 6)
        if (requestId !== requestRef.current) return
        setSuggestions(results)
      } catch (error) {
        if (requestId !== requestRef.current) return
        setSuggestions([])
        setSearchError(error.message || 'Unable to load suggestions.')
      } finally {
        if (requestId === requestRef.current) {
          setIsSearching(false)
        }
      }
    }, 320)

    return () => window.clearTimeout(timer)
  }, [shouldSearch, query])

  const handleInputChange = (event) => {
    const nextValue = event.target.value
    setDraft(nextValue)
    onChange(nextValue)
    setIsOpen(true)
    setSearchError('')
  }

  const handleFocus = () => {
    setDraft(value)
    setIsFocused(true)
    setIsOpen(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleSelect = (suggestion) => {
    setDraft(suggestion.address)
    onSelect(suggestion)
    setSuggestions([])
    setIsOpen(false)
    setIsFocused(false)
  }

  return (
    <div ref={containerRef} className="relative space-y-2">
      <div className="relative">
        <SearchNormal1
          size="18"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
        />
        <input
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          autoComplete="off"
          placeholder={placeholder}
          className={`w-full rounded-2xl border bg-stone-50 py-3 pl-11 pr-4 text-sm font-bold text-stone-900 outline-none transition-all placeholder:text-stone-300 focus:ring-4 dark:bg-white/5 dark:text-white dark:placeholder:text-white/25 ${
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
              : 'border-stone-100 focus:border-amber-300 focus:ring-amber-500/10 dark:border-white/10 dark:focus:border-amber-500/50'
          }`}
        />
      </div>

      <AnimatePresence>
        {shouldSearch && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute left-0 right-0 z-30 mt-1 overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-xl shadow-stone-900/10 dark:border-white/10 dark:bg-[#1f2124]"
          >
            {isSearching && (
              <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-500 dark:text-stone-400">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900 dark:border-white/20 dark:border-t-white" />
                Searching addresses...
              </div>
            )}

            {!isSearching && visibleSuggestions.length === 0 && (
              <div className="px-4 py-3 text-sm font-medium text-stone-500 dark:text-stone-400">
                No matches found. Try adding city or state.
              </div>
            )}

            {!isSearching &&
              visibleSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSelect(suggestion)}
                  className="flex w-full items-start gap-3 border-b border-stone-50 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-stone-50 dark:border-white/5 dark:hover:bg-white/5"
                >
                  <Location size="16" className="mt-0.5 shrink-0 text-stone-400" />
                  <span className="text-sm font-bold text-stone-800 dark:text-stone-100">
                    {suggestion.label}
                  </span>
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      <FieldError>{error || searchError}</FieldError>
    </div>
  )
}
