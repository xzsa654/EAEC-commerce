import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import IndexPage from "@/pages/index";
import SignUpPage from "@/pages/SignUp";
import { CircularProgress } from "@heroui/progress";
import { useEffect } from "react";
import CartPage from "./pages/Cart";
import CategoryPage from "./pages/Category";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/Login";
import PurchaseSuccessPage from "./pages/PurchaseSuccess";
import { useCartStore } from "./stores/useCartStore";
import { useUserStore } from "./stores/useUserStore";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { user, checkingAuth, checkAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    checkingAuth();
  }, [checkingAuth]);

  useEffect(() => {
    if (user) getCartItems();
  }, [getCartItems, user]);

  if (checkAuth)
    return (
      <CircularProgress
        size="lg"
        color="primary"
        className="text-default-500 fixed top-1/2 left-1/2"
        label="Loading..."
      />
    );

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route
        element={!user ? <SignUpPage /> : <Navigate to="/" />}
        path={"/signUp"}
      />
      <Route
        element={!user ? <LoginPage /> : <Navigate to="/" />}
        path={"/login"}
      />
      <Route
        element={
          user?.role === "admin" ? <Dashboard /> : <Navigate to="/login" />
        }
        path="/dashboard"
      />
      <Route element={<CategoryPage />} path="/category/:category" />
      <Route
        element={user ? <CartPage /> : <Navigate to={"/login"} />}
        path="/cart"
      />
      <Route
        element={user ? <PurchaseSuccessPage /> : <Navigate to={"/login"} />}
        path="/purchaseSuccess"
      />
    </Routes>
  );
}

export default App;
