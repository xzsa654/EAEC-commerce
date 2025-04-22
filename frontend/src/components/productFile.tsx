import { Button, Image, Link, Slider } from "@heroui/react";
import {
  LucideUpload,
  Trash2Icon,
  CheckIcon,
  XIcon,
  CropIcon,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "@/lib/generateDowload";

export default function ProductFile({
  images,
  createImage,
  isImageExist,
}: any) {
  const [isCrop, setIsCrop] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [processedImages, setProcessedImages] = useState<any[]>([]);

  // Sync local state with parent component's state
  useEffect(() => {
    setProcessedImages(images);
  }, [images]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    if (imageList.length > processedImages.length) {
      // 有新圖片上傳
      setCurrentImageIndex(imageList.length - 1);
      setIsCrop(true);
    }

    // Update local state first
    setProcessedImages(imageList as never[]);

    // Then update parent component
    createImage(imageList as never[]);
  };

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCropperForImage = (index: number) => {
    setCurrentImageIndex(index);
    setIsCrop(true);
  };

  const saveCroppedImage = async () => {
    try {
      if (!processedImages[currentImageIndex]?.dataURL || !croppedAreaPixels)
        return;

      // 獲取裁剪後的 canvas
      const canvas = await getCroppedImg(
        processedImages[currentImageIndex].dataURL,
        croppedAreaPixels,
        0 // 不旋轉
      );

      // 轉換為 dataURL
      const dataURL = canvas.toDataURL("image/jpeg");

      // 更新本地圖片列表
      const updatedImageList = [...processedImages];
      updatedImageList[currentImageIndex] = {
        ...updatedImageList[currentImageIndex],
        dataURL,
        file: dataURLtoFile(dataURL, `cropped-image-${currentImageIndex}.jpg`), // 將 dataURL 轉換為 File 對象
      };

      // 更新本地狀態
      setProcessedImages(updatedImageList);

      // 更新父元件狀態
      createImage(updatedImageList);

      setIsCrop(false);
    } catch (e) {
      console.error("裁剪圖片時出錯:", e);
    }
  };

  // 將 dataURL 轉換為 File 對象的輔助函數
  const dataURLtoFile = (dataURL: string, filename: string) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  return (
    <ImageUploading
      multiple
      value={processedImages}
      onChange={onChange}
      maxNumber={6}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="space-y-2">
          {/* 裁剪模態框 */}
          {isCrop && processedImages[currentImageIndex]?.dataURL && (
            <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-center p-4">
              <div className="relative w-full h-[70vh] max-w-3xl bg-black rounded-t-lg">
                <Cropper
                  image={processedImages[currentImageIndex]?.dataURL}
                  crop={crop}
                  zoom={zoom}
                  aspect={1} // 方形裁剪，可以根據需求更改
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className="flex w-full max-w-3xl items-center justify-between gap-2 p-4 bg-white rounded-b-lg">
                <Slider
                  aria-label="Temperature"
                  className="max-w-md"
                  color="foreground"
                  defaultValue={0.1}
                  maxValue={3}
                  minValue={1}
                  value={zoom}
                  showOutline={true}
                  size="sm"
                  step={0.1}
                  onChange={setZoom as any}
                />
                <div className="space-x-2 text-end space-y-2">
                  <Button
                    color="default"
                    startContent={<XIcon size={18} />}
                    onClick={() => setIsCrop(false)}
                  >
                    取消
                  </Button>
                  <Button
                    color="primary"
                    startContent={<CheckIcon size={18} />}
                    onClick={saveCroppedImage}
                  >
                    確認裁剪
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 上傳按鈕區域 */}
          <div className="flex items-center gap-3 justify-between">
            <h2 className='after:content-["*"] after:ml-1 after:text-danger-300'>
              圖片上傳
            </h2>

            <div>
              <Button
                color="primary"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                startContent={<LucideUpload size={18} />}
              >
                上傳圖片
              </Button>
              &nbsp;
              <Button
                color="danger"
                startContent={<Trash2Icon size={18} />}
                onClick={onImageRemoveAll}
              >
                全部清空
              </Button>
            </div>
          </div>
          {isImageExist && <div className="text-red-500">請上傳圖片</div>}

          {/* 圖片網格區域 */}
          <div className="grid grid-cols-3 gap-2 max-w-2xl mx-auto">
            {processedImages.map((image, index) => (
              <div
                key={index}
                className={`${index === 0 ? "col-span-2 row-span-2" : ""} relative aspect-square overflow-hidden`}
              >
                <Image
                  src={image.dataURL}
                  className="cursor-pointer object-cover w-full h-full"
                  onClick={() => onImageUpdate(index)}
                />
                <Link
                  className={`absolute top-1 ${index === 0 ? "right-10 md:right-10" : "right-10 md:right-8"} z-10 cursor-pointer hover:text-red-500 text-primary`}
                  size="sm"
                  onClick={() => showCropperForImage(index)}
                >
                  <CropIcon size={20} />
                </Link>
                <Link
                  className={`absolute top-1 ${index === 0 ? "right-4 md:right-4" : "right-3 md:right-1"} z-10 cursor-pointer hover:text-red-500 text-primary`}
                  size="sm"
                  onClick={() => onImageRemove(index)}
                >
                  <Trash2Icon size={20} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </ImageUploading>
  );
}
