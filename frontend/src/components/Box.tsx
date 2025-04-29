import { Link } from "@heroui/link";
import React, { useEffect, useRef, useState } from "react";
import "@/styles/hover-box.css";
import { useTheme } from "@heroui/use-theme";

interface Ibox {
  text: string | React.ReactNode;
  link?: string;
  shouldPath?: boolean;
  isNav?: boolean;
  isExternal?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export default function Box({
  text,
  link = "#",
  shouldPath = true,
  isNav = false,
  hoverEffect = true,
  isExternal = false,
  onClick = () => {},
}: Ibox) {
  const boxRef = useRef<HTMLLIElement>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();
  // 鼠标移动处理
  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setHoverPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // 确保组件挂载和卸载时正确处理事件
  useEffect(() => {
    return () => {
      setIsHovering(false);
    };
  }, []);

  return (
    <li
      ref={boxRef}
      className={`${!hoverEffect && "nav-item"}   box-item relative z-[51]  bg-default-100 font-Kudryashev `}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <Link
        isExternal={isExternal}
        onPress={onClick}
        href={link}
        className="box-link "
      >
        {/* 径向渐变遮罩背景 */}
        <div className={`box-mask ${!hoverEffect && "hidden"}`}>
          {/* 根据鼠标位置设置的径向渐变效果 */}
          {isHovering && (
            <div
              className="box-gradient"
              style={{
                left: `${hoverPosition.x}px`,
                top: `${hoverPosition.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          )}
        </div>

        {/* 文本内容 */}
        <span className="box-text  light:hover:text-#38352e dark:hover:text-[#e9e6e1]">
          {text}
        </span>
      </Link>

      {/* 可选的SVG装饰 */}
      {shouldPath && (
        <svg
          viewBox="0 0 10.21 24"
          className={`nav-svg box-svg ${!isNav && "hidden"} xl:block group-hover:hidden duration-100 `}
          fill={theme == "light" ? "#e9e6e1" : "#555"}
          preserveAspectRatio="none"
        >
          <path d="M10.21 4V0a4.09 4.09 0 0 1-4 4H4a4.09 4.09 0 0 1-4-4v24a4.09 4.09 0 0 1 4-4h2.21a4.09 4.09 0 0 1 4 4V4Z"></path>
        </svg>
      )}
    </li>
  );
}
