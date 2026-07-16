"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function isAllowedRole(user, requiredRole) {
  const userRole = user.role?.toLowerCase();
  const targetRole = requiredRole.toLowerCase();

  if (userRole === targetRole || userRole === "admin") return true;

  return (
    targetRole === "vendor" &&
    userRole === "user" &&
    typeof user.onboardingStatus === "string"
  );
}

export default function AuthGuard({ children, requiredRole = "vendor" }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      const userStr = localStorage.getItem("user");

      if (!token || !userStr) {
        router.push(`/auth/login?role=${requiredRole}`);
        return;
      }

      try {
        const user = JSON.parse(userStr);
        if (!isAllowedRole(user, requiredRole)) {
          router.push(`/auth/login?role=${requiredRole}`);
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push(`/auth/login?role=${requiredRole}`);
      }
    };

    checkAuth();
  }, [router, requiredRole]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-[#1a1c1e]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-stone-500 dark:text-stone-400 font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }

  return children;
}
