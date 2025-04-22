import Analytics from "@/components/Analytics";
import CreateProductForm from "@/components/createProductForm";
import ProductsList from "@/components/ProductsList";
import { useProductStore } from "@/stores/useProductStore";
import { Tab, Tabs } from "@heroui/react";
import React, { useEffect } from "react";
export default function Dashboard() {
  const { getAllProducts } = useProductStore();
  useEffect(() => {
    getAllProducts();
  }, []);
  const [selected, setSelected] = React.useState("create");
  let tabs = [
    {
      id: "create",
      label: "新增商品",
      content: <CreateProductForm toggleTabs={() => setSelected("products")} />,
    },
    {
      id: "products",
      label: "商品管理",
      content: <ProductsList />,
    },
    {
      id: "analytics",
      label: "數據分析",
      content: <Analytics />,
    },
  ];

  return (
    <div className="flex w-full flex-col  mt-5 items-center ">
      <Tabs
        aria-label="Dynamic tabs"
        items={tabs}
        selectedKey={selected}
        onSelectionChange={setSelected as any}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {item.content}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
