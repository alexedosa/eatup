// src/app/vendor/settings/page.jsx
'use client'

import SettingsPage from '@/components/vendor/rs2/settings/SettingsPage'
import { Toaster } from 'react-hot-toast'

export default function Page() {
  return (
    <>
      <Toaster position="top-right" />
      <SettingsPage />
    </>
  )
}
