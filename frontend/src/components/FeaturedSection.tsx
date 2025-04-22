import React, { useEffect, useState } from "react";
import { useProductStore } from "@/stores/useProductStore";
import { CircularProgress, Image } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductCard from "./productCard";
export default function FeaturedSection() {
  const { getFeaturedProducts, products, loading } = useProductStore();

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  if (loading) return <CircularProgress />;
  return (
    <div className=" container mx-auto p-2 relative space-y-5 mt-5">
      <h2 className="w-full text-center text-2xl">精選商品</h2>
      <Swiper
        spaceBetween={50}
        slidesPerView={window.innerWidth > 768 ? 3.2 : 2.4}
        pagination={{ clickable: true }}
        className="py-2"
        // scrollbar={{ hide: true }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} isFeatured={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
