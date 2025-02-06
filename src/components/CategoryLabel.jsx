import React from "react";
import ProductJson from "../products.json";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { Zoom, Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import cropimage from "../assets/images/croppicture.png"
import weddingguestlistPdf from "../assets/images/Wedding Guest List - PDF.png"
import weddingguestlistXls from "../assets/images/Wedding Guest List - XLS.png"
import weddingNotepad from "../assets/images/Wedding Notepad.png"
import ogWeddingPdf from "../assets/Pdf/Wedding Guest List-PDF.pdf"
import ogWeddingXls from "../assets/Pdf/Wedding Guest List-XLS.xlsx"
import ogWeddingNotepad from "../assets/Pdf/Wedding Notepad.pdf"
import { toast, ToastContainer } from "react-toastify";


const allPdf = [
  {
    title:"Wedding Guest List - PDF",
    image:weddingguestlistPdf,
    content:ogWeddingPdf
  },
  {
    title:"Wedding Guest List - XLS",
    image:weddingguestlistXls,
    content:ogWeddingXls
  },
  {
    title:"Wedding Notepad",
    image:weddingNotepad,
    content:ogWeddingNotepad
  }
]

export default function CategoryLabel() {

  async function fetchProducts() {
    const url = "https://nyouta.onrender.com/api/v1/products/products";
    try {
      const response = await axios.get(url);
      console.log(response.data); // Handle the fetched data
      console.log("response",response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

const token = localStorage.getItem('token'); // Replace 'token' with your key



  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  // console.log("filteredItems",filteredItems)
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


  const handleDownload = () => {
  toast.error("You need to be logged in first..!")
  }

  const handleButtonClick = () => {
    if (filteredItems.length > 0) {
      if (filteredItems[0].category === "Photo Books") {
        // Navigate to a different component with the image as state
        navigate(`/edit/PhotoBook/${filteredItems[0].subSubCategory}`, { state: { image: filteredItems[0].image[0]} });
      }
      if (filteredItems[0].category === "Free Greetings") {
        // Navigate to a different component with the image as state
        navigate(`/edit/FreeGreetings/${filteredItems[0].subSubCategory}`, { state: { image: filteredItems[0].image[0]} });
      }
      if (filteredItems[0].category === "Itinerary") {
        // Navigate to a different component with the image as state
        // console.log(filteredItems[0].image[1]);
        navigate(`/edit/Itinerary/${filteredItems[0].subSubCategory}`, { state: { image: filteredItems[0].image[0]} });
      }
      if (filteredItems[0].category === "Calendars 2025") {
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
    // <>
    //   {filteredItems.length > 0 ? (
    //     <motion.div
    //       className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-[6%] py-5 bg-white"
    //     >
    //       <div className="mt-10 ">
    //         <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
    //           <Swiper
    //             style={{
    //               "--swiper-navigation-color": "#000",
    //               "--swiper-pagination-color": "#000",
    //             }}
    //             zoom={true}
    //             navigation={true}
    //             pagination={{ clickable: true }}
    //             autoplay={{ delay: 3000, disableOnInteraction: false }}
    //             modules={[Zoom, Navigation, Pagination, Autoplay]}
    //             className="rounded-xl shadow-lg h-[40vh] md:h-[50vh] lg:h-[70vh] "
    //           >
    //             {filteredItems[0].image.map((src, index) => (
    //               <SwiperSlide key={index}>
    //                 <div className="swiper-zoom-container">
    //                   <img
    //                     src={src}
    //                     alt={`Slide ${index + 1}`}
    //                     className="object-cover w-full h-auto"
    //                   />
    //                 </div>
    //               </SwiperSlide>
    //             ))}
    //           </Swiper>
    //         </div>
    //     </div>
    //     <div>
    //     <div className="p-6 md:p-10 bg-white rounded-lg shadow-lg">
    //   <div className="mb-4">
    //     <h1 className="text-3xl font-bold mb-2">{filteredItems[0].name}</h1>
    //     <p className="text-lg text-gray-600">{filteredItems[0].category}</p>
    //     <p className="text-sm text-gray-500 mt-1">{filteredItems[0].subCategory}, { filteredItems[0].subSubCategory}</p>
    //   </div>
    //   {/* Select Finish */}
    //   <div className="mb-6">
    //   </div>
    //   <div className="border-t border-gray-300 mb-6"></div>
    //   {/* Price and Offer */}
    //   <div className="mb-6">
    //     <p className="text-xl font-semibold text-gray-800 mb-1">From Rs. {filteredItems[0].price}</p>
    //     <p className="text-sm text-gray-600">Category: {filteredItems[0].category}</p>
    //     <p className="text-sm text-gray-500">Subcategory: {filteredItems[0].subCategory}</p>
    //     <p className="text-sm text-gray-500">SubCategory Product: {filteredItems[0].subSubCategory}</p>
    //   </div>
    //   <button
    //       onClick={handleButtonClick}
    //       className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
    //     >
    //       ADD NOW
    //     </button>

    // </div>
    //     </div>
    

    //     </motion.div>
    //   ) : (
    //     <div className="p-8 text-center">
    //       <h1 className="text-2xl font-semibold text-gray-700">
    //         No products found for {formattedPageName} - {formattedPath}
    //       </h1>
    //     </div>
    //   )}
    //   <div className="px-[6%] pt-[1%]">

    //     <div className="font-semibold text-[4vh]">Related Items</div>
    //     <div className="font-normal md:text-[2.2vh] text-[2vw]">
    //     </div>
    //     <div className="pt-5 md:max-w-[95%] mx-auto">
    //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    //         {filteredItems.map((item) => (
    //           <Link
    //             to={`/e/nav/${item.category}/${item.subCategory}/${item.subSubCategory}`}
    //             key={item.id}
    //             className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-xl"
    //           >
    //             <div className="relative w-full h-[40vh]">
    //               <img
    //                 src={item.image[0]}
    //                 alt={item.subTitle}
    //                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out "
    //               />
    //             </div>
    //             <div className="p-4 text-center">
    //               <h2 className="text-lg font-bold text-gray-800">
    //                 {item.subSubCategory}
    //               </h2>
    //             </div>
    //           </Link>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="mb-9" id="sdfasf"></div>
    // </>
    <div className="w-full  overflow-hidden bg-black">
    <div className="w-full bg-[#FAF9FE] flex flex-col lg:flex-row   ">
    <div className="w-full lg:w-[50%] flex justify-center lg:justify-start p-6 lg:p-0"><img src={cropimage} alt="BannerImage" /></div>
    <div className="w-full lg:w-[50%] p-6 lg:p-0 flex flex-col justify-center items-center gap-6">
      <h1 className="text-2xl sm:text-3xl font-[italic]">FREE PRINTABLE</h1>
      <h2 className="text-4xl sm:text-5xl italic">Wedding planner</h2>
      <p className="w-full sm:w-[450px] text-center" >Our 100 worksheets to guide you through each step of planning your big day </p>
      <a href="#download"><button className="px-8 py-2 bg-[#F0DED0] capitalize font-semibold text-gray-700 hover:-translate-y-1 hover:translate-x-1 hover:shadow-lg transition duration-200 ">download now </button></a>
    </div>
    </div>

    <div id="download" className="flex flex-col gap-10 bg-[hsl(26,16%,46%)] py-10 sm:px-10 w-[100vw]">
      <div className="flex flex-col gap-4 items-center text-center">
        <h1 className="text-4xl font-semibold text-[#ecbe81]">PLANNING SHEETS</h1>
        <p className="w-full px-6 text-justify sm:px-0 sm:w-[500px]  text-white ">Download and print our free printables to see which planner will work best for you. 
Get organized today with our free planning printables.
</p>
<h2 className="text-2xl sm:text-3xl italic text-white font-semibold">Ready ..... Set ..... Download !</h2>
      </div>
      {token ? <div className="flex gap-16 flex-wrap justify-center">
      {allPdf.map((pdf)=><div  className=" flex flex-col   gap-2 group rounded-lg bg-white shadow-lg hover:-translate-y-2 transition duration-200 ">
        <div className=" w-full rounded-t-lg overflow-hidden"><img src={pdf.image} alt="image" className="group-hover:scale-110 group-hover:rotate-2 duration-200 transition" /></div>
        <div className="">
          <h1 className="text-center font-semibold text-gray-700">{pdf.title}</h1>
        </div>
        <div className="">
          <a href={pdf.content} download={true} ><p className="capitalize text-gray-500  text-center py-2 ">download <i class="fa-solid  fa-download ms-1"></i></p></a>
        </div>
      </div>)}
      </div> : <div className="flex gap-16 flex-wrap justify-center">
      {allPdf.map((pdf)=><div  className=" flex flex-col   gap-2 group rounded-lg bg-white shadow-lg hover:-translate-y-2 transition duration-200 ">
        <div className=" w-full rounded-t-lg overflow-hidden"><img src={pdf.image} alt="image" className="group-hover:scale-110 group-hover:rotate-2 duration-200 transition" /></div>
        <div className="">
          <h1 className="text-center font-semibold text-gray-700">{pdf.title}</h1>
        </div>
        <div className="">
          <div onClick={handleDownload} className="cursor-pointer" ><p className="capitalize text-gray-500  text-center py-2">download <i class="fa-solid  fa-download ms-1"></i></p></div>
        </div>
      </div>)}
      </div>}

      
      
     
    </div>
    <ToastContainer/>
    </div>
  );
}