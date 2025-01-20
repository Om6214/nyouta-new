import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import wedImg2 from "../assets/images/weddingurl/w6.png";
import wedImg3 from "../assets/images/weddingurl/w7.png";

const WedSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: wedImg2, alt: "slide 1" },
    { src: wedImg3, alt: "slide 2" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative h-[175px] w-80">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.src} alt={slide.alt} className="w-full h-full" />
        </div>
      ))}

      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {slides.map((_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full ${
            index === currentSlide ? 'bg-white' : 'bg-white/50'
          }`}
          onClick={() => setCurrentSlide(index)}
        />
      ))}
    </div> */}
    </div>
  );
};

export default WedSlide;
