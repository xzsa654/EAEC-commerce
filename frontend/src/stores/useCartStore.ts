import axiosInstance from "@/lib/axios";
import { addToast } from "@heroui/react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IProduct } from "./useProductStore";

interface Icoupon {
  _id: string;
  code: string;
  discountPercentage: number;
  expirationDate: Date;
  isActive: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface cartInterface {
  _id: string;
  category: string;
  createdAt: Date;
  description: string;
  images: string[];
  isFeatured: boolean;
  updatedAt: Date;
  name: string;
  quantity: number;
  price: number;
}
interface IPayment {
  cardNumber?: number | string
  expirationMonth?: number
  expirationYear?: number
  ccv?: number;
}
interface Icart {
  carts: cartInterface[] | [];
  coupon: Icoupon | null;
  total: number;
  loading: boolean
  paymentInfo: IPayment
  subTotal: number;
  isCouponApplied: boolean
  isCheckout: boolean
  getCartItems: () => Promise<void>;
  getMyCoupon: () => Promise<void>
  addToCart: (product: IProduct) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  calculateTotal: () => void;
  updatedQuantity: (id: string, quantity: number) => Promise<void>;
  getPrime: () => Promise<string>
  sendPayment: (prime: string) => Promise<string>
  applyCoupon: (code: string) => Promise<void>
  removeCoupon: () => void
  clearCart: () => void
}

export const useCartStore = create<Icart>()(
  devtools((set, get) => ({
    carts: [],
    coupon: null,
    isCouponApplied: false,
    isCheckout: false,
    loading: false,
    total: 0,
    subTotal: 0,
    getCartItems: async () => {
      try {
        const res = await axiosInstance.get("/cart");
        set({ carts: res.data });
        get().calculateTotal();
      } catch (error: any) {
        set({ carts: [] });
        addToast({
          title: "取得購物車失敗",
          description: error.response?.data.message || "請稍後再試",
        });
      }
    },
    getMyCoupon: async () => {
      try {
        const res = await axiosInstance.get("/coupon")
        set({ coupon: res.data })
      } catch (error) {
        addToast({
          title: "取得優惠券失敗",
        })
      }
    },
    applyCoupon: async (code) => {
      try {
        const res = await axiosInstance.post("/coupon/validate", { code })
        set({ coupon: res.data, isCouponApplied: true })
        get().calculateTotal()
        addToast({
          title: "使用優惠券成功"
        })
      } catch (error) {
        addToast({
          title: "使用優惠券失敗",
        })
      }
    },
    removeCoupon: () => {
      set({ coupon: null, isCouponApplied: false })
      get().calculateTotal()
    },
    addToCart: async (product: IProduct) => {
      try {
        await axiosInstance.post("/cart", { productId: product._id });
        addToast({
          title: "加入購物車成功",
          color: "success",
        });
        set((prev: Icart) => {
          // 先判定商品是否已存在購物車
          const existingItem = prev.carts.find(
            (item) => item._id === product._id
          );
          const newCart = existingItem
            ? // 存在的話在原本數量上增1
            prev.carts.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
            : // 不存在則添加入購物車
            [
              ...prev.carts,
              {
                ...product,
                quantity: 1
              },
            ];
          return { carts: newCart };
        });
        get().calculateTotal();
      } catch (error: any) {
        console.log(error);

        addToast({
          title: "加入購物車失敗",
          description: error.response?.data.message || "請稍後再試",
        });
      }
    },
    removeFromCart: async (productId) => {
      try {
        await axiosInstance.delete(`/cart`, { data: { productId } });
        set((prev) => ({
          carts: prev.carts.filter((item) => item._id !== productId),
        }));
        get().calculateTotal();
      } catch (error: any) {
        addToast({
          title: "刪除失敗",
          description: error.response.data.message || "請稍後再試",
        });
      }
    },
    updatedQuantity: async (productId, quantity) => {
      try {
        if (quantity === 0) {
          await get().removeFromCart(productId);
          return;
        }
        await axiosInstance.put(`/cart/${productId}`, { quantity });
        set((prev) => ({
          carts: prev.carts.map((item) =>
            item._id === productId ? { ...item, quantity } : item
          ),
        }));
        get().calculateTotal();
      } catch (error) {
        addToast({
          title: "更新失敗",
          description: "請稍後再試",
        });
      }
    },
    calculateTotal: () => {
      // 將購物車所有的商品價格相加
      const { carts, coupon } = get();
      const subTotal = carts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      let total = subTotal;
      if (coupon) {
        const discount = subTotal * (coupon.discountPercentage / 100);
        total = subTotal - discount;
      }

      set({ total, subTotal });
    },
    getPrime: async () => {
      set({ loading: true })
      const tappyStatus = TPDirect.card.getTappayFieldsStatus();
      if (tappyStatus.canGetPrime === false) {
        addToast({
          title: "信用卡資訊不完整",
          description: "請將信用卡資訊填寫齊全",
        });
        set({ loading: false })
        return;
      }
      // Get prime
      TPDirect.card.getPrime(async (result) => {
        if (result.status !== 0) {
          addToast({
            title: "請稍後在試",
          });
          return;
        }
        try {
          await get().sendPayment(result.card.prime)
          set({ loading: false, isCheckout: true })
        } catch (error) {
          set({ loading: false })
          console.log(error);
        }
      });


    },
    sendPayment: async (prime: string) => {
      const { carts, coupon } = get()
      try {
        const res = await axiosInstance.post("/payment/checkout", {
          products: carts,
          couponCode: coupon?.code || null,
          prime
        })
        return res.data.orderId

      } catch (error: any) {
        console.log(error);
        set({ loading: false })
        addToast({
          title: '付款失敗',
        })
      }
    },
    clearCart: async () => {
      try {
        await axiosInstance.delete("/cart")
        set({ carts: [], total: 0, subTotal: 0, coupon: null, isCheckout: false })
      } catch (error) {
        console.log(error);
      }
    }
  }))
);
