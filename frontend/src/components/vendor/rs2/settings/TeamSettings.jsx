// src/components/vendor/rs2/settings/TeamSettings.jsx
import { useState } from 'react'
import { ROLES } from '@/data/mockSettings'
import { People, UserAdd, Trash, Edit2, ShieldTick, LampOn } from 'iconsax-reactjs'

export default function TeamSettings({ 
  team, 
  onAddMember, 
  onRemoveMember, 
  onToggleActive, 
  onUpdateRole,
  isAddingStaff,
  setIsAddingStaff 
}) {
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'staff',
    permissions: ['orders']
  })
  
  const handleAdd = () => {
    if (newMember.name && newMember.email) {
      onAddMember(newMember)
      setNewMember({ name: '', email: '', role: 'staff', permissions: ['orders'] })
      setIsAddingStaff(false)
    }
  }
  
  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400',
      manager: 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',
      staff: 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400',
      viewer: 'bg-stone-100 dark:bg-white/10 text-stone-700 dark:text-stone-400'
    }
    return colors[role] || colors.staff
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
            <People size="24" variant="Bold" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight">Team Management</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">Manage staff access and roles</p>
          </div>
        </div>
        <button
          onClick={() => setIsAddingStaff(!isAddingStaff)}
          className="px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-black dark:hover:bg-stone-100 shadow-xl transition-all flex items-center gap-2"
        >
          <UserAdd size="16" variant="Bold" />
          Add Member
        </button>
      </div>
      
      {/* Add Member Form */}
      {isAddingStaff && (
        <div className="bg-amber-50/50 dark:bg-amber-500/5 rounded-[2.5rem] border border-amber-100 dark:border-amber-500/10 p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 px-1">Full Name</label>
              <input
                type="text"
                placeholder="Staff Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-500/20 focus:outline-none focus:border-amber-500 transition-all text-stone-800 dark:text-white font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 px-1">Email Address</label>
              <input
                type="email"
                placeholder="staff@eatup.com"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-500/20 focus:outline-none focus:border-amber-500 transition-all text-stone-800 dark:text-white font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400 px-1">Initial Role</label>
              <select
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-500/20 focus:outline-none focus:border-amber-500 transition-all text-stone-800 dark:text-white font-bold"
              >
                {ROLES.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAdd}
              className="flex-1 py-4 rounded-2xl bg-amber-500 text-white text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all"
            >
              Confirm Addition
            </button>
            <button
              onClick={() => setIsAddingStaff(false)}
              className="px-8 py-4 rounded-2xl bg-stone-100 dark:bg-white/10 text-stone-600 dark:text-stone-400 text-xs font-black uppercase tracking-[0.2em] hover:bg-stone-200 dark:hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Team List */}
      <div className="space-y-4">
        {team.map((member) => (
          <div key={member.id} className="group bg-stone-50 dark:bg-white/5 p-6 rounded-[2rem] border border-stone-100 dark:border-white/5 hover:border-amber-200/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-500/10 dark:to-orange-500/10 flex items-center justify-center text-xl font-black text-amber-600 dark:text-amber-400 border border-white dark:border-white/5 shadow-inner">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-display font-black text-stone-900 dark:text-white tracking-tight">{member.name}</h4>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${getRoleBadgeColor(member.role)}`}>
                      {ROLES.find(r => r.value === member.role)?.label}
                    </span>
                    {!member.isActive && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-black uppercase tracking-widest">Suspended</span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-stone-400 mt-1">{member.email}</p>
                  <p className="text-[10px] font-bold text-stone-300 dark:text-stone-600 mt-1 uppercase tracking-widest">Added {member.addedAt}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={member.role}
                  onChange={(e) => onUpdateRole(member.id, e.target.value)}
                  className="text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-white/10 focus:outline-none focus:border-amber-300 text-stone-800 dark:text-white transition-all shadow-sm"
                >
                  {ROLES.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
                
                <button
                  onClick={() => onToggleActive(member.id)}
                  className={`
                    p-2.5 rounded-xl transition-all shadow-sm
                    ${member.isActive 
                      ? 'bg-amber-100/50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-500/20' 
                      : 'bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-500/20'}
                  `}
                  title={member.isActive ? 'Suspend Access' : 'Restore Access'}
                >
                  <ShieldTick size="18" variant="Bold" />
                </button>
                
                <button
                  onClick={() => onRemoveMember(member.id)}
                  className="p-2.5 rounded-xl bg-red-100/50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/20 transition-all shadow-sm"
                  title="Remove Permanently"
                >
                  <Trash size="18" variant="Bold" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Role Info */}
      <div className="bg-stone-50 dark:bg-white/5 rounded-[2rem] p-6 border border-stone-100 dark:border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4 px-2">Access Control Mapping</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ROLES.map(role => (
            <div key={role.value} className="flex flex-col p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-white/5">
              <span className="text-xs font-black text-stone-900 dark:text-white tracking-tight uppercase mb-1">{role.label}</span>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{role.permissions}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-amber-50 dark:bg-amber-500/5 rounded-2xl flex items-start gap-3 border border-amber-100 dark:border-amber-500/10">
        <LampOn size="18" className="text-amber-500 shrink-0" variant="Bulk" />
        <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400/80 leading-relaxed uppercase tracking-widest">
          Only Administrators can add or remove team members. Permissions are synced across all devices instantly.
        </p>
      </div>
    </div>
  )
}
