import { cartInterface, useCartStore } from "@/stores/useCartStore";
import { Button, ButtonGroup, Image, NumberInput } from "@heroui/react";
import { Minus, Plus, Trash } from "lucide-react";
export default function CartItem({
  item,
  mobile = false,
}: {
  item: cartInterface;
  mobile?: boolean;
}) {
  const { updatedQuantity, removeFromCart } = useCartStore();

  return (
    <>
      {!mobile ? (
        <tr className="font-Kudryashev">
          <td className="flex items-center gap-10 ">
            <Image isZoomed src={item.images[0]} width={54} height={70} />
            <p className="font-default">{item.name}</p>
          </td>
          <td className="text-center">
            <p className="text-red-500 font-default">${item.price}</p>
          </td>
          <td className="text-center">
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
                radius="sm"
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
          </td>
          <td className="text-center">
            <Button
              aria-label="Remove"
              isIconOnly
              onPress={() => removeFromCart(item._id)}
              className=" absolute top-0 right-0 md:static"
            >
              <Trash size={20} />
            </Button>
          </td>
          <td className="text-end font-semibold font-Kudryashev">
            {item.price * item.quantity}
          </td>
        </tr>
      ) : (
        <div className="flex gap-2 mt-5">
          <Image src={item.images[0]} width={54} height={70} />
          <div className="space-y-2 flex-1">
            <p>{item.name}</p>
            <div className="flex w-full justify-between">
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
                  radius="sm"
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
              <p>{item.price}</p>
            </div>
            <button
              className=" underline-offset-2 underline"
              onClick={() => removeFromCart(item._id)}
            >
              移除
            </button>
          </div>
        </div>
      )}
    </>
  );
}
