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
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    arrows: false,
  };
  return (
    <>
    <div className="lg:py-1 pt-6">
        <h1 className="lg:text-5xl text-3xl text-primary text-center font-heroFont font-semibold ">Your Wedding, Your Shape</h1>
        <h2 className="lg:text-3xl text-xl text-primary py-3 font-heroFont text-center">Celebrate in Style with Our Distinctively Shaped Invitations by nyouta</h2>
        
    </div>
    <div className="flex flex-col lg:flex-row px-2 gap-4">
       <div className="h-80 lg:w-[70%] rounded-xl sm:h-64 xl:h-80 2xl:h-80">
                  <Carousel>
                    <img className="rounded-xl h-full" src={img1} alt="..." />
                    <img className="rounded-xl h-full" src={img2} alt="..." />
                    <img className="rounded-xl h-full" src={img3} alt="..." />
                    <img className="rounded-xl h-full" src={img4} alt="..." />
                  </Carousel>
                </div>
      <div className="lg:w-[30%]">
        <div className="pb-2 px-6 mt flex flex-col gap-4 items-start border-2 rounded-xl bg-priBg">
          <h1 className="text-8xl font-ttMedium font-bold">new !</h1>
          <h1 className="text-4xl font-linna">Shaped Wedding Invitation</h1>
          <h2 className="text-xl">Unique shapes that stack together in a perfect piece suite</h2>
          <div className="relative hover:translate-x-2 duration-300">
            <img className="w-44" src={buttonBg} alt="" />
            <button className="absolute top-0 left-4 text-lg font-semibold text-white">Shop New Shapes</button>
          </div>

        </div>
      </div>
    </div>
    </>
  );
};

export default HomeSlider;
