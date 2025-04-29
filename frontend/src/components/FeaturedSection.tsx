import { useProductStore } from "@/stores/useProductStore";
import { CircularProgress } from "@heroui/react";
import { useEffect } from "react";

import ProductCard from "./productCard";
export default function FeaturedSection() {
  const { getFeaturedProducts, products, loading } = useProductStore();

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div className=" w-full bg-background  p-2 relative mt-[4.1rem]">
      <div className="flex justify-between mx-[2.2vw]">
        <h2 className=" text-[12px]">精選商品</h2>
        <p className="text-[12px]">探索</p>
      </div>
      <div className="mt-[2.3rem] mx-[4.166vw] gap-x-[0.3rem] gap-y-[1rem] grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 ">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
