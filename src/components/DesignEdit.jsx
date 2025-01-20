import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoCart, getCart } from "../Store/slices/productSlice";
import { toast } from "react-toastify";
import axios from "axios";

export default function DesignEdit() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id: pageid } = useParams(); // Retrieve `pageid` from URL params
  const dispatch = useDispatch();

  const [responseData, setResponseData] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [warning, setWarning] = useState("");
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [userUploadedImages, setUserUploadedImages] = useState([]);
const [customText, setCustomText] = useState("");


  const types = ["Pdf Invitation"];

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      const url = "https://nyouta.onrender.com/api/v1/products/products";
      try {
        const response = await axios.get(url);
        setResponseData(response.data);

        // Filter for the matching product
        const matchedProduct = response.data.find(
          (item) => item._id === state?.ider
        );
        setFilteredProduct(matchedProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [state?.ider]);

  if (!filteredProduct) {
    return <div className="text-center p-4">Product not found</div>;
  }

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleEditImage = () => {
    if (!selectedType) {
      setWarning("Please select a card type to edit the image.");
    } else {
      let route = `/product/${filteredProduct._id}/edit`;

      if (selectedType === "Pdf Invitation") {
        route += "-physical-card";
      }

      navigate(route, {
        state: { images: filteredProduct.image, selectedType },
      });
    }
  };

  const handleAddtoCart = async () => {
    setAddToCartLoading(true);
    await dispatch(addtoCart({ productId: filteredProduct._id, quantity }));
    dispatch(getCart());
    setAddToCartLoading(false);
    toast.success("Added to cart successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto mb-10 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image Section */}
        <div className="relative">
          <img
            src={filteredProduct.image[currentImageIndex]}
            alt={filteredProduct.name}
            className="w-64 h-[60vh] object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
          <div className="grid grid-cols-5 gap-3 mt-4">
            {filteredProduct.image.map((img, index) => (
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
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              {filteredProduct.name}
            </h1>
            <p className="text-xl font-semibold mb-2 text-gray-700">
              ₹{filteredProduct.price.toFixed(2)}
            </p>
            <p className="mb-4 text-gray-600">SKU: {filteredProduct.sku}</p>
            
            <div className="flex gap-7">
            

            <div className="mb-0">
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
            </div>

            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Product Details
              </h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Category: {filteredProduct.category}</li>
                <li>Subcategory: {filteredProduct.subCategory}</li>
                <li>Tags: {filteredProduct.tags.join(", ")}</li>
              </ul>
            </div>


            <div className="mt-3">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload and Manage Photos</h2>

  {/* Photo Upload Section */}
  <div className="mb-4">
    <p className="text-base font-medium mb-2 text-black">Add Photos</p>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => {
        const files = Array.from(e.target.files);
        const newPhotos = files.map((file) => URL.createObjectURL(file));
        setUserUploadedImages((prevImages) => [...prevImages, ...newPhotos]);
      }}
      className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Display Uploaded Photos with Delete Option */}
  <div className="grid grid-cols-5 gap-3 mt-4">
    {userUploadedImages.map((img, index) => (
      <div key={index} className="relative">
        <img
          src={img}
          alt={`Uploaded ${index + 1}`}
          className="w-full h-20 object-cover rounded-lg border-2 border-gray-300"
        />
        <button
          onClick={() =>
            setUserUploadedImages((prevImages) =>
              prevImages.filter((_, i) => i !== index)
            )
          }
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:bg-red-600"
        >
          ✕
        </button>
      </div>
    ))}
  </div>

  {/* Custom Text Input */}
  <div className="mt-6">
    <label
      htmlFor="customTextInput"
      className="block mb-2 text-sm font-medium text-gray-600"
    >
      Enter Custom Text:
    </label>
    <input
      type="text"
      id="customTextInput"
      value={customText}
      onChange={(e) => setCustomText(e.target.value)}
      placeholder="Type your custom text here"
      className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>

            {warning && (
              <div className="text-red-500 font-semibold mt-4 p-3 border border-red-500 rounded-lg bg-red-100">
                {warning}
              </div>
            )}

            <div className="space-x-4 flex md:flex-row mt-12 gap-4">
              {selectedType !== "Photobook" && (
               <></>
              )}

              <button
                onClick={handleAddtoCart}
                disabled={addToCartLoading}
                className="w-1/2 bg-yellow-600 text-white py-3 px-6 mr-6 rounded-full shadow-lg hover:bg-yellow-700 transition-colors"
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
