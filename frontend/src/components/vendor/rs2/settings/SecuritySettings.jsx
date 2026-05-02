// src/components/vendor/rs2/settings/SecuritySettings.jsx
import { Lock, ShieldSecurity, Key, LampOn } from 'iconsax-reactjs'

export default function SecuritySettings({ settings, onUpdate }) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <Lock size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Security & Privacy</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Protect your store and data</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between p-5 rounded-[2rem] bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 cursor-pointer hover:border-amber-200/50 transition-all duration-300">
            <div>
              <span className="text-sm font-black text-stone-800 dark:text-white tracking-tight">Two-Factor Authentication</span>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Add an extra layer of security to your account</p>
            </div>
            <button
              onClick={() => onUpdate('twoFactorEnabled', !settings.security.twoFactorEnabled)}
              className={`
                relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner
                ${settings.security.twoFactorEnabled ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}
              `}
            >
              <span className={`
                absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md
                ${settings.security.twoFactorEnabled ? 'left-5.5' : 'left-0.5'}
              `} />
            </button>
          </label>

          <label className="flex items-center justify-between p-5 rounded-[2rem] bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 cursor-pointer hover:border-amber-200/50 transition-all duration-300">
            <div>
              <span className="text-sm font-black text-stone-800 dark:text-white tracking-tight">Login Alerts</span>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Get notified of logins from new devices</p>
            </div>
            <button
              onClick={() => onUpdate('loginAlerts', !settings.security.loginAlerts)}
              className={`
                relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner
                ${settings.security.loginAlerts ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}
              `}
            >
              <span className={`
                absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md
                ${settings.security.loginAlerts ? 'left-5.5' : 'left-0.5'}
              `} />
            </button>
          </label>
        </div>
      </div>
      
      <div className="pt-8 border-t border-stone-100 dark:border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-xl">
            <ShieldSecurity size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Access Control</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Manage sessions and whitelists</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Auto-Logout Session Timeout</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { value: 15, label: '15m' },
                { value: 30, label: '30m' },
                { value: 60, label: '1h' },
                { value: 240, label: '4h' },
                { value: 1440, label: '24h' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => onUpdate('sessionTimeout', option.value)}
                  className={`
                    px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border
                    ${settings.security.sessionTimeout === option.value
                      ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20'
                      : 'bg-stone-50 dark:bg-white/5 text-stone-500 dark:text-stone-400 border-stone-100 dark:border-white/10 hover:border-amber-200'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-[2rem] bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="p-3 rounded-xl bg-white dark:bg-stone-900 shadow-sm text-amber-500">
                 <Key size="20" variant="Bold" />
               </div>
               <div>
                 <p className="text-sm font-black text-stone-900 dark:text-white tracking-tight uppercase">Last Password Change</p>
                 <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">{settings.security.lastPasswordChange}</p>
               </div>
            </div>
            <button className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-stone-900 dark:bg-white text-white dark:text-stone-900">Change</button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-500/5 rounded-2xl flex items-start gap-3 border border-amber-100 dark:border-amber-500/10">
        <LampOn size="18" className="text-amber-500 shrink-0" variant="Bulk" />
        <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400/80 leading-relaxed uppercase tracking-widest">
          IP Whitelisting is available for Enterprise plans. Contact support to enable advanced firewall rules.
        </p>
      </div>
    </div>
  )
}
