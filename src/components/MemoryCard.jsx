import React from "react";
import { Carousel } from "flowbite-react";
import img1 from "../assets/images/home-1.webp";
import img2 from "../assets/images/home-2.webp";
import img3 from "../assets/images/home-3.webp";
import img4 from "../assets/images/home-4.webp";
import buttonBg from "../assets/images/08.png";

const MemoryCard = () => {
  return (
    <div className="lg:mx-8 mx-2">
      <div>
        <h1 className="text-center text-2xl lg:text-4xl font-semibold text-secondary font-avalonN">
          Let Every Memory Shine Forever
        </h1>
        <h2 className="text-center text-xl lg:text-3xl text-secondary font-avalonN">
          Make Every Moment Memorable with Nyouta
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 my-4">
        <div className="bg-priBg lg:w-[30%] flex flex-col gap-2 items-start justify-center rounded-2xl px-8">
          <h1 className="font-ttMedium text-6xl font-bold text-secondary">
            Save ! & <br />
            <span className="pl-20">Share</span>
          </h1>
          <p className="text-4xl font-ttMedium text-secondary">YOUR MEMORIES</p>
          <p className="lg:pr-16 text-lg font-avalonN">
            Create Timeless Moments Endless Memories with Personalized Products
          </p>
          <div className="relative flex flex-col items-center hover:translate-x-2 duration-300">
            <img className="h-8" src={buttonBg} alt="" />
            <a
              href="/products"
              className="text-lg uppercase  text-white absolute font-avalonB"
            >
              View All Products
            </a>
          </div>
        </div>
        <div className="lg:w-[70%]">
          <div className="h-80 rounded-xl sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
              <img className="rounded-xl h-full" src={img1} alt="..." />
              <img className="rounded-xl h-full" src={img2} alt="..." />
              <img className="rounded-xl h-full" src={img3} alt="..." />
              <img className="rounded-xl h-full" src={img4} alt="..." />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
