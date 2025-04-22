import ProductCard from "@/components/productCard";
import TestCard from "@/components/testCard";
import { categorys } from "@/config/site";
import { useProductStore } from "@/stores/useProductStore";
import { CaptionsOff } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { getProductsByCategory, products } = useProductStore();
  const { category } = useParams();
  useEffect(() => {
    getProductsByCategory(category);
  }, [getProductsByCategory, category]);

  if (products.length === 0)
    return (
      <div className="min-h-screen flex justify-center flex-col items-center text-3xl">
        <CaptionsOff size={60} />
        查無商品
      </div>
    );
  return (
    <div className="container mx-auto  min-h-screen py-2 px-3">
      <h2 className="text-center font-default text-4xl ">
        {categorys.find((item) => item.key === category)?.label}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((v) => {
          return <ProductCard key={v._id} product={v} />;
        })}
      </div>
    </div>
  );
}
