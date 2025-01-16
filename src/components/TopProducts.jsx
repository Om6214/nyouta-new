import React from "react";
import Slider from "react-slick";
import atmPass from "../assets/images/products/ATM-Pass-Invites.png";
import coasters from "../assets/images/products/Coasters.jpg";
import diningmats from "../assets/images/products/DiningMats.jpg";

const productItems = [
  {
    name: "ATM Pass Invites",
    imgUrl: atmPass,
  },
  {
    name: "Coasters",
    imgUrl: coasters,
  },
  {
    name: "Dining Mats",
    imgUrl: diningmats,
  },
  {
    name: "ATM Pass Invites",
    imgUrl: atmPass,
  },
  {
    name: "ATM Pass Invites",
    imgUrl: atmPass,
  },
  {
    name: "ATM Pass Invites",
    imgUrl: atmPass,
  },
  {
    name: "ATM Pass Invites",
    imgUrl: atmPass,
  },
  {
    name: "ATM Pass Invites",
    imgUrl: atmPass,
  },
  {
    name: "ATM Pass Invites",
    imgUrl: atmPass,
  },
  {
    name: "ATM Pass Invites",
    imgUrl: atmPass,
  },
  {
    name: "ATM Pass Invites",
    imgUrl: atmPass,
  },
  {
    name: "ATM Pass Invites",
    imgUrl: atmPass,
  },
  {
    name: "ATM Pass Invites",
    imgUrl: atmPass,
  },
  {
    name: "ATM Pass Invites",
    imgUrl: atmPass,
  },
  {
    name: "ATM Pass Invites",
    imgUrl: atmPass,
  },
];

const TopProducts = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <div className="mx-16 my-8">
      <div className="slider-container">
        <Slider {...settings}>
          {productItems.map((item) => (
            <div className="px-4">
                <img src={item.imgUrl} alt="" />
                <div className="">
                    <h1 className="text-center">{item.name}</h1>
                </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopProducts;
