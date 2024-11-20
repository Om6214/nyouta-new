'use client'

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import productsData from '../products.json' // Assuming products data is stored in this file
import { useCart } from "../CartContext"; // Assuming CartContext is used to manage the cart state

export default function ProductPage() {
  const { id } = useParams(); // Get product ID from URL params
  const product = productsData.find((p) => p.id === id); // Find product by ID from products data

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For image gallery navigation
  const [quantity, setQuantity] = useState(1); // To manage the selected quantity of the product
  const { addToCart } = useCart(); // Function to add products to the cart from context

  // If the product is not found, display a message
  if (!product) return <div className="text-center p-4">Product not found</div>;

  // Handle the next image in the image gallery
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.image.length);
  };

  // Handle the previous image in the image gallery
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.image.length) % product.image.length);
  };

  // Handle quantity input change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 1 : Math.max(1, value)); // Ensure the quantity is at least 1
  };

  // Handle adding product to cart
  const handleAddToCart = () => {
    addToCart(product, quantity); // Add selected product and quantity to cart
    console.log(`Added ${quantity} ${product.name}(s) to cart`);
  };

  // Handle "Buy Now" functionality (you can modify it to implement actual buying process)
  const buyNow = () => {
    console.log(`Buying ${quantity} ${product.name}(s) now`);
    // Implement actual purchase logic here
  };

  // Handle "Edit Product" functionality (you can modify it to implement actual editing process)
  const editProduct = () => {
    console.log(`Editing product: ${product.name}`);
    // Implement product editing logic here
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Main product page layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image section */}
        <div className="relative">
          <img
            src={product.image[currentImageIndex]}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
          {/* Image navigation buttons */}
          <div className="absolute inset-0 flex items-center justify-between">
            <button
              onClick={prevImage}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
            >
              &#10094;
            </button>
            <button
              onClick={nextImage}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
            >
              &#10095;
            </button>
          </div>
          {/* Thumbnail navigation for images */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {product.image.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

        {/* Product details section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl font-semibold mb-4">₹{product.price.toFixed(2)}</p>
            <p className="mb-4">SKU: {product.sku}</p>
            {/* Quantity input */}
            <div className="mb-4">
              <label htmlFor="quantity" className="block mb-2">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="border rounded px-2 py-1 w-20"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-x-4 flex">
            <button
              onClick={handleAddToCart}
              className="w-full bg-primaryBlue text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={buyNow}
              className="w-full bg-amber-700 text-white py-2 px-4 rounded-full hover:bg-green-700 transition-colors"
            >
              Buy Now
            </button>
            <button
              onClick={editProduct}
              className="w-full border-primaryBlue border text-gray-800 py-2 px-4 rounded-full hover:bg-gray-300 transition-colors"
            >
              Edit Product
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <ul className="list-disc list-inside">
          <li>Category: {product.category}</li>
          <li>Subcategory: {product.subCategory}</li>
          <li>Tags: {product.tags.join(', ')}</li>
        </ul>
      </div>
    </div>
  );
}
