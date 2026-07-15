// src/hooks/useProfileManagement.js
import { useState, useCallback, useEffect } from 'react'
import { INITIAL_PROFILE_STATE, DAYS } from '@/lib/profileUtils'
import toast from 'react-hot-toast'
import { getMyShops, updateShop, uploadShopPicture } from '@/lib/api'
import { getShopId, mapProfileHoursToApi, mapShopToProfile } from '@/lib/shopUtils'

export function useProfileManagement() {
  const [profile, setProfile] = useState(INITIAL_PROFILE_STATE)
  const [isEditing, setIsEditing] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [shopId, setShopId] = useState(null)

  useEffect(() => {
    async function fetchShop() {
      try {
        const shops = await getMyShops()
        if (shops && shops.length > 0) {
          const shop = shops[0]
          setShopId(getShopId(shop))
          setProfile((prev) => mapShopToProfile(shop, prev))
        }
      } catch (err) {
        console.error('Failed to fetch shop:', err)
      }
    }

    fetchShop()
  }, [])
  
  const updateBasicInfo = useCallback((field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    setIsEditing(prev => ({ ...prev, [field]: false }))
    toast.success('Information updated')
  }, [])
  
  const updateAddress = useCallback((field, value) => {
    setProfile(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }))
  }, [])
  
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
  
  const updateSocial = useCallback((platform, value) => {
    setProfile(prev => ({
      ...prev,
      social: { ...prev.social, [platform]: value }
    }))
  }, [])
  
  const updateBank = useCallback((field, value) => {
    setProfile(prev => ({
      ...prev,
      bank: { ...prev.bank, [field]: value }
    }))
  }, [])
  
  const updateSetting = useCallback((key, value) => {
    setProfile(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: value }
    }))
    toast.success('Setting updated')
  }, [])
  
  const updateStoreImage = useCallback(async (file) => {
    if (!shopId) {
      toast.error('No shop found to update picture');
      return;
    }

    const loadingToast = toast.loading('Uploading picture...');
    try {
      const data = await uploadShopPicture(shopId, file);
      setProfile(prev => ({ ...prev, storeImage: data.pictureUrl || data.profilePicture }));
      toast.success('Store image updated', { id: loadingToast });
    } catch (err) {
      toast.error(err.message || 'Failed to upload picture', { id: loadingToast });
    }
  }, [shopId])
  
  const isStoreOpenNow = useCallback(() => {
    const now = new Date()
    const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1
    const day = DAYS[dayIndex]?.id
    const todayHours = profile.hours[day]
    
    if (!todayHours?.isOpen) return false
    
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    return currentTime >= todayHours.open && currentTime <= todayHours.close
  }, [profile.hours])

  const saveAllChanges = useCallback(async () => {
    if (!shopId) {
        toast.error('No shop found to update');
        return;
    }

    setIsSaving(true)
    try {
      const updateData = {
        name: profile.storeName,
        address: profile.address.street,
        latitude: profile.address.coordinates.lat,
        longitude: profile.address.coordinates.lng,
        description: profile.description,
        openingHours: mapProfileHoursToApi(profile.hours),
        socialMediaHandles: profile.social,
        website: profile.website,
        contactPhone: profile.storePhone,
        contactEmail: profile.storeEmail,
        isOpen: isStoreOpenNow()
      };

      await updateShop(shopId, updateData);
      toast.success('All changes saved successfully')
    } catch (err) {
      toast.error(err.message || 'Failed to save changes');
    } finally {
      setIsSaving(false)
    }
  }, [shopId, profile, isStoreOpenNow])
  
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
