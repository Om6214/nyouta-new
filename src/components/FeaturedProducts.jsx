import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import placeholder from "../assets/images/placeholder.jpg";
import { Link } from "react-router-dom";
import { useRef } from "react";
// import productsData from "../products.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../Store/slices/productSlice";
import { useDispatch } from "react-redux";
import cardImg from "../assets/images/mahal1.png";

export default function FeaturedProducts() {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const sliderRef = useRef(null); // Create a reference to the slider
  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
    }
  }, [dispatch, products]);
  // Settings for the slider
  const settings = {
    dots: true,
    swipeToSlide: true,
    infinite: true, // Infinite scrolling to create a continuous loop
    speed: 500, // Very slow transition speed for each slide (7 seconds)
    slidesToShow: 5,
    slidesToScroll: 3, // Scroll 4 slides at a time for manual navigation
    autoplay: false, 
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
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
    <section className="py-16 lg:pt-1 lg:pb-8 px-4 lg:px-8">
      <div className="container mx-auto gap-8">
        {/* Heading with animation and font-family */}
        <div className="my-4">
          <h2
            className="lg:text-5xl text-4xl text-secondary text-center font-avalonB md:text-5xl mb-4 transition-opacity duration-700 opacity-100"
          >
            Customer Favorites
          </h2>
          <h3 className="lg:text-4xl text-2xl text-secondary text-center font-avalonN">Top Picks Chosen by Our Happy Customers</h3>
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
              padding: 25px 0;
            }
            .slick-arrow {
              // border-radius: 50%;
              background: #f59e0b; 
              width: 30px;
              height: 30px;
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
              // display: flex;
              // flex-direction: column;
              // height: 100%;
              // min-height: 450px; /* Ensure each card is at least this tall */
            }
            .slick-slide img {
              // object-fit: contain;
              // height: 250px; /* Fixed height for the image */
              // width: 100%;
            }
            .slick-slide .card-content {
              // flex-grow: 1;
              // display: flex;
              // flex-direction: column;
              // justify-content: space-between;
              // padding-top: 16px;
            }
            `}
          </style>

          {/* Slider Content */}
          <Slider {...settings} ref={sliderRef}>
            {products?.slice(25, 35).map((product, index) => (
              <div
                key={index}
                className="bg-white lg:h-[340px] rounded-lg hover:scale-105 transition duration-300 ease-in-out"
              >
                <Link key={index}
                  to={`/product/${product?._id}`}
                  className="flex flex-col"
                  state={{product}}
                >
                  <div className="relative flex flex-col items-center justify-center" >
                    <img src={cardImg} className="drop-shadow-[0_0_7px_gray]" alt="" />
                    
                  
                  <div className="px-4 pt-20 absolute font-heroFont flex flex-col gap-1 justify-around">
                  <img
                      src={product?.image[0] || placeholder}
                      alt={product?.name}
                      className="object-cover w-full h-[130px] lg:h-[130px] md:h-[100px] rounded-t-lg"
                    />
                    <h1
                      className="font-semibold lg:text-xl md:text-lg text-md text-primary font-heroFont"
                    >
                      {product?.name}
                    </h1>
                    <h3
                      className="text-md md:text-sm lg:text-md font-semibold text-yhird font-heroFont"
                    >
                      {product?.subCategory}
                    </h3>
                    <div className="flex items-baseline lg:gap-4 md:gap-2">
                      <span
                        className="text-xl font-bold text-gray-900"
                    
                      >
                        Rs. {product?.price}
                      </span>
                      <span
                        className="text-sm text-gray-500 line-through"
                    
                      >
                        Rs. 14
                      </span>
                      <span
                        className="text-sm text-red-500"
                      
                      >
                        {product?.discount}% OFF
                      </span>
                    </div>
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
