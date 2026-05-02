// src/components/vendor/rs2/profile/StoreAvatarUpload.jsx
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Camera, Shop } from 'iconsax-reactjs'
import Image from 'next/image'

export default function StoreAvatarUpload({ storeName, storeImage, onUpload }) {
  const [isHovering, setIsHovering] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)
  
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
      onUpload(file)
    } else {
      alert('Please select a valid image (JPEG, PNG, or WEBP)')
    }
  }
  
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  
  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
      onUpload(file)
    }
  }
  
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Avatar Container */}
      <div
        className={`
          w-28 h-28 rounded-[2rem] overflow-hidden
          bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-500/10 dark:to-orange-500/10
          flex items-center justify-center
          border-2 transition-all duration-300
          ${isDragging 
            ? 'border-amber-500 border-dashed scale-105 bg-amber-50 dark:bg-amber-500/20' 
            : 'border-white dark:border-white/10 border-solid shadow-sm'
          }
          ${isHovering ? 'shadow-xl scale-[1.02]' : ''}
        `}
      >
        {storeImage ? (
          <Image src={storeImage} alt={storeName} width={112} height={112} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center flex flex-col items-center">
            <Shop size="32" variant="Bulk" className="text-amber-500 mb-1" />
            <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">No logo</div>
          </div>
        )}
      </div>
      
      {/* Upload Overlay */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.9 }}
        transition={{ duration: 0.2 }}
        onClick={() => fileInputRef.current?.click()}
        className="
          absolute -bottom-1 -right-1
          w-9 h-9 rounded-xl
          bg-stone-900 dark:bg-white shadow-xl
          flex items-center justify-center
          text-white dark:text-stone-900
          hover:bg-black dark:hover:bg-stone-100
          transition-all duration-200
        "
      >
        <Camera size="18" variant="Bold" />
      </motion.button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-[2rem]">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Drop image</p>
        </div>
      )}
    </div>
  )
}
