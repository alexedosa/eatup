// src/components/vendor/rs2/settings/SettingsPage.jsx
'use client'

import { motion } from 'framer-motion'
import { Save2 } from 'iconsax-reactjs'
import { useSettingsManagement } from '@/hooks/useSettingsManagement'
import SettingsSidebar from './SettingsSidebar'
import GeneralSettings from './GeneralSettings'
import OrderSettings from './OrderSettings'
import DeliverySettings from './DeliverySettings'
import NotificationSettings from './NotificationSettings'
import TeamSettings from './TeamSettings'
import SecuritySettings from './SecuritySettings'
import IntegrationSettings from './IntegrationSettings'
import BillingSettings from './BillingSettings'
import DangerZone from './DangerZone'

export default function SettingsPage() {
  const {
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
  } = useSettingsManagement()
  
  const renderContent = () => {
    switch (activeCategory) {
      case 'general':
        return <GeneralSettings settings={settings} onUpdate={updateGeneralSetting} />
      case 'orders':
        return <OrderSettings settings={settings} onUpdate={updateOrderSetting} />
      case 'delivery':
        return <DeliverySettings settings={settings} onUpdate={updateDeliverySetting} />
      case 'notifications':
        return (
          <NotificationSettings
            settings={settings}
            onToggleEmail={toggleEmailNotification}
            onTogglePush={togglePushNotification}
            onToggleSound={toggleSoundNotification}
          />
        )
      case 'team':
        return (
          <TeamSettings
            team={settings.team}
            onAddMember={addTeamMember}
            onRemoveMember={removeTeamMember}
            onToggleActive={toggleTeamMemberActive}
            onUpdateRole={updateTeamMemberRole}
            isAddingStaff={isAddingStaff}
            setIsAddingStaff={setIsAddingStaff}
          />
        )
      case 'security':
        return <SecuritySettings settings={settings} onUpdate={updateSecuritySetting} />
      case 'integrations':
        return <IntegrationSettings settings={settings} onUpdate={updateIntegrationSetting} />
      case 'billing':
        return <BillingSettings settings={settings} />
      default:
        return null
    }
  }
  
  return (
    <div className="w-full space-y-8 mx-auto pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-black text-stone-900 dark:text-white tracking-tight">System Settings</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1 font-medium">Manage your store preferences and operational configurations</p>
        </div>
        
        <button
          onClick={saveAllSettings}
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
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <SettingsSidebar
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
        
        {/* Content Area */}
        <div className="lg:col-span-3">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-[#1a1c1e] backdrop-blur-xl rounded-[2.5rem] border border-stone-100 dark:border-white/10 p-8 md:p-10 shadow-sm"
          >
            {renderContent()}
            
            {/* Danger Zone - only show at bottom of General */}
            {activeCategory === 'general' && (
              <div className="mt-12">
                <DangerZone onResetSettings={resetToDefaults} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
