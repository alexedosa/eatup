"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dashboardImg from "@/assets/screens/vendorDashboard-Mockup.png";

export default function VendorMockup() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -48px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="vs-mockup" ref={ref}>
      <div className={`vs-mockup-figure${visible ? " vs-mockup-visible" : ""}`}>
        <Image
          src={dashboardImg}
          alt="EatUp Vendor Dashboard"
          style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
          priority={false}
        />
      </div>
    </div>
  );
}
