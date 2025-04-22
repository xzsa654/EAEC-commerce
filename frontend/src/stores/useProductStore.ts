import axiosInstance from "@/lib/axios";
import { addToast } from "@heroui/react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface IProduct {
  _id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
}

interface IProductStore {
  products: IProduct[]
  loading: boolean
  setProducts: (products: []) => void
  createProduct: (productData: FormData) => Promise<boolean>
  getAllProducts: () => Promise<void>
  getFeaturedProducts: () => Promise<void>
  deleteProduct: (id: string | any) => Promise<void>
  toggleFeaturedProduct: (id: string | any) => Promise<void>
  getProductsByCategory: (id: string | any) => Promise<void>
}

export const useProductStore = create<IProductStore>()(
  devtools((set, get) => ({
    products: [],
    loading: false,
    setProducts: (products) => set({ products }),
    createProduct: async (productData) => {
      try {
        set({ loading: true })
        const res = await axiosInstance.post("/product/createProduct", productData)
        set((prev) => ({
          products: [...prev.products, res.data.product],
          loading: false
        }))
        console.log(get().products);

        addToast({
          title: "上傳成功",
          color: "success",
        })
        return true
      } catch (error) {
        addToast({ title: "上傳失敗", description: "請稍後再試", color: "danger" })
        set({ loading: false })
      }
    },
    getAllProducts: async () => {
      try {
        const res = await axiosInstance.get("/product")
        set({ products: res.data.products })
      } catch (error: any) {
        addToast({
          title: "取得商品失敗",
          description: error.response.data.message || "請稍後再試",
          color: "danger",
        })
      }
    },
    getFeaturedProducts: async () => {
      try {
        set({ loading: true })
        const res = await axiosInstance.get("/product/getFeaturedProducts")
        set({ products: res.data, loading: false })
      } catch (error: any) {
        set({ loading: false })
        console.log(error.response.data.message);
      }
    },
    toggleFeaturedProduct: async (productId: string) => {
      set({ loading: true })
      try {
        const res = await axiosInstance.patch(`/product/${productId}`)
        set((prev) => ({
          products: prev.products.map((product) => product._id === productId ? { ...product, isFeatured: res.data.isFeatured } : product),
          loading: false
        }))
      } catch (error: any) {
        addToast({
          title: "精選商品切換失敗",
          description: error.response.data.message || "請稍後再試",
        })
        set({ loading: false })
      }
    },
    deleteProduct: async (id) => {
      set({ loading: true })
      try {
        await axiosInstance.delete(`/product/${id}`)
        set((prev) => ({
          products: prev.products.filter((product) => product._id !== id),
          loading: false
        }))
        addToast({
          title: "刪除成功",
          color: "success",
        })
      } catch (error: any) {
        addToast({
          title: "刪除失敗",
          description: error.response.data.message || "請稍後再試",
          color: "danger",
        })
      }
    },
    getProductsByCategory: async (category) => {
      set({ loading: true })
      try {
        const res = await axiosInstance.get(`/product/category/${category}`)
        set({ products: res.data, loading: false })
      } catch (error: any) {
        addToast({
          title: "取得商品失敗",
          description: error.response.data.message || "請稍後再試",
        })
        set({ loading: false })
      }
    }
  }))
)