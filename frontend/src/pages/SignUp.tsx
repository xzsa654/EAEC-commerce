import { useUserStore } from "@/stores/useUserStore";
import { Button, CircularProgress, Image, Input, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";
export default function SignUpPage() {
  const { signUp, loading } = useUserStore();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const [password, setPassword] = React.useState("");
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push("密碼須為6位數");
  }
  if ((password.match(/[A-Z]/g) || []).length < 1) {
    errors.push("密碼至少包含一個大小寫英文字母");
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fm = new FormData(e.target as HTMLFormElement);
    signUp(fm);
  };
  return (
    <div className="flex flex-col min-h-screen w-full items-center px-5 justify-center">
      <div className="w-full max-w-3xl -mb-1">
        <svg
          preserveAspectRatio="none"
          name="Shape top variants"
          viewBox="0 0 343 12"
        >
          <path
            d="M0 4a4 4 0 0 1 4-4h230.52a6 6 0 0 1 4.24 1.76l4.48 4.48A6 6 0 0 0 247.48 8H339a4 4 0 0 1 4 4H0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <div className="flex w-full max-w-3xl flex-col gap-4 rounded px-8 pb-10 pt-6 bg-foreground  ">
        <div className="flex font-bold font-Kudryashev flex-col gap-4 text-background items-center">
          <p className="text-[calc(7.7px+0.22vw)]">EAEC </p>
          <p className="text-4xl">歡迎加入社群</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            radius="sm"
            isRequired
            size="sm"
            label="中文姓名"
            className="max-w-[300px]"
            labelPlacement="inside"
            name="name"
            validate={(value) => {
              if (value.length < 2 || !/[\u4e00-\u9fff]/g.test(value)) {
                return "請輸入中文名";
              }
            }}
            type="text"
          />
          <Input
            radius="sm"
            isRequired
            size="sm"
            label="Email"
            labelPlacement="inside"
            name="email"
            type="email"
          />
          <Input
            radius="sm"
            isRequired
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
            labelPlacement="inside"
            errorMessage={() => (
              <ul>{errors?.map((error, i) => <li key={i}>{error}</li>)}</ul>
            )}
            isInvalid={errors.length > 0}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={isVisible ? "text" : "password"}
          />
          <Input
            radius="sm"
            size="sm"
            isRequired
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
                {isConfirmVisible ? (
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
            label="重複密碼"
            labelPlacement="inside"
            name="confirmPassword"
            validate={(value) => {
              if (value !== password) return "密碼不一致";
            }}
            type={isConfirmVisible ? "text" : "password"}
          />

          <Button
            aria-label={"註冊"}
            startContent={
              loading && (
                <CircularProgress
                  aria-label="Loading..."
                  isIndeterminate
                  size="sm"
                />
              )
            }
            disabled={loading}
            className="text-white"
            color="default"
            radius="none"
            type="submit"
          >
            {loading ? "載入中..." : "註冊"}
          </Button>
        </form>
        <p className="text-center text-background text-small">
          <Link href="/login" size="sm" className="text-background">
            已經有帳號? 登入
          </Link>
        </p>
      </div>
      <svg
        name="Shape bottom variants"
        viewBox="0 0 343 12"
        preserveAspectRatio="none"
        className="max-w-3xl -mt-1"
      >
        <path
          d="M343 8a4 4 0 0 1-4 4H108.49a6 6 0 0 1-4.25-1.76l-4.48-4.48A6 6 0 0 0 95.51 4H4a4 4 0 0 1-4-4h343Z"
          fill="currentColor"
        ></path>
      </svg>
      <div className="fixed top-0 -z-10 left-0 w-full h-full  ">
        <Image
          src="/login&register/123.jpg"
          classNames={{ wrapper: "h-full" }}
          className="object-cover object-center"
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  );
}
