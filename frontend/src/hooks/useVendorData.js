import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export function useVendorData() {
  const [vendorInfo, setVendorInfo] = useState({
    name: 'Loading...',
    category: '...',
    location: '...',
    logo: '?',
    isLoading: true
  });

  useEffect(() => {
    async function fetchInfo() {
      try {
        const shops = await api.shops.getMy();
        if (shops && shops.length > 0) {
          const shop = shops[0];
          setVendorInfo({
            name: shop.name || 'Unnamed Shop',
            category: shop.description || 'General Vendor',
            location: shop.address || 'Location not set',
            logo: (shop.name ? shop.name.charAt(0) : 'S'),
            isLoading: false
          });
        } else {
          setVendorInfo(prev => ({ ...prev, name: 'No Shop Found', isLoading: false }));
        }
      } catch (err) {
        console.error('Failed to fetch vendor info:', err);
        setVendorInfo(prev => ({ ...prev, name: 'Error Loading', isLoading: false }));
      }
    }
    fetchInfo();
  }, []);

  return vendorInfo;
}
