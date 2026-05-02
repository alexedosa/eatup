"use client";

import Image from "next/image";

/**
 * CurrencyDisplay Component
 * Displays Naira currency symbol using PNG with proper styling
 * Ensures visibility in both light and dark modes
 */
export default function CurrencyDisplay({ amount, className = "" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="relative w-4 h-4 flex-shrink-0 rounded-full bg-white dark:bg-stone-200 p-0.5 flex items-center justify-center">
        <Image
          src="/assets/currency/nigeria-naira-icon.png"
          alt="Naira"
          width={16}
          height={16}
          className="w-3 h-3 object-contain"
          priority
        />
      </div>
      <span className="font-semibold text-surface-800 dark:text-surface-100">
        {amount}
      </span>
    </div>
  );
}
