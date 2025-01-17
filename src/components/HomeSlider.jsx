import React from "react";
import Slider from "react-slick";
import img1 from "../assets/images/home-1.webp";
import img2 from "../assets/images/home-2.webp";
import img3 from "../assets/images/home-3.webp";
import img4 from "../assets/images/home-4.webp";
import buttonBg from "../assets/images/09.png";
import { Heart, ShieldCheck, Star } from "lucide-react";
// import products from "../products.json";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProducts } from "../Store/slices/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Carousel } from "flowbite-react";
const HomeSlider = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
    }
  }, [dispatch, products]);
  console.log(products?.filter((items) => [1, 9, 14, 18].includes(items?._id)));
  return (
    <>
      <div className="lg:my-4 pt-6">
        <h1 className="lg:text-5xl text-3xl text-secondary text-center font-avalonB">
          Your Wedding, Your Shape
        </h1>
        <h2 className="lg:text-3xl text-xl text-secondary py-3 font-avalonN text-center">
          Celebrate in Style with Our Distinctively Shaped Invitations by nyouta
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row h-auto px-2 gap-4">
        <div className=" lg:w-[70%] w-full h-[200px] sm:h-[350px]  lg:h-[380px] rounded-xl">
          <Carousel>
            <img className="rounded-xl h-full" src={img1} alt="..." />
            <img className="rounded-xl h-full" src={img2} alt="..." />
            <img className="rounded-xl h-full" src={img3} alt="..." />
            <img className="rounded-xl h-full" src={img4} alt="..." />
          </Carousel>
        </div>
        <div className="lg:w-[30%]">
          <div className="py-6 px-6 lg:h-full flex flex-col lg:gap-4 gap-3 text-secondary items-start border-2 rounded-xl bg-priBg">
            <h1 className="text-7xl font-ttMedium font-bold">new !</h1>
            <h1 className="text-4xl font-linna leading-relaxed">
              shAped Wedding invitAtion
            </h1>
            <h2 className="text-xl">
              Unique shapes that stack together in a perfect piece suite
            </h2>
            <div className="relative hover:translate-x-2 duration-300">
              <img className="w-44" src={buttonBg} alt="" />
              <button className="absolute top-0 left-4 text-lg font-semibold text-white">
                Shop New Shapes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSlider;
