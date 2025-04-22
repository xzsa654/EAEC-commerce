import { useCartStore } from "@/stores/useCartStore";
import { IProduct } from "@/stores/useProductStore";
import { useUserStore } from "@/stores/useUserStore";
import { Button, Card, CardBody, CardFooter, Image } from "@heroui/react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  isFeatured,
}: {
  product: IProduct;
  isFeatured?: boolean;
}) {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { user } = useUserStore();
  return (
    <Card isPressable shadow="md">
      <CardBody
        className={`overflow-hidden p-0  aspect-square ${isFeatured && "w-[40vw] md:w-[22vw] "}  `}
      >
        <Image
          src={product.images[0]}
          radius="lg"
          className=""
          isZoomed
          shadow="md"
          width="100%"
          height="100%"
        />
      </CardBody>
      <CardFooter className="text-small flex-col justify-start items-start ">
        <b className="font-default">{product.name}</b>
        <div className=" flex  justify-between w-full">
          <p className="text-red-500 font-bold font-Kudryashev">
            ${product.price}
          </p>
          <button
            onClick={() => {
              if (!user) {
                navigate("/login");
              } else {
                addToCart(product);
              }
            }}
          >
            <ShoppingCart size={"18"} />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
