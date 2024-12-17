import { SquareArrowOutUpRight } from "lucide-react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const VideoCard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="lg:px-16 my-4 px-4 py-8 font-heroFont text-white bg-secondary flex flex-col lg:flex-row gap-8 justify-around">
        <div>
          <iframe
            className="rounded-lg object-cover w-[350px] lg:w-[650px]"
            height="400"
            src="https://www.youtube.com/embed/GVBTLJ6Fqys?si=MnaWRogQwnaYNcCD"
            title="Nyouta, where memories are brought to life!"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div className="flex flex-col lg:gap-12 lg:px-10 gap-6 items-start justify-center">
          <h1 className="lg:text-5xl text-4xl  font-heroFont font-semibold">
            Save, Share & Celebrate
          </h1>
          <h3 className="text-lg font-semibold">
            Every moment deserves to be remembered. With Nyouta's unique
            personalized gifts, stylish decor, and beautifully crafted
            keepsakes, we turn your memories into timeless treasures. Celebrate
            your love, joy, and milestones with products designed to preserve
            the essence of every special occasion. Let Nyouta help you make
            memories that will last a lifetime.
          </h3>
          <button
            className="flex items-center gap-2 bg-primary rounded-lg text-white hover:bg-gradient-to-r hover:from-amber-900 hover:to-amber-700 px-8 py-2 shadow-xl lg:text-xl transition duration-300 ease-in"
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
  );
};

export default VideoCard;
