"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { CloseCircle, MessageQuestion } from 'iconsax-reactjs'
import { buildVendorSupportMessage } from '@/lib/vendorAccessControl'

export default function VendorApprovalPending({ user, onLogout }) {
  const closeButtonRef = useRef(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const supportMessage = useMemo(() => buildVendorSupportMessage(user), [user])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 60)

    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    await onLogout()
  }

  const handleContactSupport = () => {
    const subject = encodeURIComponent('Vendor account verification status')
    const body = encodeURIComponent(supportMessage)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <div className="fixed inset-0 z-[400] flex min-h-screen items-center justify-center bg-stone-950/55 px-4 py-6 backdrop-blur-[10px]">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="vendor-approval-title"
        aria-describedby="vendor-approval-description"
        className="relative w-full max-w-[520px] rounded-[20px] border border-white/70 bg-white p-6 shadow-[0_32px_100px_rgba(15,23,42,0.28)] outline-none dark:border-white/10 dark:bg-[#1a1c1e] sm:p-8"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          aria-label="Close and log out"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 shadow-sm transition-all hover:border-stone-300 hover:text-stone-900 focus:outline-none focus:ring-4 focus:ring-stone-900/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-stone-300 dark:hover:text-white"
        >
          {isLoggingOut ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900 dark:border-white/20 dark:border-t-white" />
          ) : (
            <CloseCircle size="20" variant="Bold" />
          )}
        </button>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
          <MessageQuestion size="26" variant="Bold" />
        </div>

        <div className="mt-6 space-y-3 pr-8">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-600 dark:text-amber-300">
            Vendor approval
          </p>
          <h1 id="vendor-approval-title" className="font-display text-2xl font-black tracking-tight text-stone-950 dark:text-white sm:text-3xl">
            Account not verified
          </h1>
          <p id="vendor-approval-description" className="text-sm font-medium leading-7 text-stone-600 dark:text-stone-300">
            Your vendor account is awaiting EatUp admin approval. You will be able to access your dashboard after your account has been approved.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleContactSupport}
            className="flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-stone-950 px-5 py-3 text-sm font-black text-white shadow-xl shadow-stone-950/15 transition-all hover:-translate-y-0.5 hover:bg-stone-800 focus:outline-none focus:ring-4 focus:ring-amber-500/20 dark:bg-white dark:text-stone-950 dark:hover:bg-stone-100"
          >
            Contact Support
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-stone-200 bg-white px-5 py-3 text-sm font-black text-stone-700 transition-all hover:border-stone-300 hover:bg-stone-50 focus:outline-none focus:ring-4 focus:ring-stone-900/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-stone-200 dark:hover:bg-white/10"
          >
            {isLoggingOut ? 'Logging out...' : 'Close and Log Out'}
          </button>
        </div>
      </section>
    </div>
  )
}
