import { useCartStore } from "@/stores/useCartStore";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect } from "react";

export default function PurchaseSuccessPage() {
  const { removeFromCart } = useCartStore();
  useEffect(() => {
    removeFromCart(null);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-default rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-success w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-default font-bold text-center text-success mb-2">
            購買成功！
          </h1>
          <p className="text-default text-center mb-2">
            感謝你的購買,我們會盡快處理你的訂單。
          </p>
          <p className="text-success text-center text-sm mb-6">
            請透過Email確認訂單細節與更新資訊。
          </p>
          <div className="bg-foreground rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-background">訂單編號</span>
              <span className="text-sm font-semibold text-success">
                #123456
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-background">預計交貨日期為</span>
              <span className="text-sm font-semibold text-success">
                3-5工作天
              </span>
            </div>
          </div>
          <div className="space-y-4 flex flex-col">
            <Button
              color="success"
              startContent={<HandHeart size={18} />}
              className="mr-2 text-white"
            >
              感謝你對我們的信任！
            </Button>
            <Button
              as={Link}
              href="/"
              className="text-white bg-default-500"
              startContent={<ArrowRight size={18} />}
            >
              請往繼續購物
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
