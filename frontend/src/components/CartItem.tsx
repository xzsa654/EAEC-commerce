import { cartInterface, useCartStore } from "@/stores/useCartStore";
import {
  Button,
  ButtonGroup,
  Divider,
  Image,
  NumberInput,
} from "@heroui/react";
import { Minus, Plus, Trash } from "lucide-react";
export default function CartItem({ item }: { item: cartInterface }) {
  const { updatedQuantity, removeFromCart } = useCartStore();

  return (
    <div className="w-full rounded-3xl ">
      <div className="flex gap-3 w-full ">
        <Image isZoomed src={item.images[0]} width={90} height={90} />
        <div className=" relative flex flex-1 flex-col justify-between md:items-start items-center">
          <p className="font-default">{item.name}</p>
          <p className="text-red-500 font-default">${item.price}</p>
          <div className="flex md:gap-4 ">
            <Button
              aria-label="Remove"
              isIconOnly
              onPress={() => removeFromCart(item._id)}
              className=" absolute top-0 right-0 md:static"
            >
              <Trash size={20} />
            </Button>
            <ButtonGroup>
              <Button
                aria-label="Increment"
                onPress={() => updatedQuantity(item._id, item.quantity + 1)}
                isIconOnly
              >
                <Plus size={16} />
              </Button>
              <NumberInput
                aria-label="Quantity"
                classNames={{
                  input: "text-center h-10",
                  inputWrapper: "h-10 ",
                }}
                variant="flat"
                radius="lg"
                value={item.quantity}
                onValueChange={(val) => {
                  updatedQuantity(item._id, (item.quantity = val));
                }}
                hideStepper
                className="w-[80px] "
              />
              <Button
                aria-label="Decrement"
                isIconOnly
                onPress={() => updatedQuantity(item._id, item.quantity - 1)}
              >
                <Minus size={16} />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
      <div></div>
      <Divider className="my-5" />
    </div>
  );
}
