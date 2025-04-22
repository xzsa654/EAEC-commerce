import Slideshow from "./text";

const ShapesSlideshow = () => {
  const slideData = [
    {
      imgUrl: "banner/5.jpeg",
      textRows: [
        "EAEC <em>Commerce </em>",
        "<strong>NO MATTER</strong> BUY <em>FIRST</em>",
      ],
      linkText: "Explore",
      linkUrl: "/category/shirt",
    },
    {
      imgUrl: "banner/1.jpeg",
      textRows: ["Temptation", "a <em>desire</em> to <strong>engage</strong>"],
      linkText: "Explore",
      linkUrl: "/category/jeans",
    },
    {
      imgUrl: "banner/3.jpeg",
      textRows: [
        "BETTER <strong>TRADING</strong>,",
        "BETTER  <em>SOLUTION</em> ",
      ],
      linkText: "Explore",
      linkUrl: "/category/glasses",
    },
    {
      imgUrl: "banner/4.jpeg",
      textRows: ["Temptation", "a <em>desire</em> to <strong>engage</strong>"],
      linkText: "Explore",
      linkUrl: "/category/shoes",
    },
    {
      imgUrl: "banner/2.jpeg",
      textRows: ["Temptation", "a <em>desire</em> to <strong>engage</strong>"],
      linkText: "Explore",
      linkUrl: "/category/caps",
    },
    // Add more slides as needed
  ];
  return <Slideshow slides={slideData} />;
};

export default ShapesSlideshow;
