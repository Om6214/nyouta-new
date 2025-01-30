import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [selectedSpecification, setSelectedSpecification] = useState(null);
  const [expandedSpecifications, setExpandedSpecifications] = useState({});
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 640) { // sm breakpoint
        setItemsPerPage(12);
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
      <div className="flex-row">
        <div className="p-4 max-w-md mx-auto bg-slate-50 rounded-lg shadow-md animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>

        <div className="p-4 max-w-md mx-auto bg-slate-50 rounded-lg shadow-md animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
        <div className="p-4 max-w-md mx-auto bg-slate-50 rounded-lg shadow-md animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-48 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
        <div className="p-4 max-w-md mx-auto bg-slate-50 rounded-lg shadow-md animate-pulse">
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

  const toggleSpecification = (index) => {
    setExpandedSpecifications((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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

  // Calculate total pages
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
        "Checklists:",
        "• About Wedding:",
        "  - Blessings",
        "  - Wedding Detail",
        "  - 7 Steps of Wedding",
        "  - Congratulations",
        "  - Wedding Programs",
        "  - Tables of Contents",
        "  - Planning Before Priors",
        "  - Brand your Wedding",
        "• Wedding Checklist:",
        "  - Checklists & Don't Forget",
        "  - Day-of Checklist",
        "  - Venue & Vendors Comparisons",
        "  - Day of Kit for the Bride/Groom",
        "  - Daily, Weekly & Monthly Planner",
        "  - To-do List (Top Priority)",
        "  - To-do List",
        "• Finance Management:",
        "  - Sample Wedding Budget",
        "  - Wedding Budget (Eventwise)",
        "  - Wedding Purchases & Expenses",
        "  - Payment Planner",
        "  - Payment Schedule",
        "  - A Few Last Thoughts",
        "• Vendor Management:",
        "  - Engagement & Bachelor Party",
        "  - Vendor Details",
        "  - Food Plan",
        "  - Music/Dance Schedule",
        "  - Floor Plan",
        "  - A Few Last Thoughts",
        "• Guest Management:",
        "  - Guest List - Eventwise",
        "  - Wedding Guest List",
        "  - Outsider Guests",
        "  - Thanks Gift for Groom/Bride Side",
        "  - Received Gift by Groom/Bride Side",
        "  - Thanks Gift for Relative",
        "  - Received Gift for by Relatives",
        "  - Thank You Gift to Guest",
        "  - Gift Received by Guests",
        "  - Guest List Summary",
        "  - Guest Room Arrangement",
        "  - Guest Room Plan",
        "  - Guest Sitting Table Plan",
        "  - Family - Sitting Table Plan",
        "• Honeymoon Management:",
        "  - Honeymoon - Planning Guide",
        "  - Honeymoon Budget",
        "  - Travel Detail",
        "  - Sample Packing List",
        "  - Tour/Activity Plan",
        "• Special Notes & Experience",
        "• Calendar 2024-2025",
        "• Family Pics",
        "Pages: 100 (200 Sides) Coloured",
        "Paper & Size: A4 (210x297 mm*) 100 gsm",
        "Cover: 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind: Perfect Binding with Bookmarks",
      ],
      productSpecificationsPopular: [
        "Checklists:",
        "• About Wedding:",
        "  - Wedding Detail",
        "  - 7 Steps of Wedding",
        "  - Congratulations",
        "  - Wedding Programs",
        "  - Planning Before Priors",
        "• Wedding Checklist:",
        "  - Checklists & Don't Forget",
        "  - Day-of Checklist",
        "  - Day of Kit for the Bride/Groom",
        "  - Daily, Weekly & Monthly Planner",
        "  - To-do List (Top Priority)",
        "  - To-do List",
        "• Finance Management:",
        "  - Sample Wedding Budget",
        "  - Wedding Budget (Eventwise)",
        "  - Wedding Purchases & Expenses",
        "  - Payment Planner",
        "  - Payment Schedule",
        "  - A Few Last Thoughts",
        "• Vendor Management:",
        "  - Engagement & Bachelor Party",
        "  - Vendor Details",
        "  - Food Plan",
        "  - Music/Dance Schedule",
        "  - Floor Plan",
        "  - A Few Last Thoughts",
        "• Guest Management:",
        "  - Guest List - Eventwise",
        "  - Wedding Guest List",
        "  - Outsider Guests",
        "  - Thank You Gift to Guest",
        "  - Gift Received by Guests",
        "  - Guest List Summary",
        "  - Guest Room Arrangement",
        "  - Guest Room Plan",
        "  - Guest Sitting Table Plan",
        "  - Family - Sitting Table Plan",
        "Special Notes & Experience",
        "Calendars",
        "Family Pics",
        "Pages: 100 (200 Sides) Coloured",
        "Paper & Size: A4 (210x297 mm*) 100 gsm",
        "Cover: 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind: Perfect Binding with Bookmarks",
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
        "Checklists : Wedding Family • Programs > Event Detail List • Daily Planner • Weekly Planner • Monthly Planner • To-Do List • Event wise Guest List • VIP Chief Guests List, Special Guests List, Friends List, Family Friends List, Friends of Friend List, Relatives List, Business Guests List, Staff Members List, Neighbor Guests List, Club Members List, Classmates List, Bride/Groom Side Guest List, Nearest/Dearest Guests List, Other Guest List, Outsider Guest List • Food Plan for Guests • Thank You Gift to Groom/Bride Side • Gift Received by Groom/Bride Side • Thank You Gift to Guest • Gift Received by Guests • Guest Room Arrangement • Guest Room Plan • Special Guest - Sitting Table Plan • Family - Sitting Table Plan • Sitting Floor Plan • Guest List Summery • Special Notes, Note, Experience • Memories & Much more",
        "Pages : 75 (150 Sides) Coloured",
        "Paper & Size : A4 (210x297 mm*) 100 gsm",
        "Cover : 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind : Perfect Binding with Bookmarks",
      ],
      productSpecificationsPopular: [
        "Checklists : Wedding Family • Programs > Event Detail List • Daily Planner • Weekly Planner • Monthly Planner • To-Do List • Event wise Guest List • Categorised Guests List • Food Plan for Guests • Thank You Gift to Groom/Bride Side • Gift received by Groom/Bride Side • Thank You Gift to Guest • Gift Received by Guests • Guest Room Arrangement • Sitting Table Plans • Guest List Summery • Special Notes, Note, Experience • Memories & Much more",
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
        "Checklists : Wedding Family • Event wise guest List • Categorised Guest List • Guest List Summery • Special Notes • Note • Experience • Memories",
        "Pages : 50 (100 Sides) All pages - Coloured",
        "Paper & Size : A4 (210x297 mm*) 100 gsm",
        "Cover : 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind : Perfect Binding with Bookmarks",
      ],
      productSpecificationsPopular: [
        "Checklists : Wedding Family • Event wise guest List • Categorised Guest List • Guest List Summery • Special Notes • Note • Experience • Memories",
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
        "Checklists : Programs • Check List • Don't Forget • Day-of Kit For The Bride/groom • Day-of Checklist • Daily Planner • Weekly Planner • Monthly Planner • To-do List { Top Priority } • To-do List • Wedding - Purchases • Wedding - Expenses • Vendors • Vendor - Payment Planner • Payment Planner • Music/dance Schedule • Guest Room Arrangement • Thank You Gift To Guest • Gift Received By Guests • Special Notes • Notes • Experience",
        "Pages : 50 (100 Sides) B/W , 1st Liner & 2nd Plain",
        "Paper & Size : A5 (148x210 mm*) 70 gsm",
        "Cover : 200 gsm PVC (Coloured) with Velvet Finish",
        "Bind : Perfect Binding",
      ],
      productSpecificationsPopular: [
        "Checklists : Programs • Check List • Day-of Checklist • To-do List { Top Priority } • To-do List • Thank You Gift To Guest • Gift Received By Guests • Special Notes • Notes • Experience",
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
  // console.log(filteredItems[0].category);
  const processSpecifications = (specs) => {
    const groups = [];
    let currentGroup = null;

    specs.forEach((spec) => {
      if (spec.startsWith('• ')) {
        currentGroup = {
          type: 'parent',
          content: spec,
          children: [],
          index: groups.length
        };
        groups.push(currentGroup);
      } else if (spec.startsWith('  - ')) {
        if (currentGroup) {
          currentGroup.children.push(spec);
        } else {
          groups.push({ type: 'standalone', content: spec });
        }
      } else {
        groups.push({ type: 'standalone', content: spec });
      }
    });

    return groups;
  };

  const groupedSpecs = processSpecifications(
    filter === 'royal'
      ? productData.productSpecificationsRoyal
      : productData.productSpecificationsPopular
  );

  const toggleSection = (index) => {
    const newExpanded = new Set(expandedSections);
    newExpanded.has(index) ? newExpanded.delete(index) : newExpanded.add(index);
    setExpandedSections(newExpanded);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-[6%] py-5 bg-slate-50">
        {/* Left Carousel (Static) */}
        <div className="mt-6 lg:sticky lg:top-0 h-auto">
          <div className="w-full max-w-full mx-auto mb-6 lg:mb-0">
            <div className="relative w-full max-w-4xl mx-auto">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#000",
                  "--swiper-pagination-color": "#000",
                }}
                zoom={true}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Zoom, Navigation, Pagination]}
                className="w-full rounded-lg h-[40vh] md:h-[50vh] lg:h-[70vh]"
                onSwiper={(swiper) => {
                  swiper.el.addEventListener("mouseenter", () => swiper.autoplay.stop());
                  swiper.el.addEventListener("mouseleave", () => swiper.autoplay.start());
                }}
              >
                {productData.productVideo && (
                  <SwiperSlide>
                    <div className="aspect-square w-full relative">
                      <video
                        src={productData.productVideo}
                        autoPlay
                        muted
                        loop
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                )}

                {productData.productImages?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="aspect-square w-full relative">
                      <div className="swiper-zoom-container absolute inset-0">
                        <img
                          src={image}
                          alt={`Product Image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Right Content (Scrollable) */}
        <div className="overflow-y-auto h-[80vh]">
          <div className="p-6 md:px-10 md:py-8 bg-slate-50 rounded-lg shadow-lg">
            <div className="mb-4">
              <h1 className="text-5xl font-normal mb-2">
                {productData.productSubSubCategory}
              </h1>
              <p className="text-3xl text-gray-600">{productData.productCategory}</p>
              <p className="text-lg text-gray-500 mt-1">
                {productData.productSubCategory}, {productData.productSubSubCategory}
              </p>
            </div>

            <div className="border-t border-gray-300 mb-6"></div>

            <div className="flex gap-4 mb-4">
              <div
                className={`py-2 px-8 border rounded-lg hover:shadow-md cursor-pointer ${filter === "royal" ? "bg-orange-500 text-white" : "bg-[#fff] border-2"
                  }`}
                onClick={() => setFilter("royal")}
              >
                Royal
              </div>
              <div
                className={`py-2 px-8 border rounded-lg hover:shadow-md cursor-pointer ${filter === "popular" ? "bg-orange-500 text-white" : "bg-[#fff] border-2"
                  }`}
                onClick={() => setFilter("popular")}
              >
                Popular
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xl font-light text-gray-800 mb-1">
                From Rs.
                {filter === "royal"
                  ? productData.RoyalPrice -
                  (productData.RoyalPrice * productData.productOff) / 100
                  : productData.popularPrice -
                  (productData.popularPrice * productData.productOff) / 100}{" "}
                <span className="text-red-400 line-through text-[1.1rem] mx-2">
                  {filter === "royal" ? productData.RoyalPrice : productData.popularPrice}{" "}
                </span>
                <span className="text-green-400">{productData.productOff}% </span>
                Off
              </p>
            </div>

            <button
              ref={relatedItemsRef}
              onClick={handleButtonClick}
              className="w-1/3 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
            >
              Choose Now
            </button>

            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-3">Product Specifications</h2>
              <ul className="list-disc list-inside text-xs text-gray-600 space-y-2">
                {groupedSpecs.map((item, index) => {
                  if (item.type === 'standalone') {
                    return <li key={index}>{item.content}</li>;
                  }

                  if (item.type === 'parent') {
                    const isExpanded = expandedSections.has(item.index);
                    return (
                      <li key={item.index} className="!list-none">
                        <div className="flex items-center gap-2 cursor-pointer"
                          onClick={() => toggleSection(item.index)}>
                          <span className="text-sm">
                            {isExpanded ? '▼' : '▶'}
                          </span>
                          <span className="font-medium">
                            {item.content.replace('• ', '')}
                          </span>
                        </div>
                        {isExpanded && (
                          <ul className="ml-6 mt-1 space-y-1">
                            {item.children.map((child, idx) => (
                              <li key={idx} className="text-gray-500">
                                {child.replace('  - ', '')}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  }

                  return null;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>



      {["Planner Books"].includes(filteredItems[0].category) ? (
        <div className="grid grid-cols-4 gap-6 px-[6%] py-5 lg:max-w-8xl bg-slate-50 mx-auto">
          {/* Left column: Filter options */}
          {/* <div className="col-span-1 hidden md:block space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-avalonN">Filter By</h1>
              <button
                className={`font-avalonN border-b-2 border-dashed border-gray-500 leading-5 ${filter === "all"
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
          </div> */}

          {/* Mobile filter */}
          {/* <div className="md:hidden relative">
            <Filter onClick={handleClick} />
            {showFilter && (
              <div className="absolute top-7 left-[-10px] space-y-2 border-2 rounded-xl bg-gray-50 font-avalonN w-[180px] px-2 py-2 z-50">
                <div className="flex justify-between items-center">
                  <button onClick={() => setShowFilter(false)}>
                    <X />
                  </button>
                  <button
                    className={`border-b-2 border-dashed border-gray-500 leading-5 ${filter === "all"
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
                    className={`block w-full py-1 font-avalonN px-2 text-left rounded-md border-2 ${filter === "royal"
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
                    className={`block w-full py-1 font-avalonN px-2 text-left rounded-md ${filter === "popular"
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
          </div> */}

          {/* Right column: Filtered results */}
          <div className="col-span-4 bg-slate-50 max-w-8xl px-4 py-6">
            <div className="relative">
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <Link
                      key={index}
                      to={
                        filteredItems[0]?.category === "Free Greetings"
                          ? `/product/${item._id}`
                          : `/edit/${filteredItems[0]?.category}/${item.subSubCategory}`
                      }
                      state={{
                        image: item.image[0],
                        ider: item._id,
                        product: item,
                      }}
                      className="group bg-slate-50 rounded-lg shadow-lg overflow-hidden transform flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    >
                      <div className="relative w-full h-[45vh] rounded-lg overflow-hidden">
                        <img
                          src={item.image[0]}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="px-1 flex justify-center pt-2 items-center text-center">
                        <h2 className="text-md font-avalonB text-gray-600">
                          {item.name.length > 18 ? `${item.name.slice(0, 18)}...` : item.name}
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

              {/* Navigation Buttons */}
              {filteredResponseData.length > itemsPerPage && (
                <div className="flex justify-center items-center mt-8 gap-4">
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
                    <span className="text-sm font-medium text-gray-700">
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
                  <div className=" text-center">
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

