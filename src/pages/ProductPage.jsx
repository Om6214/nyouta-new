import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [warning, setWarning] = useState("");

  const types = ["Physical Card", "Digital Card", "Photobook"];

  if (!product) return <div className="text-center p-4">Product not found</div>;

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 1 : Math.max(1, value));
  };

  const handleEditImage = () => {
    if (!selectedType) {
      setWarning("Please select a card type to edit the image.");
    } else {
      let route = `/product/${product.id}/edit`;
  
      // Append the selected type to the route
      if (selectedType === "Physical Card") {
        route += "-physical-card";
      } else if (selectedType === "Digital Card") {
        route += "-digital-card";
      }
  
      navigate(route, {
        state: { imageUrl: product.image[currentImageIndex] },
      });
    }
  };
  

  const buyNow = () => {
    console.log(`Buying ${quantity} ${product.name}(s)`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image Section */}
        <div className="relative">
          <img
            src={product.image[currentImageIndex]}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
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
                    className={`px-4 py-2 text-sm bg-white text-black rounded-full border-2 ${
                      selectedType === type ? "border-green-500 bg-green-50" : "border-gray-300"
                    } transition-all focus:outline-none hover:bg-gray-100`}
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
                className="border rounded-lg px-3 py-2 w-20"
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

            <div className="space-x-4 flex flex-col md:flex-row mt-12 gap-4">
              {selectedType !== "Photobook" && (
                <button
                  onClick={handleEditImage}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Edit Image Card
                </button>
              )}

              {selectedType === "Photobook" && (
                <button
                  onClick={() => alert("Uploading photos for Photobook")}
                  className="w-full bg-gray-200 text-black py-3 px-6 rounded-full border border-gray-300 hover:bg-gray-300 transition-colors"
                >
                  Upload Photos
                </button>
              )}

              <button
                onClick={buyNow}
                className="w-full bg-yellow-600 text-white py-3 px-6 rounded-full hover:bg-yellow-700 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
