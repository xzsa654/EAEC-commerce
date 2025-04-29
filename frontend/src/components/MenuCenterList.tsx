import { categorys, collections, explores } from "@/config/site";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
interface IMenuList {
  tag: number;
}

export default function MenuCenterList({ tag }: IMenuList) {
  const itemRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (itemRef.current !== null) {
      const ctx = gsap.context(() => {
        const listItems = gsap.utils.toArray(".menu-list");
        gsap.set(listItems, {
          opacity: 0,
        });
        gsap.to(listItems, {
          opacity: 1,
          stagger: {
            each: 0.1,
            from: "center", // 從中間開始
            grid: "auto",
          },
          duration: 0.3,
          ease: "power3.out",
        });
      }, itemRef);
      return () => ctx.revert();
    }
  }, []);
  return (
    <ul ref={itemRef} className="font-Kudryashev space-y-2 px-4">
      {tag === 0
        ? categorys?.map((item, i) => (
            <li key={i} className="text-foreground font-default menu-list ">
              <Link to={`category/${item.key}`} className="text-xl line-link ">
                {item.label}
              </Link>
            </li>
          ))
        : tag === 1
          ? collections.map((item, i) => (
              <li key={i} className="text-foreground font-default menu-list ">
                <Link to={`collection/${item}`} className="text-xl line-link">
                  {item}
                </Link>
              </li>
            ))
          : explores.map((item, i) => (
              <li key={i} className="text-foreground font-default menu-list">
                <Link to={`explore/${item}`} className="text-xl line-link">
                  {item}
                </Link>
              </li>
            ))}
    </ul>
  );
}
