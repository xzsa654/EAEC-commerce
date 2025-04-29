import Carousel from "@/components/Carousel";
import CategorySection from "@/components/CategorySection";
import Columns from "@/components/Columns";
import FeaturedSection from "@/components/FeaturedSection";
import { useLenisStore } from "@/stores/useLenisStore";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);
export default function IndexPage() {
  const { init, cancelAnimationFrame } = useLenisStore();

  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame();
    };
  }, []);

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     lerp: 0.2,
  //   });
  //   function raf(time: any) {
  //     lenis.raf(time);

  //     requestAnimationFrame(raf);
  //   }
  //   requestAnimationFrame(raf);
  //   return () => {
  //     lenis.destroy();
  //   };
  // }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: true,
      },
    });
    tl.addLabel("start", 0)
      .to(
        ".column__item",
        {
          scrollTrigger: {
            trigger: ".section_showcase",
            start: 400,
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
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
    // Return cleanup function
    return () => {
      // Kill all ScrollTriggers when component unmounts
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <>
      <Carousel />
      <FeaturedSection />
      <CategorySection />
      <Columns />
      <div className="section_showcase  "></div>
    </>
  );
}
