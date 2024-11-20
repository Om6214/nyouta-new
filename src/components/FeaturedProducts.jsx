import { ChevronLeft, ChevronRight } from "lucide-react";
import placeholder from "../assets/images/placeholder.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import productsData from "../products.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FeaturedProducts() {
  const [currentSlide, setCurrentSlide] = useState(0);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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

  const products = [
    {
      category: "Framed Prints",
      title: "Colored Frame with Photo",
      image: placeholder,
      originalPrice: 389,
      discountedPrice: 292,
      discount: 25,
      bgColor: "bg-[#ffeedd]",
    },
    {
      category: "Premium Frames With Photo",
      title: "Urban Touch Frame with Photo",
      image: placeholder,
      originalPrice: 1459,
      discountedPrice: 1094,
      discount: 25,
      bgColor: "bg-[#e6e6ed]",
    },
    {
      category: "Photobooks",
      title: '8" Hardcover',
      image: placeholder,
      originalPrice: 1199,
      discountedPrice: 1019,
      discount: 15,
      bgColor: "bg-[#fff3d6]",
    },
    {
      category: "Card Stock Prints",
      title: "Retro Prints (24 Prints)",
      image: placeholder,
      originalPrice: 399,
      discountedPrice: 170,
      discount: 57,
      bgColor: "bg-[#e6f0f5]",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("₹", "Rs. ");
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl  text-brown-900 mb-4">
            Featured Products
          </h2>
          <div className="w-40 h-0.5 bg-amber-400 mx-auto mb-6"></div>
          <h3 className="text-xl text-amber-700 font-medium">
            SEE OUR MOST POPULAR PRODUCTS
          </h3>
        </div>

        {/*Slider New  */}
        <div className="slider-container mx-4">
          <style>
            {`.slick-slide {
            padding: 0 10px; 
            box-sizing: border-box;
          }
          .slick-list {
            margin: 0 -10px;
          }
          .slick-arrow{
          border-radius: 5px;
          background: blue;
          width: 25px;
          height: 25px;
          }
          .slick-arrow:hover{
          background: black;
          }
          `}
          </style>
          <Slider {...settings}>
            {productsData.map((prod, i) => (
              <div
                key={i}
                className="bg-blue-200 rounded-lg hover:scale-105 hover:text-[#ff8700] transition duration-300 ease-in"
              >
                <Link
                  key={i}
                  to={`/product/${prod.id}`}
                  className="flex flex-col gap-2 "
                >
                  <img
                    src={prod.image[0]}
                    className="rounded-t-lg"
                    alt={prod.name}
                  />
                  <div className="px-4 py-2 flex flex-col gap-2">
                    <h1 className="font-bold text-lg">{prod.name}</h1>
                    <h1 className="text-red-600">${prod.price}</h1>
                    <h2>{prod.subCategory}</h2>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        {/* <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link href="#" key={index} className="block group">
                <div
                  className={`rounded-2xl p-6 ${product.bgColor} transition-transform group-hover:scale-[1.02]`}
                >
                  <div className="relative aspect-square mb-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">{product.category}</p>
                    <h3 className="font-medium text-gray-900 group-hover:text-gray-700">
                      {product.title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-900">
                        From {formatPrice(product.discountedPrice)}
                      </span>
                      <span className="text-gray-500 line-through text-sm">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-red-500 text-sm">
                        {product.discount}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? "bg-gray-800" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
