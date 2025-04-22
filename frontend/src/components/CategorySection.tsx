import { categorys } from "@/config/site";
import { ArrowRight } from "lucide-react";
import CategoryCard from "./CategoryCard";

export default function CategorySection() {
  return (
    <section className="section_showcase w-full   bg-background p-5 space-y-10  ">
      <h2 className="w-full text-center text-2xl ">商品分類</h2>
      <div className="w-full container mx-auto h-full justify-items-center grid grid-cols-1 md:grid-cols-3 gap-12">
        {categorys.map((category) => {
          return (
            <CategoryCard
              key={category.key}
              imageSrc={category.image}
              altText="Kendrick Lamar - GNX Album Cover"
              captionText={`explore ${category.key} `}
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              router={category.key}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="text-lg flex items-center ">
                  {category.label}
                  <ArrowRight size={18} />
                </p>
              }
            />
          );
        })}
      </div>
    </section>
  );
}
