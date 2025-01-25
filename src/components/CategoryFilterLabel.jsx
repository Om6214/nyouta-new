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

// import weddingManagement from "../assets/video/productTitle/WeddingManagement.mp4";
// import GuestListBooklet from "../assets/video/productTitle/guestListBooklet.mp4";
// import guestManagement from "../assets/video/productTitle/GuestManagement.mp4";
// import weddingNotepadLiner from "../assets/video/productTitle/weddingNotepad(liner).mp4";
// import weddingNotepadPhoto from "../assets/video/productTitle/WeddingNotepad(photo).mp4";

export default function CategoryFilterLabel() {
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const { pageName, pagid, "*": path } = useParams();
  const [filter, setFilter] = useState("royal");
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
  // console.log(formattedPageName);
  // console.log(formattedPath);
  // console.log(ProductJson);

  // console.log(ProductJson);

  const filteredItems = responseData.filter((item) => {
    const categoryMatch =
      item.category.toLowerCase() === formattedPageName.toLowerCase();
    const subCategoryMatch =
      item.subCategory.toLowerCase() === pagid.toLowerCase();
    const subSubCategoryMatch =
      item.subSubCategory.toLowerCase() === formattedPath.toLowerCase();
    return categoryMatch && subCategoryMatch && subSubCategoryMatch;
  });

  const RelatedItems = responseData.filter((item) => {
    const categoryMatch =
      item.category.toLowerCase() === formattedPageName.toLowerCase();

    const subCatego = item.subCategory.toLowerCase() === pagid.toLowerCase();
    const subSubCategoryMatch =
      item.subSubCategory.toLowerCase() === formattedPath.toLowerCase();

    // const subCategoryMatch = item.subSubCategory.toLowerCase() === formattedPath.toLowerCase();
    // console.log(item.subSubCategory.toLowerCase()+"==="+formattedPath.toLowerCase())

    return categoryMatch && subCatego && subSubCategoryMatch;
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
    if (filter === "royal") {
      return (
        item.type?.toLowerCase() === filter.toLowerCase() &&
        item.category.toLowerCase() === pageName.toLowerCase() &&
        item.subCategory.toLowerCase() === pagid.toLowerCase() &&
        item.subSubCategory.toLowerCase() === path.toLowerCase()
      );
    }
    if (filter === "popular") {
      return (
        item.type?.toLowerCase() === filter.toLowerCase() &&
        item.category.toLowerCase() === pageName.toLowerCase() &&
        item.subCategory.toLowerCase() === pagid.toLowerCase() &&
        item.subSubCategory.toLowerCase() === path.toLowerCase()
      );
    }
    
  });

  // console.log("filteredItems:", filteredItems);
  // console.log("filteredResponseData:", filteredResponseData);
  // console.log(filteredItems[0].category);
  console.log(RelatedItems);

  const TitleProduct = {
    WeddingManagement: {
      productCategory: "Planner Book",
      productSubCategory: "Planner Book",
      productSubSubCategory: "Wedding Management",
      productImages: [
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736847404/r2rqqbdd2jlmd7ep5tme.jpg",
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736847431/hzvkypnvdbscbr3baxob.jpg",
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736847474/lsccahbuqfci6mwx12u1.jpg",
      ],
      productVideo: "https://res.cloudinary.com/dpesh4axn/video/upload/v1737639309/WeddingManagement_yqpov5.mp4",
      RoyalPrice: 2550,
      popularPrice: 2150,
      productOff: 15,
      productSpecificationsRoyal: [
       
        "Pages : 100 (200 Sides) Coloured",
        "Paper & Size : A4 (210x297 mm*) 100 gsm",
        "Cover : 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind : Perfect Binding with Bookmarks",
      ],
      productSpecificationsPopular: [
       
        "Pages : 100 (200 Sides) Coloured",
        "Paper & Size : A4 (210x297 mm*) 100 gsm",
        "Cover : 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind : Perfect Binding with Bookmarks",
      ],
    },
    GuestManagement: {
      productCategory: "Planner Book",
      productSubCategory: "Planner Book",
      productSubSubCategory: "Guest Management ",
      productImages: [
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736847602/afnildotap0p1neupfnx.jpg",
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736847573/me1wozjqjxspxyotunms.jpg",
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736847663/duqm5add6bbvpxfldphp.jpg",
      ],
      productVideo: "https://res.cloudinary.com/dpesh4axn/video/upload/v1737639309/GuestManagement_vgkhwh.mp4",
      RoyalPrice: 1599,
      popularPrice: 1199,
      productOff: 15,
      productSpecificationsRoyal: [
       
        "Pages : 75 (150 Sides) Coloured",
        "Paper & Size : A4 (210x297 mm*) 100 gsm",
        "Cover : 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind : Perfect Binding with Bookmarks",
      ],
      productSpecificationsPopular: [
       
        "Pages : 75 (150 Sides) Coloured",
        "Paper & Size : A4 (210x297 mm*) 100 gsm",
        "Cover : 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind : Perfect Binding with Bookmarks",
      ],
    },
    GuestListBookletBestSeller: {
      productCategory: "Planner Book",
      productSubCategory: "Planner Book",
      productSubSubCategory: "Guest List Booklet ",
      productImages: [
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736846638/trfoutxrkpwpys0kbdnl.jpg",
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736846910/pthblbjmd6itillfnby3.jpg",
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736847030/yvyq33is48bofze3hxly.jpg",
      ],
      productVideo: "https://res.cloudinary.com/dpesh4axn/video/upload/v1737639309/GuestListBooklet_ozg4vq.mp4",
      RoyalPrice: 1349,
      popularPrice: 1099,
      productOff: 15,
      productSpecificationsRoyal: [
       
        "Pages : 50 (100 Sides) All pages - Coloured",
        "Paper & Size : A4 (210x297 mm*) 100 gsm",
        "Cover : 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind : Perfect Binding with Bookmarks",
      ],
      productSpecificationsPopular: [
       
        "Pages : 50 (100 Sides) All page - B/W",
        "Paper & Size : A4 (210x297 mm*) 70 gsm",
        "Cover : 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind : Perfect Binding with Bookmarks",
      ],
    },
    WeddingNotepadLiner: {
      productCategory: "Planner Book",
      productSubCategory: "Planner Book",
      productSubSubCategory: "Wedding Notepad Liner ",
      productImages: [
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736846638/trfoutxrkpwpys0kbdnl.jpg",
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736846910/pthblbjmd6itillfnby3.jpg",
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736847030/yvyq33is48bofze3hxly.jpg",
      ],
      productVideo: "https://res.cloudinary.com/dpesh4axn/video/upload/v1737639309/WeddingNotepad_Liner_drys4h.mp4",
      RoyalPrice: 649,
      popularPrice: 389,
      productOff: 15,
      productSpecificationsRoyal: [
       
        "Pages : 50 (100 Sides) B/W , 1st Liner & 2nd Plain",
        "Paper & Size : A5 (148x210 mm*) 70 gsm",
        "Cover : 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind : Perfect Binding",
      ],
      productSpecificationsPopular: [
        
        "Pages : 50 (100 Sides) B/W , 1st Liner & 2nd Plain",
        "Paper & Size : A5 (148x210 mm*) 70 gsm",
        "Cover : 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind : Perfect Binding",
      ],
    },
    WeddingNotepadPhoto: {
      productCategory: "Planner Book",
      productSubCategory: "Planner Book",
      productSubSubCategory: "Wedding Notepad photo ",
      productImages: [
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736846638/trfoutxrkpwpys0kbdnl.jpg",
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736846910/pthblbjmd6itillfnby3.jpg",
        "https://res.cloudinary.com/dpesh4axn/image/upload/v1736847030/yvyq33is48bofze3hxly.jpg",
      ],
      productVideo: "https://res.cloudinary.com/dpesh4axn/video/upload/v1737639309/WeddingNotepad_Photo_v5buul.mp4",
      RoyalPrice: 749,
      popularPrice: 499,
      productOff: 15,
      productSpecificationsRoyal: [
        "Pages : 25 (50 Sides) Coloured, Cover Photo on Both Side",
        "Paper & Size : A5 (148x210 mm*) 70 gsm",
        "Cover : 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind : Perfect Binding",
      ],
      productSpecificationsPopular: [
        "Pages : 25 (50 Sides) B/W , Cover Photo on Both Side",
        "Paper & Size : A5 (148x210 mm*) 70 gsm",
        "Cover : 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind : Perfect Binding",
      ],
    },
  };

  const fetchvar = formattedPath
    .replaceAll(" ", "")
    .replaceAll("-", "")
    .replaceAll("(", "")
    .replaceAll(")", "");
  const productData = TitleProduct[fetchvar];

  return (
    <>
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
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              modules={[Zoom, Navigation, Pagination, Autoplay]}
              className="rounded-xl shadow-lg h-[40vh] md:h-[50vh] lg:h-[70vh]"
              onSwiper={(swiper) => {
                // Add event listeners for pause on hover
                swiper.el.addEventListener("mouseenter", () => swiper.autoplay.stop());
                swiper.el.addEventListener("mouseleave", () => swiper.autoplay.start());
              }}
            >
              {/* First Slide: Video */}
              <SwiperSlide>
                <div className="">
                  <video
                    src={productData.productVideo}
                    autoPlay
                    muted
                    loop
                    className="object-cover w-full h-auto rounded-lg"
                  ></video>
                </div>
              </SwiperSlide>

              {/* Additional Slides: Images */}
              {productData.productImages &&
                productData.productImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-zoom-container">
                      <img
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        className="object-cover w-full h-auto rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        <div>
          <div className="p-6 md:px-10 md:py-8 bg-white rounded-lg shadow-lg">
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-2">
                {productData.productSubSubCategory}
              </h1>
              <p className="text-lg text-gray-600">
                {productData.productCategory}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {productData.productSubCategory},{" "}
                {productData.productSubSubCategory}
              </p>
            </div>

            <div className="border-t border-gray-300 mb-6"></div>

            <div className="flex gap-4 mb-4">
              <div
                className={`py-2 px-4 border rounded-lg hover:shadow-md cursor-pointer ${
                  filter === "royal"
                    ? "bg-orange-500 text-white"
                    : "bg-[#fff] border-2"
                }`}
                onClick={() => setFilter("royal")}
              >
                Royal
              </div>
              <div
                className={`py-2 px-4 border rounded-lg hover:shadow-md cursor-pointer ${
                  filter === "popular"
                    ? "bg-orange-500 text-white"
                    : "bg-[#fff] border-2"
                }`}
                onClick={() => setFilter("popular")}
              >
                Popular
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xl font-semibold text-gray-800 mb-1">
                From Rs.
                {filter === "royal"
                  ? productData.RoyalPrice -
                    (productData.RoyalPrice * productData.productOff) / 100
                  : productData.popularPrice -
                    (productData.popularPrice * productData.productOff) /
                      100}{" "}
                <span className="text-red-400 line-through text-[1.1rem] mx-2 ">
                  {filter === "royal"
                    ? productData.RoyalPrice
                    : productData.popularPrice}{" "}
                </span>
                <span className="text-green-400">
                  {productData.productOff}%{" "}
                </span>
                Off
              </p>
            </div>

            <button
              ref={relatedItemsRef}
              onClick={handleButtonClick}
              className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
            >
              Choose Now
            </button>

            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-3">
                Product Specifications
              </h2>
              {filter === "royal" ? (
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  {productData.productSpecificationsRoyal.map(
                    (specification) => (
                      <li>{specification.length > 90 ? `${specification.slice(0,90)}...` : specification}</li>
                    )
                  )}

                  {/* <li>Display using Wooden Clips, Magnetic ropes or wall-safe Washi tapes.<e/li> */}
                </ul>
              ) : (
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  {productData.productSpecificationsPopular.map(
                    (specification) => (
                      <li>{specification.length > 90 ? `${specification.slice(0,90)}...` : specification}</li>
                    )
                  )}

                  {/* <li>Display using Wooden Clips, Magnetic ropes or wall-safe Washi tapes.<e/li> */}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {["Planner Books"].includes(filteredItems[0].category) ? (
        <div className="grid grid-cols-4 gap-6 px-[6%] py-5">
          {/* Left column: Filter options */}
          <div className="col-span-1 hidden md:block space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-avalonN">Filter By</h1>
              <button
                className={`font-avalonN border-b-2 border-dashed border-gray-500 leading-5 ${
                  filter === "all"
                }`}
                // onClick={() => setFilter("all")}
              >
                Clear all
              </button>
            </div>
            <div className="px-4 py-3 bg-gray-100 rounded-lg shadow-md">
              <div className="flex justify-between">
                <h2 className="text-lg font-avalonB">Variations</h2>
              </div>
              <button
                className={`block w-full py-1 font-avalonN mb-2 px-2 text-left rounded-md border-2 bg-white
                }`}
                // onClick={() => setFilter("royal")}
              >
                All Elegant
              </button>
              <button
                className={`block w-full py-1 font-avalonN px-2 text-left rounded-md bg-white`}
                // onClick={() => setFilter("popular")}
              >
                Floral
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

          {/* Right column: Filtered results */}
          <div className="col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredResponseData.length > 0 ? (
                filteredResponseData.map((item, index) => (
                  <Link
                    key={index}
                    to={
                      filteredItems[0].category === "Free Greetings"
                        ? `/product/${item._id}`
                        : `/edit/${filteredItems[0].category}/${item.subSubCategory}`
                    }
                    state={{
                      image: item.image[0],
                      ider: item._id,
                      product: item,
                    }}
                    className="bg-white p-2 rounded-lg shadow-lg overflow-hidden transform flex flex-col transition-transform duration-300 hover:shadow-2xl"
                  >
                    <div className="relative w-full h-[30vh] rounded-lg overflow-hidden">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="px-1 flex justify-center pt-2 items-center text-center">
                      <h2 className="text-md font-avalonB text-gray-600">
                        {item.name.length > 18 ? `${item.name.slice(0,18)}...` : item.name}
                      </h2>
                    </div>
                    <div className="px-1 flex justify-center py-2 items-center text-center">
                      <h2 className="text-md font-avalonB font-extralight text-gray-700">
                        Rs.{item.price}
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
                  to={`/product/${item._id}`}
                  state={{ image: item.image[0], id: item._id, product: item }}
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
                    <h2 className="text-lg font-bold text-gray-900">
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
