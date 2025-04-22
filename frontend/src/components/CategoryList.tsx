import { Image } from "@heroui/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import { categorys } from "@/config/site";
import { Link } from "react-router-dom";

gsap.registerPlugin(useGSAP);

export default function CategoryList({
  onClose,
  animationRef,
}: {
  onClose: () => void;
  animationRef: any;
}) {
  // 使用对象初始化引用
  const animateRef = useRef({
    tl: null as gsap.core.Timeline | null,
    isPlaying: false,
  });

  const items = ["衣著", "牛仔褲", "眼鏡", "飾品", "鞋類", "帽款"];

  // 为每个项目单独跟踪字体状态
  const [fontStates, setFontStates] = useState(items.map(() => "font-default"));

  const handleMouseEnter = (e: React.MouseEvent, index: number) => {
    // 获取当前悬停的项目元素
    const currentItem = e.currentTarget;
    const cellTitle = currentItem.querySelector(".cell__title");
    const cellImg = currentItem.querySelector(".cell__img");
    const cellImages = currentItem.querySelector(".cell--images");

    // 停止先前的动画
    gsap.killTweensOf([cellTitle, cellImg, cellImages]);

    // 创建新的时间线
    const tl = gsap
      .timeline()
      .addLabel("start", 0)
      .to(
        cellImages,
        {
          duration: 0.4,
          ease: "power3.out", // 修正了拼写错误
          startAt: {
            scale: 0.8,
            xPercent: 20,
          },
          scale: 1,
          xPercent: 0,
          opacity: 1,
          stagger: -0.035,
        },
        "start"
      )
      .set(cellTitle, { transformOrigin: "0% 50%" }, "start")
      .to(
        cellTitle,
        {
          duration: 0.1,
          ease: "power1.in",
          yPercent: -100,
          onComplete: () => {
            // 更新特定项目的字体
            const newFontStates = [...fontStates];
            newFontStates[index] = "font-longCang";
            setFontStates(newFontStates);
          },
        },
        "start"
      )
      .to(
        cellTitle,
        {
          duration: 0.5,
          ease: "expo",
          startAt: {
            yPercent: 100,
            rotation: 15,
          },
          yPercent: 0,
          rotation: 0,
        },
        "start+=0.1"
      );

    // 保存时间线引用
    animateRef.current.tl = tl;
  };

  const handleMouseLeave = (e: React.MouseEvent, index: number) => {
    // 获取当前项目元素
    const currentItem = e.currentTarget;
    const cellTitle = currentItem.querySelector(".cell__title");
    const cellImg = currentItem.querySelector(".cell__img");
    const cellImages = currentItem.querySelector(".cell--images");

    // 停止先前的动画
    gsap.killTweensOf([cellTitle, cellImg, cellImages]);

    // 创建离开动画
    gsap
      .timeline()
      .addLabel("start", 0)
      .to(
        cellImages,
        {
          duration: 0.4,
          ease: "power4.out",
          opacity: 0,
          scale: 0.8,
        },
        "start"
      )
      .to(
        cellTitle,
        {
          duration: 0.1,
          ease: "power1.in",
          yPercent: -100,
          onComplete: () => {
            // 重置特定项目的字体
            const newFontStates = [...fontStates];
            newFontStates[index] = "font-default";
            setFontStates(newFontStates);
          },
        },
        "start"
      )
      .to(
        cellTitle,
        {
          duration: 0.5,
          ease: "expo",
          startAt: {
            yPercent: 100,
            rotation: 15,
          },
          yPercent: 0,
          rotation: 0,
        },
        "start+=0.1"
      );
  };

  return (
    <>
      {categorys.map((item, i) => (
        <div key={i} className="relative z-50">
          <div className="cover bg-background"></div>
          <Link
            to={`/category/${item.key}`}
            onClick={() => {
              onClose();
              animationRef.current.tl?.reverse();
              animationRef.current.isPlaying = true;
            }}
          >
            <div
              className="row z-[1] text-background relative grid cursor-pointer grid-rows-[5vw] lg:grid-rows-[3vw]
            grid-cols-[auto_1fr] gap-[5vw] items-center px-[4rem] py-[2rem] border-t-1 border-gray-500
            transition-all duration-300 ease-out hover:bg-primary"
              onMouseEnter={(e) => handleMouseEnter(e, i)}
              onMouseLeave={(e) => handleMouseLeave(e, i)}
            >
              <div className="cell cell--text m-0 text-4xl md:text-5xl relative font-normal leading-none whitespace-nowrap">
                <h2
                  className={`${fontStates[i]} cell__title oh relative overflow-hidden grid grid-rows-[100%,100%]`}
                >
                  <span className="oh__inner inline-block will-change-transform">
                    {item.label}
                  </span>
                </h2>
              </div>
              <div className="cell cell--images relative grid content-center grid-cols-[auto] grid-flow-col justify-end ml-auto gap-[1vw]">
                <Image
                  src={`/uns/${i + 1}.jpg`}
                  className="cell__img relative grid grid-cols-[100%] grid-rows-[100%]"
                  width={80}
                  height={80}
                />
                <Image
                  src={`/uns/${i + 1}.jpg`}
                  className="cell__img relative grid grid-cols-[100%] grid-rows-[100%]"
                  width={80}
                  height={80}
                />
                <Image
                  src={`/uns/${i + 1}.jpg`}
                  className="cell__img relative grid grid-cols-[100%] grid-rows-[100%]"
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
