import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoCart, getCart } from "../Store/slices/productSlice";
import { toast } from "react-toastify";

export default function ProductPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product;
  // console.log("product", product);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  

  if (!product) return <div className="text-center p-4">Product not found</div>;

  // console.log("product", product);
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  console.log(product);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleEditImage = () => {
    const isLoggedIn = !!localStorage.getItem("token"); // Replace 'userToken' with your auth token key or condition.

    console.log(isLoggedIn);

    if (!isLoggedIn) {
      toast.error("You need to be logged in first..!", {
        autoClose: 3000,
      });
      return;
    }

    const route = `/product/${product.id}/edit-physical-card`;
    navigate(route, {
      state: { images: product.image },
    });
  };

  const handleAddtoCart = async () => {
    setAddToCartLoading(true);
    dispatch(addtoCart({ productId: id, quantity: quantity }));
    console.log(dispatch(getCart()));

    setAddToCartLoading(false);
  };

  return (
    // <div className="max-w-6xl  mx-auto p-2 md:h-[calc(100vh-200px)]  lg:h-[calc(100vh-200px)]">
    //   <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:space-x-24 lg:mt-16 mt-10  ">
    //     {/* Product Image Section */}
    //     <div className="flex items-start  justify-start lg:justify-start w-full gap-4 lg:ml-40 xl:ml-40 ml-auto mr-10  px-4">
    //       {/* Left Side - Thumbnails (Vertical List) */}
    //       <div className="flex flex-col">
    //         {product.image.map((img, index) => (
    //           <img
    //             key={index}
    //             src={img}
    //             alt={`Thumbnail ${index + 1}`}
    //             className={`cursor-pointer w-20 h-20 object-cover rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
    //               currentImageIndex === index
    //                 ? "border-blue-500"
    //                 : "border-gray-300"
    //             }`}
    //             onClick={() => handleThumbnailClick(index)}
    //           />
    //         ))}
    //       </div>

    //       {/* Right Side - Main Image */}
    //       <img
    //         src={product.image[currentImageIndex]}
    //         alt={product.name}
    //         className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
    //       />
    //     </div>

    //     {/* Product Details Section */}
    //     <div className="flex lg:ml-14 mt-8 md:mt-14 mb-10 sm:mb-0   lg:mt-0 px-4 lg:px-0 flex-col w-full md:w-[600px] lg:w-[500px] justify-between">
    //       <div className="">
    //         <h1 className="text-3xl font-bold mb-2 text-gray-800 ">
    //           {product.name}
    //         </h1>
    //         <p className="text-xl font-semibold mb-2 text-gray-700">
    //           <del className="text-gray-500">₹{product.price.toFixed(2)}</del>{" "}
    //           <span className="text-green-600 font-bold">Free</span>
    //         </p>

    //         <div className="mb-2">
    //           <label
    //             htmlFor="quantity"
    //             className="block mb-1 text-sm font-medium text-gray-600"
    //           >
    //             Quantity:
    //           </label>
    //           <input
    //             type="number"
    //             id="quantity"
    //             value={quantity}
    //             onChange={handleQuantityChange}
    //             min="1"
    //             className="border rounded-lg px-1 py-2 w-20 shadow-sm focus:ring-2 focus:ring-blue-500"
    //           />
    //         </div>

    //         <div className="">
    //           <h2 className="text-2xl font-bold mb-4 text-gray-800">
    //             Product Specification
    //           </h2>
    //           <ul  className="list-disc list-inside text-gray-700">
    //             <li>Add a personal touch to your celebrations with beautifully crafted greeting cards.</li>
    //             <li>Choose from a wide variety of stunning designs for every occasion.</li>
    //             <li>High-quality cards available for free to make your moments memorable.</li>
    //             <li>Personalize your greeting cards with heartfelt messages.</li>
    //             <li>Access and print your favorite designs instantly for quick and easy celebrations.</li>
    //           </ul>
    //         </div>

    //         <div className="space-x-4 flex md:flex-row mt-6 gap-4">
    //           <button
    //             onClick={handleEditImage}
    //             className="w-full bg-amber-800  text-white py-3 px-4  transition duration-200 rounded-xl shadow-lg hover:bg-amber-900 "
    //           >
    //             Edit Greeting
    //           </button>

    //           <button
    //             onClick={handleAddtoCart}
    //             disabled={addToCartLoading}
    //             className="w-full bg-gray-900 text-white py-3 px-4 mr-6 transition duration-200 rounded-xl shadow-lg hover:bg-gray-800"
    //           >
    //             {addToCartLoading ? "Adding to Cart..." : "Add to Cart"}
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className=" gap-16 justify-center flex py-8 flex-col lg:flex-row" >
      <div className="flex items-center px-4 lg:px-0 ">
        <div className="flex items-start gap-4">
        <div>
        {product.image.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleThumbnailClick(index)}
            className={`cursor-pointer w-20 h-20 object-cover rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                            currentImageIndex === index
                              ? "border-blue-500"
                              : "border-gray-300"
                          }`}
          />
        ))}
        </div>
        <div className="">
        <img src={product.image[currentImageIndex]} alt={product.name} className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105" />
        </div>

        </div>
      </div>
      <div className="flex flex-col px-4 lg:px-0">
      
        <h1 className="text-2xl font-bold mb-4 text-gray-800">{product.name}</h1>
        <p className="text-xl font-semibold mb-2 text-gray-700">
          <del className="text-gray-500"></del> <span className="text-green-600 font-bold">Free</span>
        </p>

        <div className="mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="relative group w-full sm:w-40">
                <button
                  type="button"
                  className="flex items-center justify-between px-4 py-2.5 border rounded-lg bg-white hover:bg-gray-50 transition-colors w-full"
                >
                  <span className="font-medium text-gray-900" onChange={handleQuantityChange}>{quantity}</span>
                  <svg
                    className="w-5 h-5 text-gray-500 transform group-hover:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div className="absolute z-10 mt-1 w-full right-0 origin-top scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="border rounded-lg bg-white shadow-lg overflow-hidden">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => setQuantity(num)}
                        className={`w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors ${quantity === num ? 'bg-gray-50' : ''
                          }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        
        </div>
        <div>
          <h2  className="text-2xl font-bold mb-4 text-gray-800">Product Specification</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Add a personal touch to your celebrations with beautifully crafted greeting cards.</li>
            <li>Choose from a wide variety of stunning designs for every occasion.</li>
            <li>High-quality cards available for free to make your moments memorable.</li>
            <li>Personalize your greeting cards with heartfelt messages.</li>
            <li>Access and print your favorite designs instantly for quick and easy celebrations.</li>
          </ul>
        </div>
        <div className="space-x-4 flex md:flex-row mt-6 gap-4">
          <button onClick={handleEditImage} className=" bg-amber-800  text-white py-3 px-12  transition duration-200 rounded-xl shadow-lg hover:bg-amber-900 ">Edit Greeting</button>

          {/* <button onClick={handleAddtoCart} disabled={addToCartLoading} className=" bg-gray-900 text-white py-3 px-12 mr-6 transition duration-200 rounded-xl shadow-lg hover:bg-gray-800">
            {addToCartLoading ? "Adding to Cart..." : "Add to Cart"}
          </button> */}
        </div>
      </div>

    </div>
  );
}
