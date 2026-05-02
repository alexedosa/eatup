// src/components/vendor/rs2/profile/ContactInfoCard.jsx
import { useState } from 'react'
import { Instagram, Facebook, VideoPlay, Edit2, TickCircle, CloseCircle, People, Send2 } from 'iconsax-reactjs'

export default function ContactInfoCard({ social, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...social })
  
  const platforms = [
    { id: 'instagram', label: 'Instagram', icon: <Instagram size="20" variant="Bold" />, color: 'text-pink-500', placeholder: '@username' },
    { id: 'facebook', label: 'Facebook', icon: <Facebook size="20" variant="Bold" />, color: 'text-blue-600', placeholder: 'facebook.com/username' },
    { id: 'twitter', label: 'Twitter', icon: <Send2 size="20" variant="Bold" />, color: 'text-sky-400', placeholder: '@username' },
    { id: 'tiktok', label: 'TikTok', icon: <VideoPlay size="20" variant="Bold" />, color: 'text-stone-800 dark:text-white', placeholder: '@username' }
  ]
  
  const handleSave = () => {
    Object.keys(formData).forEach(key => {
      if (formData[key] !== social[key]) {
        onUpdate(key, formData[key])
      }
    })
    setIsEditing(false)
  }
  
  return (
    <div className="bg-white dark:bg-[#1a1c1e] rounded-[2rem] border border-stone-100 dark:border-white/10 shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-6 border-b border-stone-100 dark:border-white/5 bg-gradient-to-r from-amber-50/30 dark:from-amber-500/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
              <People size="20" variant="Bold" />
            </div>
            <div>
              <h2 className="font-display font-black text-stone-900 dark:text-white tracking-tight">Contact & Social</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mt-1">Connect with your community</p>
            </div>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-xl bg-stone-50 dark:bg-white/5 text-stone-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all"
            >
              <Edit2 size="18" variant="Bold" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-xl bg-stone-50 dark:bg-white/5 text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
              >
                <CloseCircle size="20" variant="Bold" />
              </button>
              <button
                onClick={handleSave}
                className="p-2 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all"
              >
                <TickCircle size="20" variant="Bold" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {platforms.map((platform) => (
          <div key={platform.id} className="flex items-center gap-4 bg-stone-50/50 dark:bg-white/5 p-4 rounded-2xl border border-stone-50 dark:border-white/5 group transition-all duration-300 hover:shadow-md hover:border-amber-200/50">
            <div className={`p-2.5 rounded-xl bg-white dark:bg-stone-900 shadow-sm ${platform.color} group-hover:scale-110 transition-transform`}>
              {platform.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">{platform.label}</p>
              {isEditing ? (
                <input
                  type="text"
                  value={formData[platform.id]}
                  onChange={(e) => setFormData({ ...formData, [platform.id]: e.target.value })}
                  placeholder={platform.placeholder}
                  className="w-full bg-transparent text-sm font-bold text-stone-800 dark:text-white focus:outline-none placeholder:text-stone-300 dark:placeholder:text-stone-600"
                />
              ) : (
                <p className="text-sm font-black text-stone-800 dark:text-white truncate">
                  {social[platform.id] || <span className="text-stone-300 dark:text-stone-700">Not connected</span>}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
