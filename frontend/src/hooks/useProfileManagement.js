// src/hooks/useProfileManagement.js
import { useState, useCallback } from 'react'
import { MOCK_PROFILE, DAYS } from '@/data/mockProfile'
import toast from 'react-hot-toast'

export function useProfileManagement() {
  const [profile, setProfile] = useState(MOCK_PROFILE)
  const [isEditing, setIsEditing] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  
  // Update basic info
  const updateBasicInfo = useCallback((field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    setIsEditing(prev => ({ ...prev, [field]: false }))
    toast.success('Information updated')
  }, [])
  
  // Update address
  const updateAddress = useCallback((field, value) => {
    setProfile(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }))
  }, [])
  
  // Update hours
  const updateHours = useCallback((day, field, value) => {
    setProfile(prev => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: { ...prev.hours[day], [field]: value }
      }
    }))
    toast.success(`${day} hours updated`)
  }, [])
  
  // Toggle day open/closed
  const toggleDayOpen = useCallback((day) => {
    setProfile(prev => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: {
          ...prev.hours[day],
          isOpen: !prev.hours[day].isOpen
        }
      }
    }))
    const dayName = DAYS.find(d => d.id === day)?.label
    toast.success(`${dayName} is now ${!profile.hours[day].isOpen ? 'open' : 'closed'}`)
  }, [profile.hours])
  
  // Update social media
  const updateSocial = useCallback((platform, value) => {
    setProfile(prev => ({
      ...prev,
      social: { ...prev.social, [platform]: value }
    }))
  }, [])
  
  // Update bank details
  const updateBank = useCallback((field, value) => {
    setProfile(prev => ({
      ...prev,
      bank: { ...prev.bank, [field]: value }
    }))
  }, [])
  
  // Update settings
  const updateSetting = useCallback((key, value) => {
    setProfile(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: value }
    }))
    toast.success('Setting updated')
  }, [])
  
  // Update store image
  const updateStoreImage = useCallback((file) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setProfile(prev => ({ ...prev, storeImage: reader.result }))
      toast.success('Store image updated')
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }, [])
  
  // Save all changes
  const saveAllChanges = useCallback(async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast.success('All changes saved successfully')
  }, [])
  
  // Check if store is open now
  const isStoreOpenNow = useCallback(() => {
    const now = new Date()
    const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1
    const day = DAYS[dayIndex]?.id
    const todayHours = profile.hours[day]
    
    if (!todayHours?.isOpen) return false
    
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    return currentTime >= todayHours.open && currentTime <= todayHours.close
  }, [profile.hours])
  
  return {
    profile,
    isEditing,
    setIsEditing,
    isSaving,
    activeTab,
    setActiveTab,
    updateBasicInfo,
    updateAddress,
    updateHours,
    toggleDayOpen,
    updateSocial,
    updateBank,
    updateSetting,
    updateStoreImage,
    saveAllChanges,
    isStoreOpenNow
  }
}
