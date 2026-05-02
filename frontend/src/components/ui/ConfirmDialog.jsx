"use client";

import { useState } from "react";

/**
 * ConfirmDialog Component
 * Reusable confirmation dialog for destructive actions
 */
export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDangerous = false,
  onConfirm,
  onCancel,
}) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onCancel?.();
      setIsClosing(false);
    }, 150);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity duration-150
          ${isClosing ? "opacity-0" : "opacity-100"}
        `}
        onClick={handleClose}
      />

      {/* Dialog */}
      <div
        className={`
          fixed top-1/2 left-1/2 z-50 w-96 max-w-[calc(100%-2rem)]
          transform -translate-x-1/2 -translate-y-1/2
          bg-white dark:bg-stone-900 rounded-2xl shadow-xl
          transition-all duration-150
          ${isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}
        `}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 mb-6">
            {message}
          </p>

          <div className="flex gap-3 justify-end">
            <button
              onClick={handleClose}
              className="
                px-4 py-2 rounded-lg font-medium text-sm
                text-stone-700 dark:text-stone-300
                bg-stone-100 dark:bg-stone-800
                hover:bg-stone-200 dark:hover:bg-stone-700
                transition-colors
                focus-visible:ring-2 focus-visible:ring-brand-500
              "
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm?.();
                handleClose();
              }}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm
                text-white transition-colors
                focus-visible:ring-2 focus-visible:ring-offset-2
                ${
                  isDangerous
                    ? "bg-red-500 hover:bg-red-600 focus-visible:ring-red-500"
                    : "bg-brand-500 hover:bg-brand-600 focus-visible:ring-brand-500"
                }
              `}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
