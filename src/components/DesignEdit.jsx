import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoCart, getCart } from "../Store/slices/productSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import { ClipLoader } from "react-spinners"; // Import a spinner component
import { FaTruck, FaMoneyBillAlt } from 'react-icons/fa';
import ShareButton from "./ShareButton";
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
  const [price, SetPrice] = useState(0);
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
        console.log("filteredProduct11", matchedProduct.type);
        console.log("filteredProduct.subSubCategory", matchedProduct)
        if (matchedProduct.subSubCategory == "Wedding Management" && matchedProduct.type == "Royal") {
          SetPrice(2550);
        }
        else if (matchedProduct.subSubCategory == "Wedding Management" && matchedProduct.type == "Popular") {
          SetPrice(2150);
        }
        else if (matchedProduct.subSubCategory == "Guest Management" && matchedProduct.type == "Royal") {
          SetPrice(1599);
        }
        else if (matchedProduct.subSubCategory == "Guest Management" && matchedProduct.type == "Popular") {
          SetPrice(1199);
        }
        else if (matchedProduct.subSubCategory == "Wedding Notepad(liner)" && matchedProduct.type == "Royal") {
          SetPrice(649);
        }
        else if (matchedProduct.subSubCategory == "Wedding Notepad(liner)" && matchedProduct.type == "Popular") {
          SetPrice(389);
        }
        else if (matchedProduct.subSubCategory == "Wedding Notepad(photo)" && matchedProduct.type == "Royal") {
          SetPrice(749);
        }
        else if (matchedProduct.subSubCategory == "Wedding Notepad(photo)" && matchedProduct.type == "Popular") {
          SetPrice(499);
        }

        else if (matchedProduct.subSubCategory == "Guest List Booklet - Best Seller" && matchedProduct.type == "Royal") {
          SetPrice(1349);
        }
        else if (matchedProduct.subSubCategory == "Guest List Booklet - Best Seller" && matchedProduct.type == "Popular") {
          SetPrice(1099);
        }
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
  console.log("filteredProduct", filteredProduct);

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

  const handleBuyNow = () => {
    navigate('/checkout-buy', { state: { filteredProduct } }); // Passing product data to Checkout
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
    <div className="max-w-6xl mx-auto mb-20 p-4 sm:p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Product Image Section */}
        <div className="flex flex-col-reverse sm:flex-row items-start gap-4 lg:sticky lg:top-10 lg:h-[65vh]">
        
          <div className="flex sm:flex-col gap-2 sm:gap-3   pb-2 sm:pb-0 w-[200px] ">
            {filteredProduct.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`flex-shrink-0 cursor-pointer w-16 h-16 sm:w-full sm:h-full object-cover rounded-lg border-2 transition-all duration-300 hover:scale-105 ${currentImageIndex === index
                    ? "border-gray-300 shadow-md"
                    : "border-gray-300 hover:border-blue-400"
                  }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="relative w-full aspect-square sm:w-[400px] md:w-[800px] lg:w-[900px]">
            <div className="rounded-xl overflow-hidden transition-all duration-300 border-2">
              <img
                src={filteredProduct.image[currentImageIndex]}
                alt={filteredProduct.name}
                className="w-full h-full object-contain sm:p-4  border-gray-100 "
              />
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col gap-6 px-2 sm:px-4">
          {/* Header Section */}
          <div className="flex justify-between items-start pb-4 border-b border-gray-200">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
              {filteredProduct.name}
            </h1>
            <ShareButton className="flex-shrink-0" />
          </div>

          {/* Price Section */}
          <div className="space-y-1">
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                ₹{filteredProduct.price.toFixed(2)}
              </span>
              <span className="text-base sm:text-lg text-gray-500 line-through">
                ₹{price.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                15% OFF
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">Inclusive of all taxes • FREE Shipping</p>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="relative group w-full sm:w-40">
                <button
                  type="button"
                  className="flex items-center justify-between px-4 py-2.5 border rounded-lg bg-white hover:bg-gray-50 transition-colors w-full"
                >
                  <span className="font-medium text-gray-900">{quantity}</span>
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

            {/* Customization Sections */}
            <div className="space-y-6">
              {/* Upload Photos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personalize with Photos
                  <span className="text-xs text-gray-500 ml-1">(JPEG/PNG, max 5MB each)</span>
                </label>
                <div className="mb-4">
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
              </div>

              {/* Custom Text Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name..."
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Text
                  </label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Custom Text"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Warning Message */}
              {warning && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2 animate-fade-in">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {warning}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleAddtoCart}
                  disabled={addToCartLoading}
                  className="flex-1 bg-amber-800 hover:bg-amber-900 text-white py-3 sm:py-4 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                  {addToCartLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 sm:py-4 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Buy Now
                </button>
              </div>

              {/* Delivery Info */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-gray-50 p-4 sm:p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaTruck className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900">2-10 business days</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaMoneyBillAlt className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-gray-900">Cash on Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}