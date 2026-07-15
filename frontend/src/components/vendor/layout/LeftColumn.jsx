import { BRAND } from '@/data/vendorNavItems'
import BrandAnchor from '../ls1/BrandAnchor'
import FloatingSidebar from '../ls2/FloatingSidebar'
import UtilityButton from '../ls3/UtilityButton'

export default function LeftColumn({ 
  isExpanded, 
  activeView, 
  onViewChange, 
  onToggleSidebar,
  showShopSetupNudge = false,
  onShopSetupNudgeClick,
}) {
  return (
    <div className={`fixed inset-y-0 left-[clamp(16px,3vw,32px)] z-[200] hidden md:flex flex-col items-start justify-between py-6 pointer-events-none`}>
      {/* LS1 - Brand Anchor */}
      <div className="shrink-0 flex items-center justify-center w-20 pointer-events-auto">
        <BrandAnchor 
          icon={BRAND.icon}
          label={BRAND.label}
          isActive={true}
          onClick={() => {}}
        />
      </div>
      
      {/* LS2 - Floating Sidebar */}
      <div className="flex-1 flex flex-col justify-center min-h-0 py-6 w-full pointer-events-auto">
        <FloatingSidebar 
          isExpanded={isExpanded}
          activeView={activeView}
          onViewChange={onViewChange}
          onToggle={onToggleSidebar}
        />
      </div>
      
      {/* LS3 - Utility Button */}
      <div className="shrink-0 flex items-center justify-center w-20 pointer-events-auto">
        <UtilityButton 
          onClick={() => {}}
          showProfileNudge={showShopSetupNudge}
          onProfileNudgeClick={onShopSetupNudgeClick}
        />
      </div>
    </div>
  )
}
