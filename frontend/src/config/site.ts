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
    cate: "/banner/category/1.jpg"
  },
  { key: "jeans", label: "牛仔褲", image: "/uns/category-jeans.jpg", cate: "/banner/category/2.jpg" },
  {
    key: "glasses", label: "眼鏡", image: "/cols/7.jpg",
    cate: "/banner/category/3.jpg"

  },
  {
    key: "accessories", label: "飾品", image: "/cols/b5.jpg",
    cate: "/banner/category/5.jpg"

  },

  {
    key: "shoes", label: "鞋類", image: "/cols/c7.jpg",
    cate: "/banner/category/4.jpg"

  },
  {
    key: "caps", label: "帽款", image: "/uns/category-caps.jpg",
    cate: "/banner/category/6.jpg"

  },
];
export const collections = [
  "Call Of Duty", "FIFA", "Fortnite", "Minecraft", "Overwatch", "PUBG"
]
export const explores = [
  "Mission", "Journal", "Customer Care", "Location"
]
export const footerLeftSideLinks = [
  {
    text: "MISSION",
    shouldPath: true
  },
  {
    text: "JOURNAL",
    shouldPath: true
  },
  {
    text: "CUSTOMER CARE",
    shouldPath: true
  }, {
    text: "LOCATION",
    shouldPath: false
  },
]

export const footerRightSideLinks = [
  {
    text: "INSTAGRAM",
    shouldPath: true,

  },
  {
    text: "GITHUB",
    shouldPath: true,
    href: "https://github.com/xzsa654/EAEC-commerce"
  },
  {
    text: "FACEBOOK",
    shouldPath: true
  }, {
    text: "NEWSLETTER",
    shouldPath: false,
    href: "mailto:xzsa654@gmail.com"
  },
]

export const footerPrivacyPolicy = [
  "TERMS & CONDITIONS", "PRIVACY POLICY", "CAREERS"
]