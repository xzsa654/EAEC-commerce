import { useCartStore } from "@/stores/useCartStore";
import { IProduct } from "@/stores/useProductStore";
import { Button, Image } from "@heroui/react";

export default function RecommendationsCard({
  product,
}: {
  product: IProduct;
}) {
  const { addToCart } = useCartStore();
  return (
    <li className="w-full lg:w-3/12  font-Kudryashev text-[10px] lg:text-[calc(7.7px+0.22vw)] ">
      <div className="relative">
        <svg viewBox="0 0 343 359" preserveAspectRatio="none" fill={"#f1f1f1"}>
          <path d="M339 0H108.48a6 6 0 0 0-4.24 1.76l-4.48 4.48A6 6 0 0 1 95.51 8H4a4 4 0 0 0-4 4v343a4 4 0 0 0 4 4h230.52a6 6 0 0 0 4.24-1.76l4.48-4.48a6 6 0 0 1 4.24-1.76H339a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4Z"></path>
        </svg>
        <div className=" p-8 w-full h-full absolute top-0 ">
          <div className=" relative w-full h-full overflow-hidden">
            <Image
              src={product.images[0]}
              sizes="(max-width: 448px) 50vw, (max-width: 768px) 33vw, 25vw"
              width={"100%"}
              height={"100%"}
              radius="none"
            />
          </div>
        </div>
      </div>
      <div className="my-3">
        <p>{product.name}</p>
        <p>{product.price}</p>
      </div>
      <Button
        onPress={() => addToCart(product)}
        className="w-full bg-foreground text-background text-[10px] lg:text-[calc(7.7px+0.22vw)]"
        radius="sm"
      >
        添加購物車
      </Button>
    </li>
  );
}
