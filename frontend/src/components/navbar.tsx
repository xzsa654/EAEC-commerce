import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";

import { ThemeSwitch } from "@/components/theme-switch";
import { ShoppingCart, User } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { useCartStore } from "@/stores/useCartStore";
import { useUserStore } from "@/stores/useUserStore";
import { Badge } from "@heroui/react";
import { useState } from "react";
import Category from "./Category";
import UserDropDown from "./UserDropDown";
export const Navbar = () => {
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const { carts } = useCartStore();
  return (
    <HeroUINavbar maxWidth="xl" position="sticky" disableAnimation={true}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            {/* <Logo /> */}
            <p className="font-bold font-Kudryashev text-inherit">EAEC</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarItem className="flex gap-2">
          <button
            className="font-default line-link text-foreground"
            onClick={() => {
              setIsAnimated(true);
              setIsOpen(true);
            }}
          >
            商品分類
          </button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link
            isExternal
            href="https://github.com/xzsa654/EAEC-commerce"
            title="GitHub"
          >
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        {user && (
          <NavbarItem className="hidden sm:flex">
            <Badge
              color="danger"
              isInvisible={carts.length == 0}
              content={carts.length}
              size="sm"
              shape="circle"
            >
              <Link href="/cart" className="text-default-500">
                <ShoppingCart size={21} />
              </Link>
            </Badge>
          </NavbarItem>
        )}
        <NavbarItem className="hidden sm:flex">
          {user ? (
            <UserDropDown />
          ) : (
            <Link href="/login">
              <User size={21} className="text-foreground-500  rounded-full " />
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {user && (
          <Badge
            color="danger"
            content={carts.length}
            isInvisible={!!carts.length}
            placement="top-left"
            size="sm"
            shape="circle"
          >
            <Link href="/cart" className="text-default-500">
              <ShoppingCart size={21} />
            </Link>
          </Badge>
        )}
        {user ? (
          <UserDropDown />
        ) : (
          <Link href="/login">
            <User size={21} className="text-foreground-500  rounded-full " />
          </Link>
        )}
      </NavbarContent>
      <Category
        isOpen={isOpen}
        isAnimated={isAnimated}
        closeAnimated={() => setIsAnimated(false)}
        closeOpen={() => setIsOpen(false)}
      />
    </HeroUINavbar>
  );
};
