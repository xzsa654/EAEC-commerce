import Columns from "@/components/Columns";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CategorySection from "@/components/CategorySection";
import FeaturedSection from "@/components/FeaturedSection";
import Carousel from "@/components/Carousel";

gsap.registerPlugin(ScrollTrigger);
export default function IndexPage() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.2,
    });
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: true,
        },
      })
      .addLabel("start", 0)
      .to(
        ".column__item",
        {
          scrollTrigger: {
            trigger: ".section_showcase",
            start: 0,
            end: "top top",
            scrub: true,
          },
          ease: "power4.inOut",
          startAt: {
            opacity: 0,
            filter: "brightness(300%)",
          },
          opacity: 1,
          filter: "brightness(100%)",
          yoyo: true,
          repeat: 1,
        },
        "start"
      )
      .to(
        ".column-wrap",
        {
          ease: "none",
          yPercent: (pos) => pos * -15 - 15,
        },
        "start"
      );
  }, {});
  return (
    <>
      <Carousel />
      <Columns />
      <CategorySection />
      <FeaturedSection />
    </>
  );
}
