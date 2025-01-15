import React, { useState } from "react";
import { useLocation, useNavigate,useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoCart,getCart} from "../Store/slices/productSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
export default function ProductPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const product = state?.product;
  console.log("product",product)
  console.log("state",state)
  const {id} = useParams();
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [warning, setWarning] = useState("");
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  
  const types = ["Pdf Invitation"];

  if (!product) return <div className="text-center p-4">Product not found</div>;

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleEditImage = () => {
    if (!selectedType) {
      setWarning("Please select a card type to edit the image.");
    } else {
      let route = `/product/${product.id}/edit`;

      // Append the selected type to the route
      if (selectedType === "Pdf Invitation") {
        route += "-physical-card";
      } 

      // Pass the entire array of images to the next page
      navigate(route, {
        state: { images: product.image, selectedType },
      });
    }
  };

  const handleAddtoCart = async() => {
    setAddToCartLoading(true);
    console.log(id,quantity);
    await dispatch(addtoCart({productId:id,quantity:quantity}));
    dispatch(getCart());
    setAddToCartLoading(false);
  };

  return (

    <div className="max-w-6xl mx-auto mb-10 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image Section */}
        <div className="relative">
          <img
            src={product.image[currentImageIndex]}
            alt={product.name}
            className="w-64 h-112 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
          <div className="grid grid-cols-5 gap-3 mt-4">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`cursor-pointer w-full h-20 object-cover rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                  currentImageIndex === index ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
            <p className="text-xl font-semibold mb-4 text-gray-700">₹{product.price.toFixed(2)}</p>
            <p className="mb-4 text-gray-600">SKU: {product.sku}</p>

            <div className="mb-4">
              <p className="text-base font-medium mb-2 text-black">Select Type</p>
              <div className="flex gap-3 flex-wrap">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 text-sm bg-white text-black rounded-full border-2 shadow-md transition-all focus:outline-none hover:bg-gray-100 ${
                      selectedType === type ? "border-green-500 bg-green-50" : "border-gray-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="border rounded-lg px-3 py-2 w-20 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Product Details</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Category: {product.category}</li>
                <li>Subcategory: {product.subCategory}</li>
                <li>Tags: {product.tags.join(", ")}</li>
              </ul>
            </div>

            {warning && (
              <div className="text-red-500 font-semibold mt-4 p-3 border border-red-500 rounded-lg bg-red-100">
                {warning}
              </div>
            )}

            <div className="space-x-4 flex md:flex-row mt-12 gap-4">
              {selectedType !== "Photobook" && (
                <button
                  onClick={handleEditImage}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-full shadow-lg hover:bg-gradient-to-l transition-colors"
                >
                  Edit PDF
                </button>
              )}

              {selectedType === "Photobook" && (
                <button
                  onClick={() => alert("Uploading photos for Photobook")}
                  className="w-full bg-gray-200 text-black py-3 px-6 rounded-full border border-gray-300 hover:bg-gray-300 transition-colors shadow-md"
                >
                  Upload Photos
                </button>
              )}

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
