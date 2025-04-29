import { categorys } from "@/config/site";
import { useProductStore } from "@/stores/useProductStore";
import {
  Button,
  Form,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import React, { useState } from "react";
import { ImageListType } from "react-images-uploading";
import ProductFile from "./productFile";
export default function CreateProductForm({
  toggleTabs,
}: {
  toggleTabs: () => void;
}) {
  const { createProduct, loading } = useProductStore();
  const [images, setImages] = useState<ImageListType>([]);
  const [isImageExist, setIsImageExist] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!images.length) {
      setIsImageExist(true);
    }
    const fm = new FormData(e.target as HTMLFormElement);

    fm.set("price", price.toString());
    for (let image of images) {
      fm.append("images[]", image.file as File);
    }
    await createProduct(fm);
    toggleTabs();
  };

  return (
    <div className="min-h-screen">
      {" "}
      <div className="flex flex-col md:flex-row   justify-center gap-10 bg-default rounded-md p-3 ">
        <ProductFile
          isImageExist={isImageExist}
          images={images}
          createImage={(v: ImageListType) => setImages(v)}
        />
        <Form className="flex gap-3" onSubmit={handleSubmit}>
          <Input
            required
            isRequired
            name="name"
            label={"商品名"}
            className="md:w-[350px]"
          />
          <Textarea
            label={"描述"}
            name="description"
            placeholder="請輸入商品描述"
            required
            isRequired
          />
          <NumberInput
            label="價格"
            value={price}
            onValueChange={setPrice}
            isRequired
            required
            name="price"
          />
          <Select
            isRequired
            required
            items={categorys}
            label="商品類型"
            name="category"
            placeholder="請選擇一項商品類型"
          >
            {(category) => <SelectItem>{category.label}</SelectItem>}
          </Select>
          <Button
            className="w-full"
            color="primary"
            isLoading={loading}
            disabled={loading}
            type="submit"
          >
            新增商品
          </Button>
        </Form>
      </div>{" "}
    </div>
  );
}
