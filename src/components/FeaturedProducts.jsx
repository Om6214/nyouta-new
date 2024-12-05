import { ChevronLeft, ChevronRight } from "lucide-react";
import placeholder from "../assets/images/placeholder.jpg";
import { Link } from "react-router-dom";
import { useRef } from "react";
import productsData from "../products.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FeaturedProducts() {
  const sliderRef = useRef(null); // Create a reference to the slider

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true, // Infinite scrolling to create a continuous loop
    speed: 7000, // Very slow transition speed for each slide (7 seconds)
    slidesToShow: 4,
    slidesToScroll: 4, // Scroll 4 slides at a time for manual navigation
    autoplay: true, // Enable autoplay for automatic sliding
    autoplaySpeed: 5000, // Change slide every 5 seconds (no breaks between slides)
    cssEase: "linear", // Linear transition for a smooth continuous movement
    initialSlide: 0,
    pauseOnHover: false, // Disable pause on hover to maintain continuous scrolling
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <section className="py-16 px-4 bg-amber-50 ml-14 mr-14 mt-20">
      <div className="container mx-auto">
        {/* Heading with animation and font-family */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-primaryFont md:text-5xl font-semibold mb-4 transition-opacity duration-700 opacity-100"
          >
            Featured Products
          </h2>
          <h3
            className="text-3xl font-primaryFont mt-6 font-medium text-amber-500 transition-opacity duration-700 opacity-100"
            
          >
            SEE OUR MOST POPULAR PRODUCTS
          </h3>

        </div>

        {/* Slider */}
        <div className="slider-container mx-4 relative">
          <style>
            {`
            .slick-slide {
              padding: 0 15px;
            }
            .slick-list {
              margin: 0 -15px;
            }
            .slick-arrow {
              border-radius: 50%;
              background: #f59e0b; /* Amber color for buttons */
              width: 45px;
              height: 45px;
              display: flex;
              justify-content: center;
              align-items: center;
              color: white;
              transition: background 0.3s ease;
              position: absolute;
              top: 50%;
              z-index: 1;
            }
            .slick-prev {
              left: -40px;
            }
            .slick-next {
              right: -40px;
            }
            .slick-arrow:hover {
              background: #d97706; /* Darker amber for hover */
              cursor: pointer;
            }
            .slick-slide > div {
              display: flex;
              // flex-direction: column;
              // height: 100%;
              // min-height: 450px; /* Ensure each card is at least this tall */
            }
            .slick-slide img {
              object-fit: contain;
              // height: 250px; /* Fixed height for the image */
              // width: 100%;
              border-radius: 8px;
            }
            .slick-slide .card-content {
              flex-grow: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding-top: 16px;
            }
            `}
          </style>

          {/* Slider Content */}
          <Slider {...settings} ref={sliderRef}>
            {productsData.map((prod, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out"
              >
                <Link
                  to={`/product/${prod.id}`}
                  className="flex flex-col gap-4 mt-10"
                >
                  <div className="relative aspect-w-1 aspect-h-1">
                    <img
                      src={prod.image[0] || placeholder}
                      alt={prod.name}
                      className="object-cover w-[350px] h-[300px] rounded-t-lg"
                    />
                  </div>
                  <div className="px-4 py-3 flex flex-col gap-3 card-content">
                    <h1
                      className="font-semibold text-xl text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {prod.name}
                    </h1>
                    <h3
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "Lobster, cursive" }}
                    >
                      {prod.subCategory}
                    </h3>
                    <div className="flex items-baseline gap-4">
                      <span
                        className="text-xl font-bold text-gray-900"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        Rs. {prod.price}
                      </span>
                      <span
                        className="text-sm text-gray-500 line-through"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        Rs. 14
                      </span>
                      <span
                        className="text-sm text-red-500"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        {prod.discount}% OFF
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
