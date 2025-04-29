import Box from "@/components/Box";
import {
  footerLeftSideLinks,
  footerPrivacyPolicy,
  footerRightSideLinks,
} from "@/config/site";
import { Link } from "@heroui/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const platform = (navigator as any).userAgentData.platform;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    });
    return () => {
      document.removeEventListener("mousemove", (e) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      });
    };
  }, []);
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <footer className="mt-10 font-Kudryashev pb-8 font-extrabold px-14 space-y-5 text-[10px] xl:text-[calc(7.7px+0.22vw)]">
      <div className="flex  w-full justify-between ">
        <div>
          <p>{time.split("下午")[1]}</p>
          <div className="">
            CURSOR：&nbsp; X{cursorPosition.x}&nbsp; Y{cursorPosition.y}
          </div>
        </div>
        <div>
          <p>PLATFORM：{platform}</p>
          <p>TIMEZONE：{timeZone.toUpperCase()}</p>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex flex-col xl:flex-row gap-2 xl:gap-0">
          {footerLeftSideLinks.map((box) => (
            <Box
              key={box.text}
              text={box.text}
              shouldPath={box.shouldPath}
            ></Box>
          ))}
        </div>
        <div className="flex flex-col xl:flex-row gap-2 items-end xl:gap-0 ">
          {footerRightSideLinks.map((box, i) => (
            <Box
              key={box.text}
              text={box.text}
              shouldPath={box.shouldPath}
              link={box.href}
              isExternal={i == 1}
            ></Box>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-between">
        <p className="text-default-400 flex items-end md:items-center  ">
          Copyright © 2025 EAEC 此專案為練習使用，無營利目的
        </p>
        <div className="flex md:justify-between md:flex-row flex-col  gap-8">
          {footerPrivacyPolicy.map((link) => (
            <Link
              key={link}
              className="text-default-400 text-end justify-end md:text-start md:justify-start"
              underline="always"
              size="sm"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
