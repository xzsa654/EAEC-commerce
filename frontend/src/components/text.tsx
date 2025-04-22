import "@/styles/Slideshow.css";
import { gsap } from "gsap";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// 定義 Slide 介面
interface Slide {
  imgUrl: string;
  textRows: string[];
  linkUrl?: string;
  linkText: string;
}

// 定義 SlideRef 介面
interface SlideRef {
  el: HTMLElement;
  imgWrap: HTMLElement | null;
  img: HTMLElement | null;
  text: NodeListOf<HTMLSpanElement>;
  link: HTMLElement | null;
}

// 定義配置介面
interface SlideshowConfig {
  clipPath: {
    initial: string;
    final: string;
    hover: string;
  };
}

// 定義組件屬性介面
interface SlideshowProps {
  slides: Slide[];
}

// 简单的幻灯片组件，专注于过渡效果
const Slideshow: React.FC<SlideshowProps> = ({ slides }) => {
  const [current, setCurrent] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const slideRefs = useRef<SlideRef[]>([]);
  const slideshowRef = useRef<HTMLDivElement | null>(null);

  // 幻灯片配置
  const config: SlideshowConfig = {
    clipPath: {
      initial: "circle(55% at 70% 50%)",
      final: "circle(15% at 70% 50%)",
      hover: "circle(20% at 30% 50%)",
    },
  };

  // 设置初始状态
  useEffect(() => {
    // 确保第一张幻灯片可见
    if (slideRefs.current[0]) {
      const firstSlide = slideRefs.current[0];

      if (firstSlide.imgWrap) {
        // 设置初始的clip-path
        gsap.set(firstSlide.imgWrap, {
          clipPath: config.clipPath.initial,
        });
      }

      // 设置hover效果
      slides.forEach((_, index) => {
        const slide = slideRefs.current[index];
        if (slide && slide.link && slide.imgWrap) {
          const imgWrap = slide.imgWrap; // 將 imgWrap 存儲在變量中

          slide.link.addEventListener("mouseenter", () => {
            gsap.killTweensOf(imgWrap);
            gsap.to(imgWrap, {
              duration: 1,
              ease: "expo",
              clipPath: config.clipPath.hover,
            });
          });

          slide.link.addEventListener("mouseleave", () => {
            gsap.killTweensOf(imgWrap);
            gsap.to(imgWrap, {
              duration: 1,
              ease: "expo",
              clipPath: config.clipPath.initial,
            });
          });
        }
      });
    }
  }, [slides.length]);

  // 导航到下一张幻灯片
  const next = (): void => navigate("next");

  // 导航到上一张幻灯片
  const prev = (): void => navigate("prev");

  // 导航逻辑
  const navigate = (direction: "next" | "prev"): void => {
    if (isAnimating) return;

    console.log("Starting navigation:", direction);
    setIsAnimating(true);

    // 获取当前和即将显示的幻灯片索引
    const currentIndex = current;
    let nextIndex: number;

    if (direction === "next") {
      nextIndex = current < slides.length - 1 ? current + 1 : 0;
    } else {
      nextIndex = current > 0 ? current - 1 : slides.length - 1;
    }

    // 获取对应的幻灯片引用
    const currentSlide = slideRefs.current[currentIndex];
    const upcomingSlide = slideRefs.current[nextIndex];

    // 确保引用有效
    if (
      !currentSlide ||
      !upcomingSlide ||
      !currentSlide.imgWrap ||
      !upcomingSlide.imgWrap ||
      !currentSlide.img ||
      !upcomingSlide.img ||
      !currentSlide.text ||
      !upcomingSlide.text ||
      !currentSlide.link ||
      !upcomingSlide.link
    ) {
      console.error("Invalid slide references");
      setIsAnimating(false);
      return;
    }

    // 创建动画时间轴
    const tl = gsap.timeline({
      onStart: () => {
        console.log("Animation starting");
        // 将即将显示的幻灯片标记为当前
        upcomingSlide.el.classList.add("slide--current");
      },
      onComplete: () => {
        console.log("Animation completed");
        // 从当前幻灯片移除标记
        currentSlide.el.classList.remove("slide--current");
        setIsAnimating(false);
        setCurrent(nextIndex);
      },
    });

    // 设置动画
    tl.addLabel("start", 0)
      // 设置即将显示的幻灯片初始状态
      .set(
        upcomingSlide.imgWrap,
        {
          y: direction === "next" ? "100%" : "-100%",
          clipPath: config.clipPath.final,
        },
        "start"
      )
      .set(upcomingSlide.el, { opacity: 1 }, "start")
      .set(
        upcomingSlide.img,
        { y: direction === "next" ? "-50%" : "50%" },
        "start"
      )
      .set(
        upcomingSlide.text,
        { y: direction === "next" ? "100%" : "-100%" },
        "start"
      )
      .set(upcomingSlide.link, { opacity: 0 }, "start")

      // 当前幻灯片动画
      .to(
        currentSlide.imgWrap,
        {
          duration: 1,
          ease: "power3",
          clipPath: config.clipPath.final,
          rotation: 0.001, // bugfix
        },
        "start"
      )
      .to(
        currentSlide.text,
        {
          duration: 1,
          ease: "power3",
          y: direction === "next" ? "-100%" : "100%",
        },
        "start"
      )
      .to(
        currentSlide.link,
        {
          duration: 0.5,
          ease: "power3",
          opacity: 0,
        },
        "start"
      )

      // 当前幻灯片移出
      .to(
        currentSlide.imgWrap,
        {
          duration: 1,
          ease: "power2.inOut",
          y: direction === "next" ? "-100%" : "100%",
          rotation: 0.001,
        },
        "start+=0.6"
      )
      .to(
        currentSlide.img,
        {
          duration: 1,
          ease: "power2.inOut",
          y: direction === "next" ? "50%" : "-50%",
        },
        "start+=0.6"
      )

      // 下一张幻灯片移入
      .to(
        upcomingSlide.imgWrap,
        {
          duration: 1,
          ease: "power2.inOut",
          y: "0%",
          rotation: 0.001,
        },
        "start+=0.6"
      )
      .to(
        upcomingSlide.img,
        {
          duration: 1,
          ease: "power2.inOut",
          y: "0%",
        },
        "start+=0.6"
      )

      // 下一张幻灯片内容动画
      .to(
        upcomingSlide.imgWrap,
        {
          duration: 1.5,
          ease: "expo.inOut",
          clipPath: config.clipPath.initial,
        },
        "start+=1.2"
      )
      .to(
        upcomingSlide.text,
        {
          duration: 1.5,
          ease: "expo.inOut",
          y: "0%",
          rotation: 0.001,
          stagger: direction === "next" ? 0.1 : -0.1,
        },
        "start+=1.1"
      )
      .to(
        upcomingSlide.link,
        {
          duration: 1,
          ease: "expo.in",
          opacity: 1,
        },
        "start+=1.4"
      );
  };

  return (
    <div className="section mb-[250vh] bg-background text-foreground font-sans antialiased">
      <div className="slideshow-container ">
        {/* 简化的导航按钮 */}
        <div className="navigation-buttons">
          <button onClick={prev} className="nav-button prev">
            <ArrowLeftIcon />
          </button>
          <button onClick={next} className="nav-button next">
            <ArrowRightIcon />
          </button>
          <div className="slide-counter">
            {current + 1} / {slides.length}
          </div>
        </div>

        {/* 幻灯片区域 */}
        <div ref={slideshowRef} className="slideshow">
          {slides?.map((slide, index) => (
            <figure
              key={index}
              className={`slide ${index === current ? "slide--current" : ""}`}
              ref={(el) => {
                // 直接创建获取所有需要的元素引用
                if (el) {
                  slideRefs.current[index] = {
                    el,
                    imgWrap: el.querySelector(".slide__img-wrap"),
                    img: el.querySelector(".slide__img"),
                    text: el.querySelectorAll(".text-row > span"),
                    link: el.querySelector(".slides__caption-link"),
                  };
                }
              }}
            >
              <div className="slide__img-wrap">
                <div
                  className="slide__img bg-center"
                  style={{ backgroundImage: `url(${slide.imgUrl})` }}
                ></div>
              </div>
              <figcaption className="slide__caption">
                <h2 className="slides__caption-headline">
                  {slide.textRows?.map((row, i) => (
                    <span key={i} className="text-row">
                      <span dangerouslySetInnerHTML={{ __html: row }}></span>
                    </span>
                  ))}
                </h2>
                <Link
                  className="slides__caption-link"
                  to={slide.linkUrl || "#"}
                >
                  <span>{slide.linkText}</span>
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
