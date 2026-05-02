import { Setting2 } from 'iconsax-reactjs'

export const Icons = {
  // Primary Nav Icons
  overview: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  
  orders: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  
  menu: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="19" cy="18" r="2" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  
  payments: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M2 10h20" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="5" y="14" width="4" height="2" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  
  analytics: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 17l4-6 4 3 4-7 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 20h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  
  profile: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 21V8l9-5 9 5v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="9" y="14" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M9 10h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  
  settings: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path 
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" 
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  
  // Utility Icons
  messages: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6l-4 3V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  
  brand: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M8 10 Q12 7 16 10 L15 17 Q12 18.5 9 17 Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(232,128,10,0.1)"/>
    </svg>
  ),
  
  expand: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  
  collapse: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  process_orders: (props) => (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      width={props.size || props.width || 24} 
      height={props.size || props.height || 24} 
      {...props}
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}
