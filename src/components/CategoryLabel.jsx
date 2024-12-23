import React from 'react';

import ProductJson from '../products.json'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Zoom, Navigation, Pagination, Autoplay } from 'swiper/modules';


import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";


export default function CategoryLabel() {

     const { pageName } = useParams();
     const content=ProductJson[pageName] || []
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-[6%] py-5 bg-white">
        <div className="mt-10">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
      <Swiper
        style={{
          '--swiper-navigation-color': '#000',
          '--swiper-pagination-color': '#000',
        }}
        zoom={true}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Zoom, Navigation, Pagination, Autoplay]}
        className="rounded-xl shadow-lg overflow-hidden"
      >
        {[
          'https://swiperjs.com/demos/images/nature-1.jpg',
          'https://swiperjs.com/demos/images/nature-2.jpg',
          'https://swiperjs.com/demos/images/nature-3.jpg',
          'https://swiperjs.com/demos/images/nature-4.jpg',
        ].map((src, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container">
              <img src={src} alt={`Slide ${index + 1}`} className="object-cover w-full h-auto" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
        </div>
        <div>
        <div className="p-6 md:p-10 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">Custom 5x7 Photo Prints</h1>
        <p className="text-lg text-gray-600">PHOTO PRINTS 5x7 GLOSSY</p>
        <p className="text-sm text-gray-500 mt-1">11017 units sold</p>
      </div>

      {/* Select Finish */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Select Finish</h2>
        <div className="flex gap-5">
          {[
            { name: 'Matte', color: 'bg-gray-700' },
            { name: 'Black', color: 'bg-black' },
            { name: 'Beige', color: 'bg-[#FFE4A3]' },
          ].map((finish, index) => (
            <div key={index} className="text-center">
              <div className={`h-16 w-16 ${finish.color} rounded-md mb-1`}></div>
              <p className="text-sm">{finish.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-300 mb-6"></div>

      {/* Price and Offer */}
      <div className="mb-6">
        <p className="text-xl font-semibold text-gray-800 mb-1">From Rs. 322</p>
        <p className="text-sm text-gray-500">(Inclusive of all taxes)</p>
        <p className="text-sm font-bold text-orange-600 mt-2">Use Code: 15FREESHIP</p>
        <p className="text-sm text-gray-600">Flat 15% off + Free economy shipping</p>
      </div>

      <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition">
        ADD NOW
      </button>

      <div className="border-t border-gray-300 mt-6 mb-6"></div>

      {/* Product Details */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Product Details</h2>
        <p className="text-sm text-gray-600 mb-4">
          Got a photo that makes you smile every time you look at it? Make it the star of the show in any room with an
          eye-catching 6x8” print.
        </p>
      </div>

      {/* Product Specifications */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Product Specifications</h2>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
          <li>Set of 15 prints, choose from coloured or patterned borders.</li>
          <li>Choose from Glossy, Matte and Pearl finish.</li>
          <li>Printed on high quality Fujifilm professional photo paper.</li>
          <li>Display using Wooden Clips, Magnetic ropes or wall-safe Washi tapes.</li>
        </ul>
      </div>
    </div>
        </div>
      </div>
       <div className='mb-9' id='sdfasf'></div> 
    </>
  );
}
