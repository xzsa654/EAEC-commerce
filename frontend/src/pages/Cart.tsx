import CartItem from "@/components/CartItem";
import Coupon from "@/components/Coupon";
import OrderSummery from "@/components/OrderSummery";
import PayComponent from "@/components/Payment";
import PeopleAlsoBuy from "@/components/PeopleAlsoBuy";
import { useCartStore } from "@/stores/useCartStore";
import { Button, Link } from "@heroui/react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
export default function CartPage() {
  const { carts } = useCartStore();

  return (
    <div className=" flex min-h-screen text-[10px] lg:text-[calc(7.7px+0.22vw)] items-center md:justify-between gap-5 flex-col relative md:items-start  xl:flex-row md:py-10">
      <div className="flex relative flex-col w-full xl:w-8/12 gap-3 px-10">
        {/* >=768 px 佈局 */}
        <table className="w-full hidden md:block ">
          <div className="relative  w-full">
            <div className="absolute w-full top-[2rem] ">
              <svg
                preserveAspectRatio="none"
                viewBox="0 0 916 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-[6px] text-[#9D9688]"
              >
                <path
                  d="M0 .5h286.34a4 4 0 0 1 2.83 1.17l5.66 5.66a4 4 0 0 0 2.83 1.17H917"
                  stroke="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <tr className="font-default">
            <th className="w-1/3 text-left  ps-[6rem]  pb-5 ">商品名</th>
            <th className="w-1/4">價格</th>
            <th className="w-1/4">數量</th>
            <th className="w-[10px]"></th>
            <th className="w-1/4 text-end">總計</th>
          </tr>

          {carts.length === 0 ? (
            <NoCartList />
          ) : (
            carts?.map((cart) => {
              return <CartItem key={cart._id} item={cart} />;
            })
          )}
        </table>
        {/* <=768 px 佈局 */}
        <div className="w-full  md:hidden  ">
          <div className="w-full relative">
            <svg
              preserveAspectRatio="none"
              viewBox="0 0 916 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-[6px] text-[#9D9688] absolute top-4"
            >
              <path
                d="M0 .5h286.34a4 4 0 0 1 2.83 1.17l5.66 5.66a4 4 0 0 0 2.83 1.17H917"
                stroke="currentColor"
              ></path>
            </svg>
          </div>
          <div className="flex justify-between">
            <h2>商品名</h2>
            <p>價格</p>
          </div>

          {carts.length === 0 ? (
            <NoCartList />
          ) : (
            carts?.map((cart) => (
              <CartItem key={cart._id} item={cart} mobile={true} />
            ))
          )}
        </div>
        <div>
          <svg
            preserveAspectRatio="none"
            viewBox="0 0 916 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[6px] w-full text-[#9D9688]"
          >
            <path
              d="M0 8.5h286.34a4 4 0 0 0 2.83-1.17l5.66-5.66A4 4 0 0 1 297.66.5H917"
              stroke="currentColor"
            ></path>
          </svg>
        </div>
        <div className="w-full rounded-md hidden xl:block py-5 px-3 mt-[15rem] ">
          <PeopleAlsoBuy />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 600 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeIn", delay: 0.3 }}
        className="w-full xl:w-1/3 flex flex-col static xl:fixed  items-end xl:pe-2 right-0 "
      >
        <svg
          preserveAspectRatio="none"
          name="Shape top variants"
          viewBox="0 0 343 12"
          className=" md:w-full xl:w-8/12 text-default -mb-1"
        >
          <path
            d="M0 4a4 4 0 0 1 4-4h230.52a6 6 0 0 1 4.24 1.76l4.48 4.48A6 6 0 0 0 247.48 8H339a4 4 0 0 1 4 4H0Z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="bg-default w-full xl:w-8/12 ">
          <PayComponent />
          <Coupon />
          <OrderSummery />
        </div>
        <svg
          name="Shape bottom variants"
          viewBox="0 0 343 12"
          preserveAspectRatio="none"
          className="md:w-full xl:w-8/12 text-default -mt-1"
        >
          <path
            d="M343 8a4 4 0 0 1-4 4H108.49a6 6 0 0 1-4.25-1.76l-4.48-4.48A6 6 0 0 0 95.51 4H4a4 4 0 0 1-4-4h343Z"
            fill="currentColor"
          ></path>
        </svg>
      </motion.div>
      <div className=" w-full flex-1 xl:hidden p-2 ">
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
