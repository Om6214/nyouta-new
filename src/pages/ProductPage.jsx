import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoCart, getCart } from "../Store/slices/productSlice";
import { toast } from "react-toastify";

export default function ProductPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product;
  console.log("product", product);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  if (!product) return <div className="text-center p-4">Product not found</div>;


  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleEditImage = () => {

    const isLoggedIn = !!localStorage.getItem("token"); // Replace 'userToken' with your auth token key or condition.

    console.log(isLoggedIn);


    if (!isLoggedIn) {
      toast.error("You need to be logged in first!", {
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
    console.log( dispatch(getCart()));
    
   
    setAddToCartLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image Section */}
        <div className="lg:ml-40 xl:ml-40 ml-auto mr-10">
          <img
            src={product.image[currentImageIndex]}
            alt={product.name}
            className="relative w-4/4  object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
          <div className="grid grid-cols-5 gap-3 mt-1">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`cursor-pointer w-full h-20 object-cover rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${currentImageIndex === index ? "border-blue-500" : "border-gray-300"
                  }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name}</h1>
            <p className="text-xl font-semibold mb-2 text-gray-700">₹{product.price.toFixed(2)}</p>


            <div className="mb-2">
              <label
                htmlFor="quantity"
                className="block mb-1 text-sm font-medium text-gray-600"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="border rounded-lg px-1 py-2 w-20 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Product Details</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Category: {product.category}</li>
                <li>Subcategory: {product.subCategory}</li>

              </ul>
            </div>

            <div className="space-x-4 flex md:flex-row mt-6 gap-4">
              <button
                onClick={handleEditImage}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-full shadow-lg hover:bg-gradient-to-l transition-colors"
              >
                Edit PDF
              </button>

              <button
                onClick={handleAddtoCart}
                disabled={addToCartLoading}
                className="w-full bg-yellow-600 text-white py-3 px-6 mr-6 rounded-full shadow-lg hover:bg-yellow-700 transition-colors"
              >
                {addToCartLoading ? "Adding to Cart..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
