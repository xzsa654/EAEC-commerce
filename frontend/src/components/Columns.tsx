import { Image } from "@heroui/react";

export default function Columns() {
  return (
    <section className="bg-background min-h-[100vh] section--columns  fixed left-0 top-0 right-0 bottom-0 -z-[1] w-full h-screen ">
      <div className="w-full h-full -rotate-[45deg] items-center will-change-transform relative flex justify-center gap-[2.5vw] ">
        {/* column 1 */}
        <div className="columns relative z-[1] flex flex-col pt-[5vh] pb-[15vh] ">
          <div className="column-wrap relative block  will-change-transform">
            {Array(7)
              .fill(1)
              ??.map((_item, i) => {
                return (
                  <div
                    key={i}
                    className="w-[25vw] h-[25vw] rounded-[4px] column__item relative overflow-hidden cursor-pointer mb-[2.5vw] z-[1] will-change-transform  "
                  >
                    {/* <div className={` w-full h-full bg-cover bg-center will-change-transform bg-[url('/uns/${i+1}.jpg')] `}>
                  </div> */}
                    <Image
                      src={`/cols/${i + 1}.jpg`}
                      className="w-full h-full column__item-img"
                      loading="lazy"
                    />
                  </div>
                );
              })}
          </div>
        </div>
        {/* column 2 */}
        <div className="columns relative z-[1] flex flex-col pt-[5vh] pb-[15vh] ">
          <div className="column-wrap relative block  will-change-transform">
            {Array(7)
              .fill(1)
              ?.map((_item, i) => {
                return (
                  <div
                    key={i}
                    className="w-[25vw] h-[25vw] rounded-[4px] relative column__item overflow-hidden cursor-pointer mb-[2.5vw] z-[1] will-change-transform  "
                  >
                    {/* <div className={` w-full h-full bg-cover bg-center will-change-transform bg-[url('/uns/${i+1}.jpg')] `}>
                  </div> */}
                    <Image
                      src={`/cols/c${i + 1}.jpg`}
                      className="w-full h-full column__item-img"
                      loading="lazy"
                    />
                  </div>
                );
              })}
          </div>
        </div>
        {/* column 3  */}
        <div className="columns relative z-[1] flex flex-col pt-[5vh] pb-[15vh] ">
          <div className="column-wrap relative block  will-change-transform">
            {Array(7)
              .fill(1)
              ?.map((_item, i) => {
                return (
                  <div
                    key={i}
                    className="w-[25vw] h-[25vw] rounded-[4px] column__item relative overflow-hidden cursor-pointer mb-[2.5vw] z-[1] will-change-transform  "
                  >
                    {/* <div className={` w-full h-full bg-cover bg-center will-change-transform bg-[url('/uns/${i+1}.jpg')] `}>
                  </div> */}
                    <Image
                      src={`/cols/b${i + 1}.jpg`}
                      className="w-full h-full column__item-img"
                      loading="lazy"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
