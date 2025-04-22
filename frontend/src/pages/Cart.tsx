import CartItem from "@/components/CartItem";
import Coupon from "@/components/Coupon";
import OrderSummery from "@/components/OrderSummery";
import PayComponent from "@/components/Payment";
import PeopleAlsoBuy from "@/components/PeopleAlsoBuy";
import { useCartStore } from "@/stores/useCartStore";
import { Button, Divider, Link } from "@heroui/react";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { carts } = useCartStore();

  return (
    <div className=" container mx-auto flex  min-h-screen items-center md:justify-between  md:items-start flex-col md:flex-row   md:py-10">
      <div className="flex flex-col w-full md:w-1/2 gap-12">
        <div className="w-full  bg-default  sm:rounded-b-none md:rounded-md py-5 px-3 space-y-3 ">
          <h2 className=" font-default text-xl">購物車清單</h2>
          <Divider />
          <div className="flex-col flex gap-4 w-full ">
            {carts.length === 0 ? (
              <NoCartList />
            ) : (
              carts?.map((cart) => {
                return <CartItem key={cart._id} item={cart} />;
              })
            )}
          </div>
        </div>
        <div className="bg-default w-full rounded-md hidden md:block py-5 px-3 ">
          <PeopleAlsoBuy />
        </div>
      </div>
      <div className="w-full md:w-1/3 flex flex-col">
        <div className="bg-default md:w-full lg:w-8/12 sm:rounded-t-none md:rounded-md ">
          <PayComponent />
          <Coupon />
          <OrderSummery />
        </div>
      </div>
      <div className="bg-default w-full flex-1 md:hidden p-2 ">
        <PeopleAlsoBuy />
      </div>
    </div>
  );
}

const NoCartList = () => {
  return (
    <div className="w-full flex-col flex items-center gap-3 ">
      <ShoppingCart size={60} />
      <h2 className="font-default text-4xl">暫無購買清單</h2>
      <Button
        as={Link}
        href="/"
        size="md"
        color="primary"
        className="w-[200px] text-2xl font-default"
      >
        立即去採購
      </Button>
    </div>
  );
};
