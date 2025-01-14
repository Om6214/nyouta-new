import React from "react";
import ProductJson from "../products.json";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Zoom, Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function CategoryLabel() {


  
  const { pageName, "*": path } = useParams();
  const navigate = useNavigate();
  const formatCategoryName = (name) => {
    return name;
    // .split("-")
    // .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    // .join(" ");
  };
  const formatSubCategoryName = (name) => {
    return decodeURIComponent(name);
    // .split(" ")
    // .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    // .join(" ")
    // .replace(/-/g, " ");
  };
  // if(pageName ==="e-invitations") pageName=='E-Invitations'
  const formattedPageName = formatCategoryName(pageName);
  const formattedPath = formatSubCategoryName(path);
  // console.log(formattedPageName, formattedPath);
  const filteredItems = ProductJson.filter((item) => {
    const categoryMatch =
      item.category.toLowerCase() === formattedPageName.toLowerCase();
    const subCategoryMatch =
      item.subCategory.toLowerCase() === formattedPath.toLowerCase();
    return categoryMatch && subCategoryMatch;
  });
  const handleButtonClick = () => {
    if (filteredItems.length > 0) {
      if (filteredItems[0].category === "Photo Books") {
        // Navigate to a different component with the image as state
        navigate(`/edit/PhotoBook/${filteredItems[0].subSubCategory}`, { state: { image: filteredItems[0].image[0]} });
      }
      if (filteredItems[0].category === "Itinerary") {
        // Navigate to a different component with the image as state
        // console.log(filteredItems[0].image[1]);
        navigate(`/edit/Itinerary/${filteredItems[0].subSubCategory}`, { state: { image: filteredItems[0].image[0]} });
      }
      // else {
      //   // Navigate to the default URL
      //   navigate("/someurl");
      // }
    }
  };
  return (
    <>
      {filteredItems.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-[6%] py-5 bg-white"
        >
          <div className="mt-10 ">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#000",
                  "--swiper-pagination-color": "#000",
                }}
                zoom={true}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Zoom, Navigation, Pagination, Autoplay]}
                className="rounded-xl shadow-lg h-[40vh] md:h-[50vh] lg:h-[70vh] "
              >
                {filteredItems[0].image.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-zoom-container">
                      <img
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className="object-cover w-full h-auto"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
        </div>
        <div>
        <div className="p-6 md:p-10 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">{filteredItems[0].name}</h1>
        <p className="text-lg text-gray-600">{filteredItems[0].category}</p>
        <p className="text-sm text-gray-500 mt-1">{filteredItems[0].subCategory}, { filteredItems[0].subSubCategory}</p>
      </div>
      {/* Select Finish */}
      <div className="mb-6">
        {/* <h2 className="text-lg font-semibold mb-3">Select Finish</h2> */}
        {/* <div className="flex gap-5">
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
        </div> */}
      </div>
      <div className="border-t border-gray-300 mb-6"></div>
      {/* Price and Offer */}
      <div className="mb-6">
        <p className="text-xl font-semibold text-gray-800 mb-1">From Rs. {filteredItems[0].price}</p>
        <p className="text-sm text-gray-600">Category: {filteredItems[0].category}</p>
        <p className="text-sm text-gray-500">Subcategory: {filteredItems[0].subCategory}</p>
        <p className="text-sm text-gray-500">SubCategory Product: {filteredItems[0].subSubCategory}</p>
      </div>
      <button
          onClick={handleButtonClick}
          className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
        >
          ADD NOW
        </button>

    </div>
        </div>
    

        </motion.div>
      ) : (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            No products found for {formattedPageName} - {formattedPath}
          </h1>
        </div>
      )}
      <div className="px-[6%] pt-[1%]">
        <div className="font-semibold text-[4vh]">Related Items</div>
        <div className="font-normal md:text-[2.2vh] text-[2vw]">
          {/* Create personalized gifts for Kids, Friends, Loved ones and give them the your attention of love. */}
        </div>
        <div className="pt-5 md:max-w-[95%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Link
                to={`/e/nav/${item.category}/${item.subCategory}/${item.subSubCategory}`}
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative w-full h-[40vh]">
                  <img
                    src={item.image[0]}
                    alt={item.subTitle}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out "
                  />
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-lg font-bold text-gray-800">
                    {item.subSubCategory}
                  </h2>
                  {/* Optional: Price or other details */}
                  {/* <p className="text-gray-700 mt-2">₹{item.price}</p> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-9" id="sdfasf"></div>
    </>
  );
}