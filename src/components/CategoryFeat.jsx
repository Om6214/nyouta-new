import React from "react";
import checkIn from "../assets/images/decor/Check-in.jpeg";
import coasters from "../assets/images/decor/Coasters.jpg";
import dining from "../assets/images/decor/DinningMat.png";
import roomHandle from "../assets/images/decor/Roomhandle.jpg";
import roomItinerary from "../assets/images/decor/Roomit.jpeg";
import roomKey from "../assets/images/decor/Roomkey.jpeg";
import tableIt from "../assets/images/decor/Tableit.jpeg";
import tableMenu from "../assets/images/decor/Tablemenu.png";
import thankCard from "../assets/images/decor/Thankyou.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import buttonBg from "../assets/images/08.png";

const items = [
  {
    name: "Room Itinerary",
    imgURL: roomItinerary,
  },
  {
    name: "Coasters",
    imgURL: coasters,
  },
  {
    name: "Table Itinerary",
    imgURL: tableIt
  },
  {
    name: "Room Handle Tags",
    imgURL: roomHandle,
  },
  {
    name: "Dining Mats",
    imgURL: dining,
  },
  {
    name: "Check-In Itinerary",
    imgURL: checkIn
      
  },
  {
    name: "Room Keys",
    imgURL: roomKey,
  },
  {
    name: "Table Menu",
    imgURL: tableMenu,
  },
  {
    name: "Thank You Cards",
    imgURL: thankCard,
  },
];

const CategoryFeat = () => {
  var settings = {
    infinite: true,
    speed: 500,
    swipeToSlide: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="my-4 mx-4 font-heroFont">
      <div>
        <h1 className="text-xl lg:text-3xl font-semibold text-center text-secondary font-avalonN">
          Your Wedding Day, Organized & Decor to Perfection
        </h1>
        <h2 className="text-lg lg:text-2xl  text-center text-secondary font-avalonN">
          Create a Smooth, Stress-Free Wedding Day with Our Itineraries Room
        </h2>
      </div>
      <div>
        <div className="slider-container mx-16">
          <Slider {...settings}>
            {items.map((item) => (
              <div>
                <div className="flex flex-col space-y-2 items-center rounded-2xl">
                  <img
                    className="border-2 border-pink-500 rounded-xl"
                    src={item.imgURL}
                    alt=""
                  />
                  <h1 className="text-secondary font-avalonB">{item.name}</h1>
                  <div className="relative flex flex-col items-center hover:translate-x-2 duration-300">
                    <img className="h-6" src={buttonBg} alt="" />
                    <button className="text-md font-semibold  text-white absolute">
                     Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CategoryFeat;
