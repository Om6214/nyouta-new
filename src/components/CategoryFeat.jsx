import React from "react";
import giftImg from "../assets/images/gift.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import buttonBg from "../assets/images/08.png";

const items = [
    {
        name: 'Room Itinerary',
        imgURL: giftImg
    },
    {
        name: 'Thank You Cards',
        imgURL: giftImg
    },
    {
        name: 'Table Itinerary',
        imgURL: giftImg
    },
    {
        name: 'gift Stickers',
        imgURL: giftImg
    },
    {
        name: 'Luggage Tags',
        imgURL: giftImg
    },
    {
        name: 'Event Cards',
        imgURL: giftImg
    },
    {
        name: 'Greetings',
        imgURL: giftImg
    },
]

const CategoryFeat = () => {
    var settings = {
        infinite: true,
        speed: 500,
        swipeToSlide: true,
        slidesToShow: 5,
        // slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
  return (
    <div className="my-4 mx-4 font-heroFont">
      <div>
        <h1 className="text-xl lg:text-3xl font-semibold text-center text-primary">Your Wedding Day, Organized & Decor to Perfection</h1>
        <h2 className="text-lg lg:text-2xl  text-center text-primary">
          Create a Smooth, Stress-Free Wedding Day with Our Itineraries Room
        </h2>
      </div>
      <div>
      <div className="slider-container mx-16">
      <Slider {...settings}>
        {items.map((item) => (
            <div>
                <div className="flex flex-col items-center bg-blue-100 pb-4 px-4 rounded-2xl">
                <img src={item.imgURL} alt="" />
                <div className="relative flex flex-col items-center hover:translate-x-2 duration-300">
                  <img className="" src={buttonBg} alt="" />
                  <button className="text-lg font-semibold  text-white absolute">{item.name}</button>
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
