import { tr } from "framer-motion/client";
import { CircleX, Info } from "lucide-react";
import React, { useState } from "react";
import Slider from "react-slick";

const offers = [
  {
    info: "Cred Discount",
    imgUrl:
      "https://images.zoomin.com/webresources/banners/wallet_banner/768014091132.jpg",
  },
  {
    info: "MobiKwik Discount",
    imgUrl:
      "https://images.zoomin.com/webresources/banners/wallet_banner/c06d10091112.jpg",
  },
  {
    info: "Simpl Discount",
    imgUrl:
      "https://images.zoomin.com/webresources/banners/wallet_banner/5096ba091122.jpg",
  },
  {
    info: "Airtel Discount",
    imgUrl:
      "https://images.zoomin.com/webresources/banners/wallet_banner/88ab92091141.jpg",
  },
  {
    info: "Mobikwik pay later Discount",
    imgUrl:
      "https://images.zoomin.com/webresources/banners/wallet_banner/1b5208091151.jpg",
  },
  {
    info: "Cred Discount",
    imgUrl:
      "https://images.zoomin.com/webresources/banners/wallet_banner/768014091132.jpg",
  },
];

const DiscountOffer = () => {
    const [showInfo, setShowInfo] = useState(false)
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
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
    // cssEase: "linear"
  };
  return (
    <div className="bg-priBg">
      <div className="slider-container lg:mx-16 mx-2">
        <Slider {...settings}>
          {offers.map((disc, index) => (
            <div key={index} className="relative">
              <img className="border-2" src={disc.imgUrl} alt={disc.info} />
              <h1 className="absolute top-3 right-3"><Info className="cursor-pointer rounded-full border-2 p-[2px]" onClick={() => setShowInfo(true)} size={36}/></h1>
              <div className="">
                {showInfo && (
                    <div className="flex justify-between absolute top-4 left-4 bg-priBg">
                        <h1>{disc.info}</h1>
                        <span><CircleX onClick={() => setShowInfo(false)}/></span>
                    </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DiscountOffer;
