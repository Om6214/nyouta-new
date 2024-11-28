import React from "react";
import Slider from "react-slick";
import savethedate from '../assets/images/savethedate.webp'
import invitation from '../assets/images/placeholder.jpg'
import vinvite from '../assets/images/v-invite.webp'
import welcome from '../assets/images/welcome sign.webp'




const categories = [
    { title: "Save the Date", image: savethedate },
    { title: "Wedding Invites", image: invitation },
    { title: "Haldi Ceremony", image: vinvite },
    { title: "Mehendi Ceremony", image: invitation },
    { title: "Sangeet Ceremony", image: vinvite },
    { title: "Manuhar Patrika", image: savethedate },
    { title: "Wedding Timeline", image: welcome },
    { title: "Theme Invitations", image: savethedate },
    { title: "New Trendz", image: vinvite },
    { title: "Matrimonial Biodata", image: welcome },
    { title: "Birthday Invites", image: invitation},
    { title: "Sawamani Invites", image: savethedate },
    { title: "Lohri Invites", image: vinvite },
    { title: "Griha Pravesh", image: invitation },
    { title: "Halloween Party", image: savethedate},
    { title: "Wedding NewsPaper", image: welcome },
    { title: "Wedding Photo Book", image: welcome },
    { title: "Wedding Magazine", image: savethedate },
    { title: "Wedding Planners", image: vinvite },
    { title: "Offer & Discount", image: invitation },
  ]

const CategorySlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        arrows: false,
      };
  return (
    <div>
        <div className="py-8">
            <h1 className="text-4xl text-center mb-6">Browse with your choice</h1>
            <div className="w-40 h-[3px] bg-amber-400 mx-auto mb-2"></div>
        </div>
    <div className="slider-container">
      <Slider {...settings}>
        {categories.map((items) => (
            <div>
                <img className="w-[300px] h-[100px] object-cover" src={items.image} alt="" />
                <h1 className="absolute text-3xl font-light top-6 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-gradient-to-r from-green-500 to-green-700 inline-block">
                   <span className="relative"> {items.title}</span>
                    </h1>
            </div>
        ))}
      </Slider>
    </div>
    </div>
  )
}

export default CategorySlider