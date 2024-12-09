import React from "react";
import Slider from "react-slick";
import img1 from "../assets/images/home-1.webp";
import img2 from "../assets/images/home-2.webp";
import img3 from "../assets/images/home-3.webp";
import img4 from "../assets/images/home-4.webp";
import { Heart, ShieldCheck, Star } from "lucide-react";

const HomeSlider = () => {
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
    <div className="lg:py-16 pt-6 bg-priBg">
        <h1 className="lg:text-5xl text-3xl text-primary text-center font-primaryFont font-bold ">Bring your memories to life with Nyouta</h1>
        
    </div>
    <div className="flex flex-col bg-priBg lg:flex-row lg:px-12">
      <div className="slider-container lg:w-[70%] rounded-lg lg:py-12 py-8">
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
      <div className="mx-2 flex flex-col gap-8 py-4 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary w-full">
        <h1 className="lg:text-5xl text-3xl font-primaryFont text-center font-bold">Nyouta</h1>
        <div className="flex gap-2 items-center">
            <h1 className="flex font-heroFont items-center gap-1 text-third text-2xl"><Heart size={32}/> <span>35 Lakh</span></h1>
            <h2 className="font-heroFont">Customers</h2>
        </div>
        <div className="flex gap-2 items-center">
            <h1 className="flex font-heroFont items-center gap-1 text-third text-2xl"><ShieldCheck size={32} /> <span>1 crore</span></h1>
            <h2 className="font-heroFont">Cards printed</h2>
        </div>
        <div className="flex gap-2 items-center">
            <h1 className="flex font-heroFont items-center gap-1 text-third text-2xl"><Star size={32} /> <span>1 Lakh</span></h1>
            <h2 className="font-heroFont">5 star ratings</h2>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomeSlider;
