import React from "react";
import giftCard from "../assets/images/featured/gift.jpg";
import greetingCard from "../assets/images/featured/greeting.jpg";
import luggageCard from "../assets/images/featured/luggage.jpg";
import roomCard from "../assets/images/featured/room.jpg";
import thankyouCard from "../assets/images/featured/thankyou.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import buttonBg from "../assets/images/08.png";

const items = [
  {
    name: "Room Itinerary",
    imgURL: roomCard,
  },
  {
    name: "Thank You Cards",
    imgURL: thankyouCard,
  },
  {
    name: "Table Itinerary",
    imgURL:
      "https://img.freepik.com/free-photo/christmas-composition-with-present-pine-cones_23-2147712286.jpg?t=st=1736938319~exp=1736941919~hmac=efcaeb30ac0edf373299ad90a59e671fd516ca490be1835c87db39da64177336&w=996",
  },
  {
    name: "Gift Stickers",
    imgURL: giftCard,
  },
  {
    name: "Luggage Tags",
    imgURL: luggageCard,
  },
  {
    name: "Event Cards",
    imgURL:
      "https://img.freepik.com/free-photo/top-view-amazing-flowers-such-as-lilac-roses-daisy-with-white-gift-box-wooden-background_141793-51743.jpg?t=st=1736938400~exp=1736942000~hmac=371d335b3131968cb66a5c8d9e0cfba3b8bb3f3b21c5badf651194f917fafae8&w=996",
  },
  {
    name: "Greetings",
    imgURL: greetingCard,
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
                <div className="flex flex-col items-center bg-blue-100 rounded-2xl">
                  <img
                    className="h-40 object-cover w-full rounded-t-2xl"
                    src={item.imgURL}
                    alt=""
                  />
                  <div className="relative flex flex-col items-center py-3 hover:translate-x-2 duration-300">
                    <img className="h-6" src={buttonBg} alt="" />
                    <button className="text-md font-semibold  text-white absolute">
                      {item.name}
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
