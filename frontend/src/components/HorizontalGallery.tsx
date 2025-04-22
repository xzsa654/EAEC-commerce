import React, { useEffect, useRef } from "react";

const HorizontalGallery = () => {
  const galleryItems = [
    {
      title: "Moonraker",
      number: "01",
      image: "/api/placeholder/800/600",
      tags: ["#house", "#green", "#chair"],
    },
    {
      title: "Nacarat",
      number: "02",
      image: "/api/placeholder/800/600",
      tags: ["#love", "#hug", "#people"],
    },
    {
      title: "Selkie",
      number: "03",
      image: "/api/placeholder/800/600",
      tags: ["#hike", "#nature", "#rain"],
    },
    {
      title: "Thalassic",
      number: "04",
      image: "/api/placeholder/800/600",
      tags: ["#free", "#wood", "#fire"],
    },
    {
      title: "Uroboros",
      number: "05",
      image: "/api/placeholder/800/600",
      tags: ["#cloud", "#lake", "#frog"],
    },
    {
      title: "Waitron",
      number: "06",
      image: "/api/placeholder/800/600",
      tags: ["#tent", "#flower", "#love"],
    },
    {
      title: "Soucouyant",
      number: "07",
      image: "/api/placeholder/800/600",
      tags: ["#water", "#bottle", "#hand"],
    },
    {
      title: "Periapt",
      number: "08",
      image: "/api/placeholder/800/600",
      tags: ["#night", "#stars", "#moon"],
    },
    {
      title: "Cyanic",
      number: "09",
      image: "/api/placeholder/800/600",
      tags: ["#sun", "#light", "#air"],
    },
    {
      title: "Martlet",
      number: "10",
      image: "/api/placeholder/800/600",
      tags: ["#vital", "#fog", "#close"],
    },
    {
      title: "Eurhythmic",
      number: "11",
      image: "/api/placeholder/800/600",
      tags: ["#cover", "#bed", "#window"],
    },
    {
      title: "Dariole",
      number: "12",
      image: "/api/placeholder/800/600",
      tags: ["#sad", "#mouth", "#tear"],
    },
  ];

  const galleryRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleWheel = (e) => {
      if (container) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#dedede]">
      <div
        ref={scrollContainerRef}
        className="flex h-full overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          className="flex items-center px-[calc(50vw-7.5vmax-1rem)] min-w-max"
          ref={galleryRef}
        >
          {/* Left Text */}
          <div className="absolute left-[-1vw] flex flex-col">
            <span
              className="text-[20vw] font-bold leading-[0.8] text-transparent"
              style={{
                WebkitTextStroke: "1px #645c5b",
                letterSpacing: "-0.05em",
              }}
            >
              Must
            </span>
            <span
              className="text-[20vw] font-bold leading-[0.8] text-transparent"
              style={{
                WebkitTextStroke: "1px #645c5b",
                letterSpacing: "-0.05em",
              }}
            >
              ache
            </span>
          </div>

          {/* Gallery Items */}
          {galleryItems.map((item, index) => (
            <figure key={index} className="relative m-0 inline-flex">
              <div
                className="grid"
                style={{
                  gridTemplateAreas:
                    "'... ...' 'gallery-image gallery-image' 'gallery-image gallery-image'",
                  gridTemplateColumns: "8rem 25vh",
                  gridTemplateRows: "4rem 45vh 3rem",
                }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ gridArea: "gallery-image" }}
                >
                  <div
                    className="w-[calc(100%+10vw)] h-full ml-[-5vw] bg-cover bg-center transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundPosition: "50% 25%",
                      transform: "scale(1)",
                    }}
                  />
                </div>

                {/* Caption */}
                <figcaption
                  className="absolute inset-0 z-[1] pointer-events-none"
                  style={{
                    display: "grid",
                    gridTemplateAreas:
                      "'gallery-number gallery-number' 'gallery-link ...' 'gallery-link gallery-tags'",
                    gridTemplateColumns: "8rem auto",
                    gridTemplateRows: "4rem auto 3rem",
                  }}
                >
                  {/* Number */}
                  <span
                    className="text-[10vw] font-bold text-transparent self-center justify-self-center"
                    style={{
                      gridArea: "gallery-number",
                      WebkitTextStroke: "1px #645c5b",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {item.number}
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}

          {/* Right Text */}
          <div className="absolute right-0 flex flex-col">
            <span
              className="text-[20vw] font-bold leading-[0.8] text-transparent"
              style={{
                WebkitTextStroke: "1px #645c5b",
                letterSpacing: "-0.05em",
              }}
            >
              Cómp
            </span>
            <span
              className="text-[20vw] font-bold leading-[0.8] text-transparent"
              style={{
                WebkitTextStroke: "1px #645c5b",
                letterSpacing: "-0.05em",
              }}
            >
              lice
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HorizontalGallery;
