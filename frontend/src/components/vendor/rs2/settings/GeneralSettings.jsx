// src/components/vendor/rs2/settings/GeneralSettings.jsx
import { LANGUAGES, TIMEZONES } from '@/data/mockSettings'
import { Setting2, Monitor, LampOn } from 'iconsax-reactjs'

export default function GeneralSettings({ settings, onUpdate }) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <Setting2 size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">General Preferences</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Core store configurations</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Language */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Language</label>
            <select
              value={settings.general.storeLanguage}
              onChange={(e) => onUpdate('storeLanguage', e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-bold"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.value} value={lang.value} className="bg-white dark:bg-[#1a1c1e]">{lang.label}</option>
              ))}
            </select>
          </div>
          
          {/* Timezone */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Timezone</label>
            <select
              value={settings.general.storeTimezone}
              onChange={(e) => onUpdate('storeTimezone', e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-bold"
            >
              {TIMEZONES.map(tz => (
                <option key={tz.value} value={tz.value} className="bg-white dark:bg-[#1a1c1e]">{tz.label}</option>
              ))}
            </select>
          </div>
          
          {/* Date Format */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Date Format</label>
            <select
              value={settings.general.dateFormat}
              onChange={(e) => onUpdate('dateFormat', e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-bold"
            >
              <option value="DD/MM/YYYY" className="bg-white dark:bg-[#1a1c1e]">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY" className="bg-white dark:bg-[#1a1c1e]">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD" className="bg-white dark:bg-[#1a1c1e]">YYYY-MM-DD</option>
            </select>
          </div>

          {/* Time Format */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Time Format</label>
            <select
              value={settings.general.timeFormat}
              onChange={(e) => onUpdate('timeFormat', e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-bold"
            >
              <option value="12h" className="bg-white dark:bg-[#1a1c1e]">12-hour (12:00 PM)</option>
              <option value="24h" className="bg-white dark:bg-[#1a1c1e]">24-hour (14:00)</option>
            </select>
          </div>
          
          {/* Low Stock Threshold */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Low Stock Alert Threshold</label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={settings.general.lowStockThreshold}
                onChange={(e) => onUpdate('lowStockThreshold', parseInt(e.target.value))}
                className="w-32 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-black"
              />
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">items remaining</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Display Preferences */}
      <div className="pt-8 border-t border-stone-100 dark:border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xl">
            <Monitor size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Display & UX</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Personalize your dashboard experience</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {[
            { key: 'darkMode', label: 'Dark Mode Appearance', desc: 'Enable high-contrast dark interface' },
            { key: 'compactView', label: 'Compact Data View', desc: 'Show more information with less padding' },
            { key: 'autoBackup', label: 'Automated Cloud Backup', desc: 'Securely sync data to EatUp servers every hour' }
          ].map((item) => (
            <label key={item.key} className="flex items-center justify-between p-4 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 group cursor-pointer hover:border-amber-200/50 transition-all duration-300">
              <div>
                <span className="text-sm font-black text-stone-800 dark:text-white tracking-tight">{item.label}</span>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">{item.desc}</p>
              </div>
              <button
                onClick={() => onUpdate(item.key, !settings.general[item.key])}
                className={`
                  relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner
                  ${settings.general[item.key] ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}
                `}
              >
                <span className={`
                  absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md
                  ${settings.general[item.key] ? 'left-5.5' : 'left-0.5'}
                `} />
              </button>
            </label>
          ))}
        </div>
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-500/5 rounded-2xl flex items-start gap-3 border border-amber-100 dark:border-amber-500/10">
        <LampOn size="18" className="text-amber-500 shrink-0" variant="Bulk" />
        <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400/80 leading-relaxed uppercase tracking-widest">
          General settings affect all team members. Changes are logged for audit purposes.
        </p>
      </div>
    </div>
  )
}
