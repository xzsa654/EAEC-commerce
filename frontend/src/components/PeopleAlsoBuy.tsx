import axiosInstance from "@/lib/axios";
import { IProduct } from "@/stores/useProductStore";
import { addToast, CircularProgress, Divider } from "@heroui/react";
import { useEffect, useState } from "react";
import ProductCard from "./productCard";

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
      <h3 className="font-default text-xl text-secondary-500">
        其他用戶也購買
      </h3>
      <Divider className="mt-3" />
      <div className="mt-6 grid grid-cols-2 max-[400px]:justify-items-center justify-items-center  max-[400px]:grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2">
        {recommendations.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
