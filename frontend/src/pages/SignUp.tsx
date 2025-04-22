import React from "react";
import { Button, Input, CircularProgress, Link } from "@heroui/react";
import {Icon} from "@iconify/react";
import { motion } from "framer-motion";
import { useUserStore } from "@/stores/useUserStore";
export default function SignUpPage() {
  const {signUp,loading} =useUserStore()
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
  
  const [password, setPassword] = React.useState("")
  const errors: string[] = []
  
  if (password.length < 6) {
    errors.push("密碼須為6位數");
  }
  if ((password.match(/[A-Z]/g) || []).length < 1) {
    errors.push("密碼至少包含一個大小寫英文字母");
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fm =new FormData(e.target as HTMLFormElement)
    signUp(fm)
  }
  return (
    <div className="flex h-full w-full items-center justify-center">

      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6 bg-content1 shadow-small ">
        <p className="pb-4 text-left text-3xl font-semibold">
          註冊帳號
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="中文姓名"
            labelPlacement="outside"
            name="name"
            validate={(value) => {
              if (value.length < 2|| !/[\u4e00-\u9fff]/g.test(value) ) {
                return "請輸入中文名";
              }
              
            }}
            placeholder="請輸入全名"
            type="text"
            variant="bordered"
          />
          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="請輸入 email"
            type="email"
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
            labelPlacement="outside"
            errorMessage={() => (
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{ error}</li>
                ))}
              </ul>
            )}
            isInvalid={errors.length > 0}
            name="password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <Input
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
            labelPlacement="outside"
            name="confirmPassword"
            validate={(value) => {
              if(value!==password) return "密碼不一致"
            }}
            placeholder="請輸入重複密碼"
            type={isConfirmVisible ? "text" : "password"}
            variant="bordered"
          />
          
          <Button
            aria-label={"註冊"}
            startContent={loading&&<CircularProgress aria-label="Loading..." isIndeterminate size="sm" />}
            disabled={loading} color="primary" type="submit">
            {loading?"載入中...":"註冊"}
          </Button>
        </form>
        <p className="text-center text-small">
          <Link href="/login" size="sm">
            已經有帳號? 登入
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
