// src/hooks/useSettingsManagement.js
import { useState, useCallback, useEffect } from 'react'
import { INITIAL_SETTINGS_STATE } from '@/lib/settingsUtils'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'

function mergeSettings(serverSettings) {
  if (!serverSettings || typeof serverSettings !== 'object') {
    return INITIAL_SETTINGS_STATE
  }

  return {
    ...INITIAL_SETTINGS_STATE,
    ...serverSettings,
    general: { ...INITIAL_SETTINGS_STATE.general, ...serverSettings.general },
    orders: { ...INITIAL_SETTINGS_STATE.orders, ...serverSettings.orders },
    delivery: { ...INITIAL_SETTINGS_STATE.delivery, ...serverSettings.delivery },
    notifications: {
      email: {
        ...INITIAL_SETTINGS_STATE.notifications.email,
        ...serverSettings.notifications?.email,
      },
      push: {
        ...INITIAL_SETTINGS_STATE.notifications.push,
        ...serverSettings.notifications?.push,
      },
      sound: {
        ...INITIAL_SETTINGS_STATE.notifications.sound,
        ...serverSettings.notifications?.sound,
      },
    },
    security: { ...INITIAL_SETTINGS_STATE.security, ...serverSettings.security },
    integrations: {
      printServer: {
        ...INITIAL_SETTINGS_STATE.integrations.printServer,
        ...serverSettings.integrations?.printServer,
      },
      posSystem: {
        ...INITIAL_SETTINGS_STATE.integrations.posSystem,
        ...serverSettings.integrations?.posSystem,
      },
      accountingSoftware: {
        ...INITIAL_SETTINGS_STATE.integrations.accountingSoftware,
        ...serverSettings.integrations?.accountingSoftware,
      },
    },
    billing: {
      ...INITIAL_SETTINGS_STATE.billing,
      ...serverSettings.billing,
      planDetails: {
        ...INITIAL_SETTINGS_STATE.billing.planDetails,
        ...serverSettings.billing?.planDetails,
      },
    },
  }
}

export function useSettingsManagement() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS_STATE)
  const [activeCategory, setActiveCategory] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [isAddingStaff, setIsAddingStaff] = useState(false)
  const [team, setTeam] = useState([])
  const [isLoadingTeam, setIsLoadingTeam] = useState(true)

  useEffect(() => {
    const loadFromApi = async () => {
      setIsLoadingTeam(true)
      try {
        const [serverSettings, teamData] = await Promise.all([
          api.vendor.settings.get().catch(() => null),
          api.vendor.team.list().catch(() => []),
        ])
        if (serverSettings) {
          setSettings(mergeSettings(serverSettings))
        }
        setTeam(Array.isArray(teamData) ? teamData : [])
      } catch {
        toast.error('Failed to load settings')
      } finally {
        setIsLoadingTeam(false)
      }
    }
    loadFromApi()
  }, [])

  const updateGeneralSetting = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      general: { ...prev.general, [key]: value }
    }))
    toast.success('General setting updated', { id: 'settings-update' })
  }, [])
  
  const updateOrderSetting = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      orders: { ...prev.orders, [key]: value }
    }))
    toast.success('Order setting updated', { id: 'settings-update' })
  }, [])
  
  const updateDeliverySetting = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      delivery: { ...prev.delivery, [key]: value }
    }))
    toast.success('Delivery setting updated', { id: 'settings-update' })
  }, [])
  
  const toggleEmailNotification = useCallback((key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        email: { ...prev.notifications.email, [key]: !prev.notifications.email[key] }
      }
    }))
  }, [])
  
  const togglePushNotification = useCallback((key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        push: { ...prev.notifications.push, [key]: !prev.notifications.push[key] }
      }
    }))
  }, [])
  
  const toggleSoundNotification = useCallback((key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        sound: { ...prev.notifications.sound, [key]: !prev.notifications.sound[key] }
      }
    }))
  }, [])
  
  const addTeamMember = useCallback(async (member) => {
    setIsAddingStaff(true)
    try {
      const newMember = await api.vendor.team.invite({
        email: member.email,
        role: member.role,
        name: member.name,
      })
      setTeam((prev) => [...prev, newMember])
      toast.success(`${member.name || member.email} invited to team`)
    } catch (err) {
      toast.error(err?.message || 'Failed to invite team member')
    } finally {
      setIsAddingStaff(false)
    }
  }, [])
  
  const removeTeamMember = useCallback(async (id) => {
    try {
      await api.vendor.team.delete(id)
      setTeam((prev) => prev.filter((m) => m.id !== id))
      toast.success('Team member removed')
    } catch (err) {
      toast.error(err?.message || 'Failed to remove team member')
    }
  }, [])
  
  const toggleTeamMemberActive = useCallback((id) => {
    setTeam((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, isActive: !member.isActive } : member
      )
    )
  }, [])
  
  const updateTeamMemberRole = useCallback((id, role) => {
    setTeam((prev) =>
      prev.map((member) => (member.id === id ? { ...member, role } : member))
    )
    toast.success('Role updated')
  }, [])
  
  const updateSecuritySetting = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, [key]: value }
    }))
    toast.success('Security setting updated', { id: 'settings-update' })
  }, [])
  
  const updateIntegrationSetting = useCallback((category, key, value) => {
    setSettings(prev => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [category]: { ...prev.integrations[category], [key]: value }
      }
    }))
  }, [])
  
  const saveAllSettings = useCallback(async () => {
    setIsSaving(true)
    try {
      await api.vendor.settings.update(settings)
      toast.success('All settings saved successfully')
    } catch (err) {
      toast.error(err?.message || 'Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }, [settings])
  
  const resetToDefaults = useCallback(() => {
    if (confirm('Reset all settings to default values? This cannot be undone.')) {
      setSettings(INITIAL_SETTINGS_STATE)
      toast.success('Settings reset to defaults')
    }
  }, [])
  
  return {
    settings,
    team,
    activeCategory,
    setActiveCategory,
    isSaving,
    isAddingStaff,
    isLoadingTeam,
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
