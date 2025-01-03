import React from 'react'
import Slider from "react-slick";
import img1 from "../assets/images/coupons/01.jpg";
import img2 from "../assets/images/coupons/02.jpg";
import img3 from "../assets/images/coupons/03.jpg";
import img4 from "../assets/images/coupons/04.jpg";
import img5 from "../assets/images/coupons/05.jpg";
import img6 from "../assets/images/coupons/06.jpg";
import img7 from "../assets/images/coupons/07.jpg";
import img8 from "../assets/images/coupons/08.jpg";
import img9 from "../assets/images/coupons/09.jpg";
import img10 from "../assets/images/coupons/10.jpg";

const couponImages = {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
}

const CouponCard = () => {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className='lg:mx-6 mx-4'>
      <div className="slider-container">
      <Slider {...settings}>
        {Object.entries(couponImages).map(([key, value]) => (
          <div key={key}>
            <img className='h-[150px] md:h-full' src={value} alt="" />
          </div>
        ))}
      </Slider>
    </div>
    </div>
  )
}

export default CouponCard