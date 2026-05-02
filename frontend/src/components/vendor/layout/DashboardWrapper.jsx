"use client"
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LeftColumn from './LeftColumn'
import RightColumn from './RightColumn'
import ZenMode from '../zen/ZenMode'

export default function DashboardWrapper({ initialView = 'overview' }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeView, setActiveView] = useState(initialView)
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [isStoreOpen, setIsStoreOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  // Sync state with prop if prop changes (e.g. on navigation)
  useEffect(() => {
    setActiveView(initialView)
  }, [initialView])

  const handleStoreToggle = () => {
    setIsStoreOpen(!isStoreOpen)
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#1a1c1e] flex overflow-hidden relative">
      {/* ── Zen Mode — full-screen takeover ── */}
      <AnimatePresence>
        {isFocusMode && (
          <ZenMode
            onExit={() => setIsFocusMode(false)}
          />
        )}
      </AnimatePresence>

      {/* Overlay for RS2 — only visible when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-[150] bg-stone-900/20 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] animate-in fade-in"
          onClick={() => setIsExpanded(false)}
        />
      )}
      
      <LeftColumn 
        isExpanded={isExpanded}
        activeView={activeView}
        onViewChange={setActiveView}
        onToggleSidebar={() => setIsExpanded(!isExpanded)}
        isStoreOpen={isStoreOpen}
        onStoreToggle={handleStoreToggle}
      />
      <RightColumn 
        isExpanded={isExpanded}
        isFocusMode={isFocusMode}
        onFocusModeToggle={() => setIsFocusMode(!isFocusMode)}
        activeView={activeView}
        onViewChange={setActiveView}
        isStoreOpen={isStoreOpen}
        onStoreToggle={handleStoreToggle}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
      />
    </div>
  )
}
