import { BookHeart, SmilePlus } from "lucide-react";
import React from "react";
import trustIcon from "../assets/images/trustedicon.png";
import personIcon from "../assets/images/person.png";
import happyIcon from "../assets/images/happy.png";
import bgImg from "../assets/images/mahal5.png";
import img1 from "../assets/images/promise/1.png";
import img2 from "../assets/images/promise/2.png";
import img3 from "../assets/images/promise/3.png";
import img4 from "../assets/images/promise/4.png";
import img5 from "../assets/images/promise/5.png";
import img6 from "../assets/images/promise/6.png";
import img7 from "../assets/images/promise/7.png";
import img8 from "../assets/images/promise/8.png";

const promises = [
  {
    title: "Personalized Your Way",
    description: "Each Nyouta product is crafted to be personalized for you.",
    icon: personIcon,
  },
  {
    title: "100% Happiness Guarantee",
    description: "We strive to give you 100% Happiness.",
    icon: happyIcon,
  },
  {
    title: "Trusted Quality",
    description:
      "We have invested in a state-of-the-art Print & Production Centre.",
    icon: trustIcon,
  },
];

const PromiseCard = () => {
  return (
    <div className=" py-4 flex-col flex gap-8">
      <h1 className="text-center text-secondary font-avalonB text-2xl lg:text-3xl pt-8">
        Our Promise : Quality, Personalization, and a Heartfelt Experience
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-6 lg:px-16 px-2 py-1">
        {promises.map((prom, index) => (
          <div
            key={index}
            className=" relative flex flex-col items-center gap-2 px-4 rounded-lg cursor-pointer"
          >
            <img src={bgImg} className="" alt="" />
            <div className="absolute flex flex-col items-center lg:gap-4 gap-[5px] pt-4 text-white font-heroFont">
              <img className="w-[75px]" src={prom.icon} alt="" />
              <h1 className="lg:text-3xl text-xl font-semibold text-center">
                {prom.title}
              </h1>
              <h3 className="text-center px-12 font-semibold">
                {prom.description}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-4">
        <div className="flex overflow-x-auto gap-4 lg:justify-center">
          <img
            className="cursor-pointer w-[150px] lg:w-[170px]"
            src={img1}
            alt=""
          />
          <img
            className="cursor-pointer w-[150px] lg:w-[170px]"
            src={img2}
            alt=""
          />
          <img
            className="cursor-pointer w-[150px] lg:w-[170px]"
            src={img3}
            alt=""
          />
          <img
            className="cursor-pointer w-[150px] lg:w-[170px]"
            src={img4}
            alt=""
          />
          <img
            className="cursor-pointer w-[150px] lg:w-[170px]"
            src={img5}
            alt=""
          />
          <img
            className="cursor-pointer w-[150px] lg:w-[170px]"
            src={img6}
            alt=""
          />
          <img
            className="cursor-pointer w-[150px] lg:w-[170px]"
            src={img7}
            alt=""
          />
          <img
            className="cursor-pointer w-[150px] lg:w-[170px]"
            src={img8}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default PromiseCard;
