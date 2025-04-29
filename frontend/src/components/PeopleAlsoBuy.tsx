import axiosInstance from "@/lib/axios";
import { IProduct } from "@/stores/useProductStore";
import { addToast, CircularProgress } from "@heroui/react";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import RecommendationsCard from "./RecommendationsCard";
export default function PeopleAlsoBuy() {
  const [recommendations, setReommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/product/recommendations");
        setReommendations(res.data);
      } catch (error) {
        addToast({
          title: "取得推薦商品失敗",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (isLoading) return <CircularProgress size="lg" color="primary" />;
  return (
    <>
      <h3 className="font-default text-[10px] lg:text-[calc(7.7px+0.22vw)] font-normal text-foreground">
        其他用戶也購買
      </h3>
      {/* 大螢幕版本 */}
      <ul
        className={`mt-6 hidden  gap-2 md:flex justify-between lg:justify-start `}
      >
        {recommendations?.map((product: IProduct) => (
          <RecommendationsCard key={product._id} product={product} />
        ))}
      </ul>
      {/* 小螢幕版本 */}
      <div className="md:hidden">
        <Swiper slidesPerView={2.2} spaceBetween={10}>
          {recommendations?.map((product: IProduct) => (
            <SwiperSlide key={product._id}>
              <RecommendationsCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
