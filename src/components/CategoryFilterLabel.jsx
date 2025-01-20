import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductJson from "../products.json";
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
      <div className="flex-row">
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>

        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
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

  console.log(ProductJson);
  

  const filteredItems = ProductJson.filter((item) => {
    const categoryMatch =
      item.category.toLowerCase() === formattedPageName.toLowerCase();
    const subCategoryMatch =
      item.subCategory.toLowerCase() === pagid.toLowerCase();
    const subSubCategoryMatch =
      item.subSubCategory.toLowerCase() === formattedPath.toLowerCase();
    return categoryMatch && subCategoryMatch && subSubCategoryMatch;
  });

  const RelatedItems = ProductJson.filter((item) => {
    const categoryMatch =
      item.category.toLowerCase() === formattedPageName.toLowerCase();

    const subCatego = item.subCategory.toLowerCase() === pagid.toLowerCase();

    // const subCategoryMatch = item.subSubCategory.toLowerCase() === formattedPath.toLowerCase();
    // console.log(item.subSubCategory.toLowerCase()+"==="+formattedPath.toLowerCase())

    return categoryMatch && subCatego;
  });

  const handleButtonClick = () => {
    if (filteredItems.length > 0) {
      if (filteredItems[0].category === "Photo Books") {
        // Navigate to a different component with the image as state
        navigate(`/edit/PhotoBook/${filteredItems[0].subSubCategory}`, {
          state: { image: filteredItems[0].image[0] },
        });
      }
      if (filteredItems[0].category === "Free Greetings") {
        // Navigate to a different component with the image as state
        navigate(`/edit/FreeGreeting/${filteredItems[0].subSubCategory}`, {
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
    if (filter === "royal") {
      return (
        new Date(item.createdAt) >= new Date("2025-01-01T11:58:23.284Z") &&
        new Date(item.createdAt) <= new Date("2025-01-14T09:51:56.887Z") &&
        item.category.toLowerCase() === pageName.toLowerCase() &&
        item.subCategory.toLowerCase() === pagid.toLowerCase() &&
        item.subSubCategory.toLowerCase() === path.toLowerCase()
      );
    }
    if (filter === "popular") {
      return (
        new Date(item.createdAt) >= new Date("2025-01-14T09:52:06.843Z") &&
        new Date(item.createdAt) <= new Date("2025-01-17T13:34:16.874Z") &&
        item.category.toLowerCase() === pageName.toLowerCase() &&
        item.subCategory.toLowerCase() === pagid.toLowerCase() &&
        item.subSubCategory.toLowerCase() === path.toLowerCase()
      );
    }
    if (filter === "all") {
      return (
        item.category.toLowerCase() === pageName.toLowerCase() &&
        item.subCategory.toLowerCase() === pagid.toLowerCase() &&
        item.subSubCategory.toLowerCase() === path.toLowerCase()
      );
    } // Return all items if no filter is applied
  });


  console.log("filteredItems:", filteredItems);
  console.log("filteredResponseData:", filteredResponseData);

  return (
    <>
      {filteredItems?.length > 0? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-[6%] py-5 bg-white">
          <div className="mt-6">
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
                className="rounded-xl shadow-lg h-[40vh] md:h-[50vh] lg:h-[70vh]"
              >
                {["Planner Books", "Free Greetings"].includes(
                  filteredItems[0]?.category
                )
                  ? filteredResponseData.slice(0, 4).map((item, index) =>
                      item?.image?.map((src, imgIndex) => (
                        <SwiperSlide key={`${index}-${imgIndex}`}>
                          <div className="swiper-zoom-container">
                            <img
                              src={src}
                              alt={`Slide ${imgIndex + 1}`}
                              className="object-cover w-full h-auto"
                            />
                          </div>
                        </SwiperSlide>
                      ))
                    )
                  : filteredItems[0]?.image?.map((src, index) => (
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
                <h1 className="text-3xl font-bold mb-2">
                  {filteredItems[0].name}
                </h1>
                <p className="text-lg text-gray-600">
                  {filteredItems[0].category}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredItems[0].subCategory},{" "}
                  {filteredItems[0].subSubCategory}
                </p>
              </div>

              <div className="border-t border-gray-300 mb-6"></div>

              <div className="mb-6">
                <p className="text-xl font-semibold text-gray-800 mb-1">
                  From Rs. {filteredItems[0].price}
                </p>
                <p className="text-sm text-gray-600">
                  Category: {filteredItems[0].category}
                </p>
                <p className="text-sm text-gray-500">
                  Subcategory: {filteredItems[0].subCategory}
                </p>
                <p className="text-sm text-gray-500">
                  SubSubCategory: {filteredItems[0].subSubCategory}
                </p>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="border rounded-lg px-3 py-2 w-20 shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                ref={relatedItemsRef}
                onClick={handleButtonClick}
                className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
              >
                {["Planner Books", "Free Greetings"].includes(
                  filteredItems[0].category
                )
                  ? "Choose Now"
                  : "Add Now"}
              </button>

              {filteredItems.length > 0 &&
              ["Planner Books", "Free Greetings"].includes(
                filteredItems[0].category
              ) ? (
                <div>
                  <h2 className="text-lg font-semibold mb-3">
                    Product Specifications
                  </h2>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                    <li>Beautify your days with a planner that inspires.</li>
                    <li>
                      Express yourself with beautiful designs and personalized
                      touches.
                    </li>
                    <li>High quality professional Planner Books.</li>
                    {/* <li>Display using Wooden Clips, Magnetic ropes or wall-safe Washi tapes.<e/li> */}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-700">
            No products found for {formattedPageName} - {formattedPath}
          </h1>
        </div>
      )}

      {filteredItems[0].category === "Planner Books" ? (
        <div className="grid grid-cols-4 gap-6 px-[6%] py-5">
          {/* Left column: Filter options */}
          <div className="col-span-1 hidden md:block space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-avalonN">Filter By</h1>
              <button
                className={`font-avalonN border-b-2 border-dashed border-gray-500 leading-5 ${
                  filter === "all"
                }`}
                onClick={() => setFilter("all")}
              >
                Clear all
              </button>
            </div>
            <div className="px-4 py-3 bg-gray-100 rounded-lg shadow-md">
              <div className="flex justify-between">
                <h2 className="text-lg font-avalonB">Variations</h2>
              </div>
              <button
                className={`block w-full py-1 font-avalonN mb-2 px-2 text-left rounded-md border-2 ${
                  filter === "royal" ? "bg-orange-500 text-white" : "bg-white"
                }`}
                onClick={() => setFilter("royal")}
              >
                Royal
              </button>
              <button
                className={`block w-full py-1 font-avalonN px-2 text-left rounded-md ${
                  filter === "popular"
                    ? "bg-orange-500 text-white"
                    : "bg-[#fff] border-2"
                }`}
                onClick={() => setFilter("popular")}
              >
                Popular
              </button>
            </div>
          </div>

          {/* Mobile filter */}
          <div className="md:hidden relative">
            <Filter onClick={handleClick} />
            {showFilter && (
              <div className="absolute top-7 left-[-10px] space-y-2 border-2 rounded-xl bg-gray-50 font-avalonN w-[180px] px-2 py-2 z-50">
                <div className="flex justify-between items-center">
                  <button onClick={() => setShowFilter(false)}>
                    <X />
                  </button>
                  <button
                    className={`border-b-2 border-dashed border-gray-500 leading-5 ${
                      filter === "all"
                    }`}
                    onClick={() => {
                      setFilter("all");
                      setShowFilter(false);
                    }}
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <h1 className="font-avalonB">Variations</h1>
                  <button
                    className={`block w-full py-1 font-avalonN px-2 text-left rounded-md border-2 ${
                      filter === "royal"
                        ? "bg-orange-500 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => {
                      setFilter("royal");
                      setShowFilter(false);
                    }}
                  >
                    Royal
                  </button>
                  <button
                    className={`block w-full py-1 font-avalonN px-2 text-left rounded-md ${
                      filter === "popular"
                        ? "bg-orange-500 text-white"
                        : "bg-[#fff] border-2"
                    }`}
                    onClick={() => {
                      setFilter("popular");
                      setShowFilter(false);
                    }}
                  >
                    Popular
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right column: Filtered results */
          }
          <div className="col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredResponseData.length > 0 ? (
                filteredResponseData.map((item, index) => (
                  <Link
                    key={index}
                    to={`/edit/${filteredItems[0].category}/${item.subSubCategory}`}
                    state={{ image: item.image[0], ider: item._id }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105"
                  >
                    <div className="relative w-full h-[30vh]">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h2 className="text-lg font-bold text-gray-800">
                        {item.name}
                      </h2>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center col-span-full">
                  <h2 className="text-xl font-semibold text-gray-700">
                    No products found for the selected filter.
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="col-span-3 gap-6 px-[6%] py-4">
          <h2 className="text-2xl mb-3">Related Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {RelatedItems.length > 0 ? (
              RelatedItems.map((item, index) => (
                <Link
                  key={index}
                  to={`/edit/${item.category}/${item.subSubCategory}`}
                  state={{ image: item.image[0] }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105"
                >
                  <div className="relative w-full h-[20vh]">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h2 className="text-lg font-bold text-gray-800">
                      {item.name}
                    </h2>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center col-span-full">
                <h2 className="text-xl font-semibold text-gray-700">
                  No products found for the selected filter.
                </h2>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
