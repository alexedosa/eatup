"use client"

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CloseCircle } from 'iconsax-reactjs'
import WelcomeModal from './WelcomeModal'
import ShopCreationForm from './ShopCreationForm'
import SuccessState from './SuccessState'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function OnboardingOverlay({ open, userName, onClose, onCompleted }) {
  const modalRef = useRef(null)
  const previousFocusRef = useRef(null)
  const [screen, setScreen] = useState('welcome')

  useEffect(() => {
    if (!open) return undefined

    previousFocusRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      const firstFocusable = modalRef.current?.querySelector(FOCUSABLE_SELECTOR)
      firstFocusable?.focus()
    }, 80)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus?.()
    }
  }, [open])

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      if (screen !== 'success') {
        onClose()
      }
      return
    }

    if (event.key !== 'Tab') return

    const focusable = Array.from(modalRef.current?.querySelectorAll(FOCUSABLE_SELECTOR) || [])
    if (focusable.length === 0) {
      event.preventDefault()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  useEffect(() => {
    if (open) return undefined

    const timer = window.setTimeout(() => {
      setScreen('welcome')
    }, 0)

    return () => window.clearTimeout(timer)
  }, [open])

  const handleCreated = async (shop) => {
    setScreen('success')
    await onCompleted(shop)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-y-auto bg-black/[0.45] px-4 py-6 backdrop-blur-[12px] sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          aria-hidden={!open}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="shop-onboarding-title"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            className="relative flex max-h-[min(90vh,760px)] w-full max-w-[560px] flex-col overflow-hidden rounded-[24px] border border-white/80 bg-white shadow-[0_32px_100px_rgba(15,23,42,0.28)] outline-none dark:border-white/10 dark:bg-[#1a1c1e]"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <h1 id="shop-onboarding-title" className="sr-only">
              Create your first shop
            </h1>
            {screen !== 'success' && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close shop onboarding"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 shadow-sm transition-all hover:-translate-y-0.5 hover:border-stone-300 hover:text-stone-900 focus:outline-none focus:ring-4 focus:ring-stone-900/10 dark:border-white/10 dark:bg-white/5 dark:text-stone-300 dark:hover:text-white"
              >
                <CloseCircle size="20" variant="Bold" />
              </button>
            )}
            <div className="overflow-y-auto overscroll-contain p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {screen === 'welcome' && (
                  <WelcomeModal userName={userName} onContinue={() => setScreen('form')} />
                )}
                {screen === 'form' && <ShopCreationForm onCreated={handleCreated} />}
                {screen === 'success' && <SuccessState />}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
