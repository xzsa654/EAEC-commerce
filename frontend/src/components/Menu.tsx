import { useUserStore } from "@/stores/useUserStore";
import { Link } from "@heroui/link";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GithubIcon } from "./icons";
import MenuCenterList from "./MenuCenterList";
import { ThemeSwitch } from "./theme-switch";
interface Imenu {
  onOpenChange: () => void;
}

export default function Menu({ onOpenChange }: Imenu) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLUListElement>(null);
  const { theme } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(4);

  const centerNavItems = [
    {
      title: "Category",
      component: <MenuCenterList tag={0} />,
    },
    ,
    {
      title: "Collections",
      component: <MenuCenterList tag={1} />,
    },
    {
      title: "Explore",
      component: <MenuCenterList tag={2} />,
    },
  ];
  useEffect(() => {
    if (containerRef.current !== null) {
      const container = containerRef.current;
      const ctx = gsap.context(() => {
        const listItmes = gsap.utils.toArray(".menu-text");
        // 設置初始狀態
        gsap.set(listItmes, {
          opacity: 0,
        });
        gsap.set(container, {
          y: "-5%",
          opacity: 0,
        });

        const tl = gsap.timeline();

        tl.to(container, {
          y: "0%",
          opacity: 1,
          ease: "power3.inOut",
          duration: 0.3,
        }).to(listItmes, {
          opacity: 1,
          stagger: {
            each: 0.1,
            from: "center", // 從中間開始
            grid: "auto",
          },
          duration: 0.6,
          ease: "power3.out",
        });
      }, itemRef);
      return () => ctx.revert();
    }
  }, []);
  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 z-[51] px-4 py-7 w-full min-h-screen "
    >
      <div className=" relative px-3 pt-40 rounded bg-background w-full h-[48rem]">
        <div className="  w-full text-background ">
          <div
            className={`absolute w-full top-0 left-0 font-Kudryashev text-foreground flex ${currentIndex === 4 ? " justify-end" : "justify-between"}  px-2 py-2 `}
          >
            {currentIndex !== 4 && (
              <button
                onClick={() => setCurrentIndex(4)}
                className="flex items-center"
              >
                <ArrowLeft size={18} />
                <p>Back</p>
              </button>
            )}
            <p>{centerNavItems[currentIndex]?.title}</p>
            <X size={18} onClick={onOpenChange} />
          </div>
          {currentIndex === 4 ? (
            <ul ref={itemRef} className="font-Kudryashev space-y-8 px-4">
              {centerNavItems.map((item, i) => (
                <li
                  onClick={() => setCurrentIndex(i)}
                  className="text-foreground font-bold flex menu-text  justify-between"
                  key={i}
                >
                  <p>{item?.title}</p>
                  <ArrowRight size={15} />
                </li>
              ))}
            </ul>
          ) : (
            centerNavItems[currentIndex]?.component
          )}
        </div>
      </div>
      <svg
        name="Shape bottom specs"
        viewBox="0 0 343 12"
        preserveAspectRatio="none"
      >
        <path
          d="M0 8a4 4 0 0 0 4 4h230.52a6 6 0 0 0 4.24-1.76l4.48-4.48A6 6 0 0 1 247.48 4H339a4 4 0 0 0 4-4H0Z"
          fill={theme === "dark" ? "#000" : "#ffffff"}
        ></path>
      </svg>
      <div className="w-full bg-background px-5 flex gap-5 mt-3 rounded h-[5vh] ">
        <Link href="https://github.com/xzsa654/EAEC-commerce" isExternal>
          <GithubIcon size={25} className="bg-background text-foreground" />
        </Link>
        <ThemeSwitch />
      </div>
    </div>
  );
}
