import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import Cart Context
import productsData from '../products.json'; // Import product data
import * as fabric from 'fabric'; // Import Fabric.js for canvas functionality

export default function WeddingCardEditPage() {
  const location = useLocation();
  const { id } = useParams(); // Get the product ID from the URL
  const { imageUrl } = location.state || {}; // Get the original image URL passed through state

  const product = productsData.find((p) => p.id === id); // Find product by ID
  const { addToCart } = useCart(); // Access the addToCart function from CartContext

  // State for text fields
  const [groomName, setGroomName] = useState(''); // Groom's name
  const [brideName, setBrideName] = useState(''); // Bride's name
  const [date, setDate] = useState(''); // Wedding date
  const [font, setFont] = useState('Dancing Script'); // Font for the text
  const [color, setColor] = useState('#000000'); // Text color
  const [isApplyChangesEnabled, setIsApplyChangesEnabled] = useState(false); // Control Apply Changes Button state
  const [isPayNowEnabled, setIsPayNowEnabled] = useState(false); // Control Pay Now Button state
  const [paymentCompleted, setPaymentCompleted] = useState(false); // Track payment status
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Toggle payment form visibility

  const canvasRef = useRef(null); // Reference for the canvas element
  const [canvas, setCanvas] = useState(null); // Fabric canvas object

  // Handlers for input fields
  const handleGroomNameChange = (event) => setGroomName(event.target.value);
  const handleBrideNameChange = (event) => setBrideName(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);
  const handleFontChange = (event) => setFont(event.target.value);
  const handleColorChange = (event) => setColor(event.target.value);

  // Handle Apply Changes
  const handleApplyChanges = () => {
    // Logic to apply changes, possibly update canvas or save data
    setIsApplyChangesEnabled(false); // Disable Apply Changes after applying
    setIsPayNowEnabled(true); // Enable Pay Now after applying changes
  };

  // Handle Payment
  const handlePayment = () => {
    setShowPaymentForm(true); // Show the payment form
  };

  // Handle Payment Form Submission
  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    // Simulate payment completion (you would integrate your payment logic here)
    setPaymentCompleted(true);
    setShowPaymentForm(false);
  };

  // Handle Download
  const handleDownload = () => {
    // Logic to download the image (e.g., save canvas as an image file)
    const dataUrl = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'customized-wedding-card.png';
    link.click();
  };

  // Enable/Disable the Apply Changes Button based on field validation
  useEffect(() => {
    if (groomName && brideName && date && font && color) {
      setIsApplyChangesEnabled(true);
    } else {
      setIsApplyChangesEnabled(false);
    }
  }, [groomName, brideName, date, font, color]);

  // Initialize Fabric.js canvas
  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
    });

    setCanvas(fabricCanvas);

    if (imageUrl) {
      const imgElement = new Image();
      imgElement.src = imageUrl;

      imgElement.onload = () => {
        const canvasWidth = 800;
        const canvasHeight = 600;

        const imgWidth = imgElement.width;
        const imgHeight = imgElement.height;

        const scaleFactor = 1.2; // Increase size by 20%
        const scaleX = (canvasWidth / imgWidth) * scaleFactor;
        const scaleY = (canvasHeight / imgHeight) * scaleFactor;
        const scale = Math.min(scaleX, scaleY);

        const centerX = (canvasWidth - imgWidth * scale) / 2;
        const centerY = (canvasHeight - imgHeight * scale) / 2;

        const img = new fabric.Image(imgElement, {
          left: centerX,
          top: centerY,
          selectable: false,
          evented: false,
          scaleX: scale,
          scaleY: scale,
        });

        fabricCanvas.set({
          backgroundImage: img,
        });

        fabricCanvas.renderAll();
      };

      imgElement.onerror = (err) => {
        console.error('Error loading image:', err);
      };
    }

    return () => {
      fabricCanvas.dispose();
    };
  }, [imageUrl]);

  // Update canvas on text and style changes
  useEffect(() => {
    if (canvas && imageUrl) {
      const groomText = new fabric.Text(groomName, {
        left: 150,
        top: 100,
        fontSize: 30,
        fill: color,
        fontFamily: font,
      });

      const brideText = new fabric.Text(brideName, {
        left: 150,
        top: 150,
        fontSize: 30,
        fill: color,
        fontFamily: font,
      });

      const dateText = new fabric.Text(date, {
        left: 150,
        top: 200,
        fontSize: 30,
        fill: color,
        fontFamily: font,
      });

      canvas.clear();
      const imgElement = new Image();
      imgElement.src = imageUrl;

      imgElement.onload = () => {
        const canvasWidth = 800;
        const canvasHeight = 600;

        const imgWidth = imgElement.width;
        const imgHeight = imgElement.height;

        const scaleFactor = 1.2;
        const scaleX = (canvasWidth / imgWidth) * scaleFactor;
        const scaleY = (canvasHeight / imgHeight) * scaleFactor;
        const scale = Math.min(scaleX, scaleY);

        const centerX = (canvasWidth - imgWidth * scale) / 2;
        const centerY = (canvasHeight - imgHeight * scale) / 2;

        const img = new fabric.Image(imgElement, {
          left: centerX,
          top: centerY,
          selectable: false,
          evented: false,
          scaleX: scale,
          scaleY: scale,
        });

        canvas.set({
          backgroundImage: img,
        });

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
    <div className="edit-image-page max-w-7xl mx-auto p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Customize Your Wedding Card for {product.name}</h1>

      {imageUrl ? (
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="w-full lg:w-2/3 bg-white p-4 shadow-xl rounded-lg flex justify-center">
            <canvas ref={canvasRef}></canvas>
          </div>

          <div className="w-full lg:w-1/3 bg-white p-6 shadow-xl rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Card Details</h2>

            <label className="text-lg font-medium text-gray-700 mb-2">Groom's Name:</label>
            <input
              type="text"
              value={groomName}
              onChange={handleGroomNameChange}
              className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="text-lg font-medium text-gray-700 mb-2">Bride's Name:</label>
            <input
              type="text"
              value={brideName}
              onChange={handleBrideNameChange}
              className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="text-lg font-medium text-gray-700 mb-2">Wedding Date:</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />


            <label className="text-lg font-medium text-gray-700 mb-2">Font:</label>
            <select
              value={font}
              onChange={handleFontChange}
              className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Dancing Script">Dancing Script</option>
              <option value="Pacifico">Pacifico</option>
              <option value="Lobster">Lobster</option>
            </select>

            <label className="text-lg font-medium text-gray-700 mb-2">Text Color:</label>
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-full h-12 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Apply Changes Button */}
            <button
              onClick={handleApplyChanges}
              disabled={!isApplyChangesEnabled}
              className={`w-full px-6 py-3 ${isApplyChangesEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'} text-white font-semibold rounded-lg mb-4 transition duration-300`}
            >
              Apply Changes
            </button>

            {/* Payment / Download Button */}
            {!paymentCompleted ? (
              <button
                onClick={handlePayment}
                disabled={!isPayNowEnabled}
                className={`w-full px-6 py-3 ${isPayNowEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'} text-white font-semibold rounded-lg transition duration-300`}
              >
                Pay Now
              </button>
            ) : (
              <button
                onClick={handleDownload}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
              >
                Download Image Card
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No image selected.</p>
      )}

      {/* Payment Form Modal */}
      {showPaymentForm && !paymentCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Payment Details</h2>
            <form onSubmit={handlePaymentSubmit}>
              <label className="block mb-2 text-gray-700">Name:</label>
              <input
                type="text"
                required
                className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block mb-2 text-gray-700">Card Number:</label>
              <input
                type="text"
                required
                className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block mb-2 text-gray-700">Expiration Date:</label>
              <input
                type="text"
                required
                className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block mb-2 text-gray-700">CVV:</label>
              <input
                type="text"
                required
                className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
              >
                Submit Payment
              </button>
            </form>
            <button
              onClick={() => setShowPaymentForm(false)}
              className="mt-4 w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
