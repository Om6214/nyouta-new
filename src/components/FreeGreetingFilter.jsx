import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight, FilterX } from 'lucide-react';

import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import ProductJson from "../products.json";
import { Filter, X } from "lucide-react";

export default function CategoryFilterLabel() {
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const { pageName, pagid, "*": path } = useParams();
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const relatedItemsRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [swiperInstance, setSwiperInstance] = useState(null);
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 640) { // sm breakpoint
        setItemsPerPage(9);
      } else {
        setItemsPerPage(6);
      }
    };

    // Initial setup
    updateItemsPerPage();

    // Add event listener
    window.addEventListener('resize', updateItemsPerPage);

    // Cleanup
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);


  const handleClick = () => {
    setShowFilter(true);
  };

  useEffect(() => {
    async function fetchProducts() {
      const url = "https://nyouta.onrender.com/api/v1/products/products";
      try {
        const response = await axios.get(url);

        setResponseData(response.data);
        setLoading(false);
        // console.log(responseData)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-[6%] py-5 bg-slate-50">
        {/* Left Carousel Skeleton */}
        <div className="mt-6 lg:sticky lg:top-0 h-auto">
          <div className="w-full max-w-full mx-auto mb-6 lg:mb-0">
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="w-full rounded-lg h-[40vh] md:h-[50vh] lg:h-[50vh] xl:h-[96vh] bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Right Content Skeleton */}
        <div className="overflow-y-auto h-[96vh]">
          <div className="p-6 md:px-10 md:py-8 bg-slate-50 rounded-lg shadow-lg">
            {/* Title Skeleton */}
            <div className="mb-4">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mt-1 animate-pulse"></div>
            </div>

            {/* Divider Skeleton */}
            <div className="border-t border-gray-300 mb-6"></div>

            {/* Filter Buttons Skeleton */}
            <div className="flex gap-4 mb-4">
              <div className="py-2 px-8 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
              <div className="py-2 px-8 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
            </div>

            {/* Price Skeleton */}
            <div className="mb-6">
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>

            {/* Button Skeleton */}
            <div className="w-1/3 py-2 bg-gray-200 rounded-md animate-pulse"></div>

            {/* Specifications Skeleton */}
            <div className="mt-4">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-3 animate-pulse"></div>
              <ul className="space-y-2">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="h-4 bg-gray-200 rounded w-full animate-pulse"></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatCategoryName = (name) => name;
  const formatSubCategoryName = (name) => decodeURIComponent(name);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const formattedPageName = formatCategoryName(pageName);
  const formattedPath = formatSubCategoryName(path);
  //   console.log(formattedPageName);
  //   console.log(formattedPath);
  // console.log(ProductJson);

  //   console.log(ProductJson);

  const filteredItems = responseData.filter((item) => {
    const categoryMatch =
      item.category.toLowerCase() === formattedPageName.toLowerCase();
    const subCategoryMatch =
      item.subCategory.toLowerCase() === pagid.toLowerCase();
    return categoryMatch && subCategoryMatch;
  });
  console.log(filteredItems);
  // console.log(formattedPath)

  const RelatedItems = responseData.filter((item) => {
    const categoryMatch =
      item.category.toLowerCase() === formattedPageName.toLowerCase();

    const subCatego = item.subCategory.toLowerCase() === pagid.toLowerCase();

    // const subCategoryMatch = item.subSubCategory.toLowerCase() === formattedPath.toLowerCase();
    // console.log(item.subSubCategory.toLowerCase()+"==="+formattedPath.toLowerCase())

    return categoryMatch && subCatego;
  });
  console.log(RelatedItems);

  const handleButtonClick = () => {
    if (filteredItems.length > 0) {
      if (filteredItems[0].category === "Photo Books") {
        // Navigate to a different component with the image as state
        navigate(`/edit/PhotoBook/${filteredItems[0].subSubCategory}`, {
          state: { image: filteredItems[0].image[0] },
        });
      }
      if (filteredItems[0].category === "Itinerary") {
        // Navigate to a different component with the image as state
        // console.log(filteredItems[0].image[1]);
        navigate(`/edit/Itinerary/${filteredItems[0].subSubCategory}`, {
          state: { image: filteredItems[0].image[0] },
        });
      }
      if (filteredItems[0].category === "Calendars 2025") {
        // Navigate to a different component with the image as state
        // console.log(filteredItems[0].image[1]);
        navigate(`/edit/Itinerary/${filteredItems[0].subSubCategory}`, {
          state: { image: filteredItems[0].image[0] },
        });
      }
      // else {
      //   // Navigate to the default URL
      //   navigate("/someurl");
      // }
    }

    relatedItemsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const filteredResponseData = responseData.filter((item) =>
  //   item.subSubCategory && item.subSubCategory.includes(path)
  // );

  // Filtering logic based on timestamps

  const filteredResponseData = responseData.filter((item) => {
    if (filter === "Wishes to New Wed") {
      return item.subSubCategory.toLowerCase() === filter.toLowerCase();
    }
    if (filter === "Engagement Wishes") {
      return item.subSubCategory.toLowerCase() === filter.toLowerCase();
    }
    if (filter === "all") {
      return item.subCategory.toLowerCase() === pagid.toLowerCase();
    } // Return all items if no filter is applied
  });
  console.log(RelatedItems);
  console.log(filteredItems[0].image);
  const totalPages = Math.ceil(filteredResponseData.length / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResponseData.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <>
      {filteredItems?.length > 0 ? (
  <div className=" flex flex-col lg:flex-row gap-8 justify-center px-4 py-4 bg-slate-50">
    <div className=" w-full lg:w-[50%] h-full flex  sm:p-4 items-start">
       <div className="flex items-start gap-4 justify-start px-8 sm:px-0 sm:justify-center lg:justify-end h-auto w-full sm:py-4">
       <div className="h-fit w-[15%] rounded-lg overflow-hidden border-red-400 border-2   ">
            {filteredItems[0]?.image && Array.isArray(filteredItems[0].image) ? (
              filteredItems[0].image.map((src, index) => (
                <div key={index} onClick={() => swiperInstance?.slideTo(index + 1)}>
                  <img src={src} alt={`Thumbnail ${index + 1}`} className="h-full w-full" />
                </div>
              ))
            ) : (
              <div>
                <p>No images</p>
              </div>
            )}
        </div>
        <div className="w-[80%] sm:w-[60%] relative h-full lg:w-[65%] rounded-lg overflow-hidden ">
           <Swiper
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            }}
            zoom={true}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Zoom, Navigation, Pagination]}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            className="h-full w-full"
          >
            {filteredItems[0]?.image && Array.isArray(filteredItems[0].image) ? (
              filteredItems[0].image.map((src, index) => (
                <SwiperSlide key={index}>
                  <div>
                    <div>
                      <img src={src} alt={`Product Image ${index + 1}`} />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div>
                  <div>
                    <p>No images</p>
                  </div>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
       </div>
    </div>
    <div className="w-full  lg:w-[40%]  flex justify-center  items-start p-4">
    <div className="h-auto w-full lg:w-full  rounded-lg md:col-span-2 py-4 shadow-lg">
            <div className="p-6 md:px-4 md:py-0 bg-slate-50 rounded-lg max-w-full max-h-[96vh]">
              {/* Product Title and Category */}
              <div className="mb-4">
                <h1 className="text-xl lg:text-3xl font-medium text-gray-800 mb-2">
                  {path === "all" ? formattedPageName : formattedPath}
                </h1>
                <p className="text-sm font-medium text-gray-600">
                  {filteredItems[0].category}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredItems[0].subCategory}, {filteredItems[0].subSubCategory}
                </p>
              </div>

              <div className="border-t border-orange-500 mb-6"></div>

              {/* Price Section */}
              <div className="mb-6">
                <p className="text-lg font-medium text-gray-800 mb-1 flex items-center">
                  <span className="text-green-500 pl-1">FREE</span>
                </p>
              </div>

              {/* CTA Button */}
              <button
                ref={relatedItemsRef}
                onClick={handleButtonClick}
                className="w-[40%] py-3 px-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg transition-all duration-300 ease-in-out shadow-md"
              >
                Choose Design
              </button>

              {/* Additional Information */}
              {filteredItems.length > 0 &&
                ["Planner Books", "Free Greetings"].includes(filteredItems[0].category) ? (
                <div className="mt-6 overflow-y-auto max-h-[48vh]">
                  <h2 className="text-lg font-semibold mb-3">Free Greeting Cards</h2>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-2">
                    <li>
                      Add a personal touch to your celebrations with beautifully crafted greeting cards.
                    </li>
                    <li>
                      Choose from a wide variety of stunning designs for every occasion.
                    </li>
                    <li>
                      High-quality cards available for free to make your moments memorable.
                    </li>
                    <li>
                      Personalize your greeting cards with heartfelt messages.
                    </li>
                    <li>
                      Access and print your favorite designs instantly for quick and easy celebrations.
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
    </div>
   
  </div>
) : (
  <div>
    <h1>No products found for {formattedPageName} - {formattedPath}</h1>
  </div>
)}



      <div className="relative min-h-screen bg-slate-50">
        {["Free Greetings"].includes(filteredItems[0]?.category) ? (
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Desktop Filter - Left Side */}
              <div className="hidden lg:block w-1/5">
                <div>
                  <div className="bg-slate-50 rounded-lg  p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h1 className="text-lg font-semibold">Filter By</h1>
                      <button
                        className="text-sm text-gray-600 hover:text-gray-900 border-b border-dashed"
                        onClick={() => setFilter("all")}
                      >
                        Clear all
                      </button>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-lg font-semibold">Variations</h2>
                      <div className="space-y-2">
                        <button
                          className={`w-full py-2 px-3 text-left rounded-md transition-colors duration-200
                          ${filter === "Wishes to New Wed"
                              ? "bg-orange-500 text-white"
                              : "bg-white border-2 hover:bg-gray-50"
                            }`}
                          onClick={() => setFilter("Wishes to New Wed")}
                        >
                          Newly Wed Wishes
                        </button>
                        <button
                          className={`w-full py-2 px-3 text-left rounded-md transition-colors duration-200
                          ${filter === "Engagement Wishes"
                              ? "bg-orange-500 text-white"
                              : "bg-white border-2 hover:bg-gray-50"
                            }`}
                          onClick={() => setFilter("Engagement Wishes")}
                        >
                          Engagement Wishes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="w-full lg:w-4/5">
                <div className="grid px-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <Link
                        key={index}
                        to={`/product/${item._id}`}
                        state={{
                          image: item.image[0],
                          ider: item._id,
                          product: item,
                        }}
                        className="group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      >
                        <div className="relative pt-[100%]">
                          <img
                            src={item.image[0]}
                            alt={item.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4 text-center">
                          <h2 className="text-md font-medium text-gray-800 truncate">
                            {item.name}
                          </h2>
                          <div className=" flex justify-center items-center">
                            <span className="text-red-400 text-[1.1rem] mx-2">
                              FREE
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <h2 className="text-xl font-semibold text-gray-700">
                        No products found for the selected filter.
                      </h2>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-8 pb-8">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                        } transition-all duration-200`}
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium px-3 text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                        } transition-all duration-200`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Filter Button and Dropdown */}
              <div className="lg:hidden">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="fixed top-20 left-4 bg-white p-2 rounded-full shadow-lg z-50"
                >
                  <FilterX size={24} />
                </button>

                {showFilter && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg">
                      <div className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-semibold">Filters</h2>
                          <button onClick={() => setShowFilter(false)}>
                            <X size={24} />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <button
                            className={`w-full py-2 px-3 text-left rounded-md transition-colors duration-200
                            ${filter === "Wishes to New Wed"
                                ? "bg-orange-500 text-white"
                                : "bg-white border-2 hover:bg-gray-50"
                              }`}
                            onClick={() => {
                              setFilter("Wishes to New Wed");
                              setShowFilter(false);
                            }}
                          >
                            Newly Wed Wishes
                          </button>
                          <button
                            className={`w-full py-2 px-3 text-left rounded-md transition-colors duration-200
                            ${filter === "Engagement Wishes"
                                ? "bg-orange-500 text-white"
                                : "bg-white border-2 hover:bg-gray-50"
                              }`}
                            onClick={() => {
                              setFilter("Engagement Wishes");
                              setShowFilter(false);
                            }}
                          >
                            Engagement Wishes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl mb-6">Related Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {RelatedItems.length > 0 ? (
                RelatedItems.map((item, index) => (
                  <Link
                    key={index}
                    to={`/product/${item._id}`}
                    state={{ image: item.image[0], id: item._id, product: item }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative pt-[100%]">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h2 className="text-lg font-medium text-gray-900 truncate">
                        {item.name}
                      </h2>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <h2 className="text-xl font-semibold text-gray-700">
                    No related items found.
                  </h2>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
