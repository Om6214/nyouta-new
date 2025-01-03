import React, { useState, useEffect } from "react";
import img2 from "../assets/images/home-2.webp";
import img3 from "../assets/images/home-3.webp";
import img4 from "../assets/images/home-4.webp";
import cardImg from "../assets/images/02.png";
import webImg from "../assets/images/weddingwebsites.jpg";
import buttonBg from "../assets/images/09.png";
import freeImg from "../assets/images/free.png";
import wedImg from "../assets/images/01.png";
import { motion } from "framer-motion";

const images = [img2, img3, img4];

const tiles = [
  {
    title: "SAVE THE DATE",
    des: "Customize and Share - FREE",
  },
  {
    title: "PDF INVITES",
    des: "Customize and Share",
  },
  {
    title: "ROYAL E-INVITES",
    des: "Big on Style, Small on Cost",
  },
  {
    title: "VIDEO INVITES",
    des: "Share Your Joy in Motion",
  },
  {
    title: "SHORT INVITATIONS",
    des: "Customize and Share - FREE",
  },
  {
    title: "WEDDING PLANNERS",
    des: "Editable and Printable - FREE",
  },
  {
    title: "WISHES GREETINGS",
    des: "Customize and Share - FREE",
  },
  {
    title: "THANKS GREETINGS",
    des: "Customize and Share - FREE",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    console.log("rendered");
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col gap-2 m-2">
        <div className="lg:w-[70%] w-full">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8 }}
            className="relative h-[400px]  rounded-xl overflow-hidden"
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-full lg:object-cover"
                />
              </div>
            ))}

            <button
              onClick={goToPrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous slide"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next slide"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 w-3 rounded-full ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.8 }}
              className="hidden md:grid md:grid-cols-4 lg:grid lg:grid-cols-4 gap-3 mt-2 lg:justify-center"
            >
              {tiles.map((tile) => (
                <div className="relative rounded-full flex flex-shrink-0 flex-col items-center justify-center">
                  <img className="w-[250px] h-[55px]" src={cardImg} alt="" />
                  <div className="absolute">
                    <h1 className="text-white font-avalonB text-center">
                      {tile.title}
                    </h1>
                    <h2 className="text-center font-avalonN">{tile.des}</h2>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.8 }}
          className="lg:w-[30%] flex items-center justify-center relative w-full rounded-xl"
        >
          <img className="h-[500px] lg:h-full" src={wedImg} alt="" />
          <div className="lg:px-8 absolute flex flex-col gap-2 lg:gap-3 pt-16 lg:pt-14 items-center justify-center font-heroFont">
            <h1 className="text-4xl lg:text-5xl font-ttMedium uppercase text-center leading-none text-pink-600">
              Wedding
            </h1>
            <h1 className="text-4xl lg:text-5xl font-ttMedium uppercase text-center leading-none tracking-[13px] text-pink-600">
              Website
            </h1>
            <h4 className="text-sm px-8 lg:px-0 font-semibold text-center">
              Create your free wedding website and share all the relevant
              details about your celebration with your guests.
            </h4>
            <div className="flex items-center gap-4">
              <img className="h-44" src={webImg} alt="" />
              <img className="h-24" src={freeImg} alt="" />
            </div>
            <div className="relative flex flex-col items-center justify-center hover:translate-x-2 duration-300">
              <img className="w-48" src={buttonBg} alt="" />
              <a
                href="/create-wedding-website"
                className="absolute uppercase text-lg font-bol font-avalonB text-white"
              >
                Explore Designs
              </a>
            </div>
            <p className="text-sm font-semibold text-center">
              A simple, beautiful wedding website just for you - FREE
            </p>
          </div>
        </motion.div>
      </div>
      <div className="mx-2 py-2 md:hidden lg:hidden">
        <div className="flex overflow-x-auto lg:justify-center">
          {tiles.map((tile) => (
            <div className="relative rounded-full flex flex-shrink-0 flex-col items-center justify-center">
              <img className="w-[250px]" src={cardImg} alt="" />
              <div className="absolute">
                <h1 className="text-white font-semibold text-center">
                  {tile.title}
                </h1>
                <h2 className="text-center">{tile.des}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
