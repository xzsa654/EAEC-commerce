import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import CategoryList from "./CategoryList";
// 确保注册插件
gsap.registerPlugin(useGSAP);

export default function Category({ tags }: { tags: number }) {
  return (
    <>
      <div
        className={`category container 
        mx-auto w-[20rem] bg-background  absolute top-1  left-0 right-0 text-background rounded-sm p-6 z-50  `}
      >
        <div className="flex  justify-end mb-6">
          <svg
            viewBox="0 0 8 113"
            preserveAspectRatio="none"
            className=" absolute z-[51]  top-0 w-2  right-[100%] "
          >
            <path
              d="M8 0v94.72a6 6 0 0 0-2-4.51l-3.9-3.42a6 6 0 0 1-2-4.51V4A4 4 0 0 1 4 0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>

        <CategoryList tags={tags} />
        <svg
          name="Shape bottom specs"
          viewBox="0 0 343 12"
          preserveAspectRatio="none"
          className=" absolute left-0 -bottom-2 w-full"
        >
          <path
            d="M0 8a4 4 0 0 0 4 4h230.52a6 6 0 0 0 4.24-1.76l4.48-4.48A6 6 0 0 1 247.48 4H339a4 4 0 0 0 4-4H0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </>
  );
}
