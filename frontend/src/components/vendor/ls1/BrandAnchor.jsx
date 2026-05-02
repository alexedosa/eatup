import IconPlate from "../shared/IconPlate";
import AttachedLabel from "../shared/AttachedLabel";

export default function BrandAnchor({
  icon: IconComponent,
  label,
  isActive = false,
  onClick,
  className = "",
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-out hover:scale-110 ${className}`}
      style={{ gap: "2px" }}
    >
      <IconPlate isActive={isActive} size="md">
        <div className="w-10 h-10 relative flex items-center justify-center">
          <img 
            src="/assets/logo/logo.png" 
            alt="EatUp Logo" 
            className="w-full h-full object-contain"
            onError={(e) => {
              console.error("Logo failed to load");
              e.target.style.display = 'none';
            }}
          />
        </div>
      </IconPlate>

      <AttachedLabel position="bottom" isVisible={true}>
        {label}
      </AttachedLabel>
    </div>
  );
}
