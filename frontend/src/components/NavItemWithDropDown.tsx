import { useCallback, useRef } from "react";
import Box from "./Box";

interface INavItemWithDropDown {
  text: string;
  link?: string;
  index: number;
  onMouseEnter: (index: number) => void;
}
export default function NavItemWithDropDown({
  text,
  index,
  onMouseEnter,
}: INavItemWithDropDown) {
  const itemRef = useRef<HTMLDivElement>(null);
  const handleMouseEnter = useCallback(() => {
    onMouseEnter(index);
  }, [index, onMouseEnter]);
  return (
    <div
      ref={itemRef}
      className="nav-item-container"
      onMouseEnter={handleMouseEnter}
    >
      <Box
        text={text}
        shouldPath={index !== 2}
        hoverEffect={false} // 禁用Box的内置hover效果
      />
    </div>
  );
}
