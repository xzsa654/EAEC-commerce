import Slideshow from "./text";

const ShapesSlideshow = () => {
  const slideData = [
    {
      imgUrl: "banner/1.jpg",
      textRows: [
        "EAEC <em>Commerce </em>",
        "<strong>NO MATTER</strong> BUY <em>FIRST</em>",
      ],
      linkText: "Explore",
      linkUrl: "/category/shirt",
    },
    {
      imgUrl: "banner/2.jpg",
      textRows: ["Temptation", "a <em>desire</em> to <strong>engage</strong>"],
      linkText: "Explore",
      linkUrl: "/category/jeans",
    },
    {
      imgUrl: "banner/3.jpg",
      textRows: [
        "BETTER <strong>TRADING</strong>,",
        "BETTER  <em>SOLUTION</em> ",
      ],
      linkText: "Explore",
      linkUrl: "/category/glasses",
    },
    {
      imgUrl: "banner/4.jpg",
      textRows: ["Temptation", "a <em>desire</em> to <strong>engage</strong>"],
      linkText: "Explore",
      linkUrl: "/category/shoes",
    },
    {
      imgUrl: "banner/5.jpg",
      textRows: ["Temptation", "a <em>desire</em> to <strong>engage</strong>"],
      linkText: "Explore",
      linkUrl: "/category/caps",
    },
    // Add more slides as needed
  ];
  return <Slideshow slides={slideData} />;
};

export default ShapesSlideshow;
