"use client";

import React, { useEffect } from "react";
import {
  Button,
  Input,
  Checkbox,
  Link,
  Form,
  CircularProgress,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useUserStore } from "@/stores/useUserStore";
export default function LoginPage() {
  const { loading, login, remember, rememberMe } = useUserStore();
  useEffect(() => {
    if (remember !== null) {
      setSaveAccount(!!remember);
      setAccount({ email: remember!.email, password: remember!.password });
    }
  }, [remember]);
  const [account, setAccount] = React.useState({
    email: "",
    password: "",
  });
  const [saveAccount, setSaveAccount] = React.useState(false);

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fm = new FormData(e.target as HTMLFormElement);

    if (saveAccount) {
      rememberMe({
        email: account.email,
        password: account.password,
      });
    } else {
      rememberMe(null);
    }
    login(fm);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small"
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">登入</h1>
          <p className="text-small text-default-500">以繼續購物</p>
        </div>

        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            label="Email "
            name="email"
            placeholder="請輸入 email"
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
            type="email"
            value={account?.email}
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="密碼"
            name="password"
            placeholder="請輸入密碼"
            onChange={(e) =>
              setAccount({ ...account, password: e.target.value })
            }
            value={account.password}
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox
              name="remember"
              size="sm"
              isSelected={saveAccount}
              onValueChange={() => setSaveAccount(!saveAccount)}
            >
              記住我
            </Checkbox>
          </div>
          <Button
            disabled={loading}
            startContent={
              loading && (
                <CircularProgress
                  size="sm"
                  color="default"
                  aria-label="loading"
                />
              )
            }
            className="w-full"
            color="primary"
            type="submit"
          >
            {loading ? "載入中 ..." : "登入"}
          </Button>
        </Form>
        <p className="text-center text-small">
          還沒有帳號?&nbsp;
          <Link href="/signup" size="sm">
            註冊帳號
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
