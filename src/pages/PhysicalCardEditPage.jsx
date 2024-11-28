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
  const [font, setFont] = useState('Dancing Script'); // Font for the text (stylist font)
  const [color, setColor] = useState('#000000'); // Text color
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Disable the button initially

  const canvasRef = useRef(null); // Reference for the canvas element
  const [canvas, setCanvas] = useState(null); // Fabric canvas object

  // Handle Groom's name change
  const handleGroomNameChange = (event) => setGroomName(event.target.value);

  // Handle Bride's name change
  const handleBrideNameChange = (event) => setBrideName(event.target.value);

  // Handle Date change
  const handleDateChange = (event) => setDate(event.target.value);

  // Handle font changes
  const handleFontChange = (event) => setFont(event.target.value);

  // Handle color changes
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
      setIsButtonDisabled(false); // Enable the button
    } else {
      setIsButtonDisabled(true); // Keep the button disabled
    }
  }, [groomName, brideName, date, font, color]);

  // Initialize the Fabric.js canvas when the component mounts
  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,  // Set a fixed width
      height: 600, // Set a fixed height
    });

    setCanvas(fabricCanvas); // Set the canvas reference

    // If there's an image URL, load it into the canvas
    if (imageUrl) {
      const imgElement = new Image();
      imgElement.src = imageUrl;

      imgElement.onload = () => {
        const img = new fabric.Image(imgElement, {
          left: 0,
          top: 0,
          selectable: false,
          evented: false,
          scaleX: fabricCanvas.width / imgElement.width,
          scaleY: fabricCanvas.height / imgElement.height,
        });

        fabricCanvas.set({
          backgroundImage: img,
        });

        fabricCanvas.renderAll(); // Ensure the canvas is rendered with the image
        console.log('Image loaded into canvas');
      };

      imgElement.onerror = (err) => {
        console.error('Error loading image:', err);
      };
    }

    return () => {
      fabricCanvas.dispose();
    };
  }, [imageUrl]);

  // Update the canvas whenever any of the text fields change
  useEffect(() => {
    if (canvas && imageUrl) {
      const groomText = new fabric.Text(groomName, {
        left: canvas.width / 2 - (groomName.length * 15) / 2, // Dynamically center based on text width
        top: canvas.height / 4, // Dynamically space vertically
        fontSize: 30,
        fill: color,
        fontFamily: font,
      });

      const brideText = new fabric.Text(brideName, {
        left: canvas.width / 2 - (brideName.length * 15) / 2, // Dynamically center based on text width
        top: canvas.height / 2, // Vertically below groom's name
        fontSize: 30,
        fill: color,
        fontFamily: font,
      });

      const dateText = new fabric.Text(date, {
        left: canvas.width / 2 - (date.length * 15) / 2, // Dynamically center based on text width
        top: canvas.height / 1.5, // Below the bride's name
        fontSize: 30,
        fill: color,
        fontFamily: font,
      });

      canvas.clear(); // Clear existing objects
      const imgElement = new Image();
      imgElement.src = imageUrl;

      imgElement.onload = () => {
        const img = new fabric.Image(imgElement, {
          left: 0,
          top: 0,
          selectable: false,
          evented: false,
          scaleX: canvas.width / imgElement.width,
          scaleY: canvas.height / imgElement.height,
        });

        canvas.set({
          backgroundImage: img,
        });

        // Add the text objects to the canvas
        canvas.add(groomText);
        canvas.add(brideText);
        canvas.add(dateText);
        canvas.renderAll();
      };

      imgElement.onerror = (err) => {
        console.error('Error loading image:', err);
      };
    }
  }, [groomName, brideName, date, font, color, canvas, imageUrl]);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="edit-image-page max-w-7xl mx-auto p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Customize Your {product.name}</h1>

      {imageUrl ? (
        <div className="flex flex-col lg:flex-row gap-12 justify-center">
          
          {/* Canvas Display */}
          <div className="w-full lg:w-2/3 bg-white p-6 shadow-2xl rounded-xl flex justify-center items-center border border-gray-300">
            <canvas ref={canvasRef}></canvas>
          </div>

          {/* Customization Form */}
          <div className="w-full lg:w-1/3 bg-white p-8 shadow-lg rounded-xl border border-gray-300">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personalize Your Card</h2>

            {/* Groom's Name Input */}
            <label className="text-lg font-medium text-gray-700 mb-2">Groom's Name:</label>
            <input
              type="text"
              value={groomName}
              onChange={handleGroomNameChange}
              className="w-full border-2 p-4 mb-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Bride's Name Input */}
            <label className="text-lg font-medium text-gray-700 mb-2">Bride's Name:</label>
            <input
              type="text"
              value={brideName}
              onChange={handleBrideNameChange}
              className="w-full border-2 p-4 mb-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Date Input */}
            <label className="text-lg font-medium text-gray-700 mb-2">Wedding Date:</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full border-2 p-4 mb-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Font Selection */}
            <label className="text-lg font-medium text-gray-700 mb-2">Select Font:</label>
            <select
              value={font}
              onChange={handleFontChange}
              className="w-full border-2 p-4 mb-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Poppins">Poppins</option>
              <option value="Lobster">Lobster</option>
              <option value="Dancing Script">Dancing Script</option>
              <option value="Great Vibes">Great Vibes</option>
              <option value="Sacramento">Sacramento</option>
              <option value="Pacifico">Pacifico</option>
            </select>

            {/* Color Selection */}
            <label className="text-lg font-medium text-gray-700 mb-2">Select Text Color:</label>
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-full p-4 mb-6 rounded-xl"
            />

            {/* Add to Cart Button */}
            <button
              className={`w-full bg-blue-600 text-white py-4 rounded-xl text-lg transition duration-300 ease-in-out ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-700 text-xl">No image available for this product</div>
      )}
    </div>
  );
}
