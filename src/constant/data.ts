export const pagesData = [
  { title: "About Us", href: "/about", type: "link" },
  { title: "Contact", href: "/contact", type: "link" },
  { title: "FAQ", href: "/faq", type: "link" },
  { title: "Privacy Policy", href: "/privacy", type: "link" },
  { title: "Terms of Service", href: "/terms", type: "link" },
  // { title: "Shipping Info", href: "/shipping", type: "link" },
  // { title: "Returns", href: "/returns", type: "link" },
  // { title: "Size Guide", href: "/size-guide", type: "link" },
]
export const navbarData = [
  { title: "Home", href: "/", type: "link" },
  { title: "Categories", href: "", type: "dropdown_title" },
  { title: "Products", href: "/products", type: "link" },
  { title: "Pages", href: "", type: "dropdown", options: pagesData },
]