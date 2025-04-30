import { useUserStore } from "@/stores/useUserStore";
import { Link } from "@heroui/link";
import React from "react";

export default function Profile() {
  const { user } = useUserStore();
  return (
    <div className="min-h-screen w-full px-5 flex flex-col gap-1 justify-center items-center">
      <div className="max-w-sm w-full h-auto ">
        <svg
          preserveAspectRatio="none"
          name="Shape top variants"
          className="w-full -mb-1"
          viewBox="0 0 343 12"
        >
          <path
            d="M0 4a4 4 0 0 1 4-4h230.52a6 6 0 0 1 4.24 1.76l4.48 4.48A6 6 0 0 0 247.48 8H339a4 4 0 0 1 4 4H0Z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="bg-foreground rounded w-full  pb-10 px-4 pt-6 text-background">
          <div className="flex text-lg justify-between mb-5">
            <h1 className="text-lg">個人資料</h1>
            <button className=" underline-offset-1 underline ">編輯</button>
          </div>
          <div className="space-y-1 text-lg">
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
      <div className="w-full text-lg text-background rounded  p-5 max-w-sm   bg-foreground">
        <h2 className="mb-5 ">訂單紀錄</h2>
        {/* TODO: 加入購買紀錄 */}
        <p>暫無購買紀錄</p>
      </div>
      <div className="p-5 space-y-2 bg-secondary text-white rounded max-w-sm w-full ">
        <h2>我的收藏</h2>
        <div className=" "></div>
      </div>
    </div>
  );
}
