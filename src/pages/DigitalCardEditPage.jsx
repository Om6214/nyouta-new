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
  const [groomName, setGroomName] = useState('');
  const [brideName, setBrideName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [font, setFont] = useState('Dancing Script');
  const [color, setColor] = useState('#000000');
  const [isApplyChangesEnabled, setIsApplyChangesEnabled] = useState(false);
  const [isPayNowEnabled, setIsPayNowEnabled] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  // Handlers for input fields
  const handleInputChange = (setter) => (event) => setter(event.target.value);

  const handleApplyChanges = () => {
    setIsApplyChangesEnabled(false);
    setIsPayNowEnabled(true);
  };

  const handlePayment = () => setShowPaymentForm(true);

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    setPaymentCompleted(true);
    setShowPaymentForm(false);
  };

  const handleDownload = () => {
    const dataUrl = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'customized-wedding-card.png';
    link.click();
  };

  useEffect(() => {
    setIsApplyChangesEnabled(!!(groomName && brideName && date && time && font && color));
  }, [groomName, brideName, date, time, font, color]);

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

        fabricCanvas.set({
          backgroundImage: img,
        });

        fabricCanvas.renderAll();
      };

      imgElement.onerror = (err) => console.error('Error loading image:', err);
    }

    return () => fabricCanvas.dispose();
  }, [imageUrl]);

  useEffect(() => {
    if (canvas && imageUrl) {
      const textOptions = {
        fontSize: 30,
        fill: color,
        fontFamily: font,
      };

      const texts = [
        new fabric.Text(groomName, { left: 400, top: 100, ...textOptions }),
        new fabric.Text(brideName, { left: 400, top: 150, ...textOptions }),
        new fabric.Text(date, { left: 400, top: 200, ...textOptions }),
        new fabric.Text(time, { left: 400, top: 250, ...textOptions }),
      ];

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

        texts.forEach((text) => canvas.add(text));
        canvas.renderAll();
      };

      imgElement.onerror = (err) => console.error('Error loading image:', err);
    }
  }, [groomName, brideName, date, time, font, color, canvas, imageUrl]);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="edit-image-page max-w-7xl mx-auto p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Customize Your Wedding Card for {product.name}</h1>

      {imageUrl ? (
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
          <div className="w-full lg:w-2/3 flex justify-center items-center rounded-lg">
            <canvas ref={canvasRef} className="w-full h-auto rounded-lg"></canvas>
          </div>

          <div className="w-full lg:w-1/3 bg-white shadow-xl rounded-lg p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Card Details</h2>

            {[
              { label: "Groom's Name", value: groomName, onChange: handleInputChange(setGroomName), placeholder: "Enter Groom's Name" },
              { label: "Bride's Name", value: brideName, onChange: handleInputChange(setBrideName), placeholder: "Enter Bride's Name" },
              { label: 'Wedding Date', value: date, onChange: handleInputChange(setDate), type: 'date' },
              { label: 'Wedding Time', value: time, onChange: handleInputChange(setTime), type: 'time' },
            ].map(({ label, ...props }) => (
              <div key={label} className="mb-6">
                <label className="text-lg font-medium text-gray-700 mb-2">{label}:</label>
                <input
                  {...props}
                  className="w-full border-2 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div className="mb-6">
              <label className="text-lg font-medium text-gray-700 mb-2">Font Style:</label>
              <select
                value={font}
                onChange={handleInputChange(setFont)}
                className="w-full border-2 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Dancing Script">Dancing Script</option>
                <option value="Pacifico">Pacifico</option>
                <option value="Lobster">Lobster</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="text-lg font-medium text-gray-700 mb-2">Text Color:</label>
              <input
                type="color"
                value={color}
                onChange={handleInputChange(setColor)}
                className="w-full h-12 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleApplyChanges}
              disabled={!isApplyChangesEnabled}
              className={`w-full px-6 py-3 ${isApplyChangesEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'} text-white font-semibold rounded-lg mb-4 transition duration-300`}
            >
              Apply Changes
            </button>

            {!paymentCompleted ? (
              <button
                onClick={handlePayment}
                disabled={!isPayNowEnabled}
                className={`w-full px-6 py-3 ${isPayNowEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'} text-white font-semibold rounded-lg mb-4 transition duration-300`}
              >
                Pay Now
              </button>
            ) : (
              <button
                onClick={handleDownload}
                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg mb-4 transition duration-300"
              >
                Download Card
              </button>
            )}

            {showPaymentForm && (
              <form onSubmit={handlePaymentSubmit}>
                <input
                  type="text"
                  placeholder="Card Number"
                  required
                  className="w-full border-2 p-4 rounded-lg focus:outline-none mb-4"
                />
                <input
                  type="text"
                  placeholder="Name on Card"
                  required
                  className="w-full border-2 p-4 rounded-lg focus:outline-none mb-4"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
                >
                  Complete Payment
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-center mt-10">Error: Image not found. Please try again.</p>
      )}
    </div>
  );
}
