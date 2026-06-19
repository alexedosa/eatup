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
  vendorLogin: { label: "Vendor Login", href: "/auth/login" },
  getApp: { label: "Get App", href: "/auth/role-picker" },
};
