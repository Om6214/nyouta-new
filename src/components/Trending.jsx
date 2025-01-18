import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Store/slices/productSlice";
import Slider from "react-slick";
import bgImg from "../assets/images/mahal3.png";
import instaLogo from "../assets/images/insta-logo.png";
import img1 from "../assets/images/trending/1.jpg";
import img2 from "../assets/images/trending/2.png";
import img3 from "../assets/images/trending/3.png";
import img4 from "../assets/images/trending/4.png";
import img5 from "../assets/images/trending/5.jpg";
import img6 from "../assets/images/trending/6.jpg";
import img7 from "../assets/images/trending/7.jpg";
import img8 from "../assets/images/trending/8.jpeg";
import img9 from "../assets/images/trending/9.jpeg";

const items = [
  {
    imgUrl: img1,
  },
  {
    imgUrl: img2,
  },
  {
    imgUrl: img3,
  },
  {
    imgUrl: img4,
  },
  {
    imgUrl: img5,
  },
  {
    imgUrl: img6,
  },
  {
    imgUrl: img7,
  },
  {
    imgUrl: img8,
  },
  {
    imgUrl: img9,
  },
];

const Trending = () => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
    }
  }, [dispatch, products]);
  console.log(products);

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  return (
    <div className="py-6">
      <div>
        <h1 className="text-center text-xl lg:text-4xl font-semibold text-secondary">
          What's Trending !!
        </h1>
        <h2 className="text-center text-lg lg:text-3xl text-secondary">
          Find Out What's Making Waves in the Event World
        </h2>
      </div>
      <div className="mx-16">
        <div className="slider-container">
          <Slider {...settings}>
            {items.map((item) => (
              <div>
                <div>
                  <img className="rounded-2xl border-2 border-pink-400" src={item.imgUrl} alt="" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Follow Us On</h1>
        <a href="https://www.instagram.com/nyoutastore/" target="_blank">
          <img className="w-16" src={instaLogo} alt="Instagram Logo" />
        </a>
      </div>
    </div>
  );
};

export default Trending;
