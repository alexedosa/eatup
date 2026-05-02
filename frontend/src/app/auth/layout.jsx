import "./auth.css";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-shell">
      <ThemeToggle className="fixed top-6 right-6 z-[500]" />
      {children}
    </div>
  );
}