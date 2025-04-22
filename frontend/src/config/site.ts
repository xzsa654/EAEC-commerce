export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/frontio-ai/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

export const categorys = [
  {
    key: "shirt",
    label: "衣著",
    image: "/uns/category-shirts.jpg",
  },
  { key: "jeans", label: "牛仔褲", image: "/uns/category-jeans.jpg" },
  { key: "glasses", label: "眼鏡", image: "/uns/category-glasses.jpg" },
  { key: "accessories", label: "飾品", image: "/uns/category-accessories.jpg" },
  { key: "shoes", label: "鞋類", image: "/uns/category-shoes.jpg" },
  { key: "caps", label: "帽款", image: "/uns/category-caps.jpg" },
];
