import React from "react";
import img11 from "../assets/images/promise/11.png";
import img12 from "../assets/images/promise/12.png";
import img13 from "../assets/images/promise/13.png";
import img14 from "../assets/images/promise/14.png";
import img15 from "../assets/images/promise/15.png";
import img16 from "../assets/images/promise/R1.png";
import img17 from "../assets/images/promise/17.png";
import img18 from "../assets/images/promise/18.png";

const RewardCard = () => {
  return (
    <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white font-heroFont py-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-2xl lg:text-4xl font-semibold">
          Exclusive Rewards Await
        </h1>
        <h2 className="text-center text-xl lg:text-3xl">
          Shop Now and Earn Special Award with Surprise Gift & Discount
        </h2>
      </div>
      <div className="flex overflow-x-auto lg:justify-center gap-4 lg:mx-4 mx-2">
        <img
          className="cursor-pointer w-[150px] lg:w-[160px]"
          src={img11}
          alt=""
        />
        <img
          className="cursor-pointer w-[150px] lg:w-[160px]"
          src={img12}
          alt=""
        />
        <img
          className="cursor-pointer w-[150px] lg:w-[160px]"
          src={img13}
          alt=""
        />
        <img
          className="cursor-pointer w-[150px] lg:w-[160px]"
          src={img14}
          alt=""
        />
        <img
          className="cursor-pointer w-[150px] lg:w-[160px]"
          src={img15}
          alt=""
        />
        <img
          className="cursor-pointer w-[150px] lg:w-[160px]"
          src={img16}
          alt=""
        />
        <img
          className="cursor-pointer w-[150px] lg:w-[160px]"
          src={img17}
          alt=""
        />
        <img
          className="cursor-pointer w-[150px] lg:w-[160px]"
          src={img18}
          alt=""
        />
      </div>
    </div>
  );
};

export default RewardCard;
