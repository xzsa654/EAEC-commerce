import { categorys } from "@/config/site";
import { Image } from "@heroui/react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function CategorySection({
  title = "商品分類",
}: {
  title?: string;
}) {
  return (
    <section className="section mb-[250vh] flex flex-col p-5 justify-center items-center  w-full bg-background">
      <h2 className="w-full text-center xl:text-[calc(7.7px+0.22vw)] text-[10px]">
        {title}
      </h2>
      <div className="w-full mt-6 ">
        <Swiper
          className="w-4/5"
          spaceBetween={10}
          slidesPerView="auto"
          breakpoints={{
            480: {
              slidesPerView: 2.5,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 4.5,
              spaceBetween: 15,
            },
            1000: {
              slidesPerView: "auto",
            },
          }}
        >
          {categorys?.map((category) => (
            <SwiperSlide key={category.key} className="!w-auto">
              <Link
                to={`/category/${category.key}`}
                className="rounded-md bg-foreground flex p-4 min-w-[112px] w-auto gap-2 items-center"
              >
                <Image
                  loading="lazy"
                  radius="none"
                  width={"30px"}
                  height={"40px"}
                  src={category.image}
                />
                <p className="text-background sm:text-[calc(12px+0.22vw)] text-[10px] whitespace-nowrap">
                  {category.label}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
