// src/hooks/useProfileManagement.js
import { useState, useCallback, useEffect } from 'react'
import { INITIAL_PROFILE_STATE, DAYS } from '@/lib/profileUtils'
import toast from 'react-hot-toast'
import { getMyShops, updateShop, uploadShopPicture } from '@/lib/api'

export function useProfileManagement() {
  const [profile, setProfile] = useState(INITIAL_PROFILE_STATE)
  const [isEditing, setIsEditing] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [shopId, setShopId] = useState(null)

  // Fetch real shop data on mount
  useEffect(() => {
    async function fetchShop() {
      try {
        const shops = await getMyShops();
        if (shops && shops.length > 0) {
          const shop = shops[0]; // Assuming first shop for now
          setShopId(shop.id);
          
          // Map backend shop data to our profile structure
          // This is a simplified mapping, might need adjustment based on exact API response
          setProfile(prev => ({
            ...prev,
            storeId: shop.id,
            storeName: shop.name,
            storeEmail: shop.contactEmail || prev.storeEmail,
            storePhone: shop.contactPhone || prev.storePhone,
            website: shop.website || prev.website,
            description: shop.description || prev.description,
            storeImage: shop.pictureUrl || prev.storeImage,
            address: {
              ...prev.address,
              street: shop.address || prev.address.street,
              coordinates: shop.latitude ? { lat: shop.latitude, lng: shop.longitude } : prev.address.coordinates
            },
            // Map opening hours if they exist
            hours: shop.openingHours ? mapOpeningHoursFromBackend(shop.openingHours) : prev.hours
          }));
        }
      } catch (err) {
        console.error('Failed to fetch shop:', err);
        // Fallback to mock profile if API fails
      }
    }
    fetchShop();
  }, []);

  // Helper to map opening hours from { mon: "08:00-20:00" } to our format
  function mapOpeningHoursFromBackend(backendHours) {
    const mapped = {};
    const dayMap = { mon: 'monday', tue: 'tuesday', wed: 'wednesday', thu: 'thursday', fri: 'friday', sat: 'saturday', sun: 'sunday' };
    
    Object.entries(dayMap).forEach(([short, full]) => {
      if (backendHours[short]) {
        const [open, close] = backendHours[short].split('-');
        mapped[full] = { open, close, isOpen: true };
      } else {
        mapped[full] = { open: '08:00', close: '20:00', isOpen: false };
      }
    });
    return mapped;
  }

  // Helper to map our hours format to backend { mon: "08:00-20:00" }
  function mapOpeningHoursToBackend(hours) {
    const backend = {};
    const dayMap = { monday: 'mon', tuesday: 'tue', wednesday: 'wed', thursday: 'thu', friday: 'fri', saturday: 'sat', sunday: 'sun' };
    
    Object.entries(dayMap).forEach(([full, short]) => {
      if (hours[full]?.isOpen) {
        backend[short] = `${hours[full].open}-${hours[full].close}`;
      }
    });
    return backend;
  }
  
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
  const updateStoreImage = useCallback(async (file) => {
    if (!shopId) {
      toast.error('No shop found to update picture');
      return;
    }

    const loadingToast = toast.loading('Uploading picture...');
    try {
      const data = await uploadShopPicture(shopId, file);
      setProfile(prev => ({ ...prev, storeImage: data.pictureUrl }));
      toast.success('Store image updated', { id: loadingToast });
    } catch (err) {
      toast.error(err.message || 'Failed to upload picture', { id: loadingToast });
    }
  }, [shopId])
  
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

  // Save all changes
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
        openingHours: mapOpeningHoursToBackend(profile.hours),
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
