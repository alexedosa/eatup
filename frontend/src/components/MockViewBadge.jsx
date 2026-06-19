'use client';

import { MOCK_VIEW } from '@/lib/config';

export default function MockViewBadge() {
  if (!MOCK_VIEW) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-[9999] flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/95 text-white text-[10px] font-black uppercase tracking-widest shadow-lg pointer-events-none"
      aria-label="Mock data mode active"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      Mock data
    </div>
  );
}
