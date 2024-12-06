import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import Cart Context
import productsData from '../products.json'; // Import product data
import * as fabric from 'fabric'; // Import Fabric.js for canvas functionality

export default function PhysicalCardEditPage() {
  const location = useLocation();
  const { id } = useParams(); // Get the product ID from the URL
  const { imageUrl } = location.state || {}; // Get the original image URL passed through state

  const product = productsData.find((p) => p.id === id); // Find product by ID
  const { addToCart } = useCart(); // Access the addToCart function from CartContext

  // State for text fields
  const [groomName, setGroomName] = useState(''); // Groom's name
  const [brideName, setBrideName] = useState(''); // Bride's name
  const [date, setDate] = useState(''); // Date
  const [font, setFont] = useState('Dancing Script'); // Font for the text
  const [color, setColor] = useState('#000000'); // Text color
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Disable the button initially

  const canvasRef = useRef(null); // Reference for the canvas element
  const [canvas, setCanvas] = useState(null); // Fabric canvas object

  // Handle changes
  const handleGroomNameChange = (event) => setGroomName(event.target.value);
  const handleBrideNameChange = (event) => setBrideName(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);
  const handleFontChange = (event) => setFont(event.target.value);
  const handleColorChange = (event) => setColor(event.target.value);

  // Handle "Add to Cart"
  const handleAddToCart = () => {
    const customizedProduct = {
      ...product,
      customizationType: 'Physical Card',
      groomName,
      brideName,
      date,
      font,
      color,
    };
    addToCart(customizedProduct, 1);
    console.log(`Added ${customizedProduct.name} to cart`);
  };

  // Enable the Add to Cart button when all necessary fields are completed
  useEffect(() => {
    if (groomName && brideName && date && font && color) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [groomName, brideName, date, font, color]);

  // Initialize the Fabric.js canvas
  useEffect(() => {
    if (imageUrl) {
      const imgElement = new Image();
      imgElement.src = imageUrl;

      imgElement.onload = () => {
        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
          width: imgElement.width, // Set canvas width to image width
          height: imgElement.height, // Set canvas height to image height
        });

        setCanvas(fabricCanvas);

        const img = new fabric.Image(imgElement, {
          left: 0,
          top: 0,
          selectable: false,
          evented: false,
        });

        fabricCanvas.add(img);
        fabricCanvas.renderAll();
        console.log('Image loaded into canvas');
      };

      imgElement.onerror = (err) => {
        console.error('Error loading image:', err);
      };
    }

    return () => {
      if (canvas) canvas.dispose();
    };
  }, [imageUrl]);

  // Update the canvas text elements when inputs change
  useEffect(() => {
    if (canvas) {
      canvas.clear(); // Clear the canvas
      const imgElement = new Image();
      imgElement.src = imageUrl;

      imgElement.onload = () => {
        const img = new fabric.Image(imgElement, {
          left: 0,
          top: 0,
          selectable: false,
          evented: false,
        });

        canvas.add(img);

        const groomText = new fabric.Text(groomName, {
          left: canvas.width / 2 - (groomName.length * 15) / 2,
          top: canvas.height / 4,
          fontSize: 30,
          fill: color,
          fontFamily: font,
        });

        const brideText = new fabric.Text(brideName, {
          left: canvas.width / 2 - (brideName.length * 15) / 2,
          top: canvas.height / 2,
          fontSize: 30,
          fill: color,
          fontFamily: font,
        });

        const dateText = new fabric.Text(date, {
          left: canvas.width / 2 - (date.length * 15) / 2,
          top: canvas.height / 1.5,
          fontSize: 30,
          fill: color,
          fontFamily: font,
        });

        canvas.add(groomText, brideText, dateText);
        canvas.renderAll();
      };

      imgElement.onerror = (err) => {
        console.error('Error loading image:', err);
      };
    }
  }, [groomName, brideName, date, font, color, canvas, imageUrl]);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="edit-image-page max-w-7xl mx-auto py-12 px-6 bg-gray-100">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10">
        Customize Your {product.name}
      </h1>
  
      {imageUrl ? (
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Canvas Display */}
          <div className="flex-grow w-full lg:w-2/3 bg-white shadow-xl rounded-xl p-4 relative">
            <h2 className="text-lg font-medium text-gray-600 text-center mb-4">
              Preview Your Custom Card
            </h2>
            <div className="relative flex items-center justify-center overflow-hidden rounded-lg border border-gray-200">
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>
  
          {/* Customization Form */}
          <div className="flex-grow w-full lg:w-1/3 bg-white shadow-xl rounded-xl p-8 border border-gray-300">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Personalize Your Card</h2>
  
            {/* Groom's Name Input */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Groom's Name:</label>
              <input
                type="text"
                value={groomName}
                onChange={handleGroomNameChange}
                className="w-full border-2 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                placeholder="Enter Groom's Name"
              />
            </div>
  
            {/* Bride's Name Input */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Bride's Name:</label>
              <input
                type="text"
                value={brideName}
                onChange={handleBrideNameChange}
                className="w-full border-2 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                placeholder="Enter Bride's Name"
              />
            </div>
  
            {/* Wedding Date Input */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Wedding Date:</label>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="w-full border-2 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
              />
            </div>
  
            {/* Font Selection */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Select Font:</label>
              <select
                value={font}
                onChange={handleFontChange}
                className="w-full border-2 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
              >
                <option value="Poppins">Poppins</option>
                <option value="Lobster">Lobster</option>
                <option value="Dancing Script">Dancing Script</option>
                <option value="Great Vibes">Great Vibes</option>
                <option value="Sacramento">Sacramento</option>
                <option value="Pacifico">Pacifico</option>
              </select>
            </div>
  
            {/* Color Picker */}
            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-700 mb-2">Select Text Color:</label>
              <input
                type="color"
                value={color}
                onChange={handleColorChange}
                className="w-full h-12 cursor-pointer rounded-lg border-2"
              />
            </div>
  
            {/* Add to Cart Button */}
            <button
              className={`w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-medium text-lg ${
                isButtonDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:from-blue-600 hover:to-blue-800 hover:shadow-lg'
              }`}
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-700 text-xl mt-12">No image available for this product</div>
      )}
    </div>
  );
  
}
