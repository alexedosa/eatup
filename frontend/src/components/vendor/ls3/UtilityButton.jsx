import IconPlate from "../shared/IconPlate";
import { Sms } from "iconsax-reactjs";
import { useTheme } from "@/context/ThemeContext";

export default function UtilityButton({
  icon: IconComponent = Sms,
  badge = 3,
  onClick,
  className = "",
}) {
  const { isDarkMode } = useTheme();
  
  return (
    <div
      onClick={onClick}
      className={`
        group relative cursor-pointer transition-all duration-300
        hover:scale-110
        ${className}
      `}
    >
      <div className="relative">
        <IconPlate isActive={false} size="sm">
          <IconComponent className={`w-5 h-5 stroke-[2.5] ${isDarkMode ? 'text-black' : 'text-stone-700'}`} />
        </IconPlate>

        {/* Badge */}
        {badge > 0 && (
          <div
            className="
            absolute -top-1 -right-1
            w-5 h-5 rounded-full
            bg-amber-500 text-white
            text-[10px] font-bold
            flex items-center justify-center
            shadow-md
          "
          >
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}
