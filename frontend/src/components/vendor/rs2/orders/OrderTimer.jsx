import { useState, useEffect } from 'react'
import { Clock } from 'iconsax-reactjs'

export default function OrderTimer({ timestamp }) {
  const [elapsed, setElapsed] = useState('')
  
  useEffect(() => {
    const updateTimer = () => {
      const seconds = Math.floor((Date.now() - timestamp) / 1000)
      if (seconds < 60) {
        setElapsed(`${seconds} sec ago`)
      } else if (seconds < 3600) {
        setElapsed(`${Math.floor(seconds / 60)} min ago`)
      } else {
        setElapsed(`${Math.floor(seconds / 3600)} hr ago`)
      }
    }
    
    updateTimer()
    const interval = setInterval(updateTimer, 60000)
    return () => clearInterval(interval)
  }, [timestamp])
  
  return (
    <span className="text-xs text-stone-400 flex items-center gap-1">
      <Clock size="12" variant="Outline" />
      {elapsed}
    </span>
  )
}
