'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function NetworkTracker() {
  const [isOffline, setIsOffline] = useState(false);
  
  useEffect(() => {
    let toastId = null;

    const handleOffline = () => {
      setIsOffline(true);
      toastId = toast.error(
        "Connection Lost. You are currently offline. We will reconnect when network is restored.",
        { 
          duration: Infinity, // Persistent until dismissed or online
          id: 'network-offline',
          style: { background: '#ef4444', color: '#fff', fontWeight: 'bold' }
        }
      );
    };

    const handleOnline = () => {
      if (isOffline) {
        setIsOffline(false);
        toast.dismiss('network-offline');
        toast.success("Connection Restored! You are back online.", {
          id: 'network-online',
          style: { background: '#10b981', color: '#fff', fontWeight: 'bold' }
        });
      }
    };

    // Check initial state
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      handleOffline();
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [isOffline]);

  return null;
}
