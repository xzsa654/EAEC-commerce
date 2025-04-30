import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";

import { GithubIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import UseDropDown from "@/hooks/useDropDown";
import { useCartStore } from "@/stores/useCartStore";
import { useLenisStore } from "@/stores/useLenisStore";
import { useUserStore } from "@/stores/useUserStore";
import { useTheme } from "@heroui/use-theme";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Box from "./Box";
import Category from "./Category";
import NavItemWithDropDown from "./NavItemWithDropDown";
import Menu from "./Menu";
export const Navbar = () => {
  // TODO: 添加dashboard
  const { user } = useUserStore();
  const { carts } = useCartStore();
  const { setTheme, theme } = useTheme();
  const { lenis } = useLenisStore();
  const { currentIndex, handleItemEnter, handleItemLeave } = UseDropDown();
  const centerNavItems = [
    {
      title: "Shop",
      component: <Category tags={1} />,
    },
    {
      title: "Collections",
      component: <Category tags={2} />,
    },
    {
      title: "Explore",
      component: <Category tags={3} />,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  // 控制 nav-item 的样式
  useEffect(() => {
    const items = document.querySelectorAll(".nav-item");
    const svgs = document.querySelectorAll(".nav-item svg");

    if (currentIndex === null) {
      items.forEach((item) => {
        gsap.to(item, {
          backgroundColor: theme === "light" ? "#F5F5F4" : "#27272a",
          duration: 0.2,
        });
      });
      svgs.forEach((svg) => {
        gsap.to(svg, {
          fill: theme == "light" ? "#e9e6e1" : "#555",
          duration: 0.2,
        });
      });
    } else {
      items.forEach((item) => {
        gsap.to(item, {
          backgroundColor: theme === "light" ? "#ffffff" : "#000000",
          duration: 0.6,
        });
      });
      svgs.forEach((svg) => {
        gsap.to(svg, {
          fill: theme == "light" ? "#ffffff" : "#000000",
          duration: 0.4,
        });
      });
    }
  }, [theme, currentIndex]);

  // 控制 dropdown 动画
  useEffect(() => {
    if (!dropDownRef.current) return;
    gsap.killTweensOf(dropDownRef.current);
    gsap.killTweensOf(maskRef.current);
    if (currentIndex !== null) {
      lenis?.stop();
      gsap.to(dropDownRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        display: "block",
      });
      gsap.to(maskRef.current, {
        autoAlpha: 1,
        duration: 0.2,
        backgroundColor: "rgba(157, 150, 136, 0.85)",
      });
    } else {
      lenis?.start();
      gsap.to(dropDownRef.current, {
        autoAlpha: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (dropDownRef.current) {
            dropDownRef.current.style.display = "none";
          }
        },
      });
      gsap.to(maskRef.current, {
        autoAlpha: 0,
        duration: 0.1,
        ease: "back.in",
        backgroundColor: "rgba(0, 0,0, 0)",
      });
    }
  }, [currentIndex]);
  // menu 開啟遮罩
  useEffect(() => {
    if (isOpen && maskRef.current !== null) {
      lenis?.stop();
      gsap.to(maskRef.current, {
        autoAlpha: 1,
        duration: 0.2,
        backgroundColor: "rgba(157, 150, 136, 0.85)",
      });
    } else {
      lenis?.start();
      gsap.to(maskRef.current, {
        autoAlpha: 0,
        duration: 0.1,
        ease: "back.in",
        backgroundColor: "rgba(0, 0,0, 0)",
      });
    }
  }, [isOpen]);
  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      disableAnimation={true}
      isBlurred={false}
      className="bg-transparent"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            {/* <Logo /> */}
            <p className="font-bold font-Kudryashev text-foreground">EAEC</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarItem
          onMouseLeave={handleItemLeave}
          className=" lg:block hidden relative"
        >
          <ul className="flex">
            {centerNavItems.map((item, i) => (
              <NavItemWithDropDown
                key={i}
                text={item.title}
                index={i}
                onMouseEnter={handleItemEnter}
              />
            ))}
          </ul>
          <div
            ref={dropDownRef}
            className="absolute -top-[60%] -left-[8%] z-10"
            style={{
              opacity: 0,
              transform: "translateY(-20px)",
              display: "none",
            }}
          >
            {currentIndex !== null && centerNavItems[currentIndex].component}
          </div>
        </NavbarItem>
      </NavbarContent>
      {/* Navbar Tail */}
      <NavbarContent className=" lg:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="flex">
          <div className="lg:block hidden">
            <Box
              isNav
              text={<GithubIcon size={18} className="text-default-500 " />}
              link="https://github.com/xzsa654/EAEC-commerce"
              isExternal
            />
          </div>
          <div className="lg:block hidden">
            <Box
              isNav
              text={<ThemeSwitch />}
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            />
          </div>
          <div>
            <Box isNav text={"Profile"} link={user ? "profile" : "login"} />
          </div>
          <div>
            <Box
              isNav
              text={`Bag / ${carts.length}`}
              link="/cart"
              shouldPath={window.innerWidth >= 1024 ? false : true}
            />
          </div>
          <div className="lg:hidden">
            <Box
              isNav
              text={`Menu`}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              shouldPath={false}
            />
          </div>
        </NavbarItem>
      </NavbarContent>
      {/* Menu */}
      {isOpen && (
        <Menu
          onOpenChange={() => {
            setIsOpen(false);
          }}
        />
      )}

      {/* 遮罩 */}
      <div
        ref={maskRef}
        className="fixed w-screen h-screen top-0 left-0 z-[1]"
      ></div>
    </HeroUINavbar>
  );
};
