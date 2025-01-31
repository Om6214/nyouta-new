import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoCart, getCart } from "../Store/slices/productSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import { ClipLoader } from "react-spinners"; // Import a spinner component

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
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

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
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    }

    fetchProducts();
  }, [state?.ider]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mb-10 p-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="relative">
            <div className="w-4/5 h-64 bg-gray-300 rounded-lg"></div>
            <div className="grid grid-cols-5 gap-3 mt-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="w-full h-20 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="h-8 bg-gray-300 w-3/4 mb-4 rounded-lg"></div>
              <div className="h-6 bg-gray-300 w-1/3 mb-2 rounded-lg"></div>
              <div className="h-4 bg-gray-300 w-1/4 mb-4 rounded-lg"></div>

              <div className="flex gap-7">
                <div className="mb-0">
                  <div className="h-4 bg-gray-300 w-20 mb-2 rounded-lg"></div>
                  <div className="h-10 bg-gray-300 w-20 rounded-lg"></div>
                </div>
              </div>

              <div className="mt-4">
                <div className="h-6 bg-gray-300 w-2/3 mb-4 rounded-lg"></div>
                <div className="h-4 bg-gray-300 w-1/2 rounded-lg"></div>
              </div>

              <div className="mt-3">
                <div className="h-6 bg-gray-300 w-2/3 mb-4 rounded-lg"></div>
                <div className="h-10 bg-gray-300 w-full rounded-lg"></div>
              </div>

              {/* Display Uploaded Photos Placeholder */}
              <div className="grid grid-cols-5 gap-3 mt-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-full h-20 bg-gray-300 rounded-lg"></div>
                ))}
              </div>

              <div className="mt-6">
                <div className="h-4 bg-gray-300 w-1/2 mb-2 rounded-lg"></div>
                <div className="h-10 bg-gray-300 w-full rounded-lg"></div>
              </div>

              <div className="space-x-4 flex md:flex-row mt-12 gap-4">
                <div className="w-1/2 h-12 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
    const res = await dispatch(addtoCart({ productId: filteredProduct._id, quantity, customText, userUploadedImages }));
    if (res.type === "products/addtoCart/fulfilled") {
      dispatch(getCart());
      setAddToCartLoading(false);
      setWarning("");
      setCustomText("");
      setUserUploadedImages([]);
    } else {
      setAddToCartLoading(false);
      return;
    }
  };

  // Add this function to handle image uploads
  const handleImageUpload = async (files) => {
    setUploadLoading(true);
    try {
      const uploadedUrls = [];

      // Upload each file to Cloudinary
      for (const file of files) {
        const imagedata = new FormData();
        imagedata.append("file", file);
        imagedata.append("upload_preset", "NYOUTA_WEBSITE");
        imagedata.append("cloud_name", "dybuuoqdo");

        const imageRes = await fetch(
          "https://api.cloudinary.com/v1_1/dybuuoqdo/image/upload",
          {
            method: "POST",
            body: imagedata
          }
        );
        const uploadImageUrl = await imageRes.json();
        uploadedUrls.push(uploadImageUrl.secure_url);
      }
      // Update state with new image URLs
      setUserUploadedImages(prev => [...prev, ...uploadedUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mb-10 p-6">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image Section */}
        <div className="relative">
          <img
            src={filteredProduct.image[currentImageIndex]}
            alt={filteredProduct.name}
            className="w-4/5  object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
          <div className="grid grid-cols-5 gap-3 mt-4">
            {filteredProduct.image.map((img, index) => (
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
                  onChange={(e) => handleImageUpload(Array.from(e.target.files))}
                  className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={uploadLoading}
                />
                {uploadLoading && (
                  <p className="text-sm text-gray-600 mt-2">Uploading images...</p>
                )}
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