// src/app/vendor/profile/page.jsx
'use client'

import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { Save2 } from 'iconsax-reactjs'
import { useProfileManagement } from '@/hooks/useProfileManagement'
import StoreAvatarUpload from '@/components/vendor/rs2/profile/StoreAvatarUpload'
import StoreInfoCard from '@/components/vendor/rs2/profile/StoreInfoCard'
import StoreHoursCard from '@/components/vendor/rs2/profile/StoreHoursCard'
import LocationCard from '@/components/vendor/rs2/profile/LocationCard'
import ContactInfoCard from '@/components/vendor/rs2/profile/ContactInfoCard'
import BankDetailsCard from '@/components/vendor/rs2/profile/BankDetailsCard'
import PreviewCard from '@/components/vendor/rs2/profile/PreviewCard'

export default function ProfilePage() {
  const {
    profile,
    updateBasicInfo,
    updateAddress,
    updateHours,
    toggleDayOpen,
    updateSocial,
    updateBank,
    updateStoreImage,
    saveAllChanges,
    isSaving,
    isStoreOpenNow
  } = useProfileManagement()
  
  return (
    <div className="w-full space-y-8 max-w-7xl mx-auto pb-10">
      <Toaster position="top-right" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-black text-stone-900 dark:text-white tracking-tight">Business Profile</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1 font-medium">Manage your store presence and operational preferences</p>
        </div>
        
        <button
          onClick={saveAllChanges}
          disabled={isSaving}
          className="
            px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest
            bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xl
            hover:bg-black dark:hover:bg-stone-100
            transition-all duration-200
            flex items-center gap-2
          "
        >
          {isSaving ? (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="30 30"/>
            </svg>
          ) : (
            <Save2 size="20" variant="Bold" />
          )}
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Fixed Width/Stats */}
        <div className="space-y-8">
          {/* Avatar Section */}
          <div className="bg-white dark:bg-[#1a1c1e] rounded-[2.5rem] border border-stone-100 dark:border-white/10 p-8 flex flex-col items-center text-center shadow-sm">
            <StoreAvatarUpload
              storeName={profile.storeName}
              storeImage={profile.storeImage}
              onUpload={updateStoreImage}
            />
            <h3 className="font-display font-black text-xl text-stone-900 dark:text-white mt-5 tracking-tight">{profile.storeName}</h3>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-300">ID: {profile.storeId}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isStoreOpenNow() ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            </div>
          </div>
          
          {/* Preview Card */}
          <div className="space-y-3">
             <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-4">Customer View Preview</p>
             <PreviewCard profile={profile} isOpenNow={isStoreOpenNow()} />
          </div>
          
          {/* Bank Details */}
          <BankDetailsCard bank={profile.bank} onUpdate={updateBank} />
        </div>
        
        {/* Right Column - Forms/Editable Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Store Info */}
          <StoreInfoCard profile={profile} onUpdate={updateBasicInfo} />
          
          {/* Store Hours */}
          <StoreHoursCard
            hours={profile.hours}
            onUpdate={updateHours}
            onToggleDay={toggleDayOpen}
          />
          
          {/* Location */}
          <LocationCard address={profile.address} onUpdate={updateAddress} />
          
          {/* Contact & Social */}
          <ContactInfoCard social={profile.social} onUpdate={updateSocial} />
        </div>
      </div>
    </div>
  )
}
