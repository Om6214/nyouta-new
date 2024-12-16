import React from "react";
import Slider from "react-slick";
import img1 from "../assets/images/home-1.webp";
import img2 from "../assets/images/home-2.webp";
import img3 from "../assets/images/home-3.webp";
import img4 from "../assets/images/home-4.webp";
import { Heart, ShieldCheck, Star } from "lucide-react";
// import products from "../products.json";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProducts } from "../Store/slices/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
    <div className="lg:py-1 pt-6 bg-priBg">
        <h1 className="lg:text-5xl text-3xl text-primary text-center font-heroFont font-semibold ">Your Wedding, Your Shape</h1>
        <h2 className="lg:text-3xl text-xl text-primary pt-1 font-heroFont text-center">Celebrate in Style with Our Distinctively Shaped Invitations by nyouta</h2>
        
    </div>
    <div className="flex flex-col bg-priBg lg:flex-row">
      <div className="slider-container lg:w-[70%] rounded-lg my-auto">
        <Slider {...settings} className="px-6">
          <div>
            <img className="w-full lg:h-[350px] lg:object-cover rounded-lg" src={img1} alt="" />
          </div>
          <div>
            <img className="w-full lg:h-[350px] lg:object-cover rounded-lg" src={img2} alt="" />
          </div>
          <div>
            <img className="w-full lg:h-[350px] lg:object-cover rounded-lg" src={img3} alt="" />
          </div>
          <div>
            <img className="w-full lg:h-[350px] lg:object-cover rounded-lg" src={img4} alt="" />
          </div>
        </Slider>
      </div>
      <div className="">
        <div className="py-6 px-6 mt-4 flex flex-col gap-4 items-start border-2 rounded-xl">
          <h1 className="text-7xl font-themeFont font-bold">new !</h1>
          <h1 className="text-5xl font-themeFont">Shaped Wedding Invitation</h1>
          <h2 className="text-xl">Unique shapes that stack together in a perfect piece suite</h2>
          <button className="bg-pink-600 font-bold text-white px-3 py-1 rounded-full text-lg">Shop New Shapes</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomeSlider;
