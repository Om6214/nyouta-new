'use client'

import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productsData from '../products.json'

export default function ProductPage() {
  const { id } = useParams()
  const product = productsData.find((p) => p.id === id)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) return <div className="text-center p-4">Product not found</div>

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.image.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.image.length) % product.image.length)
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value)
    setQuantity(isNaN(value) ? 1 : Math.max(1, value))
  }

  const addToCart = () => {
    console.log(`Added ${quantity} ${product.name}(s) to cart`)
    // Implement your add to cart logic here
  }
  const navigate = useNavigate()
  const buyNow = () => {
    console.log(`Buying ${quantity} ${product.name}(s) now`)
    // Implement your buy now logic here
    navigate('/checkout')
    
  }

  const editProduct = () => {
    console.log(`Editing product: ${product.name}`)
    // Implement your edit product logic here
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product.image[currentImageIndex]}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
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
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {product.image.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentImageIndex === index ? 'bg-white' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl font-semibold mb-4">₹{product.price.toFixed(2)}</p>
            <p className="mb-4">SKU: {product.sku}</p>
            <div className="mb-4">
              <label htmlFor="quantity" className="block mb-2">
                Quantity:
              </label>
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
          <div className="space-x-4 flex">
            <button
              onClick={() => addToCart(product)}
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
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <ul className="list-disc list-inside">
          <li>Category: {product.category}</li>
          <li>Subcategory: {product.subCategory}</li>
          <li>Tags: {product.tags.join(', ')}</li>
        </ul>
      </div>
    </div>
  )
}