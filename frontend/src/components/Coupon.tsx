import { useCartStore } from "@/stores/useCartStore";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/react";
import React, { useEffect } from "react";

export default function Coupon() {
  const [userInputCode, setUserInputCode] = React.useState("");
  const { coupon, isCouponApplied, getMyCoupon, removeCoupon, applyCoupon } =
    useCartStore();
  useEffect(() => {
    getMyCoupon();
  }, []);
  useEffect(() => {
    if (coupon) setUserInputCode(coupon.code);
  }, [coupon]);

  const handleApplyCoupon = () => {
    if (!userInputCode) return;
    applyCoupon(userInputCode);
  };
  const handleRemoveCoupon = () => {
    removeCoupon();
    setUserInputCode("");
  };
  return (
    <div className="flex flex-col gap-3 p-2 ">
      <h2 className="font-default text-xl">優惠券代碼</h2>
      <Divider />
      <form action="" className="flex gap-5">
        <Input
          className="font-default"
          placeholder="請輸入優惠券代碼"
          value={userInputCode}
          onChange={(e) => setUserInputCode(e.target.value)}
          radius="md"
        />
        {coupon && isCouponApplied ? (
          <Button onPress={handleRemoveCoupon} color="danger">
            移除優惠券
          </Button>
        ) : (
          <Button
            onPress={handleApplyCoupon}
            className="font-default"
            color="primary"
          >
            使用優惠碼
          </Button>
        )}
      </form>
      {coupon && isCouponApplied && (
        <div className=" ">
          <h3 className=" text-md font-default  font-medium ">可用優惠券</h3>
          <p>
            {coupon.code} - {coupon.discountPercentage}%{" "}
          </p>
        </div>
      )}
      <Divider />
    </div>
  );
}
