// src/components/vendor/rs2/profile/LocationCard.jsx
import { useState } from 'react'
import { Location, Map as MapIcon, Edit2, TickCircle, CloseCircle } from 'iconsax-reactjs'

export default function LocationCard({ address, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...address })
  
  const handleSave = () => {
    Object.keys(formData).forEach(key => {
      if (formData[key] !== address[key]) {
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
              <Location size="20" variant="Bold" />
            </div>
            <div>
              <h2 className="font-display font-black text-stone-900 dark:text-white tracking-tight">Location</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mt-1">Where customers find you</p>
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
      
      <div className="p-6 space-y-6">
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Street Address</label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-bold"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-bold"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Postal Code</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 px-1">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-white/5 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 dark:focus:border-amber-500/50 transition-all text-stone-800 dark:text-white font-bold"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-white/5 text-amber-500 border border-stone-100 dark:border-white/10">
                <Location size="24" variant="Bulk" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-stone-800 dark:text-white leading-tight">{address.street}</p>
                <p className="text-xs font-bold text-stone-500 dark:text-stone-400 mt-1 uppercase tracking-widest">{address.city}, {address.state} {address.postalCode}</p>
                <p className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.2em] mt-1.5">{address.country}</p>
              </div>
            </div>
            
            {/* Map Preview (mock) */}
            <div className="relative h-48 rounded-[2rem] bg-gradient-to-br from-amber-100/50 to-orange-100/50 dark:from-amber-500/5 dark:to-orange-500/5 border border-stone-100 dark:border-white/10 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
                {/* Visual grid hint */}
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              </div>
              
              <div className="relative text-center flex flex-col items-center">
                <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 shadow-xl text-amber-500 mb-3 scale-110">
                  <MapIcon size="32" variant="Bulk" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-600 dark:text-stone-300">Live Map View</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/10 text-[8px] font-black text-amber-600 uppercase tracking-widest">Lat: {address.coordinates.lat}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/10 text-[8px] font-black text-amber-600 uppercase tracking-widest">Lng: {address.coordinates.lng}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
