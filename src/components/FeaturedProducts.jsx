import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
    speed: 500, // Very slow transition speed for each slide (7 seconds)
    slidesToShow: 3,
    slidesToScroll: 3, // Scroll 4 slides at a time for manual navigation
    autoplay: false, 
    initialSlide: 0,
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
    <section className="py-16 px-4 lg:px-8 bg-priBg">
      <div className="container mx-auto flex lg:flex-row flex-col gap-8">
        {/* Heading with animation and font-family */}
        <div className="my-4">
          <h2
            className="text-5xl font-heroFont text-primary md:text-5xl font-semibold mb-4 transition-opacity duration-700 opacity-100"
          >
            Customer Favorites
          </h2>
          <div className="flex flex-col items-start gap-4 px-8 text-heroFont">
          <p>"Crafted with Care, Designed for You: Our curated stationary collection brings the finest artistry from around the globe to your fingertips. Each piece tells a unique story, ensuring quality, elegence and authenticity you can trust"</p>
          <a className="bg-primary px-4 py-1 rounded-lg text-lg flex items-center gap-1" href="#">Browse all products <span><ArrowRight /></span></a>
          </div>
        </div>

        {/* Slider */}
        <div className="slider-container mx-4 relative lg:w-[65%]">
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
              // object-fit: contain;
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
            {productsData.slice(20, 35).map((product, index) => (
              <div
                key={index}
                className="bg-white h-[340px] rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out"
              >
                <Link key={index}
                  to={`/product/${product.id}`}
                  className="flex flex-col"
                  state={{product}}
                >
                  <div className="relative aspect-w-1 aspect-h-1">
                    <img
                      src={product.image[0] || placeholder}
                      alt={product.name}
                      className="object-cover w-full h-[200px] rounded-t-lg"
                    />
                  </div>
                  <div className="px-4 py-1 flex flex-col gap-2 justify-around card-content">
                    <h1
                      className="font-semibold text-xl text-primary font-heroFont"
                    >
                      {product.name}
                    </h1>
                    <h3
                      className="text-md font-semibold text-yhird font-heroFont"
                    >
                      {product.subCategory}
                    </h3>
                    <div className="flex items-baseline gap-4">
                      <span
                        className="text-xl font-bold text-gray-900"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        Rs. {product.price}
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
                        {product.discount}% OFF
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
