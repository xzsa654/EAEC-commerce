import { useCartStore } from "@/stores/useCartStore";
import { Button } from "@heroui/button";
import { Divider, Form } from "@heroui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSummery() {
  const { total, subTotal, loading, getPrime, isCheckout } = useCartStore();
  const saving = subTotal - total;
  const navigate = useNavigate();
  useEffect(() => {
    if (isCheckout) {
      navigate("/purchaseSuccess");
    }
  }, [isCheckout]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getPrime();
  };
  return (
    <div className="flex flex-col gap-3 p-2 ">
      <div className="flex justify-between">
        <h2 className="font-default">原價</h2>
        <h2 className="font-default">{subTotal}</h2>
      </div>
      <div className="flex justify-between">
        <h2 className="font-default">折扣金額</h2>
        <h2 className="font-default">{saving.toFixed(0)}</h2>
      </div>
      <Divider />
      <div className="flex justify-between">
        <h2 className="font-default">總金額</h2>
        <h2 className="font-default text-green-500">{total.toFixed(0)}</h2>
      </div>
      <Form onSubmit={handleSubmit} className="w-full">
        <Button
          isLoading={loading}
          className="w-full bg-foreground text-background text-[10px] lg:text-[calc(7.7px+0.22vw)]"
          type="submit"
        >
          送出訂單
        </Button>
      </Form>
    </div>
  );
}
