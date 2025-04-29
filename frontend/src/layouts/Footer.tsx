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
  const [platform, setPlatform] = useState("Unknown");

  // 使用更安全的方法檢測平台
  useEffect(() => {
    // 嘗試使用新API，如果支持的話
    try {
      if (
        (navigator as any).userAgentData &&
        (navigator as any).userAgentData.platform
      ) {
        setPlatform((navigator as any).userAgentData.platform);
      } else {
        // 回退到傳統userAgent解析
        const userAgent = navigator.userAgent;
        if (/Android/i.test(userAgent)) {
          setPlatform("Android");
        } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
          setPlatform("iOS");
        } else if (/Win/i.test(userAgent)) {
          setPlatform("Windows");
        } else if (/Mac/i.test(userAgent)) {
          setPlatform("MacOS");
        } else if (/Linux/i.test(userAgent)) {
          setPlatform("Linux");
        } else {
          setPlatform("Unknown");
        }
      }
    } catch (error) {
      console.error("Error detecting platform:", error);
      setPlatform("Unknown");
    }
  }, []);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer); // 清理定時器以防內存洩漏
  }, []);

  return (
    <footer className="mt-10 font-Kudryashev pb-8 font-extrabold px-14 space-y-5 text-[10px] xl:text-[calc(7.7px+0.22vw)]">
      <div className="flex  w-full justify-between ">
        <div>
          <p>{time.split("下午")[1] || time}</p> {/* 添加fallback以防止null */}
          <div className="">
            CURSOR：&nbsp; X{cursorPosition.x}&nbsp; Y{cursorPosition.y}
          </div>
        </div>
        <div>
          <p>PLATFORM：{platform}</p>
          <p>TIMEZONE：{timeZone ? timeZone.toUpperCase() : "UNKNOWN"}</p>
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
