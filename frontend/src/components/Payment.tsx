import { TPDInit } from "@/lib/TPDirect";
import { Divider } from "@heroui/react";
import { useEffect, useRef } from "react";

function PayComponent() {
  // 使得TPD只會執行一次
  const hasSetupRef = useRef(false);
  useEffect(() => {
    if (hasSetupRef.current) return;
    TPDInit();
    hasSetupRef.current = true;
  }, [hasSetupRef]);
  return (
    <div className="flex flex-col gap-3 p-2 ">
      <h3 className="font-default text-xl">信用卡資訊</h3>
      <Divider />
      <div className="w-full p-0">
        <div className="flex justify-between items-center gap-2">
          <label className="text-sm w-1/2">信用卡卡號</label>
          <div className="tpfield" id="card-number" />
        </div>
        <div className="flex justify-between items-center gap-2">
          <label className="text-sm w-1/2">到期日期</label>
          <div className="tpfield" id="card-expiration-date" />
        </div>
        <div className="flex justify-between items-center gap-2">
          <label className="text-sm w-1/2">安全碼</label>
          <div className="tpfield" id="card-ccv" />
        </div>
      </div>
    </div>
  );
}

export default PayComponent;
