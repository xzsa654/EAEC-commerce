import ProductCard from "@/components/productCard";
import { categorys } from "@/config/site";
import { useProductStore } from "@/stores/useProductStore";
import { useGSAP } from "@gsap/react";
import { Image } from "@heroui/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaptionsOff } from "lucide-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function CategoryPage() {
  const { getProductsByCategory, products } = useProductStore();
  const { category } = useParams();

  // 創建參考以訪問 DOM 元素
  const bannerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  // 首先加載產品數據
  useEffect(() => {
    getProductsByCategory(category);
  }, [getProductsByCategory, category]);

  // 使用 useGSAP 創建視差滾動效果
  useGSAP(() => {
    if (!bannerRef.current || !imageRef.current) return;

    // 清理任何已存在的ScrollTrigger實例
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // 創建 banner 向上移動的動畫
    gsap.to(bannerRef.current, {
      y: "-60%",
      ease: "none",
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });
    gsap.to(textRef.current, {
      color: "#000000",
      ease: "none",
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });
    // 創建圖片放大的動畫
    gsap.to(imageRef.current, {
      scale: 1.2,
      y: "60%",
      ease: "none",
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // 強制刷新ScrollTrigger
    ScrollTrigger.refresh();
  }, [products]); // 當產品數據變化時重新運行

  if (products.length === 0)
    return (
      <div className="min-h-screen flex justify-center flex-col items-center text-3xl">
        <CaptionsOff size={60} />
        查無商品
      </div>
    );

  return (
    <div className="min-h-screen">
      {/* Banner 區域 - 修正了結構 */}
      <div className="w-full h-[95svh] max-h-[30rem] sm:max-h-[90svh]  lg:max-h-[unset] relative items-center  flex flex-col gap-4 ">
        <div className="sticky top-12 mb-9 text-white" ref={textRef}>
          <h2 className="text-center  font-default text-[10px] lg:text-[calc(7.7px+0.22vw)]  py-8">
            {categorys.find((item) => item.key === category)?.label}
          </h2>
          <div className="text-wrap w-auto font-Kudryashev ">
            <p>Translating digital worlds into real life creations.</p>
            <p>Check out our entire apparel collection.</p>
          </div>
        </div>

        {/* 圖片包裝器 */}
        <div
          ref={bannerRef}
          className="w-full h-full absolute top-0 z-[-1] left-0 overflow-hidden"
          style={{ willChange: "transform" }}
        >
          <div
            ref={imageRef}
            className="w-full h-full"
            style={{
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            <Image
              loading="lazy"
              classNames={{
                wrapper: "h-full",
              }}
              radius="none"
              width={"100%"}
              height={"100%"}
              src={categorys.find((item) => item.key === category)?.cate}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 py-4">
        {products?.map((v) => {
          return <ProductCard key={v._id} product={v} />;
        })}
      </div>
    </div>
  );
}
