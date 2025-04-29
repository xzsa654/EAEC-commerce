import { useCartStore } from "@/stores/useCartStore";
import { IProduct } from "@/stores/useProductStore";
import { useUserStore } from "@/stores/useUserStore";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function ProductCard({ product }: { product: IProduct }) {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { user } = useUserStore();
  return (
    <Card isPressable shadow="md" radius="none" className="bg-none">
      <CardBody className={`overflow-hidden p-0  `}>
        <Image
          src={product.images[0]}
          radius="none"
          isZoomed
          width={"100%"}
          height={"100%"}
          shadow="md"
          sizes="(max-width: 448px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
      </CardBody>
      <CardFooter className="text-[10px] lg:p-[2.1rem] text-foreground xl:text-[calc(7.7px+0.22vw)] flex-col justify-start items-start ">
        <b className="font-default">{product.name}</b>
        <div className=" flex  justify-between w-full">
          <p className=" font-bold font-Kudryashev">${product.price}</p>
          <button
            onClick={() => {
              if (!user) {
                navigate("/login");
              } else {
                addToCart(product);
              }
            }}
          >
            <ShoppingCart
              size={
                window.innerWidth <= 640
                  ? 10
                  : 10 + (0.5 * (window.innerWidth - 640)) / 100
              }
            />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
