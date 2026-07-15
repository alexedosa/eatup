import IconPlate from "../shared/IconPlate";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ProfileCircle, DocumentText, CloseCircle, InfoCircle } from "iconsax-reactjs";
import { useTheme } from "@/context/ThemeContext";

const POLICY_SECTIONS = [
  {
    title: "Terms & Conditions",
    body: "Use the EatUp vendor dashboard to manage your own approved shop, menu, orders, availability, and settlement details. Keep account access private and ensure every listing is accurate before publishing.",
  },
  {
    title: "Privacy Policy",
    body: "Vendor account, shop, order, and payment information is used to operate the platform, process orders, support customers, and improve service quality. Only collect customer information needed to complete orders.",
  },
  {
    title: "Vendor Responsibilities",
    body: "Maintain accurate prices, preparation times, menu availability, shop hours, and order statuses. Accept only orders you can fulfil and communicate operational issues promptly through support.",
  },
  {
    title: "Food Safety Disclaimer",
    body: "Vendors are responsible for safe sourcing, preparation, packaging, allergen handling, hygiene, and compliance with applicable food safety rules in their operating area.",
  },
  {
    title: "Contact Support",
    body: "For account, payment, order, or safety issues, contact EatUp support from your registered business email with your shop name and the affected order or product details.",
  },
];

export default function UtilityButton({
  icon: IconComponent = DocumentText,
  onClick,
  showProfileNudge = false,
  onProfileNudgeClick,
  className = "",
}) {
  const { isDarkMode } = useTheme();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const handleProfileNudgeClick = (event) => {
    event.stopPropagation();
    onProfileNudgeClick?.();
  };

  const handleOpen = () => {
    onClick?.();
    setIsTermsOpen(true);
  };
  
  return (
    <>
      <div
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        aria-label="Open vendor terms and policies"
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") handleOpen();
        }}
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

          {showProfileNudge && (
            <button
              type="button"
              onClick={handleProfileNudgeClick}
              aria-label="Continue shop profile setup"
              className="
                absolute -bottom-2 -right-2
                flex h-7 w-7 items-center justify-center rounded-full
                border-2 border-white bg-stone-900 text-white
                shadow-lg shadow-stone-900/20
                transition-all duration-200 hover:scale-110
                dark:border-[#1a1c1e] dark:bg-white dark:text-stone-950
              "
            >
              <ProfileCircle size="15" variant="Bold" />
              <span className="absolute inset-0 -z-10 rounded-full bg-stone-900/20 animate-ping dark:bg-white/20" />
            </button>
          )}
        </div>
      </div>

      {isTermsOpen && typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-stone-950/45 p-4 backdrop-blur-sm dark:bg-black/70">
            <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#1a1c1e]">
              <div className="flex items-start justify-between gap-4 border-b border-stone-100 bg-amber-50/50 p-6 dark:border-white/5 dark:bg-amber-500/5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-stone-900 text-white dark:bg-white dark:text-stone-950">
                    <InfoCircle size="22" variant="Bold" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-tight text-stone-900 dark:text-white">
                      Vendor Policies
                    </h2>
                    <p className="mt-1 text-sm font-medium text-stone-500 dark:text-stone-400">
                      Terms, privacy, responsibilities, safety, and support.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTermsOpen(false)}
                  aria-label="Close vendor policies"
                  className="rounded-xl p-2 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  <CloseCircle size="24" variant="Bold" />
                </button>
              </div>

              <div className="custom-scrollbar max-h-[70vh] space-y-4 overflow-y-auto p-6">
                {POLICY_SECTIONS.map((section) => (
                  <section
                    key={section.title}
                    className="rounded-2xl border border-stone-100 bg-stone-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <h3 className="text-sm font-black uppercase tracking-widest text-stone-800 dark:text-white">
                      {section.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
