import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Store/slices/productSlice";
import Slider from "react-slick";
import bgImg from "../assets/images/mahal3.png";
import instaLogo from "../assets/images/insta-logo.png";

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
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
    ],
  };
  return (
    <div>
      <div>
        <h1 className="text-center text-xl lg:text-3xl font-semibold text-primary">
          What's Trending !!
        </h1>
        <h2 className="text-center text-lg lg:text-2xl text-primary">
          Find Out What's Making Waves in the Event World
        </h2>
      </div>
      <div className="mx-16">
        <div className="slider-container">
          <Slider {...settings}>
            {products.slice(100, 120).map((product) => (
              <div className="lg:h-[250px] h-[300px]">
                <div className="relative flex flex-col items-center justify-center">
                  <img className="" src={bgImg} alt="" />
                  <div className="absolute flex flex-col items-center font-heroFont">
                    <img className="h-[170px] w-full object-cover" src={product.image[0]} alt="" />
                    <p className="font-semibold">{product.subSubCategory}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="flex flex-col items-center mt-6">
          <h1 className="text-xl font-semibold">Follow Us On</h1>
          <a href=""><img className="w-16" src={instaLogo} alt="Instagram Logo" /></a>
      </div>
    </div>
  );
};

export default Trending;
