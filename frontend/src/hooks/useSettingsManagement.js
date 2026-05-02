// src/hooks/useSettingsManagement.js
import { useState, useCallback, useEffect } from 'react'
import { MOCK_SETTINGS } from '@/data/mockSettings'
import toast from 'react-hot-toast'

const STORAGE_KEY = 'eatup_vendor_settings'

function loadSettings() {
  if (typeof window === 'undefined') return MOCK_SETTINGS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return MOCK_SETTINGS
}

export function useSettingsManagement() {
  const [settings, setSettings] = useState(() => loadSettings())
  const [activeCategory, setActiveCategory] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [isAddingStaff, setIsAddingStaff] = useState(false)

  // Persist to localStorage whenever settings change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {}
  }, [settings])
  
  // Update general settings
  const updateGeneralSetting = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      general: { ...prev.general, [key]: value }
    }))
    toast.success('General setting updated', { id: 'settings-update' })
  }, [])
  
  // Update order settings
  const updateOrderSetting = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      orders: { ...prev.orders, [key]: value }
    }))
    toast.success('Order setting updated', { id: 'settings-update' })
  }, [])
  
  // Update delivery settings
  const updateDeliverySetting = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      delivery: { ...prev.delivery, [key]: value }
    }))
    toast.success('Delivery setting updated', { id: 'settings-update' })
  }, [])
  
  // Update notification settings
  const updateNotificationSetting = useCallback((category, key, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [category]: { ...prev.notifications[category], [key]: value }
      }
    }))
  }, [])
  
  // Toggle email notification
  const toggleEmailNotification = useCallback((key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        email: { ...prev.notifications.email, [key]: !prev.notifications.email[key] }
      }
    }))
  }, [])
  
  // Toggle push notification
  const togglePushNotification = useCallback((key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        push: { ...prev.notifications.push, [key]: !prev.notifications.push[key] }
      }
    }))
  }, [])
  
  // Toggle sound notification
  const toggleSoundNotification = useCallback((key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        sound: { ...prev.notifications.sound, [key]: !prev.notifications.sound[key] }
      }
    }))
  }, [])
  
  // Add team member
  const addTeamMember = useCallback((member) => {
    const newMember = {
      id: `staff_${Date.now()}`,
      ...member,
      addedAt: new Date().toISOString().split('T')[0],
      isActive: true
    }
    setSettings(prev => ({
      ...prev,
      team: [...prev.team, newMember]
    }))
    toast.success(`${member.name} added to team`)
  }, [])
  
  // Remove team member
  const removeTeamMember = useCallback((id) => {
    setSettings(prev => ({
      ...prev,
      team: prev.team.filter(member => member.id !== id)
    }))
    toast.success('Team member removed')
  }, [])
  
  // Toggle team member active status
  const toggleTeamMemberActive = useCallback((id) => {
    setSettings(prev => ({
      ...prev,
      team: prev.team.map(member =>
        member.id === id ? { ...member, isActive: !member.isActive } : member
      )
    }))
  }, [])
  
  // Update team member role
  const updateTeamMemberRole = useCallback((id, role) => {
    setSettings(prev => ({
      ...prev,
      team: prev.team.map(member =>
        member.id === id ? { ...member, role } : member
      )
    }))
    toast.success('Role updated')
  }, [])
  
  // Update security setting
  const updateSecuritySetting = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, [key]: value }
    }))
    toast.success('Security setting updated', { id: 'settings-update' })
  }, [])
  
  // Update integration setting
  const updateIntegrationSetting = useCallback((category, key, value) => {
    setSettings(prev => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [category]: { ...prev.integrations[category], [key]: value }
      }
    }))
  }, [])
  
  // Save all settings
  const saveAllSettings = useCallback(async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast.success('All settings saved successfully')
  }, [])
  
  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    if (confirm('Reset all settings to default values? This cannot be undone.')) {
      setSettings(MOCK_SETTINGS)
      toast.success('Settings reset to defaults')
    }
  }, [])
  
  return {
    settings,
    activeCategory,
    setActiveCategory,
    isSaving,
    isAddingStaff,
    setIsAddingStaff,
    updateGeneralSetting,
    updateOrderSetting,
    updateDeliverySetting,
    toggleEmailNotification,
    togglePushNotification,
    toggleSoundNotification,
    addTeamMember,
    removeTeamMember,
    toggleTeamMemberActive,
    updateTeamMemberRole,
    updateSecuritySetting,
    updateIntegrationSetting,
    saveAllSettings,
    resetToDefaults
  }
}
