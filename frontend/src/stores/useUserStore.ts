import axiosInstance from "@/lib/axios";
import { addToast } from "@heroui/react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
interface IUser {
  _id: string | any;
  name: string
  email: string
  cartItems: {
    id: string
    quantity: number
    product: string | any
  }[]
  role: "customer" | "admin"
  comparePassword(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserStore {
  user: null | IUser
  loading: boolean
  checkAuth: boolean
  remember: { email: string, password: string } | null
  theme: "light" | "dark" | ""
  signUp: (data: FormData) => Promise<void>
  login: (data: FormData) => Promise<void>
  checkingAuth: () => Promise<void>
  logout: () => Promise<void>
  rememberMe: (data: { email: string, password: string } | null) => void
  getTheme: (theme: "light" | "dark") => void
  refreshToken: () => Promise<void>
}

export const useUserStore = create<IUserStore>()(
  devtools(persist(
    (set, get) => ({
      user: null,
      loading: false,
      checkAuth: true,
      remember: null,
      theme: "",
      signUp: async (data: FormData) => {
        set({ loading: true })
        try {
          const res = await axiosInstance.post("/auth/signup", data)
          set({ user: res.data.user, loading: false })

          addToast({
            title: "註冊成功",
            color: "success",
          })

        } catch (error: any) {
          addToast({
            title: "註冊失敗",
            color: "danger",
            description: error.response?.data.message
          })
          set({ loading: false })
        }
      },
      login: async (data: FormData) => {
        try {
          set({ loading: true })
          const res = await axiosInstance.post("/auth/login", data)
          set({ user: res.data.user, loading: false })
          addToast({
            title: "登入成功",
            color: "success",
          })
        } catch (error: any) {
          addToast({
            title: "登入失敗",
            description: error.response?.data.message,
            color: "danger"
          })
        } finally {
          set({ loading: false })
        }
      },
      // 透過 cookie 檢查登入狀態
      checkingAuth: async () => {
        set({ checkAuth: true })
        try {
          const res = await axiosInstance.get("/auth/profile")
          set({ user: res.data, checkAuth: false })
        } catch (error) {
          set({ user: null, checkAuth: false })
        }
      },
      logout: async () => {
        try {
          set({ user: null })
          await axiosInstance.post("/auth/logout")
        } catch (error: any) {
          addToast({
            title: "登出失敗",
            color: "danger",
            description: error.response?.data.message
          })
        }
      },
      rememberMe: (data: { email: string, password: string } | null) => {
        set({ remember: data })
      },
      getTheme: (theme) => {
        set({ theme })
      },
      refreshToken: async () => {
        if (get().checkAuth) return
        set({ checkAuth: true })
        try {
          const res = await axiosInstance.post("auth/refresh-token")
          set({ checkAuth: false })
          return res.data
        } catch (error) {
          set({ user: null, checkAuth: false })
          throw error
        }

      }
    }), { name: "rememberMe", partialize: (state) => ({ remember: state.remember }) })))

let refreshPromise: Promise<any> | null = null

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        if (refreshPromise) {
          await refreshPromise
          return axiosInstance(originalRequest)
        }
        refreshPromise = useUserStore.getState().refreshToken()
        await refreshPromise
        refreshPromise = null
        return axiosInstance(originalRequest)
      } catch (error) {
        useUserStore.getState().logout()
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)