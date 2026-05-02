"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun1, Moon } from "iconsax-reactjs";

export default function ThemeToggle({ className = "" }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        w-10 h-10 rounded-full
        bg-stone-900 dark:bg-stone-800 text-white
        flex items-center justify-center
        shadow-lg transition-all duration-300
        hover:scale-110 active:scale-95
        ${className}
      `}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun1 variant="Bold" size="20" className="text-white" />
      ) : (
        <Moon variant="Bold" size="20" className="text-white" />
      )}
    </button>
  );
}
