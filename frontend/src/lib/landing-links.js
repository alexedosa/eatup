export const navLinks = [
  { label: "Order Food", href: "#order" },
  {
    label: "Partners",
    dropdown: [
      { label: "Restaurants", href: "#restaurants", icon: "🍽️" },
      { label: "Riders", href: "#riders", icon: "🛵" },
    ],
  },
  { label: "How it Works", href: "#how-it-works" },
];

export const navCtas = {
  vendorLogin: { label: "Vendor Login", href: "/auth/login?role=vendor" },
  getApp: { label: "Get App", href: "/auth/get-app" },
};
