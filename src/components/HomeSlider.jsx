import React from "react";
import Slider from "react-slick";
import img1 from "../assets/images/home-1.webp";
import img2 from "../assets/images/home-2.webp";
import img3 from "../assets/images/home-3.webp";
import img4 from "../assets/images/home-4.webp";
import { Heart, ShieldCheck, Star } from "lucide-react";
// import products from "../products.json";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProducts } from "../Store/slices/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const HomeSlider = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
    }
  }, [dispatch, products]);
console.log(products?.filter((items) => [1, 9, 14, 18].includes(items?._id)));
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    arrows: false,
  };
  return (
    <>
    <div className="lg:py-6 pt-6 bg-priBg">
        <h1 className="lg:text-5xl text-3xl text-primary text-center font-heroFont font-semibold ">Bring your memories to life with Nyouta</h1>
        
    </div>
    <div className="flex flex-col bg-priBg lg:flex-row">
      <div className="slider-container lg:w-[65%] rounded-lg my-auto">
        <Slider {...settings} className="px-6">
          <div>
            <img className="w-full lg:h-[350px] lg:object-cover rounded-lg" src={img1} alt="" />
          </div>
          <div>
            <img className="w-full lg:h-[350px] lg:object-cover rounded-lg" src={img2} alt="" />
          </div>
          <div>
            <img className="w-full lg:h-[350px] lg:object-cover rounded-lg" src={img3} alt="" />
          </div>
          <div>
            <img className="w-full lg:h-[350px] lg:object-cover rounded-lg" src={img4} alt="" />
          </div>
        </Slider>
      </div>
      <div>
        <h1 className="px-6 text-xl font-bold text-primary">Top Products</h1>
        <div className="grid grid-cols-2 gap-y-4 gap-x-2  px-6 pt-2">
          {products?.filter((items) => ["1", "9", "14", "18"].includes(items?.id)).map((items, index) => (
            <div key={items.id} className="bg-gradient-to-r shadow-lg hover:shadow-2xl from-primary to-secondary rounded-lg">
              <Link key={index} to={`/products/${items?._id}`} state={{items}}>
              <img className="w-full lg:h-[130px] h-[100px] object-cover rounded-t-lg" src={items?.image[1]} alt="" />
                <h1 className="px-2 py-[2px] font-heroFont font-semibold">{items?.name}</h1>
                </Link>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="mx-2 flex flex-col gap-8 py-4 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary w-full">
        <h1 className="lg:text-5xl text-3xl font-primaryFont text-center font-bold">Nyouta</h1>
        <div className="flex gap-2 items-center">
            <h1 className="flex font-heroFont items-center gap-1 text-third text-2xl"><Heart size={32}/> <span>35 Lakh</span></h1>
            <h2 className="font-heroFont">Customers</h2>
        </div>
        <div className="flex gap-2 items-center">
            <h1 className="flex font-heroFont items-center gap-1 text-third text-2xl"><ShieldCheck size={32} /> <span>1 crore</span></h1>
            <h2 className="font-heroFont">Cards printed</h2>
        </div>
        <div className="flex gap-2 items-center">
            <h1 className="flex font-heroFont items-center gap-1 text-third text-2xl"><Star size={32} /> <span>1 Lakh</span></h1>
            <h2 className="font-heroFont">5 star ratings</h2>
        </div>
      </div> */}
    </div>
    </>
  );
};

export default HomeSlider;
