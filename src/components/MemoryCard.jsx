import React from "react";
import { Carousel } from "flowbite-react";
import img1 from "../assets/images/home-1.webp";
import img2 from "../assets/images/home-2.webp";
import img3 from "../assets/images/home-3.webp";
import img4 from "../assets/images/home-4.webp";

const MemoryCard = () => {
  return (
    <div className="mx-8">
      <div>
        <h1 className="text-center text-xl lg:text-4xl font-semibold text-primary">
          Let Every Memory Shine Forever
        </h1>
        <h2 className="text-center text-lg lg:text-3xl text-primary">
          Make Every Moment Memorable with Nyouta
        </h2>
      </div>

      <div className="flex gap-4 my-4">
        <div className="bg-priBg w-[30%] flex flex-col gap-4 items-start justify-center rounded-2xl px-8">
          <h1 className="font-themeFont text-6xl font-bold text-primary">
            Save & <br />
            Share
          </h1>
          <h2 className="text-4xl font-semibold font-heroFont text-primary">YOUR MEMORIES</h2>
          <p className="pr-36 font-heroFont">
            Create Timeless Moments Endless Memories with Personalized Products
          </p>
          <a href="#" className="font-heroFont bg-pink-600 px-6 py-1 text-lg font-semibold text-white rounded-full">View All Products</a>
        </div>
        <div className="w-[70%]">
          <div className="h-56 rounded-xl sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
              <img className="rounded-xl" src={img1} alt="..." />
              <img className="rounded-xl" src={img2} alt="..." />
              <img className="rounded-xl" src={img3} alt="..." />
              <img className="rounded-xl" src={img4} alt="..." />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
