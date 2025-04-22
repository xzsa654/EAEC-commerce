import { categorys } from "@/config/site";
import { useProductStore } from "@/stores/useProductStore";
import {
  Button,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  addToast,
  getKeyValue,
} from "@heroui/react";
import { Star, Trash2 } from "lucide-react";

const columns = [
  { name: "商品名", uid: "name" },
  { name: "價格", uid: "price" },
  { name: "分類", uid: "category" },
  { name: "精選", uid: "featured" },
  { name: "操作", uid: "actions" },
];

export default function ProductsList() {
  const { products, deleteProduct, toggleFeaturedProduct } = useProductStore();
  return (
    <Table className="sm:w-[70vw]" selectionMode="single">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={products}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) =>
              columnKey === "name" ? (
                <TableCell>
                  <div className="flex gap-2 items-center ">
                    <Image
                      src={item.images[0]}
                      width={50}
                      radius="full"
                      height={50}
                    />
                    <p>{item.name}</p>
                  </div>
                </TableCell>
              ) : columnKey == "category" ? (
                <TableCell>
                  <p>{categorys.find((c) => item.category === c.key)?.label}</p>
                </TableCell>
              ) : columnKey == "featured" ? (
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleFeaturedProduct(item._id)}>
                      {item.isFeatured ? (
                        <Star size={20} fill="yellow" color="yellow" />
                      ) : (
                        <Star size={20} />
                      )}
                    </button>
                  </div>
                </TableCell>
              ) : columnKey == "actions" ? (
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        addToast({
                          title: `是否確定刪除${item.name}?`,
                          timeout: 100000,
                          description: "刪除後將無法復原",
                          classNames: {
                            base: ["flex flex-col items-start"],
                            icon: "w-6 h-6 fill-current",
                          },
                          color: "danger",
                          endContent: (
                            <div className="flex gap-2 mt-2 w-full justify-end ">
                              <Button
                                onPress={() => {
                                  deleteProduct(item._id);
                                  const closeButton = document.querySelector(
                                    "button[aria-label='closeButton']"
                                  ) as HTMLButtonElement;
                                  closeButton.click();
                                }}
                                color="danger"
                                size="sm"
                                startContent={<Trash2 size={20} />}
                              >
                                刪除
                              </Button>
                              <Button
                                size="sm"
                                onPress={() => {
                                  const closeButton = document.querySelector(
                                    "button[aria-label='closeButton']"
                                  ) as HTMLButtonElement;
                                  closeButton.click();
                                }}
                              >
                                取消
                              </Button>
                            </div>
                          ),
                        })
                      }
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </TableCell>
              ) : (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
