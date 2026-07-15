'use client'
import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import FloatingNavbar from '../rs1/FloatingNavbar'
import MainContent from '../rs2/MainContent'
import QuickToolbox from '../rs3/QuickToolbox'
import MobileBottomBar from '../mobile/MobileBottomBar'
import MobileNavbar from '../mobile/MobileNavbar'
import HamburgerMenu from '../mobile/HamburgerMenu'
import MobileDrawer from '../mobile/MobileDrawer'

export default function RightColumn({ 
  isExpanded,
  isFocusMode, 
  onFocusModeToggle,
  activeView,
  onViewChange,
  isStoreOpen,
  onStoreToggle,
  searchQuery,
  onSearch,
  isLoading,
  vendorData,
  dashboardData
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  return (
    <>
      {/* Mobile Hamburger Menu */}
      <HamburgerMenu 
        onClick={() => setIsDrawerOpen(true)} 
        isOpen={isDrawerOpen}
      />
      
      {/* Mobile Drawer */}
      <MobileDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeView={activeView}
        onViewChange={onViewChange}
      />
      
      {/* Main Content Container */}
      <div className={`flex-1 min-w-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.2,0.64,1)] ${!isMobile ? (isExpanded ? 'md:ml-[340px]' : 'md:ml-[120px]') : 'ml-0'} ${isFocusMode ? 'ml-0' : ''}`}>
        {/* Mobile top navbar */}
        {isMobile && (
          <MobileNavbar
            isStoreOpen={isStoreOpen}
            onStoreToggle={onStoreToggle}
            onFocusModeToggle={onFocusModeToggle}
            isFocusMode={isFocusMode}
            vendorData={vendorData}
            dashboardData={dashboardData}
          />
        )}

        <div className={`max-w-7xl mx-auto flex flex-col gap-6 ${isMobile ? 'px-4 py-3 pb-28' : 'p-4 md:p-6 lg:p-8 min-h-screen'}`}>
          {/* RS1 - Floating Navbar (hidden on mobile) */}
          {!isMobile && (
            <FloatingNavbar 
              isFocusMode={isFocusMode}
              onFocusModeToggle={onFocusModeToggle}
              isStoreOpen={isStoreOpen}
              onStoreToggle={onStoreToggle}
              onSearch={onSearch}
              vendorData={vendorData}
              dashboardData={dashboardData}
            />
          )}
          
          {/* RS2 - Main Content */}
          <MainContent 
            activeView={activeView}
            onViewChange={onViewChange}
            searchQuery={searchQuery}
            isLoading={isLoading}
            vendorData={vendorData}
            dashboardData={dashboardData}
          />

          
          {/* RS3 - Quick Toolbox (hidden on mobile and specific views) */}
          {!isMobile && activeView !== 'settings' && activeView !== 'profile' && (
            <QuickToolbox 
              onMetricClick={(view) => onViewChange(view)} 
              dashboardData={dashboardData}
            />
          )}
        </div>
      </div>
      
      {/* Mobile Bottom Bar */}
      {isMobile && (
        <MobileBottomBar 
          activeView={activeView}
          onViewChange={onViewChange}
        />
      )}
    </>
  )
}
