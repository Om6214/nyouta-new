import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ProductJson from '../products.json';

export default function CategoryFilterLabel() {
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const { pageName, pagid, "*": path } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const url = "https://nyouta.onrender.com/api/v1/products/products";
      try {
        const response = await axios.get(url);
        setResponseData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className='flex-row'>
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

  const formattedPageName = formatCategoryName(pageName);
  const formattedPath = formatSubCategoryName(path);

  const filteredItems = ProductJson.filter((item) => {
    const categoryMatch = item.category.toLowerCase() === formattedPageName.toLowerCase();
    const subCategoryMatch = item.subCategory.toLowerCase() === pagid.toLowerCase();
    const subSubCategoryMatch = item.subSubCategory.toLowerCase() === formattedPath.toLowerCase();
    return categoryMatch && subCategoryMatch && subSubCategoryMatch;
  });

  const handleButtonClick = () => {
    if (filteredItems.length > 0) {
      const selectedItem = filteredItems[0];
      if (selectedItem.category === "Photo Books") {
        navigate(`/edit/PhotoBook/${selectedItem.subSubCategory}`, {
          state: { image: selectedItem.image[0] },
        });
      } else if (selectedItem.category === "Itinerary") {
        navigate(`/edit/Itinerary/${selectedItem.subSubCategory}`, {
          state: { image: selectedItem.image[0] },
        });
      }
    }
  };

  const filteredResponseData = responseData.filter((item) =>
    item.name && item.name.includes(path)
  );

  return (
    <>
      {filteredItems.length > 0 ? (
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
                className="rounded-xl shadow-lg h-[40vh] md:h-[50vh] lg:h-[70vh]"
              >
                {filteredResponseData.slice(0, 4).map((item, index) => (
                  item.image.map((src, imgIndex) => (
                    <SwiperSlide key={`${index}-${imgIndex}`}>
                      <div className="swiper-zoom-container">
                        <img src={src} alt={`Slide ${index + 1}`} className="object-cover w-full h-auto" />
                      </div>
                    </SwiperSlide>
                  ))
                ))}
              </Swiper>
            </div>
          </div>
          <div>
            <div className="p-6 md:p-10 bg-white rounded-lg shadow-lg">
              <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2">{filteredItems[0].name}</h1>
                <p className="text-lg text-gray-600">{filteredItems[0].category}</p>
                <p className="text-sm text-gray-500 mt-1">{filteredItems[0].subCategory}, {filteredItems[0].subSubCategory}</p>
              </div>

              <div className="border-t border-gray-300 mb-6"></div>

              <div className="mb-6">
                <p className="text-xl font-semibold text-gray-800 mb-1">From Rs. {filteredItems[0].price}</p>
                <p className="text-sm text-gray-600">Category: {filteredItems[0].category}</p>
                <p className="text-sm text-gray-500">Subcategory: {filteredItems[0].subCategory}</p>
                <p className="text-sm text-gray-500">SubSubCategory: {filteredItems[0].subSubCategory}</p>
              </div>

              <button
                onClick={handleButtonClick}
                className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
              >
                {filteredItems[0].category === "Planner Books" ? "Choose Now" : "Add Now"}
              </button>
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

      <div className="px-[6%] pt-[1%]">
        <div className="font-semibold text-[4vh]">Choose a Design</div>
        <div className="font-normal md:text-[2.2vh] text-[2vw]">
          {/* Subtitle or description here */}
        </div>

        <div className="pt-5 md:max-w-[95%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredResponseData.map((filteredItem) => (
              <Link to={`/product/${filteredItem.id}`} state={{ product: filteredItem }} key={filteredItem.id}>
                <div className="relative w-full h-[40vh]">
                  <img
                    src={filteredItem.image[0]}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                    alt={filteredItem.name}
                  />
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-lg font-bold text-gray-800">{filteredItem.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
