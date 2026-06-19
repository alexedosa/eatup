// src/components/vendor/rs2/profile/StoreInfoCard.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shop, Sms, Call, Global, DocumentText, Edit2, TickCircle, CloseCircle } from 'iconsax-reactjs'
import { validateEmail, validatePhone } from '@/lib/profileUtils'

export default function StoreInfoCard({ profile, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    storeName: profile.storeName,
    storeEmail: profile.storeEmail,
    storePhone: profile.storePhone,
    alternatePhone: profile.alternatePhone,
    website: profile.website,
    description: profile.description
  })
  
  const [errors, setErrors] = useState({})
  
  const handleSave = () => {
    const newErrors = {}
    if (!validateEmail(formData.storeEmail)) newErrors.storeEmail = 'Invalid email format'
    if (formData.storePhone && !validatePhone(formData.storePhone)) newErrors.storePhone = 'Invalid phone number'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    Object.keys(formData).forEach(key => {
      if (formData[key] !== profile[key]) {
        onUpdate(key, formData[key])
      }
    })
    setIsEditing(false)
    setErrors({})
  }
  
  const handleCancel = () => {
    setFormData({
      storeName: profile.storeName,
      storeEmail: profile.storeEmail,
      storePhone: profile.storePhone,
      alternatePhone: profile.alternatePhone,
      website: profile.website,
      description: profile.description
    })
    setIsEditing(false)
    setErrors({})
  }
  
  return (
    <div className="bg-white dark:bg-[#1a1c1e] rounded-[2rem] border border-stone-100 dark:border-white/10 shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-6 border-b border-stone-100 dark:border-white/5 bg-gradient-to-r from-amber-50/30 dark:from-amber-500/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
              <Shop size="20" variant="Bold" />
            </div>
            <div>
              <h2 className="font-display font-black text-stone-900 dark:text-white tracking-tight">Store Information</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400 mt-1">Manage core business identity</p>
            </div>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-xl bg-stone-50 dark:bg-white/5 text-stone-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all"
            >
              <Edit2 size="18" variant="Bold" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="p-2 rounded-xl bg-stone-50 dark:bg-white/5 text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
              >
                <CloseCircle size="20" variant="Bold" />
              </button>
              <button
                onClick={handleSave}
                className="p-2 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all"
              >
                <TickCircle size="20" variant="Bold" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Store Name */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">
            <Shop size="14" /> Store Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-bold"
            />
          ) : (
            <p className="text-sm font-black text-stone-800 dark:text-white px-1">{profile.storeName}</p>
          )}
        </div>
        
        {/* Email */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">
            <Sms size="14" /> Email Address
          </label>
          {isEditing ? (
            <div>
              <input
                type="email"
                value={formData.storeEmail}
                onChange={(e) => setFormData({ ...formData, storeEmail: e.target.value })}
                className={`w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border focus:outline-none focus:ring-4 transition-all text-stone-800 dark:text-white font-bold ${
                  errors.storeEmail ? 'border-red-300 focus:border-red-300 focus:ring-red-100 dark:focus:ring-red-500/10' : 'border-stone-100 dark:border-white/10 focus:border-amber-300 dark:focus:border-amber-500/50 focus:ring-amber-500/5'
                }`}
              />
              {errors.storeEmail && <p className="text-[10px] text-red-500 mt-1.5 font-bold uppercase tracking-widest px-1">{errors.storeEmail}</p>}
            </div>
          ) : (
            <p className="text-sm font-black text-stone-800 dark:text-white px-1">{profile.storeEmail}</p>
          )}
        </div>
        
        {/* Phone Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">
              <Call size="14" /> Primary Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.storePhone}
                onChange={(e) => setFormData({ ...formData, storePhone: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-bold"
              />
            ) : (
              <p className="text-sm font-black text-stone-800 dark:text-white px-1">{profile.storePhone || 'Not set'}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">
              <Call size="14" /> Alternate Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.alternatePhone}
                onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-bold"
              />
            ) : (
              <p className="text-sm font-black text-stone-800 dark:text-white px-1">{profile.alternatePhone || 'Not set'}</p>
            )}
          </div>
        </div>
        
        {/* Website */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">
            <Global size="14" /> Website
          </label>
          {isEditing ? (
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-bold"
              placeholder="www.yourstore.com"
            />
          ) : (
            <p className="text-sm font-black text-amber-500 px-1">{profile.website || 'Not set'}</p>
          )}
        </div>
        
        {/* Description */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">
            <DocumentText size="14" /> Store Description
          </label>
          {isEditing ? (
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-medium resize-none"
              placeholder="Tell customers about your store..."
            />
          ) : (
            <p className="text-sm font-medium text-stone-600 dark:text-stone-400 leading-relaxed px-1">{profile.description || 'No description provided'}</p>
          )}
        </div>
      </div>
    </div>
  )
}
