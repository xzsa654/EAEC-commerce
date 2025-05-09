import { categorys, collections, explores } from "@/config/site";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function CategoryList({ tags }: { tags: number }) {
  const containerRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (containerRef.current !== null) {
      const ctx = gsap.context(() => {
        const listItems = gsap.utils.toArray(".menu-list");
        gsap.set(listItems, {
          opacity: 0,
        });
        gsap.to(listItems, {
          opacity: 1,
          y: 0,
          stagger: {
            each: 0.1,
            from: "center", // 從中間開始
            grid: "auto",
          },
          duration: 0.3,
          ease: "power3.out",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);
  return (
    <ul ref={containerRef} className="py-16 space-y-3">
      {tags === 1
        ? categorys?.map((item, i) => (
            <li key={i} className="text-foreground font-default menu-list ">
              <Link to={`category/${item.key}`} className="text-xl line-link ">
                {item.label}
              </Link>
            </li>
          ))
        : tags === 2
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
