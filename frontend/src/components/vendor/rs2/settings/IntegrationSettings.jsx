// src/components/vendor/rs2/settings/IntegrationSettings.jsx
import { Element3, Printer, Monitor, CloudChange, LampOn } from 'iconsax-reactjs'

export default function IntegrationSettings({ settings, onUpdate }) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <Element3 size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Integrations</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Connect with third-party tools</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Print Server */}
          <div className="p-6 rounded-[2rem] bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white dark:bg-stone-900 shadow-sm text-amber-500">
                  <Printer size="20" variant="Bold" />
                </div>
                <span className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-tight">Print Server</span>
              </div>
              <button
                onClick={() => onUpdate('printServer', 'enabled', !settings.integrations.printServer.enabled)}
                className={`relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner ${settings.integrations.printServer.enabled ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md ${settings.integrations.printServer.enabled ? 'left-5.5' : 'left-0.5'}`} />
              </button>
            </div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Connect your thermal printer for automatic order receipts.</p>
          </div>

          {/* POS System */}
          <div className="p-6 rounded-[2rem] bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white dark:bg-stone-900 shadow-sm text-amber-500">
                  <Monitor size="20" variant="Bold" />
                </div>
                <span className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-tight">POS System</span>
              </div>
              <button
                onClick={() => onUpdate('posSystem', 'enabled', !settings.integrations.posSystem.enabled)}
                className={`relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner ${settings.integrations.posSystem.enabled ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md ${settings.integrations.posSystem.enabled ? 'left-5.5' : 'left-0.5'}`} />
              </button>
            </div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Sync EatUp orders directly to your local Point of Sale.</p>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-stone-100 dark:border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xl">
            <CloudChange size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">API Access</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Build custom workflows with our API</p>
          </div>
        </div>
        
        <div className="p-6 rounded-[2.5rem] bg-stone-900 text-white shadow-2xl shadow-stone-900/20">
           <p className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">Store API Key</p>
           <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <code className="flex-1 text-xs font-mono text-amber-400 truncate">pk_live_51Mzc...45k9v0xLz2a</code>
              <button className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-white text-stone-900">Reveal</button>
           </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-500/5 rounded-2xl flex items-start gap-3 border border-amber-100 dark:border-amber-500/10">
        <LampOn size="18" className="text-amber-500 shrink-0" variant="Bulk" />
        <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400/80 leading-relaxed uppercase tracking-widest">
          External integrations may require additional configuration on the provider's side. Refer to documentation for setup guides.
        </p>
      </div>
    </div>
  )
}
