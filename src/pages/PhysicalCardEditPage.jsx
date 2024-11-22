import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import Cart Context
import productsData from '../products.json'; // Import product data

export default function PhysicalCardEditPage() {
  const location = useLocation();
  const { id } = useParams(); // Get the product ID from the URL
  const { imageUrl } = location.state || {}; // Get the original image URL passed through state

  const product = productsData.find((p) => p.id === id); // Find product by ID
  const { addToCart } = useCart(); // Access the addToCart function from CartContext

  const [text, setText] = useState(''); // Text to overlay
  const [font, setFont] = useState('Arial'); // Font for the text
  const [color, setColor] = useState('#000000'); // Text color
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Disable the button initially

  // Handle text changes
  const handleTextChange = (event) => setText(event.target.value);

  // Handle font changes
  const handleFontChange = (event) => setFont(event.target.value);

  // Handle color changes
  const handleColorChange = (event) => setColor(event.target.value);

  // Handle "Add to Cart"
  const handleAddToCart = () => {
    if (product) {
      const customizedProduct = {
        ...product,
        image: imageUrl, // Assigning the original image URL
        textOverlay: text, // Include user text
        font,
        color,
        customizationType: 'Physical Card', // Tagging the product type
      };
      addToCart(customizedProduct, 1); // Add customized product to cart
      console.log(`Added ${customizedProduct.name} with image ${customizedProduct.image} to cart`);
    } else {
      console.error('Product information is missing');
    }
  };

  // Enable the Add to Cart button when text, font, and color are selected
  useEffect(() => {
    if (text && font && color) {
      setIsButtonDisabled(false); // Enable the button
    } else {
      setIsButtonDisabled(true); // Keep the button disabled
    }
  }, [text, font, color]);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="edit-image-page max-w-7xl mx-auto p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Editing Image for Product {product.name}</h1>
      
      {imageUrl ? (
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          
          {/* Image Display */}
          <div className="w-full lg:w-2/3 bg-white p-4 shadow-xl rounded-lg flex justify-center">
            <img
              src={imageUrl}
              alt="Selected Product"
              className="w-full max-w-[500px] h-auto rounded-lg shadow-md border border-gray-300"
            />
          </div>

          {/* Customization Form */}
          <div className="w-full lg:w-1/3 bg-white p-6 shadow-xl rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customize Your Card</h2>
            
            {/* Text Input */}
            <label className="text-lg font-medium text-gray-700 mb-2">Text to Add:</label>
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Font Selection */}
            <label className="text-lg font-medium text-gray-700 mb-2">Select Font:</label>
            <select
              value={font}
              onChange={handleFontChange}
              className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Courier New">Courier New</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>

            {/* Color Picker */}
            <label className="text-lg font-medium text-gray-700 mb-2">Select Text Color:</label>
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-full border p-3 mb-4 rounded-lg"
            />

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled} // Disable if the button is not ready
              className={`w-full px-6 py-3 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white font-semibold rounded-lg mb-4 transition duration-300`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No image selected.</p>
      )}
    </div>
  );
}
