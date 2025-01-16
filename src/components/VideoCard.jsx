import { SquareArrowOutUpRight } from "lucide-react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import buttonBg from "../assets/images/07.png";
import video1 from "../assets/video/videoYt.mp4";
import playBtn from "../assets/images/play.jpg";

const VideoCard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="lg:px-16 my-4 px-4 py-8 font-heroFont text-white bg-secondary flex flex-col items-center lg:flex-row gap-8 justify-around">
        <div>
          <video src={video1} className="rounded-3xl shadow-2xl lg:object-center md:object-center object-cover lg:w-[300rem] lg:h-full h-[20rem]" controls muted poster={playBtn}></video>
        </div>
        <div className="flex flex-col  lg:gap-6 lg:px-10 gap-6 sm:items-center lg:items-start justify-center">
          <h1 className="lg:text-4xl text-3xl font-linna">
            Save, Share Memories
          </h1>
          <h1 className="lg:text-3xl font-avalonB text-2xl">
            "Timeless Moments <br />
            <span className="pl-16">Endless Memories"</span>
          </h1>
          <h3 className="text-lg font-semibold">
            Every moment deserves to be remembered. With Nyouta's unique
            personalized gifts, stylish decor, and beautifully crafted
            keepsakes, we turn your memories into timeless treasures. Celebrate
            your love, joy, and milestones with products designed to preserve
            the essence of every special occasion. Let Nyouta help you make
            memories that will last a lifetime.
          </h3>
          <div className="relative flex flex-col mx-auto items-center justify-center hover:translate-x-2 duration-300 ease-in-out">
            <img className="h-8" src={buttonBg} alt="" />
          <button
            className="flex absolute items-center gap-2 font-bold text-white lg:text-xl"
            onClick={() => navigate("/products")}
          >
            Shop Now{" "}
            <span>
              <SquareArrowOutUpRight />
            </span>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
