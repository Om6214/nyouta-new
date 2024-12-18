
import React, { useState, useEffect } from 'react'
import img2 from "../assets/images/home-2.webp";
import img3 from "../assets/images/home-3.webp";
import img4 from "../assets/images/home-4.webp";
import cardImg from "../assets/images/herocard.png";
import webImg from "../assets/images/weddingwebsites.jpg";
import buttonBg from "../assets/images/button.png";
const images = [
  img2,
  img3,
  img4
]

const tiles = [
  {
    title: 'SAVE THE DATE',
    des: 'Customize and Share - FREE'
  },
  {
    title: 'PDF INVITES',
    des: 'Customize and Share'
  },
  {
    title: 'ROYAL E-INVITES',
    des: 'Big on Style, Small on Cost'
  },
  {
    title: 'VIDEO INVITES',
    des: 'Share Your Joy in Motion'
  },
  {
    title: 'WISHES GREETINGS',
    des: 'Customize and Share - FREE'
  },
  {
    title: 'THANKS GREETINGS',
    des: 'Customize and Share - FREE'
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    console.log("rendered")
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length)
  }

  return (
    <>
    <div className='flex lg:flex-row flex-col gap-2 m-2'>
      <div className="relative h-[400px] lg:w-[70%] w-full rounded-xl overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
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
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next slide"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className='lg:w-[30%] w-full rounded-xl bg-pink-200'>
        <div className='lg:px-8 flex flex-col gap-2 py-4 items-center font-heroFont'>
          <h1 className='text-4xl lg:text-5xl font-themeFont font-bold'>Wedding Website</h1>
          <h4 className='text-sm font-semibold text-center'>Create your free wedding website and share all the relevant details about your celebration with your guests.</h4>
          <img className='h-44' src={webImg} alt="" />
          <div className='relative flex flex-col items-center justify-center hover:translate-x-2 duration-300'>
              <img className='h-8' src={buttonBg} alt="" />
              <button className='absolute text-xl font-semibold text-white'>Explore More</button>
          </div>
          <p className='text-sm font-semibold'>A simple, beautiful wedding website just for you - FREE</p>
        </div>
      </div>
      </div>
    <div className='mx-2 py-2'>
        <div className='lg:grid lg:grid-cols-6 hidden justify-center gap-2 lg:gap-16 overflow-x-clip'>
          {tiles.map((tile) => (
            <div className='relative rounded-full bg-cover flex flex-col items-center justify-center' style={{ backgroundImage: `url(${cardImg})`, height: '75px', width: '255px' }}>
              {/* <img className='absolute top-0 w-full' src={cardImg} alt="" /> */}
              <h1 className='text-white font-semibold text-center'>{tile.title}</h1>
              <h2 className='text-center'>{tile.des}</h2>
            </div>
          ))}
        </div>
    </div>
    </>
  )
}