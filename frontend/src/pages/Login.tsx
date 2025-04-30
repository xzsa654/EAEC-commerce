"use client";

import { useUserStore } from "@/stores/useUserStore";
import {
  Button,
  Checkbox,
  CircularProgress,
  Form,
  Image,
  Input,
  Link,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
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
    <div className="flex flex-col min-h-screen w-full items-center justify-center px-10">
      <div className=" relative flex w-full max-w-sm flex-col gap-4 rounded bg-foreground px-[1.25rem] pb-[5.75rem] pt-[6.25rem] ">
        <div className="absolute top-0 -left-[2%] w-[10px]">
          <svg viewBox="0 0 8 113" preserveAspectRatio="none">
            <path
              fill="currentColor"
              d="M8 0v94.72a6 6 0 0 0-2-4.51l-3.9-3.42a6 6 0 0 1-2-4.51V4A4 4 0 0 1 4 0Z"
            ></path>
          </svg>
        </div>
        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            label="Email"
            name="email"
            size="sm"
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
            type="email"
            value={account?.email}
            radius="sm"
            labelPlacement="inside"
          />
          <Input
            isRequired
            radius="sm"
            size="sm"
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
            onChange={(e) =>
              setAccount({ ...account, password: e.target.value })
            }
            value={account.password}
            type={isVisible ? "text" : "password"}
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox
              name="remember"
              size="sm"
              color="default"
              classNames={{
                label: "text-background",
              }}
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
            type="submit"
          >
            {loading ? "載入中 ..." : "登入"}
          </Button>
        </Form>
        <p className="text-center text-background text-small">
          還沒有帳號?&nbsp;
          <Link
            href="/signup"
            size="sm"
            underline="always"
            className="text-background"
          >
            註冊帳號
          </Link>
        </p>
      </div>
      <div className="max-w-sm w-full -mt-1 ">
        <svg
          name="Shape bottom specs"
          viewBox="0 0 343 12"
          preserveAspectRatio="none"
        >
          <path
            d="M0 8a4 4 0 0 0 4 4h230.52a6 6 0 0 0 4.24-1.76l4.48-4.48A6 6 0 0 1 247.48 4H339a4 4 0 0 0 4-4H0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <div className="w-full h-full fixed top-0 left-0 -z-10">
        <Image
          classNames={{
            wrapper: "h-full bg-cover",
          }}
          src="/login&register/123.jpg"
          className=" object-cover object-center-center"
          radius="none"
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  );
}
